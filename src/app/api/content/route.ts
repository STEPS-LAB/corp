import { NextResponse } from 'next/server'
import { getFullCmsPayload } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getFullCmsPayload()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Failed to load CMS payload', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}
