import { redirect } from 'next/navigation'
import { getFullCmsPayload } from '@/lib/kv'
import { AdminCmsDashboard } from '@/components/admin/AdminCmsDashboard'
import { ADMIN_LEGACY_SLUG_REDIRECTS, adminViewFromSlug } from '@/lib/admin-nav'

export default async function AdminCmsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const s0 = slug?.[0]
  if (s0 && ADMIN_LEGACY_SLUG_REDIRECTS[s0]) redirect(ADMIN_LEGACY_SLUG_REDIRECTS[s0])
  const initialView = adminViewFromSlug(slug)
  const initialPayload = await getFullCmsPayload()
  const remountKey = slug?.length ? slug.join('/') : 'dashboard'
  return <AdminCmsDashboard key={remountKey} initialPayload={initialPayload} initialView={initialView} />
}
