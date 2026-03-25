import { notFound } from 'next/navigation'
import { getCaseById } from '@/lib/kv'
import { CaseWorkspace } from '@/components/admin/CaseWorkspace'

export default async function AdminPortfolioEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await getCaseById(decodeURIComponent(id))
  if (!row) notFound()
  return <CaseWorkspace initialCase={row} />
}
