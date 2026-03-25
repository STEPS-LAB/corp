import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getFullCmsPayload } from '@/lib/kv'
import { isCmsPublished } from '@/lib/cms-types'

const STATIC_ROUTES = [
  '/',
  '/services',
  '/services/web-development',
  '/services/ai-automation',
  '/services/mvp-startups',
  '/services/support-scaling',
  '/cases',
  '/cases/corporate',
  '/cases/saas',
  '/cases/ecommerce',
  '/blog',
  '/news',
  '/about',
  '/approach',
  '/contacts',
] as const

const LOCALES = ['en', 'uk'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  let newsRoutes: string[] = []
  try {
    const payload = await getFullCmsPayload()
    newsRoutes = payload.news.filter((n) => isCmsPublished(n.status)).map((n) => `/news/${n.slug}`)
  } catch {
    /* Redis unset in build env */
  }

  const routes = [...STATIC_ROUTES, ...newsRoutes]
  const localizedRoutes = LOCALES.flatMap((locale) =>
    routes.map((route) => `/${locale}${route === '/' ? '' : route}`)
  )

  return localizedRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/en' || route === '/uk' ? 'weekly' : 'monthly',
    priority: route === '/en' || route === '/uk' ? 1 : 0.8,
  }))
}
