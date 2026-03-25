import { getPagesFromKv } from '@/lib/kv'
import { CmsMediaClient } from '@/components/admin/CmsMediaClient'

export default async function AdminMediaPage() {
  const pages = await getPagesFromKv()
  return <CmsMediaClient initialPages={pages} />
}
