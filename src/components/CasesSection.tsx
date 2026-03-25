'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'
import { pickLang } from '@/lib/cms-types'
import type { CaseCMS } from '@/lib/cms-types'
import { useLoadMoreList } from '@/hooks/useLoadMoreList'

type CasesSectionProps = {
  variant?: 'home' | 'page'
}

function sortCasesByLatest(items: CaseCMS[]): CaseCMS[] {
  return [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

/** Homepage strip uses card preview; fall back to first inner image if set. */
function caseCardImageUrl(c: CaseCMS): string {
  const p = c.previewImageUrl?.trim()
  if (p) return p
  const im = c.detail?.images
  if (!im) return ''
  return (
    im.heroMain?.trim() ||
    im.heroBackground?.trim() ||
    im.screen1?.trim() ||
    ''
  )
}

export default function CasesSection({ variant = 'home' }: CasesSectionProps) {
  const { locale, t } = useLocale()
  const { payload } = useSiteContent()
  const publishedCases = payload.cases.filter((c) => c.status === 'published')
  const sorted = sortCasesByLatest(publishedCases)

  const featured =
    variant === 'page' && payload.portfolioIndex?.featuredIds?.length
      ? payload.portfolioIndex.featuredIds
          .map((id) => publishedCases.find((c) => c.id === id))
          .filter((c): c is CaseCMS => Boolean(c))
      : []

  const cases = variant === 'page' && featured.length ? featured : sorted
  const { visible, hasMore, loadMore } = useLoadMoreList(cases)

  const sectionTitle =
    variant === 'page'
      ? pickLang(payload.portfolioIndex.sectionTitle, locale)
      : pickLang(payload.pages.labels.casesSectionTitle, locale)
  const viewLabel = pickLang(payload.pages.labels.casesViewCase, locale)

  return (
    <section className="cases-alt" id="cases">
      <div className="container-custom">
        <h2 className="section-title-alt">{sectionTitle}</h2>
      </div>
      <div className="cases-alt-list">
        {visible.map((caseItem) => (
          <LocalizedLink key={caseItem.id} href={caseItem.href} className="case-alt-item">
            {caseCardImageUrl(caseItem) ? (
              <div
                className="case-alt-preview"
                style={{
                  backgroundImage: `url(${caseCardImageUrl(caseItem)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ) : (
              <div className="case-alt-preview" />
            )}
            <div className="case-alt-content">
              <h3 className="case-alt-title">{pickLang(caseItem.title, locale)}</h3>
              <p className="case-alt-description">{pickLang(caseItem.description, locale)}</p>
              <p className="case-alt-result">{pickLang(caseItem.result, locale)}</p>
              <span className="case-alt-link">{viewLabel}</span>
            </div>
          </LocalizedLink>
        ))}
      </div>
      {hasMore ? (
        <div className="container-custom mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-text-light transition hover:border-accent/50 hover:text-accent"
          >
            {t('common.loadMore')}
          </button>
        </div>
      ) : null}
    </section>
  )
}
