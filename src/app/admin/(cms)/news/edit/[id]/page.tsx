import { notFound } from 'next/navigation'
import { getNewsById } from '@/lib/kv'
import { NewsWorkspace } from '@/components/admin/NewsWorkspace'

export default async function AdminNewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await getNewsById(decodeURIComponent(id))
  if (!row) notFound()
  return <NewsWorkspace initialNews={row} />
}
