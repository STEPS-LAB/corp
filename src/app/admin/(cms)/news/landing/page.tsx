import { COLLECTION_PAGE_SLUGS } from '@/lib/cms-granular-keys'
import { DEFAULT_NEWS_INDEX } from '@/lib/cms-types'
import { getCollectionLandingPageKv } from '@/lib/kv'
import { CollectionLandingForm } from '@/components/admin/CollectionLandingForm'

export default async function AdminNewsLandingPage() {
  const initial = await getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.newsIndex, DEFAULT_NEWS_INDEX)
  return (
    <CollectionLandingForm
      slug={COLLECTION_PAGE_SLUGS.newsIndex}
      initial={initial}
      listHref="/en/news"
      breadcrumbs={[
        { label: 'News', href: '/admin/news' },
        { label: 'News landing page' },
      ]}
    />
  )
}
