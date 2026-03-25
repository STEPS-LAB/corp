import { COLLECTION_PAGE_SLUGS } from '@/lib/cms-granular-keys'
import { DEFAULT_LAB_INDEX } from '@/lib/cms-types'
import { getCollectionLandingPageKv } from '@/lib/kv'
import { CollectionLandingForm } from '@/components/admin/CollectionLandingForm'

export default async function AdminLabLandingPage() {
  const initial = await getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.labIndex, DEFAULT_LAB_INDEX)
  return (
    <CollectionLandingForm
      slug={COLLECTION_PAGE_SLUGS.labIndex}
      initial={initial}
      listHref="/en/concepts"
      breadcrumbs={[
        { label: 'Lab', href: '/admin/lab' },
        { label: 'Lab landing page' },
      ]}
    />
  )
}
