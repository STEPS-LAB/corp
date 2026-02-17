'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

const serviceKeys = [
  { href: '/services/web-development', titleKey: 'services.web_title', textKey: 'services.web_text' },
  { href: '/services/ai-automation', titleKey: 'services.ai_title', textKey: 'services.ai_text' },
  { href: '/services/mvp-startups', titleKey: 'services.mvp_title', textKey: 'services.mvp_text' },
  { href: '/services/support-scaling', titleKey: 'services.support_title', textKey: 'services.support_text' },
] as const

export default function ServicesPageContent() {
  const { t } = useLocale()
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {t('pages.services.badge')}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{t('pages.services.title1')}</span>
              <span className="hero-alt-title-line">{t('pages.services.title2')}</span>
            </h1>
            <p className="hero-alt-description">
              {t('pages.services.description')}
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="services-alt">
        <div className="container-custom">
          <h2 className="section-title-alt">{t('pages.services.sectionTitle')}</h2>
          <div className="services-alt-list">
            {serviceKeys.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="service-alt-item"
              >
                <div className="service-alt-header">
                  <h3 className="service-alt-title">{t(service.titleKey)}</h3>
                  <span className="service-alt-arrow">→</span>
                </div>
                <p className="service-alt-text">{t(service.textKey)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
