'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'

export default function ServicesSection() {
  const { t } = useLocale()
  const services = [
    { href: '/services/web-development', titleKey: 'services.web_title', textKey: 'services.web_text' },
    { href: '/services/ai-automation', titleKey: 'services.ai_title', textKey: 'services.ai_text' },
    { href: '/services/mvp-startups', titleKey: 'services.mvp_title', textKey: 'services.mvp_text' },
    { href: '/services/support-scaling', titleKey: 'services.support_title', textKey: 'services.support_text' },
  ]

  return (
    <section className="services-alt" id="services">
      <div className="container-custom">
        <h2 className="section-title-alt">{t('services.sectionTitle')}</h2>
        <div className="services-alt-list">
          {services.map((service, index) => (
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
  )
}
