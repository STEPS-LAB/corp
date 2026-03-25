'use client'

import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { pickLang } from '@/lib/cms-types'
import LocalizedLink from '@/components/LocalizedLink'
import ScrollIndicator from './ScrollIndicator'

export default function HeroSection() {
  const { openModal } = useModal()
  const { locale } = useLocale()
  const { content, payload } = useSiteContent()
  const viewCases = pickLang(payload.pages.hero.viewCasesLabel, locale)
  const stats =
    payload.pages.hero.stats?.length > 0
      ? payload.pages.hero.stats
      : [
          { value: '2x', label: { en: 'Faster', uk: 'Швидше' } },
          { value: 'AI', label: { en: 'Development', uk: 'Розробка' } },
          { value: '24/7', label: { en: 'Support', uk: 'Підтримка' } },
        ]

  return (
    <section className="hero-alt">
      <div className="hero-alt-bg">
        <div className="hero-alt-line hero-alt-line-1"></div>
        <div className="hero-alt-line hero-alt-line-2"></div>
        <div className="hero-alt-line hero-alt-line-3"></div>
        <div className="hero-alt-gradient hero-alt-gradient-1"></div>
        <div className="hero-alt-gradient hero-alt-gradient-2"></div>
        <div className="hero-alt-circle hero-alt-circle-1"></div>
        <div className="hero-alt-circle hero-alt-circle-2"></div>
        <div className="hero-alt-circle hero-alt-circle-3"></div>
        <div className="hero-alt-dot hero-alt-dot-1"></div>
        <div className="hero-alt-dot hero-alt-dot-2"></div>
        <div className="hero-alt-dot hero-alt-dot-3"></div>
        <div className="hero-alt-dot hero-alt-dot-4"></div>
        <div className="hero-alt-grid-pattern"></div>
      </div>
      <div className="container-custom">
        <div className="hero-alt-content">
          <h1 className="hero-alt-title">
            <span className="hero-alt-title-line">{content.hero.title}</span>
          </h1>
          <p className="hero-alt-description">
            {content.hero.subtitle}
          </p>
          <div className="hero-alt-cta">
            <button
              onClick={openModal}
              className="btn btn-primary btn-large"
            >
              {content.hero.ctaText}
            </button>
            <LocalizedLink href={content.hero.ctaLink || '/cases'} className="btn-link">
              {viewCases}
            </LocalizedLink>
          </div>
        </div>
        <div className="hero-alt-stats">
          {stats.map((row, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">{row.value}</div>
              <div className="stat-label">{pickLang(row.label, locale)}</div>
            </div>
          ))}
        </div>
      </div>
      <ScrollIndicator />
    </section>
  )
}
