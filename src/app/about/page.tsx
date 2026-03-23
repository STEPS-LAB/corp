import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { pages: { about: { metaTitle: string; metaDescription: string } } }).pages.about
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/about')).languages },
  }
}

export default async function AboutPage() {
  const locale = await getServerLocale()
  const copy =
    locale === 'uk'
      ? {
          title: 'Про STEPS LAB',
          body: [
            'STEPS LAB - новий бренд, сформований командою розробників із 5-6 роками комерційного досвіду в delivery-проєктах.',
            'Наша AI-first філософія означає, що ми використовуємо AI не як заміну команді, а як інструмент прискорення для контрольованої інженерної роботи.',
            'Ми фокусуємося на AI-supported development, premium website development і створенні custom admin panels, які реально впливають на бізнес-метрики.',
          ],
        }
      : {
          title: 'About STEPS LAB',
          body: [
            'STEPS LAB is a new brand built by a powerhouse engineering team with 5-6 years of commercial delivery experience.',
            'Our AI-first philosophy means we use AI as a force multiplier for disciplined engineering, not as a replacement for senior technical judgment.',
            'We focus on AI-supported development, premium website development, and custom admin panels that directly improve business operations.',
          ],
        }

  return (
    <section className="bg-bg-light min-h-screen py-32">
      <div className="container-custom max-w-4xl">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              getBreadcrumbSchema([
                { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
                { name: locale === 'uk' ? 'Про нас' : 'About', path: '/about' },
              ]),
            ],
          }}
        />
        <Breadcrumbs
          items={[
            { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
            { name: locale === 'uk' ? 'Про нас' : 'About', path: '/about' },
          ]}
        />
        <p className="text-accent text-sm uppercase tracking-wide mb-4">About</p>
        <h1 className="text-4xl md:text-6xl font-manrope font-semibold text-text-dark tracking-tight mb-6">
          {copy.title}
        </h1>
        <div className="space-y-5">
          {copy.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg text-text-dark/75 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
