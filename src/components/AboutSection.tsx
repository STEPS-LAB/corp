'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'

export default function AboutSection() {
  const { t } = useLocale()
  const { content } = useSiteContent()
  return (
    <section className="about-alt" id="about">
      <div className="container-custom">
        <div className="about-alt-content">
          <h2 className="section-title-alt">{t('about.title')}</h2>
          <p className="about-alt-text whitespace-pre-line">
            {[content.aboutTech.workflowDescription, content.aboutTech.teamExperience].filter(Boolean).join('\n\n') || t('about.text')}
          </p>
        </div>
      </div>
    </section>
  )
}
