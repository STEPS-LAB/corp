import { getSiteHeaderKv } from '@/lib/kv'
import { CmsSiteHeaderClient } from '@/components/admin/CmsSiteHeaderClient'

export default async function AdminGlobalHeaderPage() {
  const initial = await getSiteHeaderKv()
  return <CmsSiteHeaderClient initial={initial} />
}
