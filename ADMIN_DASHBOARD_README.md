# Admin & CMS — Quick verification

**Primary setup and env reference:** see the **Headless CMS setup** section in [README.md](README.md).

## Quick checks

1. **`/admin/login`** → after login, **`/admin`** (CMS tabs).
2. **`GET /api/content`** → JSON with `pages`, `services`, `cases`, `concepts`.
3. **`POST /api/upload`** → requires admin cookie; returns `{ url }` for Blob storage.

## Legacy note

Older docs referred to **`/admin/dashboard`**. That path now **redirects to `/admin`**.

## Troubleshooting

- **Storage not configured**: reads use defaults; CMS **Save** / **Seed** need **`REDIS_URL`** (TCP, e.g. Redis Cloud) **or** `KV_REST_API_URL` + `KV_REST_API_TOKEN`. If both are set, **`REDIS_URL` wins**.
- **Production password fails**: set `ADMIN_PASSWORD` (and `ADMIN_JWT_SECRET`) in Vercel **Project → Settings → Environment Variables**, then redeploy — not only in `.env.local`.
- **Locale URLs**: use `/en` and `/uk` for the marketing site; `/admin` has no locale prefix.
