'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'
import { pickLang, type ConceptCMS } from '@/lib/cms-types'
import { useLoadMoreList } from '@/hooks/useLoadMoreList'

type ConceptsSectionProps = {
  variant?: 'home' | 'page'
}

function sortConceptsByLatest(items: ConceptCMS[]): ConceptCMS[] {
  return [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export default function ConceptsSection({ variant = 'home' }: ConceptsSectionProps) {
  const { locale, t } = useLocale()
  const { payload } = useSiteContent()
  const publishedConcepts = payload.concepts.filter((c) => c.status === 'published')
  const sorted = sortConceptsByLatest(publishedConcepts)

  const featured =
    variant === 'page' && payload.labIndex?.featuredIds?.length
      ? payload.labIndex.featuredIds
          .map((id) => publishedConcepts.find((c) => c.id === id))
          .filter((c): c is ConceptCMS => Boolean(c))
      : []

  const concepts = variant === 'page' && featured.length ? featured : sorted
  const { visible, hasMore, loadMore } = useLoadMoreList(concepts)

  const heading =
    variant === 'page' ? pickLang(payload.labIndex.sectionTitle, locale) : pickLang(payload.pages.labels.conceptsHeading, locale)
  const viewAll = pickLang(payload.pages.labels.conceptsViewAll, locale)

  return (
    <section className="services-alt" id="concepts">
      <div className="container-custom">
        <h2 className="section-title-alt">{heading}</h2>
        <div className="services-alt-list">
          {visible.map((concept) => (
            <LocalizedLink key={concept.id} href={`/concepts/${concept.slug}`} className="service-alt-item">
              <div className="service-alt-header">
                <h3 className="service-alt-title">{pickLang(concept.title, locale)}</h3>
                <span className="service-alt-arrow">→</span>
              </div>
              <p className="service-alt-text">{pickLang(concept.shortDescription, locale)}</p>
            </LocalizedLink>
          ))}
        </div>
        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={loadMore} className="btn btn-secondary">
              {t('common.loadMore')}
            </button>
          </div>
        ) : null}
        {variant === 'home' ? (
          <div className="mt-10">
            <LocalizedLink href="/concepts" className="btn btn-secondary" aria-label="View all concepts">
              {viewAll}
            </LocalizedLink>
          </div>
        ) : null}
      </div>
    </section>
  )
}
