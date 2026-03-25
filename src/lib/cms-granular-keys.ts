/** Redis / KV key helpers for granular CMS storage. */
export type CmsCollection = 'cases' | 'services' | 'concepts'

export const GRANULAR = {
  index: (c: CmsCollection) => `index:${c}`,
  item: (c: CmsCollection, id: string) => `item:${c}:${id}`,
  /** Wrapper content for listing routes, e.g. `page:portfolio-index`. */
  page: (slug: string) => `page:${slug}`,
} as const

export const COLLECTION_PAGE_SLUGS = {
  portfolioIndex: 'portfolio-index',
  servicesIndex: 'services-index',
  labIndex: 'lab-index',
} as const
