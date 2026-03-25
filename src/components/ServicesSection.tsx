'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'
import LocalizedLink from '@/components/LocalizedLink'

export default function ServicesSection() {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const sectionTitle = pickLang(
    payload.pages.labels?.servicesSectionTitle ?? DEFAULT_PAGES_CONTENT.labels.servicesSectionTitle,
    locale
  )
  const services = payload.services
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      href: s.href.startsWith('/') ? s.href : `/${s.href}`,
      title: pickLang(s.title, locale),
      description: pickLang(s.description, locale),
      price: pickLang(s.price, locale),
    }))

  return (
    <section className="services-alt" id="services">
      <div className="container-custom">
        <h2 className="section-title-alt">{sectionTitle}</h2>
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
