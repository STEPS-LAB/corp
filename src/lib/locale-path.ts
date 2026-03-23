import type { Locale } from '@/lib/i18n'

const EXTERNAL_PROTOCOL = /^[a-zA-Z][a-zA-Z\d+\-.]*:/

export function localizePath(path: string, locale: Locale): string {
  if (!path) return `/${locale}`
  if (path.startsWith('#') || EXTERNAL_PROTOCOL.test(path)) return path

  const normalized = path.startsWith('/') ? path : `/${path}`
  if (/^\/(en|uk)(?=\/|$)/.test(normalized)) return normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}
