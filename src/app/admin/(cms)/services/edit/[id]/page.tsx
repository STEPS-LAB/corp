import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/kv'
import { ServiceWorkspace } from '@/components/admin/ServiceWorkspace'

export default async function AdminServiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await getServiceById(decodeURIComponent(id))
  if (!row) notFound()
  return <ServiceWorkspace initialService={row} />
}
