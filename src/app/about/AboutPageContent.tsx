'use client'

import { useLocale } from '@/context/LocaleContext'
import TechStack from '@/components/sections/TechStack'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import LocalizedLink from '@/components/LocalizedLink'
import FinalCTASection from '@/components/FinalCTASection'

export default function AboutPageContent() {
  const { t } = useLocale()
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-24 md:pt-20 pb-20 sm:pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {t('aboutPage.heroBadge')}
            </div>
            <h1 className="text-[32px] sm:text-[44px] md:text-[60px] lg:text-[72px] font-semibold leading-[1.08] mb-5 sm:mb-6 tracking-[-1px] sm:tracking-[-2px] font-manrope">
              <span className="block break-words">{t('aboutPage.heroTitle')}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-80 max-w-[600px]">{t('aboutPage.heroSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <article className="p-5 sm:p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-manrope font-semibold text-text-light tracking-[-0.5px] sm:tracking-[-1px] mb-4 sm:mb-5">
                {t('aboutPage.philosophyTitle')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-text-light/75 leading-relaxed">{t('aboutPage.philosophyText')}</p>
            </article>
            <article className="p-5 sm:p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-manrope font-semibold text-text-light tracking-[-0.5px] sm:tracking-[-1px] mb-4 sm:mb-5">
                {t('aboutPage.customFocusTitle')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-text-light/75 leading-relaxed">{t('aboutPage.customFocusText')}</p>
            </article>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-bg-dark py-16 md:py-24">
        <div className="container-custom">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-manrope font-semibold text-text-light tracking-[-0.5px] sm:tracking-[-0.8px]">
              {t('aboutPage.conceptsTitle')}
            </h2>
            <LocalizedLink href="/concepts" className="btn btn-primary" aria-label="View concepts by STEPS LAB">
              {t('aboutPage.conceptsCta')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <TechStack />

      <FinalCTASection />
    </>
  )
}
