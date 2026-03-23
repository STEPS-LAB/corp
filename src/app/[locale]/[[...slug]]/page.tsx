import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAlternateLanguages } from '@/lib/hreflang'
import HomePageContent from '@/components/HomePageContent'
import { generateMetadata as generateServicesMetadata } from '@/app/services/page'
import ServicesPageContent from '@/app/services/ServicesPageContent'
import { generateMetadata as generateCasesMetadata } from '@/app/cases/page'
import CasesPageContent from '@/app/cases/CasesPageContent'
import { generateMetadata as generateAboutMetadata } from '@/app/about/page'
import AboutPageContent from '@/app/about/AboutPageContent'
import { generateMetadata as generateBlogMetadata } from '@/app/blog/page'
import BlogPageContent from '@/app/blog/BlogPageContent'
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
  '': { render: () => <HomePageContent /> },
  services: { render: () => <ServicesPageContent />, getMetadata: generateServicesMetadata },
  cases: { render: () => <CasesPageContent />, getMetadata: generateCasesMetadata },
  about: { render: () => <AboutPageContent />, getMetadata: generateAboutMetadata },
  blog: { render: () => <BlogPageContent />, getMetadata: generateBlogMetadata },
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

function getLocalizedMeta(locale: 'en' | 'uk', key: string): Pick<Metadata, 'title' | 'description'> {
  const messages = locale === 'uk' ? uk : en
  const typed = messages as unknown as {
    pages: {
      home: { metaTitle: string; metaDescription: string }
      services: { metaTitle: string; metaDescription: string }
      cases: { metaTitle: string; metaDescription: string }
      about: { metaTitle: string; metaDescription: string }
      approach: { metaTitle: string; metaDescription: string }
    }
    servicePages: {
      webDev: { metaTitle: string; metaDescription: string }
      aiAutomation: { metaTitle: string; metaDescription: string }
      mvpStartups: { metaTitle: string; metaDescription: string }
      supportScaling: { metaTitle: string; metaDescription: string }
    }
    casePages: {
      ecommerce: { metaTitle: string; metaDescription: string }
      corporate: { metaTitle: string; metaDescription: string }
      saas: { metaTitle: string; metaDescription: string }
    }
  }

  const map: Record<string, { title: string; description: string }> = {
    '': { title: typed.pages.home.metaTitle, description: typed.pages.home.metaDescription },
    services: { title: typed.pages.services.metaTitle, description: typed.pages.services.metaDescription },
    cases: { title: typed.pages.cases.metaTitle, description: typed.pages.cases.metaDescription },
    about: { title: typed.pages.about.metaTitle, description: typed.pages.about.metaDescription },
    approach: { title: typed.pages.approach.metaTitle, description: typed.pages.approach.metaDescription },
    'services/web-development': {
      title: typed.servicePages.webDev.metaTitle,
      description: typed.servicePages.webDev.metaDescription,
    },
    'services/ai-automation': {
      title: typed.servicePages.aiAutomation.metaTitle,
      description: typed.servicePages.aiAutomation.metaDescription,
    },
    'services/mvp-startups': {
      title: typed.servicePages.mvpStartups.metaTitle,
      description: typed.servicePages.mvpStartups.metaDescription,
    },
    'services/support-scaling': {
      title: typed.servicePages.supportScaling.metaTitle,
      description: typed.servicePages.supportScaling.metaDescription,
    },
    'cases/ecommerce': {
      title: typed.casePages.ecommerce.metaTitle,
      description: typed.casePages.ecommerce.metaDescription,
    },
    'cases/corporate': {
      title: typed.casePages.corporate.metaTitle,
      description: typed.casePages.corporate.metaDescription,
    },
    'cases/saas': {
      title: typed.casePages.saas.metaTitle,
      description: typed.casePages.saas.metaDescription,
    },
  }

  if (map[key]) return map[key]
  return {
    title: locale === 'uk' ? 'Блог STEPS LAB' : 'STEPS LAB Blog',
    description:
      locale === 'uk'
        ? 'Матеріали про AI-supported development і Next.js performance.'
        : 'Insights on AI-supported development and Next.js performance.',
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (locale !== 'en' && locale !== 'uk') return {}
  const key = (slug ?? []).join('/')
  const path = key ? `/${key}` : '/'
  const route = routeMap[key]
  if (!route) return {}

  const localizedMeta = getLocalizedMeta(locale, key)
  const fallback = route.getMetadata ? await route.getMetadata() : {}
  const canonicalPath = `/${locale}${path === '/' ? '' : path}`

  return {
    title: localizedMeta.title ?? fallback.title,
    description: localizedMeta.description ?? fallback.description,
    alternates: {
      canonical: canonicalPath,
      languages: (await getAlternateLanguages(path)).languages,
    },
  }
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
