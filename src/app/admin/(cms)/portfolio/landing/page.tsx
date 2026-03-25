import { COLLECTION_PAGE_SLUGS } from '@/lib/cms-granular-keys'
import { DEFAULT_PORTFOLIO_INDEX } from '@/lib/cms-types'
import { getCollectionLandingPageKv } from '@/lib/kv'
import { CollectionLandingForm } from '@/components/admin/CollectionLandingForm'

export default async function AdminPortfolioLandingPage() {
  const initial = await getCollectionLandingPageKv(
    COLLECTION_PAGE_SLUGS.portfolioIndex,
    DEFAULT_PORTFOLIO_INDEX
  )
  return (
    <CollectionLandingForm
      slug={COLLECTION_PAGE_SLUGS.portfolioIndex}
      initial={initial}
      listHref="/en/cases"
      breadcrumbs={[
        { label: 'Portfolio', href: '/admin/portfolio' },
        { label: 'Portfolio landing page' },
      ]}
    />
  )
}
