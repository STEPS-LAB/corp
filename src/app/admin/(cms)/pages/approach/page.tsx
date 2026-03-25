import { getApproachPageKv } from '@/lib/kv'
import { CmsApproachPageClient } from '@/components/admin/CmsApproachPageClient'

export default async function AdminApproachPage() {
  const initial = await getApproachPageKv()
  return <CmsApproachPageClient initial={initial} />
}
