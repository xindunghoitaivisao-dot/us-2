from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
import uuid
from datetime import datetime, timezone
import resend


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

app = FastAPI(title="MM Innovation Consulting API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
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


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "MM Innovation Consulting API"}


@api_router.get("/health")
async def health():
    return {"ok": True}


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
