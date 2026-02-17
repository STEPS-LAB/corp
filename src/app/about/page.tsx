import type { Metadata } from 'next'
import AboutSection from '@/components/AboutSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export const metadata: Metadata = {
  title: 'Про веб-студію STEPS LAB | Розробка сайтів та AI development',
  description: 'Веб-студія STEPS LAB: команда розробки сайтів, веб-розробки та AI development. Студія, яка створює зрозумілі цифрові продукти для бізнесу.',
}

export default function AboutPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              About
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">Про веб-студію</span>
            </h1>
            <p className="hero-alt-description">
              Студія розробки сайтів та веб-додатків. AI development та website development для бізнесу.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <AboutSection />
      <WhyStepsLabSection />
    </>
  )
}

