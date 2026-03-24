'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'
import { pickLang } from '@/lib/cms-types'
import type { CaseCMS } from '@/lib/cms-types'

function sortLatestThreeCases(items: CaseCMS[]): CaseCMS[] {
  return [...items]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)
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

export default function CasesSection() {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const cases = sortLatestThreeCases(payload.cases)
  const sectionTitle = pickLang(payload.pages.labels.casesSectionTitle, locale)
  const viewLabel = pickLang(payload.pages.labels.casesViewCase, locale)

  return (
    <section className="cases-alt" id="cases">
      <div className="container-custom">
        <h2 className="section-title-alt">{sectionTitle}</h2>
      </div>
      <div className="cases-alt-list">
        {cases.map((caseItem) => (
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
    </section>
  )
}
