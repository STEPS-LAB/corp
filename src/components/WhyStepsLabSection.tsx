'use client'

import { useLocale } from '@/context/LocaleContext'

export default function WhyStepsLabSection() {
  const { t } = useLocale()
  const items = [
    { label: '01', textKey: 'why.1' },
    { label: '02', textKey: 'why.2' },
    { label: '03', textKey: 'why.3' },
    { label: '04', textKey: 'why.4' },
  ]

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
        <h2 className="section-title-alt">{t('why.title')}</h2>
        <div className="why-steps-lab-alt-content">
          <div className="why-steps-lab-alt-list">
            {items.map((item, index) => (
              <div key={index} className="why-steps-lab-alt-item">
                <div className="why-steps-lab-alt-label">{item.label}</div>
                <div className="why-steps-lab-alt-text">{t(item.textKey)}</div>
              </div>
            ))}
          </div>
          <div className="why-steps-lab-alt-quote">
            <p className="whitespace-pre-line">{t('why.quote')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
