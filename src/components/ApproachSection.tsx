'use client'

import { useLocale } from '@/context/LocaleContext'

export default function ApproachSection() {
  const { t } = useLocale()
  const approaches = [
    { number: '01', titleKey: 'approach.1_title', textKey: 'approach.1_text' },
    { number: '02', titleKey: 'approach.2_title', textKey: 'approach.2_text' },
    { number: '03', titleKey: 'approach.3_title', textKey: 'approach.3_text' },
  ]

  return (
    <section className="approach-alt" id="approach">
      <div className="container-custom">
        <div className="approach-alt-header">
          <h2 className="section-title-alt">{t('approach.title')}</h2>
          <p className="section-subtitle">{t('approach.subtitle')}</p>
        </div>
        <div className="approach-alt-grid">
          {approaches.map((approach, index) => (
            <div key={index} className="approach-alt-item">
              <div className="approach-alt-number">{approach.number}</div>
              <h3 className="approach-alt-title">{t(approach.titleKey)}</h3>
              <p className="approach-alt-text">{t(approach.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
