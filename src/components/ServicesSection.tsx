'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'
import LocalizedLink from '@/components/LocalizedLink'
import type { ServiceCMS } from '@/lib/cms-types'
import { useLoadMoreList } from '@/hooks/useLoadMoreList'

type ServicesSectionProps = {
  variant?: 'home' | 'page'
}

export default function ServicesSection({ variant = 'home' }: ServicesSectionProps) {
  const { locale, t } = useLocale()
  const { payload } = useSiteContent()

  const publishedServices = payload.services.filter((s) => s.status === 'published')

  const servicesForPage =
    variant === 'page' && payload.servicesIndex?.featuredIds?.length
      ? payload.servicesIndex.featuredIds
          .map((id) => publishedServices.find((s) => s.id === id))
          .filter((s): s is ServiceCMS => Boolean(s))
      : []

  const ordered = publishedServices.slice().sort((a, b) => a.order - b.order)

  const services = variant === 'page' && servicesForPage.length ? servicesForPage : ordered
  const { visible, hasMore, loadMore } = useLoadMoreList(services)

  const sectionTitle =
    variant === 'page' && payload.servicesIndex
      ? pickLang(payload.servicesIndex.sectionTitle, locale)
      : pickLang(
          payload.pages.labels?.servicesSectionTitle ?? DEFAULT_PAGES_CONTENT.labels.servicesSectionTitle,
          locale
        )

  const mapped = visible.map((s) => ({
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
          {mapped.map((service) => (
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
        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={loadMore} className="btn btn-secondary">
              {t('common.loadMore')}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
