import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'
import TechStack from '@/components/sections/TechStack'
import Link from 'next/link'
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
  const copy = (messages[locale] as {
    aboutPage: {
      heroBadge: string
      heroTitle: string
      heroSubtitle: string
      philosophyTitle: string
      philosophyText: string
      customFocusTitle: string
      customFocusText: string
      conceptsTitle: string
      conceptsCta: string
    }
  }).aboutPage
  const conceptsHref = `/${locale}/concepts`

  return (
    <>
      <section className="bg-slate-50 min-h-screen py-24 md:py-32">
        <div className="container-custom max-w-6xl">
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

          <div className="mb-20">
            <p className="text-accent text-sm tracking-wide mb-4 uppercase">{copy.heroBadge}</p>
            <h1 className="text-4xl md:text-6xl lg:text-[72px] font-manrope font-semibold text-slate-900 tracking-[-2px] leading-[1.05] mb-6">
              {copy.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-5xl">{copy.heroSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-6 p-8 md:p-10 rounded-2xl border border-slate-200 bg-white">
              <h2 className="text-3xl md:text-4xl font-manrope font-semibold text-slate-900 tracking-[-1px] mb-5">
                {copy.philosophyTitle}
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">{copy.philosophyText}</p>
            </div>

            <div className="lg:col-span-6 p-8 md:p-10 rounded-2xl border border-slate-200 bg-white">
              <h2 className="text-3xl md:text-4xl font-manrope font-semibold text-slate-900 tracking-[-1px] mb-5">
                {copy.customFocusTitle}
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">{copy.customFocusText}</p>
            </div>
          </div>
        </div>
      </section>

      <TechStack variant="light" />

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-manrope font-semibold text-slate-900 tracking-[-0.8px]">
              {copy.conceptsTitle}
            </h2>
            <Link href={conceptsHref} className="btn btn-primary" aria-label="View concepts by STEPS LAB">
              {copy.conceptsCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
