# MM Innovation Consulting — Landing Page PRD

## Original Problem Statement
Build a dark, premium, single-page landing page for an AI-powered web design
agency using **React + Vite + Tailwind CSS + shadcn/ui + Framer Motion**.
Luxury editorial aesthetic — black backgrounds, white text, liquid glass
(glassmorphism) effects, cinematic video backgrounds.

## User Choices (2026-04-30)
- **Stack**: Migrate from CRA → Vite (done)
- **Media**: Use external CloudFront / Mux URLs directly
- **Feature GIFs**: Hot-link motionsites.ai URLs
- **Brand name**: MM Innovation Consulting
- **Backend**: Yes — "Book a Call" form persists leads to MongoDB

## Architecture
- **Frontend**: React 19 + Vite 8 + Tailwind 3 + Framer Motion (`motion`) + hls.js
  - Path alias `@` → `/src`
  - Vite exposes `process.env.REACT_APP_BACKEND_URL` via `define`
  - HMR runs over wss on clientPort 443 (preview proxy)
- **Backend**: FastAPI + Motor (async MongoDB)
  - All routes under `/api`
  - Lead model: `id, name, email, company, message, created_at`

## Sections Built
1. Floating glass Navbar (mobile menu + Get Started CTA)
2. Hero (1000px, CloudFront MP4 bg, BlurText word-by-word animation, partner row)
3. StartSection "How It Works" (Mux HLS bg)
4. FeaturesChess — alternating rows w/ live GIF previews
5. FeaturesGrid — 4 glass cards (Zap / Palette / BarChart3 / Shield)
6. Stats — desaturated Mux HLS bg, glass card with 4 KPIs
7. Testimonials — 3 quote cards
8. CTA + Footer — Mux HLS bg, "Your next website starts here." + footer bar
9. **BookCallDialog** — shadcn Dialog with form → POST /api/leads → toast

## Visual System
- HSL theme tokens, custom `.liquid-glass` and `.liquid-glass-strong`
  with mask-composite gradient borders
- Fonts: `Instrument Serif` (italic) for headings, `Barlow` for body
- Every section badge: `liquid-glass rounded-full px-3.5 py-1`
- Primary CTA: `liquid-glass-strong rounded-full` with `ArrowUpRight`
- Secondary CTA: `bg-white text-black rounded-full`

## API Endpoints
- `GET  /api/`           → health
- `POST /api/leads`      → create lead (validates email)
- `GET  /api/leads`      → list leads (admin)
- `POST /api/status`, `GET /api/status` → status checks (template)

## What's Implemented (2026-04-30)
- [x] Vite migration (yarn start = vite, port 3000, wss HMR)
- [x] Full landing page, all 8 sections
- [x] BlurText with IntersectionObserver via `motion`'s `useInView`
- [x] HLS video component with hls.js fallback
- [x] Lead capture flow end-to-end (verified via screenshot test)
- [x] Mobile navbar, mobile responsive layout
- [x] data-testid on every interactive element

## Backlog (P1)
- Pricing section (currently the "Pricing" anchor links to Stats)
- Real "Watch the Film" modal video player
- Logo asset (currently uses an "M" glyph in glass circle)
- Hero poster fallback image at `/images/hero_bg.jpeg`

## Backlog (P2)
- Admin view for leads (auth-gated)
- Email notification on new lead (Resend / SendGrid)
- Analytics events (CTA click tracking)
- Form anti-spam (honeypot / hCaptcha)
