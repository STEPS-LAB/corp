import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'
import { pickLang } from '@/lib/cms-types'
import { getFullCmsPayload } from '@/lib/kv'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const payload = await getFullCmsPayload()
  const m = {
    metaTitle: pickLang(payload.portfolioIndex.seo.metaTitle, locale),
    metaDescription: pickLang(payload.portfolioIndex.seo.metaDescription, locale),
  }
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/cases')).languages },
  }
}

export default async function CasesPage() {
  const locale = await getServerLocale()
  const copy =
    locale === 'uk'
      ? {
          title: 'Кейси та концепти',
          intro:
            'Добірка проєктів STEPS LAB із фокусом на конверсію, стабільність і вимірювану продуктивність. Кожен кейс містить метрики, які можна перевірити.',
          projects: [
            { name: 'Corporate Platform', metric: 'PageSpeed: 96 Mobile / 100 Desktop', scope: 'CRM + lead automation' },
            { name: 'SaaS MVP', metric: 'PageSpeed: 94 Mobile / 100 Desktop', scope: 'Fast GTM in 8 weeks' },
            { name: 'E-commerce Rebuild', metric: 'PageSpeed: 98 Mobile / 100 Desktop', scope: 'Checkout + catalog optimization' },
          ],
        }
      : {
          title: 'Cases and Concepts',
          intro:
            'A selected portfolio of STEPS LAB projects focused on conversion, reliability, and measurable performance outcomes. Every project includes clear performance indicators.',
          projects: [
            { name: 'Corporate Platform', metric: 'PageSpeed: 96 Mobile / 100 Desktop', scope: 'CRM + lead automation' },
            { name: 'SaaS MVP', metric: 'PageSpeed: 94 Mobile / 100 Desktop', scope: 'Fast GTM in 8 weeks' },
            { name: 'E-commerce Rebuild', metric: 'PageSpeed: 98 Mobile / 100 Desktop', scope: 'Checkout + catalog optimization' },
          ],
        }

  return (
    <section className="bg-bg-light min-h-screen py-32">
      <div className="container-custom max-w-6xl">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              getBreadcrumbSchema([
                { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
                { name: locale === 'uk' ? 'Кейси' : 'Cases', path: '/cases' },
              ]),
            ],
          }}
        />
        <Breadcrumbs
          items={[
            { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
            { name: locale === 'uk' ? 'Кейси' : 'Cases', path: '/cases' },
          ]}
        />
        <p className="text-accent text-sm uppercase tracking-wide mb-4">Cases</p>
        <h1 className="text-4xl md:text-6xl font-manrope font-semibold text-text-dark tracking-tight mb-6">
          {copy.title}
        </h1>
        <p className="text-lg text-text-dark/75 leading-relaxed max-w-4xl mb-12">{copy.intro}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {copy.projects.map((project) => (
            <article key={project.name} className="rounded-2xl border border-black/10 bg-white p-6">
              <h2 className="text-2xl font-manrope font-semibold text-text-dark mb-3">{project.name}</h2>
              <p className="text-text-dark/75 mb-4">{project.scope}</p>
              <span className="inline-block rounded-full bg-accent/10 text-accent px-4 py-2 text-sm font-semibold">
                {project.metric}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
