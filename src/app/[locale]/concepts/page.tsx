import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import LocalizedLink from '@/components/LocalizedLink'
import { getConcepts, getConceptTexts } from '@/lib/concepts'
import { getAlternateLanguages } from '@/lib/hreflang'
import { SITE_URL } from '@/lib/constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en' && locale !== 'uk') return {}

  const copy = getConceptTexts(locale)
  return {
    title: copy.listTitle1,
    description: copy.listDescription,
    alternates: {
      canonical: `/${locale}/concepts`,
      languages: (await getAlternateLanguages('/concepts')).languages,
    },
    openGraph: {
      title: copy.listTitle1,
      description: copy.listDescription,
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

  const concepts = getConcepts(locale)
  const copy = getConceptTexts(locale)

  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {copy.listBadge}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{copy.listTitle1}</span>
              <span className="hero-alt-title-line">{copy.listTitle2}</span>
            </h1>
            <p className="hero-alt-description">{copy.listDescription}</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="services-alt">
        <div className="container-custom">
          <h2 className="section-title-alt">{copy.heading}</h2>
          <div className="services-alt-list">
            {concepts.map((concept) => (
              <LocalizedLink key={concept.slug} href={`/concepts/${concept.slug}`} className="service-alt-item">
                <div className="service-alt-header">
                  <h3 className="service-alt-title">{concept.title}</h3>
                  <span className="service-alt-arrow">→</span>
                </div>
                <p className="service-alt-text">{concept.shortDescription}</p>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
