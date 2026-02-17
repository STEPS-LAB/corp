import CasesSection from '@/components/CasesSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

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
              <span className="hero-alt-title-line">Вибрані проєкти</span>
              <span className="hero-alt-title-line">та результати</span>
            </h1>
            <p className="hero-alt-description">
              Реальні кейси з реальними результатами для бізнесу.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <CasesSection />
    </>
  )
}

