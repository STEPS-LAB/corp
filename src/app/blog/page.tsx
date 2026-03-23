import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return {
    title:
      locale === 'uk'
        ? 'Блог STEPS LAB | AI-розробка та продуктивність Next.js'
        : 'STEPS LAB Blog | AI-supported development and Next.js performance',
    description:
      locale === 'uk'
        ? 'Матеріали про AI-supported development, архітектуру Next.js і практики преміальної веб-розробки.'
        : 'Insights on AI-supported development, Next.js architecture, and premium website delivery practices.',
    alternates: { languages: (await getAlternateLanguages('/blog')).languages },
  }
}

export default async function BlogPage() {
  const locale = await getServerLocale()
  const copy =
    locale === 'uk'
      ? {
          title: 'Блог STEPS LAB',
          text: 'Скоро тут зʼявляться практичні матеріали про AI-supported development, Next.js performance optimization, custom admin panels та системну веб-архітектуру.',
        }
      : {
          title: 'STEPS LAB Blog',
          text: 'This section will soon publish practical articles on AI-supported development, Next.js performance optimization, custom admin panels, and scalable web architecture.',
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
                { name: locale === 'uk' ? 'Блог' : 'Blog', path: '/blog' },
              ]),
            ],
          }}
        />
        <Breadcrumbs
          items={[
            { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
            { name: locale === 'uk' ? 'Блог' : 'Blog', path: '/blog' },
          ]}
        />
        <p className="text-accent text-sm uppercase tracking-wide mb-4">SEO Content Hub</p>
        <h1 className="text-4xl md:text-6xl font-manrope font-semibold text-text-dark mb-6">{copy.title}</h1>
        <p className="text-lg text-text-dark/70 leading-relaxed">{copy.text}</p>
      </div>
    </section>
  )
}
