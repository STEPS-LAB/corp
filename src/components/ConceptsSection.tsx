'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'
import { pickLang } from '@/lib/cms-types'
import type { ConceptCMS } from '@/lib/cms-types'

function sortLatestThreeConcepts(items: ConceptCMS[]): ConceptCMS[] {
  return [...items]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)
}

export default function ConceptsSection() {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const concepts = sortLatestThreeConcepts(payload.concepts)
  const heading = pickLang(payload.pages.labels.conceptsHeading, locale)
  const viewAll = pickLang(payload.pages.labels.conceptsViewAll, locale)

  return (
    <section className="services-alt" id="concepts">
      <div className="container-custom">
        <h2 className="section-title-alt">{heading}</h2>
        <div className="services-alt-list">
          {concepts.map((concept) => (
            <LocalizedLink key={concept.id} href={`/concepts/${concept.slug}`} className="service-alt-item">
              <div className="service-alt-header">
                <h3 className="service-alt-title">{pickLang(concept.title, locale)}</h3>
                <span className="service-alt-arrow">→</span>
              </div>
              <p className="service-alt-text">{pickLang(concept.shortDescription, locale)}</p>
            </LocalizedLink>
          ))}
        </div>
        <div className="mt-10">
          <LocalizedLink href="/concepts" className="btn btn-secondary" aria-label="View all concepts">
            {viewAll}
          </LocalizedLink>
        </div>
      </div>
    </section>
  )
}
