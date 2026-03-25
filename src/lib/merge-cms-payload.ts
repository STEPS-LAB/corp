import { defaultCmsPayload, type PublicCmsPayload } from '@/lib/cms-types'

/** Normalizes API / RSC payload into a full `PublicCmsPayload` without dropping empty CMS arrays. */
export function mergePayloadPatch(server: unknown): PublicCmsPayload {
  const d = defaultCmsPayload()
  if (!server || typeof server !== 'object') return d
  const s = server as Partial<PublicCmsPayload>
  return {
    pages: s.pages ?? d.pages,
    services: Array.isArray(s.services) ? s.services : d.services,
    cases: Array.isArray(s.cases) ? s.cases : d.cases,
    concepts: Array.isArray(s.concepts) ? s.concepts : d.concepts,
    news: Array.isArray(s.news) ? s.news : d.news,
    portfolioIndex: s.portfolioIndex ?? d.portfolioIndex,
    servicesIndex: s.servicesIndex ?? d.servicesIndex,
    labIndex: s.labIndex ?? d.labIndex,
    newsIndex: s.newsIndex ?? d.newsIndex,
    siteHeader: s.siteHeader ?? d.siteHeader,
    siteFooter: s.siteFooter ?? d.siteFooter,
    approachPage: s.approachPage ?? d.approachPage,
  }
}
