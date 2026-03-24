import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminCookieName, verifyAdminToken } from '@/lib/admin-auth'

const MAX_BYTES = 4 * 1024 * 1024

export async function POST(request: Request) {
  const sessionCookie = cookies().get(getAdminCookieName())?.value
  const authorized = await verifyAdminToken(sessionCookie)
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

  if (!file.type.startsWith('image/')) {
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
    })
    return NextResponse.json({ url: blob.url })
  } catch (e) {
    console.error('[upload]', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
