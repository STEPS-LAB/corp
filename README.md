# STEPS LAB

AI-first digital studio that creates clear, effective digital products. We combine engineering thinking with modern tools to build systems that work — logic, speed, result.

## Technology Stack

- **Next.js 14** — React framework with App Router
- **React 18** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Redis** (`redis` + `REDIS_URL`) **or** **Vercel KV REST** (`@vercel/kv`) — same JSON keys: `content:pages`, `content:services`, `content:cases`, `content:concepts`
- **Vercel Blob** (`@vercel/blob`) — image uploads from `/admin`
- **jose** — Admin session JWT (HTTP-only cookie)
- **lucide-react** — Admin UI icons

---

## Production on Vercel — step-by-step

This guide is **only for running the site and CMS in production on Vercel**. It assumes your code is already in a Git repository (GitHub, GitLab, or Bitbucket) that Vercel can access.

### Where things live in the Vercel dashboard

| What you need | Where to click |
| ------------- | -------------- |
| Import repo / see deployments | [vercel.com](https://vercel.com) → **Dashboard** → your **project** |
| **Environment variables** | Project → top bar **Settings** → left sidebar **Environment Variables** |
| **Redeploy** after changing env | Project → **Deployments** → **⋯** on the latest deployment → **Redeploy** (or push a new commit) |
| **Blob** (file uploads) | Project → **Storage** tab **or** team **Storage**; or **Integrations** → search **Blob** |
| **Redis / KV** (optional Vercel-managed) | Project → **Storage** → **Create Database** / connect **Redis** (or **Integrations** → **Upstash Redis**) |

---

### Step 1 — Connect the project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New…** → **Project**.
3. **Import** your Git repository (authorize GitHub/GitLab/Bitbucket if asked).
4. Vercel detects **Next.js** — leave defaults unless you use a monorepo (then set **Root Directory**).
5. **Do not click Deploy yet** if you want fewer failed first deploys — it is easier to add **Blob** and **environment variables** first (Steps 2–4), then deploy. If you already deployed, continue; you will **Redeploy** after env vars are set.

---

### Step 2 — Create Vercel Blob (required for admin image uploads)

1. Open your **project** on Vercel.
2. Open the **Storage** tab (top navigation next to Overview, Deployments, etc.).  
   - If you do not see **Storage**, use the main Vercel dashboard → **Storage** → create a store and **connect** it to this project, **or** go to **Integrations** → search **Vercel Blob** → add to the project.
3. **Create** a Blob store (name it e.g. `steps-lab-blob`).
4. After creation, Vercel usually shows **environment variables** to add. You need **`BLOB_READ_WRITE_TOKEN`** (read/write) for uploads.
5. If the token is not auto-linked: copy the **Read/Write** token from the Blob store UI and add it manually in **Step 4** as `BLOB_READ_WRITE_TOKEN`.

---

### Step 3 — Set up CMS data storage (pick **one** path)

The app stores JSON in Redis under keys `content:pages`, `content:services`, `content:cases`, `content:concepts`. See [`src/lib/kv.ts`](src/lib/kv.ts).

#### Path A — You already have a **Redis URL** (e.g. Redis Cloud)

1. In your Redis provider (e.g. [Redis Cloud](https://redis.io/cloud/)), open your database and copy the **full connection string** (starts with `redis://` or `rediss://` for TLS).
2. You will add it to Vercel as **`REDIS_URL`** in **Step 4**.  
3. **Do not** set `KV_REST_API_URL` / `KV_REST_API_TOKEN` unless you intentionally want the REST client instead — if **`REDIS_URL` is set, it wins**.

#### Path B — Use **Vercel / Upstash Redis** (REST, no TCP URL)

1. In the project: **Storage** → **Create Database** → choose **Redis** / **Upstash for Redis** (wording may vary).
2. **Connect** the database to **this** Vercel project.
3. Vercel injects **`KV_REST_API_URL`** and **`KV_REST_API_TOKEN`** into the project environment (check **Settings → Environment Variables** after connecting).
4. Leave **`REDIS_URL` empty** on Vercel if you use this path.

**Important:** If **neither** `REDIS_URL` nor both `KV_REST_*` variables exist, the **public site still loads** (built-in defaults), but **Save** and **Seed** in `/admin` will fail until storage is configured.

---

### Step 4 — Add all production environment variables

1. Open your project → **Settings** → **Environment Variables**.
2. For **each** variable below, click **Add New**:
   - **Key** = exact name (case-sensitive).
   - **Value** = your secret or URL.
   - Enable **Production** (and **Preview** only if you want the same CMS on preview URLs).
3. Click **Save**.

| Variable | Required? | What to enter |
| -------- | --------- | ------------- |
| **`REDIS_URL`** | Required if you use Path A (Step 3) | Full `redis://` or `rediss://` string from your Redis host |
| **`KV_REST_API_URL`** | Required if you use Path B only | Provided by Vercel/Upstash after connecting Redis |
| **`KV_REST_API_TOKEN`** | Required if you use Path B only | Provided together with the URL |
| **`BLOB_READ_WRITE_TOKEN`** | **Yes** (for uploads) | From Step 2 (Blob read/write token) |
| **`ADMIN_PASSWORD`** | **Yes** | Strong password for `https://your-domain/admin/login` |
| **`ADMIN_JWT_SECRET`** | **Yes** | Long random string (e.g. 48+ chars) used to sign the admin session cookie — **not** the same as the login password |
| **`RESEND_API_KEY`** | Optional | Only if you use contact forms that send email via Resend |

4. After **every** env change: go to **Deployments** → open the latest deployment menu **(⋯)** → **Redeploy** → enable **Use existing Build Cache** if you want a faster rebuild, or redeploy without cache if something still looks wrong.

**Common mistake:** Setting secrets only on your laptop. **Production uses only variables stored in this Vercel screen**, not files in the repo.

---

### Step 5 — Deploy (or redeploy)

1. If you have not deployed: from the project, trigger **Deploy** (or push to your connected Git **production** branch — usually `main`).
2. Wait until the deployment shows **Ready**.
3. Open the **Visit** / production URL (e.g. `https://your-project.vercel.app` or your custom domain).

---

### Step 6 — First-time CMS setup in production

1. Open **`https://<your-production-domain>/admin/login`** (no `/en` prefix for admin).
2. Log in with **`ADMIN_PASSWORD`**.
3. You should land on **`/admin`**. Click **Seed defaults** once (fills Redis with default JSON **only** if `content:pages` was empty).
4. Edit content in the tabs (**General**, **Services**, **Cases**, **Concepts**, **Media**) and use **Save & publish** when done.
5. Use the **EN / UK** toggle to edit each language’s strings.

**Public site:** Homepage sections and **`GET /api/content`** read from the same storage. After saves, Vercel’s cache is revalidated for main routes; if something looks stale, redeploy or hard-refresh.

---

### Step 7 — Optional: custom domain

1. Project → **Settings** → **Domains**.
2. Add your domain and follow DNS instructions (usually a **CNAME** to `cname.vercel-dns.com` or A records as shown).
3. SSL is issued automatically once DNS propagates.

---

### Step 8 — Quick production checks

| Check | URL / action |
| ----- | ------------ |
| Site home | `https://<domain>/en` or `/uk` |
| CMS | `https://<domain>/admin` |
| Public JSON | `https://<domain>/api/content` (should return `pages`, `services`, `cases`, `concepts`) |
| Login fails but password is correct | Confirm **`ADMIN_PASSWORD`** (and **`ADMIN_JWT_SECRET`**) exist under **Production** in Vercel → **Redeploy** |
| Save / Seed fails | Confirm **`REDIS_URL`** *or* **`KV_REST_*`** pair is set for **Production** → **Redeploy** |
| Upload fails in admin | Confirm **`BLOB_READ_WRITE_TOKEN`** and redeploy |

More troubleshooting: [ADMIN_DASHBOARD_README.md](ADMIN_DASHBOARD_README.md).

### Reference: variable names only (no local `.env`)

A full list of keys also exists in [.env.example](.env.example) for naming reference; **production values must be entered in Vercel**, not committed to Git.

---

## License

© STEPS LAB. All rights reserved. Unauthorized use, sharing, or copying of this code for personal or any other purpose is strictly prohibited.
