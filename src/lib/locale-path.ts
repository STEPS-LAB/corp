import type { Locale } from '@/lib/i18n'

const EXTERNAL_PROTOCOL = /^[a-zA-Z][a-zA-Z\d+\-.]*:/

/** `/uk/admin/services` → `/admin/services` for matching CMS routes. */
export function stripLeadingLocaleFromPath(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean)
  if (seg[0] === 'en' || seg[0] === 'uk') {
    const rest = seg.slice(1).join('/')
    return rest ? `/${rest}` : '/'
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

export function localizePath(path: string, locale: Locale): string {
  if (!path) return `/${locale}`
  if (path.startsWith('#') || EXTERNAL_PROTOCOL.test(path)) return path

  const normalized = path.startsWith('/') ? path : `/${path}`
  if (/^\/(en|uk)(?=\/|$)/.test(normalized)) return normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}
