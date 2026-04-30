from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import resend
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '')

# Admin allowlist
ADMIN_EMAILS = [e.strip().lower() for e in os.environ.get('ADMIN_EMAILS', '').split(',') if e.strip()]

# Emergent auth
EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"

app = FastAPI(title="MM Innovation Consulting API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=160)
    message: Optional[str] = Field(default="", max_length=2000)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""
    message: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SessionRequest(BaseModel):
    session_id: str


class AuthUser(BaseModel):
    user_id: str
    email: str
    name: str
    picture: str = ""
    is_admin: bool = False


# ---------- Email ----------
def _build_lead_html(lead: Lead) -> str:
    return f"""
    <table style=\"width:100%;font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;padding:32px;\">
      <tr><td>
        <h2 style=\"font-family:Georgia,serif;font-style:italic;color:#fff;font-size:28px;margin:0 0 16px 0;\">New strategy call request</h2>
        <p style=\"color:#bbb;font-size:14px;\">A new lead just came through MM Innovation Consulting.</p>
        <table cellpadding=\"8\" style=\"margin-top:16px;width:100%;background:#161616;border-radius:12px;\">
          <tr><td style=\"color:#888;width:120px;\">Name</td><td style=\"color:#fff;\">{lead.name}</td></tr>
          <tr><td style=\"color:#888;\">Email</td><td style=\"color:#fff;\"><a style=\"color:#fff;\" href=\"mailto:{lead.email}\">{lead.email}</a></td></tr>
          <tr><td style=\"color:#888;\">Company</td><td style=\"color:#fff;\">{lead.company or '—'}</td></tr>
          <tr><td style=\"color:#888;vertical-align:top;\">Message</td><td style=\"color:#fff;white-space:pre-wrap;\">{lead.message or '—'}</td></tr>
          <tr><td style=\"color:#888;\">Received</td><td style=\"color:#fff;\">{lead.created_at.isoformat()}</td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_lead_notification(lead: Lead) -> None:
    if not resend.api_key or not NOTIFICATION_EMAIL:
        logger.warning("Resend not configured; skipping email")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New lead: {lead.name} ({lead.company or 'no company'})",
        "html": _build_lead_html(lead),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Lead email sent: {result.get('id')}")
    except Exception as e:
        logger.exception(f"Failed to send lead email: {e}")


# ---------- Auth helpers ----------
async def get_current_user(request: Request) -> AuthUser:
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.lower().startswith("bearer "):
            token = auth.split(" ", 1)[1].strip()
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session.get("expires_at")
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at and expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at and expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")

    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    is_admin = user["email"].lower() in ADMIN_EMAILS if ADMIN_EMAILS else True
    return AuthUser(
        user_id=user["user_id"],
        email=user["email"],
        name=user.get("name", ""),
        picture=user.get("picture", ""),
        is_admin=is_admin,
    )


async def require_admin(user: AuthUser = Depends(get_current_user)) -> AuthUser:
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    return user


# ---------- Routes: leads ----------
@api_router.get("/")
async def root():
    return {"message": "MM Innovation Consulting API"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(
        name=payload.name.strip(),
        email=str(payload.email).strip().lower(),
        company=(payload.company or "").strip(),
        message=(payload.message or "").strip(),
    )
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception:
        logger.exception("Failed to insert lead")
        raise HTTPException(status_code=500, detail="Could not save lead.")
    # fire and forget email
    asyncio.create_task(send_lead_notification(lead))
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 200, _: AuthUser = Depends(require_admin)):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


# ---------- Routes: auth ----------
@api_router.post("/auth/session")
async def auth_session(payload: SessionRequest, response: Response):
    """Exchange Emergent session_id for our session_token cookie."""
    async with httpx.AsyncClient(timeout=15.0) as cli:
        r = await cli.get(EMERGENT_AUTH_URL, headers={"X-Session-ID": payload.session_id})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    data = r.json()
    email = (data.get("email") or "").lower()
    if not email:
        raise HTTPException(status_code=400, detail="Missing email from provider")

    # Upsert user (by email)
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": data.get("name", existing.get("name", "")), "picture": data.get("picture", existing.get("picture", ""))}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": data.get("name", ""),
            "picture": data.get("picture", ""),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })

    session_token = data.get("session_token") or uuid.uuid4().hex
    expires = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=7 * 24 * 3600,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    is_admin = email in ADMIN_EMAILS if ADMIN_EMAILS else True
    return {
        "user_id": user_id,
        "email": email,
        "name": data.get("name", ""),
        "picture": data.get("picture", ""),
        "is_admin": is_admin,
    }


@api_router.get("/auth/me", response_model=AuthUser)
async def auth_me(user: AuthUser = Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_many({"session_token": token})
    response.delete_cookie("session_token", path="/")
    return {"ok": True}


# ---------- Status (kept) ----------
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    obj = StatusCheck(**input.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


# Mount + CORS
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
