import { getNewsFromKv } from '@/lib/kv'
import { NewsListClient } from '@/components/admin/NewsListClient'

export default async function AdminNewsListPage() {
  const news = await getNewsFromKv()
  return <NewsListClient initialNews={news} />
}
