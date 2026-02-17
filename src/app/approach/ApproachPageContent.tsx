'use client'

import { useLocale } from '@/context/LocaleContext'
import ApproachSection from '@/components/ApproachSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function ApproachPageContent() {
  const { t } = useLocale()
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {t('pages.approach.badge')}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{t('pages.approach.title1')}</span>
              <span className="hero-alt-title-line">{t('pages.approach.title2')}</span>
            </h1>
            <p className="hero-alt-description">
              {t('pages.approach.description')}
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <ApproachSection />
      <WhyStepsLabSection />
    </>
  )
}
