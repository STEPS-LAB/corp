import { put, BlobError } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminCookieName, verifyAdminToken } from '@/lib/admin-auth'

export const runtime = 'nodejs'

const MAX_BYTES = 4 * 1024 * 1024

function readBlobToken(): string | undefined {
  const raw = process.env.BLOB_READ_WRITE_TOKEN
  if (raw == null || raw === '') return undefined
  const s = String(raw).replace(/\r/g, '').trim()
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1).trim() || undefined
  }
  return s.length > 0 ? s : undefined
}

function isProbablyImage(file: File): boolean {
  if (file.type.startsWith('image/')) return true
  // Some mobile exports omit or misreport MIME type
  const n = file.name.toLowerCase()
  return /\.(jpe?g|png|gif|webp|avif|heic|heif|bmp|svg)$/i.test(n)
}

export async function POST(request: Request) {
  const sessionCookie = cookies().get(getAdminCookieName())?.value
  const authorized = await verifyAdminToken(sessionCookie)
  if (!authorized) {
    return NextResponse.json(
      { error: 'Unauthorized — sign in again at /admin/login (session cookie must be sent with the upload).' },
      { status: 401 }
    )
  }

  const blobToken = readBlobToken()
  if (!blobToken) {
    return NextResponse.json(
      {
        error:
          'Blob storage is not configured: BLOB_READ_WRITE_TOKEN is missing or empty on the server. In Vercel: Project → Settings → Environment Variables → add the Blob read/write token for Production (and Preview if you use it), then Redeploy.',
      },
      { status: 503 }
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  if (!isProbablyImage(file)) {
    return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 4MB)' }, { status: 400 })
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, '_') || 'upload'
  const path = `cms/${Date.now()}-${safeName}`

  try {
    const blob = await put(path, file, {
      access: 'public',
      addRandomSuffix: true,
      token: blobToken,
    })
    return NextResponse.json({ url: blob.url })
  } catch (e) {
    console.error('[upload]', e)
    if (e instanceof BlobError) {
      const msg = e.message || 'Blob request failed'
      const hint =
        /token|access|denied|unauthorized/i.test(msg)
          ? ' Check that BLOB_READ_WRITE_TOKEN is the store’s Read/Write token and matches this Vercel project; redeploy after changing env vars.'
          : ''
      return NextResponse.json({ error: `${msg}${hint}` }, { status: 502 })
    }
    return NextResponse.json(
      { error: 'Upload failed (unexpected server error). Check Vercel function logs.' },
      { status: 500 }
    )
  }
}
