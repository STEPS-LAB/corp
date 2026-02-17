import type { Metadata } from 'next'
import CasesSection from '@/components/CasesSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export const metadata: Metadata = {
  title: 'Кейси розробки сайтів | STEPS LAB — веб-студія',
  description: 'Реальні кейси веб-розробки: корпоративні сайти, e-commerce, SaaS MVP. Результати від студії STEPS LAB.',
}

export default function CasesPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              Cases
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">Кейси веб-розробки</span>
              <span className="hero-alt-title-line">та результати</span>
            </h1>
            <p className="hero-alt-description">
              Реальні кейси розробки сайтів: корпоративні сайти, e-commerce, SaaS. Результати для бізнесу.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <CasesSection />
    </>
  )
}

