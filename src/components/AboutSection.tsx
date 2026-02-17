'use client'

import { useLocale } from '@/context/LocaleContext'

export default function AboutSection() {
  const { t } = useLocale()
  return (
    <section className="about-alt" id="about">
      <div className="container-custom">
        <div className="about-alt-content">
          <h2 className="section-title-alt">{t('about.title')}</h2>
          <p className="about-alt-text whitespace-pre-line">
            {t('about.text')}
          </p>
        </div>
      </div>
    </section>
  )
}
