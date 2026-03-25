'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_APPROACH_PAGE_CMS, DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'

export default function WhyStepsLabSection({ variant }: { variant?: 'home' | 'approach' }) {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const approach = payload.approachPage

  const isApproach = variant === 'approach'

  const title = isApproach
    ? pickLang(approach.whyTitle, locale)
    : pickLang(payload.pages.homeWhy?.title ?? { en: '', uk: '' }, locale)

  const bullets = isApproach
    ? approach.whyBullets?.length
      ? approach.whyBullets
      : DEFAULT_APPROACH_PAGE_CMS.whyBullets
    : payload.pages.homeWhy?.bullets?.length
      ? payload.pages.homeWhy.bullets
      : DEFAULT_PAGES_CONTENT.homeWhy.bullets

  const quote = isApproach
    ? pickLang(approach.whyQuote, locale)
    : pickLang(payload.pages.homeWhy?.quote ?? { en: '', uk: '' }, locale)

  const whyImageUrl = isApproach ? approach.whyImageUrl?.trim() : ''

  const displayTitle =
    title ||
    (isApproach
      ? pickLang(DEFAULT_APPROACH_PAGE_CMS.whyTitle, locale)
      : pickLang(DEFAULT_PAGES_CONTENT.homeWhy.title, locale))

  const labels = ['01', '02', '03', '04']

  return (
    <section className="why-steps-lab-alt">
      <div className="why-steps-lab-alt-bg">
        <div className="why-steps-lab-alt-gradient why-steps-lab-alt-gradient-1"></div>
        <div className="why-steps-lab-alt-gradient why-steps-lab-alt-gradient-2"></div>
        <div className="why-steps-lab-alt-circle why-steps-lab-alt-circle-1"></div>
        <div className="why-steps-lab-alt-circle why-steps-lab-alt-circle-2"></div>
        <div className="why-steps-lab-alt-dot why-steps-lab-alt-dot-1"></div>
        <div className="why-steps-lab-alt-dot why-steps-lab-alt-dot-2"></div>
        <div className="why-steps-lab-alt-dot why-steps-lab-alt-dot-3"></div>
        <div className="why-steps-lab-alt-grid-pattern"></div>
      </div>
      <div className="container-custom">
        {displayTitle ? <h2 className="section-title-alt">{displayTitle}</h2> : null}
        <div
          className={
            whyImageUrl
              ? 'why-steps-lab-alt-content why-steps-lab-alt-content--with-image'
              : 'why-steps-lab-alt-content'
          }
        >
          <div className="why-steps-lab-alt-list">
            {bullets.map((b, index) => (
              <div key={index} className="why-steps-lab-alt-item">
                <div className="why-steps-lab-alt-label">{labels[index] ?? String(index + 1)}</div>
                <div className="why-steps-lab-alt-text">{pickLang(b, locale)}</div>
              </div>
            ))}
          </div>
          <div className="why-steps-lab-alt-quote-wrap">
            <div className="why-steps-lab-alt-quote">
              <p className="whitespace-pre-line">{quote}</p>
            </div>
            {whyImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={whyImageUrl}
                alt=""
                className="why-steps-lab-alt-image mt-8 w-full max-w-md rounded-2xl border border-white/10 object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
