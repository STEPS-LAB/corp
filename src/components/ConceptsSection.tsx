'use client'

import { useLocale } from '@/context/LocaleContext'
import LocalizedLink from '@/components/LocalizedLink'
import { getConcepts, getConceptTexts } from '@/lib/concepts'

export default function ConceptsSection() {
  const { locale } = useLocale()
  const concepts = getConcepts(locale).slice(0, 3)
  const copy = getConceptTexts(locale)

  return (
    <section className="services-alt" id="concepts">
      <div className="container-custom">
        <h2 className="section-title-alt">{copy.heading}</h2>
        <div className="services-alt-list">
          {concepts.map((concept) => (
            <LocalizedLink
              key={concept.slug}
              href={`/concepts/${concept.slug}`}
              className="service-alt-item"
            >
              <div className="service-alt-header">
                <h3 className="service-alt-title">{concept.title}</h3>
                <span className="service-alt-arrow">→</span>
              </div>
              <p className="service-alt-text">{concept.shortDescription}</p>
            </LocalizedLink>
          ))}
        </div>
        <div className="mt-10">
          <LocalizedLink href="/concepts" className="btn btn-secondary" aria-label="View all concepts">
            {copy.viewAll}
          </LocalizedLink>
        </div>
      </div>
    </section>
  )
}
