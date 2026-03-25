import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getBreadcrumbSchema, getServicesSchemaGraph } from '@/lib/schema'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import { pickLang } from '@/lib/cms-types'
import { getFullCmsPayload } from '@/lib/kv'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const payload = await getFullCmsPayload()
  const m = {
    metaTitle: pickLang(payload.servicesIndex.seo.metaTitle, locale),
    metaDescription: pickLang(payload.servicesIndex.seo.metaDescription, locale),
  }
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/services')).languages },
  }
}

export default async function ServicesPage() {
  const locale = await getServerLocale()
  const copy =
    locale === 'uk'
      ? {
          title: 'Послуги STEPS LAB',
          intro:
            'Ми надаємо AI-supported development послуги для бізнесу, який очікує швидкий запуск, стабільну якість і передбачувану продуктивність.',
          cards: [
            {
              title: 'AI-supported development',
              text: 'Керована AI-розробка для прискорення delivery без компромісів у якості, архітектурі та підтримці.',
            },
            {
              title: 'Next.js high-performance apps',
              text: 'Розробляємо premium website development продукти з акцентом на Next.js performance optimization та конверсійний UX.',
            },
            {
              title: 'Custom admin panels',
              text: 'Створюємо custom admin panels під реальні бізнес-процеси: контент, операції, аналітика, ролі та контроль доступу.',
            },
          ],
        }
      : {
          title: 'STEPS LAB Services',
          intro:
            'We deliver AI-supported development services for teams that need faster release cycles, premium quality, and measurable web performance.',
          cards: [
            {
              title: 'AI-supported development',
              text: 'Controlled AI workflows that accelerate implementation while preserving architecture quality and production reliability.',
            },
            {
              title: 'Next.js high-performance apps',
              text: 'Premium website development with deep Next.js performance optimization, conversion-oriented UX, and scalable foundations.',
            },
            {
              title: 'Custom admin panels',
              text: 'Tailored custom admin panels for operations, sales, and content teams with role logic and clean internal workflows.',
            },
          ],
        }

  return (
    <section className="bg-bg-light min-h-screen py-32">
      <div className="container-custom max-w-6xl">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              ...getServicesSchemaGraph(),
              getBreadcrumbSchema([
                { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
                { name: locale === 'uk' ? 'Послуги' : 'Services', path: '/services' },
              ]),
            ],
          }}
        />
        <Breadcrumbs
          items={[
            { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
            { name: locale === 'uk' ? 'Послуги' : 'Services', path: '/services' },
          ]}
        />
        <p className="text-accent text-sm uppercase tracking-wide mb-4">Services</p>
        <h1 className="text-4xl md:text-6xl font-manrope font-semibold text-text-dark tracking-tight mb-6">
          {copy.title}
        </h1>
        <p className="text-lg text-text-dark/75 leading-relaxed max-w-4xl mb-12">{copy.intro}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {copy.cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <h2 className="text-2xl font-manrope font-semibold text-text-dark mb-3">{card.title}</h2>
              <p className="text-text-dark/75 leading-relaxed">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
