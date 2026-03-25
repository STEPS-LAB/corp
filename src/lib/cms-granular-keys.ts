/** Redis / KV key helpers for granular CMS storage. */
export type CmsCollection = 'cases' | 'services' | 'concepts'

export const GRANULAR = {
  index: (c: IndexedCmsCollection) => `index:${c}`,
  item: (c: IndexedCmsCollection, id: string) => `item:${c}:${id}`,
  /** Wrapper content for listing routes, e.g. `page:portfolio-index`. */
  page: (slug: string) => `page:${slug}`,
} as const

export const COLLECTION_PAGE_SLUGS = {
  portfolioIndex: 'portfolio-index',
  servicesIndex: 'services-index',
  labIndex: 'lab-index',
  newsIndex: 'news-index',
} as const

/** Indexed collections stored as `index:*` / `item:*:{id}` (includes news). */
export type IndexedCmsCollection = CmsCollection | 'news'

/** Site-wide chrome + static route blobs (Redis JSON). */
export const CMS_GLOBAL_KEYS = {
  header: 'global:header',
  footer: 'global:footer',
  approach: 'page:approach',
} as const
