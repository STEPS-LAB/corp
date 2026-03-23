'use client'

import HeroSection from '@/components/HeroSection'
import TrustStrip from '@/components/TrustStrip'
import PageSpeedBlock from '@/components/PageSpeedBlock'
import ServicesSection from '@/components/ServicesSection'
import CasesSection from '@/components/CasesSection'
import ApproachSection from '@/components/ApproachSection'
import AboutSection from '@/components/AboutSection'
import WhyStepsLabSection from '@/components/WhyStepsLabSection'
import TechStack from '@/components/sections/TechStack'
import ConceptsSection from '@/components/ConceptsSection'
import FinalCTASection from '@/components/FinalCTASection'

export default function HomePageContent() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <PageSpeedBlock />
      <CasesSection />
      <ApproachSection />
      <WhyStepsLabSection />
      <AboutSection />
      <TechStack />
      <ConceptsSection />
      <FinalCTASection />
    </>
  )
}
