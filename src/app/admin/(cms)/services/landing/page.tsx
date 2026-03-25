import { COLLECTION_PAGE_SLUGS } from '@/lib/cms-granular-keys'
import { DEFAULT_SERVICES_INDEX } from '@/lib/cms-types'
import { getCollectionLandingPageKv } from '@/lib/kv'
import { CollectionLandingForm } from '@/components/admin/CollectionLandingForm'

export default async function AdminServicesLandingPage() {
  const initial = await getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.servicesIndex, DEFAULT_SERVICES_INDEX)
  return (
    <CollectionLandingForm
      slug={COLLECTION_PAGE_SLUGS.servicesIndex}
      initial={initial}
      listHref="/en/services"
      breadcrumbs={[
        { label: 'Services', href: '/admin/services' },
        { label: 'Services landing page' },
      ]}
    />
  )
}
