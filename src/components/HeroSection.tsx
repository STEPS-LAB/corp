'use client'

import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'
import ScrollIndicator from './ScrollIndicator'

export default function HeroSection() {
  const { openModal } = useModal()
  const { t } = useLocale()
  const { content } = useSiteContent()

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
              {content.hero.ctaText || t('hero.cta')}
            </button>
            <LocalizedLink href={content.hero.ctaLink || '/cases'} className="btn-link">
              {t('hero.viewCases')}
            </LocalizedLink>
          </div>
        </div>
        <div className="mt-10 max-w-xl">
          <img
            src={content.hero.heroImageUrl || content.images.hero}
            alt="STEPS LAB hero"
            className="w-full h-auto rounded-2xl border border-white/10"
          />
        </div>
        <div className="hero-alt-stats">
          <div className="stat-item">
            <div className="stat-number">2x</div>
            <div className="stat-label">{t('hero.statFaster')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">AI</div>
            <div className="stat-label">{t('hero.statDev')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">{t('hero.statSupport')}</div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  )
}
