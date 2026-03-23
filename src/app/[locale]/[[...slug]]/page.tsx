import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePremiumContent from '@/components/HomePremiumContent'
import { generateMetadata as generateServicesMetadata } from '@/app/services/page'
import ServicesPage from '@/app/services/page'
import { generateMetadata as generateCasesMetadata } from '@/app/cases/page'
import CasesPage from '@/app/cases/page'
import { generateMetadata as generateAboutMetadata } from '@/app/about/page'
import AboutPage from '@/app/about/page'
import { generateMetadata as generateBlogMetadata } from '@/app/blog/page'
import BlogPage from '@/app/blog/page'
import ContactsPageContent from '@/app/contacts/ContactsPageContent'
import ApproachPageContent from '@/app/approach/ApproachPageContent'
import { generateMetadata as generateAiMetadata } from '@/app/services/ai-automation/page'
import AIAutomationPage from '@/app/services/ai-automation/page'
import { generateMetadata as generateMvpMetadata } from '@/app/services/mvp-startups/page'
import MVPStartupsPage from '@/app/services/mvp-startups/page'
import { generateMetadata as generateSupportMetadata } from '@/app/services/support-scaling/page'
import SupportScalingPage from '@/app/services/support-scaling/page'
import { generateMetadata as generateWebMetadata } from '@/app/services/web-development/page'
import WebDevelopmentPage from '@/app/services/web-development/page'
import { generateMetadata as generateCorporateMetadata } from '@/app/cases/corporate/layout'
import CorporateCasePage from '@/app/cases/corporate/page'
import { generateMetadata as generateEcommerceMetadata } from '@/app/cases/ecommerce/layout'
import EcommerceCasePage from '@/app/cases/ecommerce/page'
import { generateMetadata as generateSaasMetadata } from '@/app/cases/saas/layout'
import SaaSCasePage from '@/app/cases/saas/page'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

type RouteEntry = {
  render: () => React.ReactNode | Promise<React.ReactNode>
  getMetadata?: () => Promise<Metadata>
}

const routeMap: Record<string, RouteEntry> = {
  '': { render: () => <HomePremiumContent /> },
  services: { render: () => <ServicesPage />, getMetadata: generateServicesMetadata },
  cases: { render: () => <CasesPage />, getMetadata: generateCasesMetadata },
  about: { render: () => <AboutPage />, getMetadata: generateAboutMetadata },
  blog: { render: () => <BlogPage />, getMetadata: generateBlogMetadata },
  contacts: { render: () => <ContactsPageContent /> },
  contact: { render: () => <ContactsPageContent /> },
  approach: {
    render: () => <ApproachPageContent />,
    getMetadata: async () => {
      const m = (en as { pages: { approach: { metaTitle: string; metaDescription: string } } }).pages.approach
      return { title: m.metaTitle, description: m.metaDescription }
    },
  },
  'services/ai-automation': { render: () => <AIAutomationPage />, getMetadata: generateAiMetadata },
  'services/mvp-startups': { render: () => <MVPStartupsPage />, getMetadata: generateMvpMetadata },
  'services/support-scaling': { render: () => <SupportScalingPage />, getMetadata: generateSupportMetadata },
  'services/web-development': { render: () => <WebDevelopmentPage />, getMetadata: generateWebMetadata },
  'cases/corporate': { render: () => <CorporateCasePage />, getMetadata: generateCorporateMetadata },
  'cases/ecommerce': { render: () => <EcommerceCasePage />, getMetadata: generateEcommerceMetadata },
  'cases/saas': { render: () => <SaaSCasePage />, getMetadata: generateSaasMetadata },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const key = (slug ?? []).join('/')
  const route = routeMap[key]
  if (!route?.getMetadata) return {}
  if (key === 'approach') {
    const messages = locale === 'uk' ? uk : en
    const m = (messages as { pages: { approach: { metaTitle: string; metaDescription: string } } }).pages.approach
    return { title: m.metaTitle, description: m.metaDescription }
  }
  return route.getMetadata()
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { locale, slug } = await params
  if (locale !== 'en' && locale !== 'uk') {
    notFound()
  }

  const key = (slug ?? []).join('/')
  const route = routeMap[key]
  if (!route) {
    notFound()
  }

  return route.render()
}
