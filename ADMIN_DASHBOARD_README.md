# STEPS LAB Admin Dashboard Verification Guide

This guide explains how to validate the full admin content system end-to-end:

- login/session security
- protected admin routes
- Redis read/write behavior (`REDIS_URL`)
- frontend dynamic rendering from `/api/content`
- production checks on Vercel

---

## 1) Prerequisites

Make sure you have:

- Node.js `>=18`
- npm `>=9`
- dependencies installed (`npm install`)
- access to your Vercel project env settings

---

## 2) Environment Setup

Create or update `.env.local` with:

```env
ADMIN_PASSWORD=your_strong_admin_password
ADMIN_JWT_SECRET=your_long_random_secret
REDIS_URL=redis://default:YOUR_PASSWORD@redis-xxxxx.cloud.redislabs.com:PORT
RESEND_API_KEY=your_resend_key_if_needed
```

Notes:

- `ADMIN_PASSWORD` is used for `/admin/login` verification.
- `ADMIN_JWT_SECRET` signs/verifies admin JWT session cookies.
- `REDIS_URL` is the full URL from your Redis host (e.g. Redis Cloud: `redis://default:...@...redislabs.com:...`). The app stores site JSON under key `site:content`.
- Never commit real secrets to git.

---

## 3) Start the App

Run:

```bash
npm run dev
```

Open:

- [http://localhost:3000](http://localhost:3000)

---

## 4) Authentication & Middleware Checks

### A. Protected route redirect

1. Open: `/admin/dashboard` directly in a private/incognito window.
2. Expected: redirect to `/admin/login`.

### B. Login success

1. On `/admin/login`, enter correct `ADMIN_PASSWORD`.
2. Expected: redirect to `/admin/dashboard`.

### C. Login failure

1. Enter wrong password.
2. Expected: stay on login page and show invalid password message.

### D. Already authenticated behavior

1. Login successfully.
2. Navigate to `/admin/login`.
3. Expected: redirect to `/admin/dashboard`.

### E. Session expiration behavior (basic)

1. Clear site cookies in browser.
2. Open `/admin/dashboard`.
3. Expected: redirect back to `/admin/login`.

---

## 5) API Checks (`/api/content`)

### A. GET check

1. Open `/api/content` in browser.
2. Expected: JSON object with keys:
   - `hero`
   - `services`
   - `aboutTech`
   - `images`
   - `footer`

If Redis has no `site:content` key yet, you should still get fallback default content.

### B. POST unauthorized check

1. In a non-authenticated browser session, call `POST /api/content` (Postman/curl).
2. Expected: `401 Unauthorized`.

### C. POST authorized check

1. Login via `/admin/login`.
2. Use dashboard "Save & Publish" after editing data.
3. Expected: save succeeds and API returns updated content.

---

## 6) Dashboard UI Checks

Open `/admin/dashboard` and verify tabs:

- `General`
- `Services`
- `Media`
- `Footer`

### A. General tab

Edit:

- Hero title/subtitle
- CTA text/link
- Workflow description
- Team experience

Click `Save & Publish`.

Expected:

- button shows loading state while request is in progress
- success message appears

### B. Services tab

Edit multiple service fields:

- id
- title
- description
- icon name
- price

Save and confirm data remains after refresh.

### C. Media tab

Edit:

- logo URL
- hero image URL
- gallery URLs (one per line)

Save and verify values persist after refresh.

### D. Footer tab

Edit:

- email
- phone
- LinkedIn
- GitHub
- X
- copyright

Save and verify values persist.

---

## 7) Frontend Rendering Checks

After saving content in dashboard, open public pages and verify changes appear without code changes.

Check these components specifically:

- `Header` (logo URL)
- `HeroSection` (title, subtitle, CTA text/link, hero image)
- `ServicesSection` (service cards and price)
- `AboutSection` (workflow/team text)
- `Footer` (email/phone/social/copyright/logo)

Expected:

- all values reflect current Redis-stored content
- refresh does not reset to hardcoded text

---

## 8) Production Verification (Vercel)

In Vercel project settings:

1. Add/confirm env vars:
   - `ADMIN_PASSWORD`
   - `ADMIN_JWT_SECRET`
   - `REDIS_URL` (full `redis://...` string from Redis Cloud or your provider)
2. Redeploy project.
3. Repeat sections 4-7 on production domain:
   - [https://stepslab.vercel.app](https://stepslab.vercel.app)

Expected:

- same behavior as local environment
- dashboard updates are reflected on live site

---

## 9) Troubleshooting

### Problem: `/api/content` returns 500

Possible causes:

- missing or wrong `REDIS_URL`
- Redis host not reachable from your network or Vercel (TLS/port/firewall)
- wrong password in the URL

Fix:

- paste the exact URL from Redis Cloud (include `redis://` or `rediss://` if your host requires TLS)
- re-check env var name is exactly `REDIS_URL`
- restart dev server after updating `.env.local`

### Problem: Login always fails

Possible causes:

- wrong `ADMIN_PASSWORD`
- stale env values

Fix:

- verify `ADMIN_PASSWORD` value
- restart dev server

### Problem: Dashboard saves but frontend not changing

Possible causes:

- save request failing silently
- stale browser cache
- values not mapped in edited sections

Fix:

- check Network tab for `POST /api/content` status
- hard refresh browser
- verify changed fields are in rendered components

---

## 10) Quick Smoke Test (5 minutes)

1. Go to `/admin/dashboard` (expect redirect to login).
2. Login.
3. Change hero title.
4. Save.
5. Open homepage and verify hero title changed.
6. Change footer email.
7. Save and refresh homepage.
8. Verify footer email changed.

If all pass, core system is working.

