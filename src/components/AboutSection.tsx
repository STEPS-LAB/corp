'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'

export default function AboutSection() {
  const { locale } = useLocale()
  const { content, payload } = useSiteContent()
  const title = pickLang(
    payload.pages.labels?.aboutSectionTitle ?? DEFAULT_PAGES_CONTENT.labels.aboutSectionTitle,
    locale
  )
  return (
    <section className="about-alt" id="about">
      <div className="container-custom">
        <div className="about-alt-content">
          <h2 className="section-title-alt">{title}</h2>
          <p className="about-alt-text whitespace-pre-line">
            {[content.aboutTech.workflowDescription, content.aboutTech.teamExperience].filter(Boolean).join('\n\n')}
          </p>
        </div>
      </div>
    </section>
  )
}
