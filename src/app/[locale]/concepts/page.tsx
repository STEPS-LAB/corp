import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import ConceptsSection from '@/components/ConceptsSection'
import { pickLang } from '@/lib/cms-types'
import { getAlternateLanguages } from '@/lib/hreflang'
import { SITE_URL } from '@/lib/constants'
import { getFullCmsPayload } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en' && locale !== 'uk') return {}

  const payload = await getFullCmsPayload()
  return {
    title: pickLang(payload.labIndex.seo.metaTitle, locale),
    description: pickLang(payload.labIndex.seo.metaDescription, locale),
    alternates: {
      canonical: `/${locale}/concepts`,
      languages: (await getAlternateLanguages('/concepts')).languages,
    },
    openGraph: {
      title: pickLang(payload.labIndex.seo.metaTitle, locale),
      description: pickLang(payload.labIndex.seo.metaDescription, locale),
      url: `${SITE_URL}/${locale}/concepts`,
    },
  }
}

export default async function ConceptsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale !== 'en' && locale !== 'uk') {
    notFound()
  }

  const payload = await getFullCmsPayload()
  const p = payload.labIndex

  return (
    <>
      <section className="site-hero min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {pickLang(p.badge, locale)}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{pickLang(p.heroTitleLine1, locale)}</span>
              <span className="hero-alt-title-line">{pickLang(p.heroTitleLine2, locale)}</span>
            </h1>
            <p className="hero-alt-description">{pickLang(p.heroDescription, locale)}</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <ConceptsSection variant="page" />
    </>
  )
}
