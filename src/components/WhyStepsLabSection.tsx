'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'

export default function WhyStepsLabSection() {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const hw = payload.pages.homeWhy
  const title = hw?.title ?? { en: '', uk: '' }
  const bullets = hw?.bullets?.length ? hw.bullets : DEFAULT_PAGES_CONTENT.homeWhy.bullets
  const quote = hw?.quote ?? { en: '', uk: '' }
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
        <h2 className="section-title-alt">{pickLang(title, locale)}</h2>
        <div className="why-steps-lab-alt-content">
          <div className="why-steps-lab-alt-list">
            {bullets.map((b, index) => (
              <div key={index} className="why-steps-lab-alt-item">
                <div className="why-steps-lab-alt-label">{labels[index] ?? String(index + 1)}</div>
                <div className="why-steps-lab-alt-text">{pickLang(b, locale)}</div>
              </div>
            ))}
          </div>
          <div className="why-steps-lab-alt-quote">
            <p className="whitespace-pre-line">{pickLang(quote, locale)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
