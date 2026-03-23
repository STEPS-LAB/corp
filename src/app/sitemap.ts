import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

const ROUTES = [
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
  '/about',
  '/approach',
  '/contacts',
] as const

const LOCALES = ['en', 'uk'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const localizedRoutes = LOCALES.flatMap((locale) =>
    ROUTES.map((route) => `/${locale}${route === '/' ? '' : route}`)
  )

  return localizedRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/en' || route === '/uk' ? 'weekly' : 'monthly',
    priority: route === '/en' || route === '/uk' ? 1 : 0.8,
  }))
}
