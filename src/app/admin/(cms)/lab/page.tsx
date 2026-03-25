import { getConceptsFromKv } from '@/lib/kv'
import { LabListClient } from '@/components/admin/LabListClient'

export default async function AdminLabListPage() {
  const concepts = await getConceptsFromKv()
  return <LabListClient initialConcepts={concepts} />
}
