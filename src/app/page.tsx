import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import TrustStrip from '@/components/TrustStrip'
import ApproachSection from '@/components/ApproachSection'
import ServicesSection from '@/components/ServicesSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import CasesSection from '@/components/CasesSection'
import AboutSection from '@/components/AboutSection'
import FinalCTASection from '@/components/FinalCTASection'

export const metadata: Metadata = {
  title: 'STEPS LAB — Веб-студія | Розробка сайтів та AI-рішення',
  description: 'Веб-студія розробки сайтів та веб-додатків. Web development, AI development, створення сайтів для бізнесу. Логіка, швидкість, результат.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ApproachSection />
      <ServicesSection />
      <WhyStepsLabSection />
      <CasesSection />
      <AboutSection />
      <FinalCTASection />
    </>
  )
}

