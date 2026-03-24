import { NextResponse } from 'next/server'
import { getFullCmsPayload } from '@/lib/kv'

export async function GET() {
  try {
    const data = await getFullCmsPayload()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load CMS payload', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}
