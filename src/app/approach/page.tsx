import type { Metadata } from 'next'
import ApproachSection from '@/components/ApproachSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export const metadata: Metadata = {
  title: 'Підхід до веб-розробки | STEPS LAB — студія розробки сайтів',
  description: 'Як ми працюємо: логіка, AI development, орієнтація на результат. Студія розробки сайтів з прозорим процесом website development.',
}

export default function ApproachPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              Approach
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">Наш підхід</span>
              <span className="hero-alt-title-line">до веб-розробки</span>
            </h1>
            <p className="hero-alt-description">
              Студія розробки сайтів, яка будує системи. Логіка, AI development, результат.
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

