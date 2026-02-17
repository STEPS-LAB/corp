import ApproachSection from '@/components/ApproachSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

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
              <span className="hero-alt-title-line">до розробки</span>
            </h1>
            <p className="hero-alt-description">
              Ми будуємо системи, які працюють. Логіка, швидкість, результат.
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

