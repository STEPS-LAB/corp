import { getSiteFooterKv } from '@/lib/kv'
import { CmsSiteFooterClient } from '@/components/admin/CmsSiteFooterClient'

export default async function AdminGlobalFooterPage() {
  const initial = await getSiteFooterKv()
  return <CmsSiteFooterClient initial={initial} />
}
