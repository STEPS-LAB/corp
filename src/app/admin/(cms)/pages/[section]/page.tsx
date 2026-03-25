import { notFound } from 'next/navigation'
import { getPagesFromKv } from '@/lib/kv'
import { CmsStaticSectionClient } from '@/components/admin/CmsStaticSectionClient'

const SECTIONS = new Set(['home', 'about', 'contacts', 'footer'])

export default async function AdminStaticPageSection({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  if (!SECTIONS.has(section)) notFound()
  const pages = await getPagesFromKv()
  return <CmsStaticSectionClient section={section as 'home' | 'about' | 'contacts' | 'footer'} initialPages={pages} />
}
