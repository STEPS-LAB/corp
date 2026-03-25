'use client'

import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import CasesSection from '@/components/CasesSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import { pickLang } from '@/lib/cms-types'

export default function CasesPageContent() {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const p = payload.portfolioIndex

  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
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
            <p className="hero-alt-description">
              {pickLang(p.heroDescription, locale)}
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <CasesSection variant="page" />
    </>
  )
}
