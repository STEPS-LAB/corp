'use client'

import { useLocale } from '@/context/LocaleContext'
import CasesSection from '@/components/CasesSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function CasesPageContent() {
  const { t } = useLocale()
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {t('pages.cases.badge')}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{t('pages.cases.title1')}</span>
              <span className="hero-alt-title-line">{t('pages.cases.title2')}</span>
            </h1>
            <p className="hero-alt-description">
              {t('pages.cases.description')}
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <CasesSection />
    </>
  )
}
