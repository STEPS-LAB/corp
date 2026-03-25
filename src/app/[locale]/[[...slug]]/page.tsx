import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getAlternateLanguages } from '@/lib/hreflang'
import { getFullCmsPayload } from '@/lib/kv'
import { pickLang } from '@/lib/cms-types'
import HomePageContent from '@/components/HomePageContent'
import CaseStudyContent from '@/components/CaseStudyContent'
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
import ServiceDetailContent from '@/components/ServiceDetailContent'
import NewsListingContent from '@/components/NewsListingContent'
import NewsArticleContent from '@/components/NewsArticleContent'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const getCachedCmsPayload = cache(getFullCmsPayload)

function caseDetailHrefFromKey(key: string): string | null {
  if (key === 'cases' || !key.startsWith('cases/')) return null
  const rest = key.slice('cases/'.length)
  if (!rest || rest.includes('//')) return null
  return `/${key}`
}

function serviceDetailHrefFromKey(key: string): string | null {
  if (key === 'services' || !key.startsWith('services/')) return null
  const rest = key.slice('services/'.length)
  if (!rest || rest.includes('//') || rest.includes('/')) return null
  return `/${key}`
}

function newsDetailSlugFromKey(key: string): string | null {
  if (key === 'news' || !key.startsWith('news/')) return null
  const rest = key.slice('news/'.length)
  if (!rest || rest.includes('/')) return null
  return rest
}

export const dynamic = 'force-dynamic'

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
  news: { render: () => <NewsListingContent /> },
  contacts: { render: () => <ContactsPageContent /> },
  contact: { render: () => <ContactsPageContent /> },
  approach: {
    render: () => <ApproachPageContent />,
  },
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

function normalizeHref(href: string): string {
  const t = href.trim()
  if (!t) return ''
  return t.startsWith('/') ? t : `/${t}`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (locale !== 'en' && locale !== 'uk') return {}
  const loc = locale as 'en' | 'uk'
  const key = (slug ?? []).join('/')
  const path = key ? `/${key}` : '/'

  if (key === 'approach') {
    const payload = await getCachedCmsPayload()
    const seo = payload.approachPage.seo
    const fallback = getLocalizedMeta(locale, key)
    const title = pickLang(seo.metaTitle, loc).trim() || fallback.title
    const description = pickLang(seo.metaDescription, loc).trim() || fallback.description
    const canonicalPath = `/${locale}${path === '/' ? '' : path}`
    return {
      title,
      description,
      alternates: {
        canonical: canonicalPath,
        languages: (await getAlternateLanguages(path)).languages,
      },
    }
  }

  const caseHref = caseDetailHrefFromKey(key)
  if (caseHref) {
    const payload = await getCachedCmsPayload()
    const c = payload.cases.find((x) => x.href === caseHref)
    if (!c) notFound()

    const title =
      pickLang(c.seo.metaTitle, loc) || `${pickLang(c.title, loc)} | STEPS LAB`
    const rawDesc =
      pickLang(c.seo.metaDescription, loc) || pickLang(c.description, loc)
    const desc = rawDesc.slice(0, 160)
    const canonicalPath = `/${locale}${path === '/' ? '' : path}`
    return {
      title,
      description: desc,
      alternates: {
        canonical: canonicalPath,
        languages: (await getAlternateLanguages(path)).languages,
      },
    }
  }

  const serviceHref = serviceDetailHrefFromKey(key)
  if (serviceHref) {
    const payload = await getCachedCmsPayload()
    const svc = payload.services.find((s) => normalizeHref(s.href) === normalizeHref(serviceHref))
    if (!svc || svc.status !== 'published') notFound()
    const fallback = getLocalizedMeta(locale, key)
    const title = pickLang(svc.seo.metaTitle, loc).trim() || `${pickLang(svc.title, loc)} | STEPS LAB` || fallback.title
    const rawDesc =
      pickLang(svc.seo.metaDescription, loc).trim() ||
      pickLang(svc.description, loc).trim() ||
      fallback.description ||
      ''
    const desc = rawDesc.slice(0, 160)
    const canonicalPath = `/${locale}${path === '/' ? '' : path}`
    return {
      title,
      description: desc,
      alternates: {
        canonical: canonicalPath,
        languages: (await getAlternateLanguages(path)).languages,
      },
    }
  }

  const newsSlug = newsDetailSlugFromKey(key)
  if (newsSlug) {
    const payload = await getCachedCmsPayload()
    const post = payload.news.find((n) => n.slug === newsSlug && n.status === 'published')
    if (!post) notFound()
    const title = pickLang(post.seo.metaTitle, loc).trim() || `${pickLang(post.title, loc)} | STEPS LAB`
    const rawDesc = pickLang(post.seo.metaDescription, loc).trim() || pickLang(post.content, loc) || ''
    const desc = rawDesc.slice(0, 160)
    const canonicalPath = `/${locale}${path === '/' ? '' : path}`
    return {
      title,
      description: desc,
      alternates: {
        canonical: canonicalPath,
        languages: (await getAlternateLanguages(path)).languages,
      },
    }
  }

  if (key === 'news') {
    const payload = await getCachedCmsPayload()
    const seo = payload.newsIndex.seo
    const title = pickLang(seo.metaTitle, loc).trim() || (loc === 'uk' ? 'Новини — STEPS LAB' : 'News — STEPS LAB')
    const description =
      pickLang(seo.metaDescription, loc).trim() ||
      (loc === 'uk' ? 'Оновлення та статті від STEPS LAB.' : 'Updates and articles from STEPS LAB.')
    return {
      title,
      description,
      alternates: {
        canonical: `/${locale}${path}`,
        languages: (await getAlternateLanguages(path)).languages,
      },
    }
  }

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

  const caseHref = caseDetailHrefFromKey(key)
  if (caseHref) {
    const payload = await getCachedCmsPayload()
    const found = payload.cases.some((c) => c.href === caseHref)
    if (!found) notFound()
    return <CaseStudyContent caseHref={caseHref} />
  }

  const serviceHref = serviceDetailHrefFromKey(key)
  if (serviceHref) {
    const payload = await getCachedCmsPayload()
    const svc = payload.services.find((s) => normalizeHref(s.href) === normalizeHref(serviceHref))
    if (!svc || svc.status !== 'published') notFound()
    return <ServiceDetailContent service={svc} />
  }

  const newsSlug = newsDetailSlugFromKey(key)
  if (newsSlug) {
    const payload = await getCachedCmsPayload()
    const post = payload.news.find((n) => n.slug === newsSlug && n.status === 'published')
    if (!post) notFound()
    return <NewsArticleContent post={post} />
  }

  const route = routeMap[key]
  if (!route) {
    notFound()
  }

  return route.render()
}
