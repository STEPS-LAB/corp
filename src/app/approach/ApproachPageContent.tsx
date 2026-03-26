'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { pickLang } from '@/lib/cms-types'
import ApproachSection from '@/components/ApproachSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function ApproachPageContent() {
  const { t, locale } = useLocale()
  const { payload } = useSiteContent()
  const p = payload.approachPage

  const badge = pickLang(p.badge, locale) || t('pages.approach.badge')
  const title1 = pickLang(p.heroTitleLine1, locale) || t('pages.approach.title1')
  const title2 = pickLang(p.heroTitleLine2, locale) || t('pages.approach.title2')
  const description = pickLang(p.heroDescription, locale) || t('pages.approach.description')

  return (
    <>
      <section className="site-hero min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {badge}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{title1}</span>
              <span className="hero-alt-title-line">{title2}</span>
            </h1>
            <p className="hero-alt-description">{description}</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <ApproachSection />
      <WhyStepsLabSection variant="approach" />
    </>
  )
}
