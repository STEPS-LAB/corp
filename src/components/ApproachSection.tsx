'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { pickLang } from '@/lib/cms-types'

export default function ApproachSection() {
  const { t, locale } = useLocale()
  const { payload } = useSiteContent()
  const p = payload.approachPage

  const sectionTitle = pickLang(p.sectionTitle, locale) || t('approach.title')
  const sectionSubtitle = pickLang(p.sectionSubtitle, locale) || t('approach.subtitle')

  const steps =
    p.steps?.length > 0
      ? p.steps.map((s) => ({
          number: s.number,
          title: pickLang(s.title, locale),
          text: pickLang(s.text, locale),
        }))
      : [
          { number: '01', title: t('approach.1_title'), text: t('approach.1_text') },
          { number: '02', title: t('approach.2_title'), text: t('approach.2_text') },
          { number: '03', title: t('approach.3_title'), text: t('approach.3_text') },
        ]

  return (
    <section className="approach-alt" id="approach">
      <div className="container-custom">
        <div className="approach-alt-header">
          <h2 className="section-title-alt">{sectionTitle}</h2>
          <p className="section-subtitle">{sectionSubtitle}</p>
        </div>
        <div className="approach-alt-grid">
          {steps.map((approach, index) => (
            <div key={index} className="approach-alt-item">
              <div className="approach-alt-number">{approach.number}</div>
              <h3 className="approach-alt-title">{approach.title}</h3>
              <p className="approach-alt-text">{approach.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
