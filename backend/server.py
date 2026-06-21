from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import time
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
import uuid
from datetime import datetime, timezone
import resend
from collections import deque


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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
NOTIFICATION_EMAIL_FALLBACK = os.environ.get('NOTIFICATION_EMAIL_FALLBACK', '')

app = FastAPI(title="MM Innovation Consulting API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    company: Optional[str] = Field(default="", max_length=160)
    service_type: Optional[str] = Field(default="", max_length=80)
    message: str = Field(..., min_length=1, max_length=2000)
    preferred_start_date: Optional[str] = Field(default="", max_length=40)
    budget_range: Optional[str] = Field(default="", max_length=80)
    # Honeypot — bots fill this, humans don't (it's hidden)
    website: Optional[str] = Field(default="", max_length=200)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    company: str = ""
    service_type: str = ""
    message: str = ""
    preferred_start_date: str = ""
    budget_range: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Rate limit (per-IP, in-memory) ----------
RATE_WINDOW_S = 60
RATE_MAX = 5
_rate_log: dict[str, deque] = {}


def _is_rate_limited(ip: str) -> bool:
    now = time.time()
    dq = _rate_log.setdefault(ip, deque())
    while dq and now - dq[0] > RATE_WINDOW_S:
        dq.popleft()
    if len(dq) >= RATE_MAX:
        return True
    dq.append(now)
    return False


# ---------- Email ----------
def _row(label: str, value: str) -> str:
    return (
        f'<tr><td style="color:#888;width:170px;vertical-align:top;padding:8px;">{label}</td>'
        f'<td style="color:#fff;padding:8px;white-space:pre-wrap;">{value or "—"}</td></tr>'
    )


def _build_lead_html(lead: Lead) -> str:
    return f"""
    <table style="width:100%;font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;padding:32px;">
      <tr><td>
        <h2 style="font-family:Georgia,serif;font-style:italic;color:#fff;font-size:28px;margin:0 0 16px 0;">
          New contract inquiry
        </h2>
        <p style="color:#bbb;font-size:14px;">A new prospect just submitted the contract inquiry form on the MM Innovation Consulting site.</p>
        <table cellpadding="0" cellspacing="0" style="margin-top:16px;width:100%;background:#161616;border-radius:12px;">
          {_row("Full Name", lead.name)}
          {_row("Email", f'<a style="color:#fff;text-decoration:underline;" href="mailto:{lead.email}">{lead.email}</a>')}
          {_row("Phone", lead.phone)}
          {_row("Company", lead.company)}
          {_row("Service / Project Type", lead.service_type)}
          {_row("Preferred Start Date", lead.preferred_start_date)}
          {_row("Budget Range", lead.budget_range)}
          {_row("Message", lead.message)}
          {_row("Received", lead.created_at.isoformat())}
        </table>
      </td></tr>
    </table>
    """


async def send_lead_notification(lead: Lead) -> None:
    if not resend.api_key:
        logger.warning("Resend not configured; skipping email")
        return

    # In Resend test mode (sending from onboarding@resend.dev), the API only
    # delivers to the verified Resend account email. Until a custom domain is
    # verified, route to the fallback so leads still reach an inbox.
    in_test_mode = "resend.dev" in SENDER_EMAIL
    if in_test_mode and NOTIFICATION_EMAIL_FALLBACK:
        recipients = [NOTIFICATION_EMAIL_FALLBACK]
    else:
        recipients = [e for e in [NOTIFICATION_EMAIL, NOTIFICATION_EMAIL_FALLBACK] if e]

    if not recipients:
        logger.warning("No notification recipient configured")
        return

    params = {
        "from": SENDER_EMAIL,
        "to": recipients,
        "reply_to": lead.email,
        "subject": f"New Contract Inquiry from {lead.name} – {lead.company or 'no company'}",
        "html": _build_lead_html(lead),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Lead email sent: {result.get('id')} → {recipients}")
    except Exception as e:
        logger.exception(f"Failed to send lead email: {e}")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "MM Innovation Consulting API"}


@api_router.get("/health")
async def health():
    return {"ok": True}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate, request: Request):
    # Honeypot
    if payload.website:
        logger.warning("Honeypot triggered, silently dropping submission")
        # Return a fake success so bots don't get signal
        return Lead(
            name=payload.name,
            email=str(payload.email),
            message=payload.message,
        )

    # Rate limit by client IP
    client_ip = "unknown"
    try:
        client_ip = request.client.host if request.client else "unknown"
    except Exception:
        pass
    if _is_rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Too many submissions — try again in a minute.")

    lead = Lead(
        name=payload.name.strip(),
        email=str(payload.email).strip().lower(),
        phone=(payload.phone or "").strip(),
        company=(payload.company or "").strip(),
        service_type=(payload.service_type or "").strip(),
        message=payload.message.strip(),
        preferred_start_date=(payload.preferred_start_date or "").strip(),
        budget_range=(payload.budget_range or "").strip(),
    )
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception:
        logger.exception("Failed to insert lead")
        raise HTTPException(status_code=500, detail="Could not save lead.")
    asyncio.create_task(send_lead_notification(lead))
    return lead


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
