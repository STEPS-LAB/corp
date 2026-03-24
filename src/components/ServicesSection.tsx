'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'

export default function ServicesSection() {
  const { t } = useLocale()
  const { content } = useSiteContent()
  const fallbackServices = [
    { href: '/services/web-development', title: t('services.web_title'), description: t('services.web_text'), price: '' },
    { href: '/services/ai-automation', title: t('services.ai_title'), description: t('services.ai_text'), price: '' },
    { href: '/services/mvp-startups', title: t('services.mvp_title'), description: t('services.mvp_text'), price: '' },
    { href: '/services/support-scaling', title: t('services.support_title'), description: t('services.support_text'), price: '' },
  ]
  const services = content.services.length > 0
    ? content.services.map((service) => ({
        href: `/services/${service.id}`,
        title: service.title,
        description: service.description,
        price: service.price,
      }))
    : fallbackServices

  return (
    <section className="services-alt" id="services">
      <div className="container-custom">
        <h2 className="section-title-alt">{t('services.sectionTitle')}</h2>
        <div className="services-alt-list">
          {services.map((service) => (
            <LocalizedLink
              key={service.href}
              href={service.href}
              className="service-alt-item"
            >
              <div className="service-alt-header">
                <h3 className="service-alt-title">{service.title}</h3>
                <span className="service-alt-arrow">→</span>
              </div>
              <p className="service-alt-text">{service.description}</p>
              {service.price ? <p className="mt-2 text-xs uppercase tracking-[0.16em] text-accent">{service.price}</p> : null}
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  )
}
