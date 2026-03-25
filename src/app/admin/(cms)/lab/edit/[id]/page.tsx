import { notFound } from 'next/navigation'
import { getConceptById } from '@/lib/kv'
import { ConceptWorkspace } from '@/components/admin/ConceptWorkspace'

export default async function AdminConceptEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await getConceptById(decodeURIComponent(id))
  if (!row) notFound()
  return <ConceptWorkspace initialConcept={row} />
}
