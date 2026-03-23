import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

const ROUTES = ['/', '/services', '/cases', '/blog', '/about', '/contacts'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
