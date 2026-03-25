import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import LocalizedLink from '@/components/LocalizedLink'
import ConceptConceptLinksCard from '@/components/ConceptConceptLinksCard'
import { getConceptBySlug, getConceptTexts } from '@/lib/concepts'
import { getAlternateLanguages } from '@/lib/hreflang'
import { SITE_URL } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (locale !== 'en' && locale !== 'uk') return {}
  const concept = await getConceptBySlug(locale, slug)
  if (!concept) return {}
  const copy = getConceptTexts(locale)

  return {
    title: `${concept.title} | STEPS LAB`,
    description: concept.shortDescription,
    alternates: {
      canonical: `/${locale}/concepts/${slug}`,
      languages: (await getAlternateLanguages(`/concepts/${slug}`)).languages,
    },
    openGraph: {
      title: `${concept.title} | STEPS LAB`,
      description: copy.listDescription,
      url: `${SITE_URL}/${locale}/concepts/${slug}`,
    },
  }
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (locale !== 'en' && locale !== 'uk') {
    notFound()
  }

  const concept = await getConceptBySlug(locale, slug)
  if (!concept) {
    notFound()
  }

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
              <span className="hero-alt-title-line">{concept.title}</span>
              <span className="hero-alt-title-line">{copy.detailHeroLine2}</span>
            </h1>
            <p className="hero-alt-description">{concept.shortDescription}</p>
            <LocalizedLink
              href="/concepts"
              className="text-sm tracking-wide text-accent mt-8 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10 transition-all duration-500 hover:opacity-100 hover:bg-accent/20 no-underline"
            >
              ← {copy.detailBack}
            </LocalizedLink>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-slate-50 text-slate-900 py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-8 tracking-[-1.5px] font-manrope">{copy.detailCompareTitle}</h2>
              <div className="space-y-8">
                {concept.improvements.map((item) => (
                  <div key={item} className="p-6 rounded-2xl border border-slate-200 bg-white">
                    <p className="text-base leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 font-manrope">{copy.detailTechTitle}</h3>
                <ul className="flex flex-col gap-3 list-none">
                  {concept.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="text-base text-slate-700 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <ConceptConceptLinksCard locale={locale as 'en' | 'uk'} links={concept.conceptLinks} />
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-semibold font-manrope mb-8">{copy.oldVersionTitle}</h3>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <div className="relative aspect-[9/19.5] max-w-[320px] mx-auto rounded-[42px] border border-slate-300/80 bg-slate-200/40 overflow-hidden">
                  <Image
                    src={concept.oldMobileImage}
                    alt={`${concept.title} old mobile version`}
                    fill
                    className="object-cover opacity-35"
                  />
                </div>
                <p className="mt-4 text-slate-500 text-sm">{copy.oldCaptionMobile}</p>
              </div>
              <div>
                <div className="relative aspect-[16/10] rounded-2xl border border-slate-300/80 bg-slate-200/40 overflow-hidden">
                  <Image
                    src={concept.oldDesktopImage}
                    alt={`${concept.title} old desktop version`}
                    fill
                    className="object-cover opacity-35"
                  />
                </div>
                <p className="mt-4 text-slate-500 text-sm">{copy.oldCaptionDesktop}</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-semibold font-manrope mb-8">{copy.newVersionTitle}</h3>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="mockup-shell mockup-shell-phone">
                  <Image src="/concepts/iphone-frame.png" alt="iPhone device mockup" fill className="mockup-frame" />
                  <div className="mockup-screen mockup-screen-phone">
                    <Image
                      src={concept.mobileImage}
                      alt={`${concept.title} new mobile concept screenshot`}
                      fill
                      className="mockup-image"
                    />
                  </div>
                </div>
                <p className="mt-4 text-slate-600 text-sm">{copy.newCaptionMobile}</p>
              </div>
              <div>
                <div className="mockup-shell mockup-shell-phone">
                  <Image src="/concepts/iphone-frame.png" alt="iPhone device mockup" fill className="mockup-frame" />
                  <div className="mockup-screen mockup-screen-phone">
                    <Image
                      src={concept.mobileImage}
                      alt={`${concept.title} new mobile concept screenshot second`}
                      fill
                      className="mockup-image"
                    />
                  </div>
                </div>
                <p className="mt-4 text-slate-600 text-sm">{copy.newCaptionMobile}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mockup-shell mockup-shell-laptop">
                <Image src="/concepts/macbook-frame.png" alt="MacBook device mockup" fill className="mockup-frame" />
                <div className="mockup-screen mockup-screen-laptop">
                  <Image
                    src={concept.desktopImage}
                    alt={`${concept.title} new desktop concept screenshot`}
                    fill
                    className="mockup-image"
                  />
                </div>
              </div>
              <p className="mt-4 text-slate-600 text-sm">{copy.newCaptionDesktop}</p>
            </div>

            <div>
              <div className="mockup-shell mockup-shell-laptop">
                <Image src="/concepts/macbook-frame.png" alt="MacBook device mockup" fill className="mockup-frame" />
                <div className="mockup-screen mockup-screen-laptop">
                  <Image
                    src={concept.desktopImage}
                    alt={`${concept.title} new desktop concept screenshot second`}
                    fill
                    className="mockup-image"
                  />
                </div>
              </div>
              <p className="mt-4 text-slate-600 text-sm">{copy.newCaptionDesktop}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
