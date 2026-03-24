import { getFullCmsPayload } from '@/lib/kv'
import { AdminCmsDashboard } from '@/components/admin/AdminCmsDashboard'

function tabFromSlug(slug: string[] | undefined): string {
  if (!slug?.length) return 'general'
  return slug[0] ?? 'general'
}

export default async function AdminCmsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const initialTab = tabFromSlug(slug)
  const initialPayload = await getFullCmsPayload()

  return <AdminCmsDashboard initialPayload={initialPayload} initialTab={initialTab} />
}
