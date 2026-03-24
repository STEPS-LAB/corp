import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminCookieName, verifyAdminToken } from '@/lib/admin-auth'
import { getSiteContent, setSiteContent } from '@/lib/kv'

export async function GET() {
  try {
    const content = await getSiteContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error('Failed to load site content', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const sessionCookie = cookies().get(getAdminCookieName())?.value
  const isAuthorized = await verifyAdminToken(sessionCookie)

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const updated = await setSiteContent(body)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to save site content', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
