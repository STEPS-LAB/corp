import { SITE_URL } from '@/lib/constants'

/**
 * Returns alternates.languages for metadata - hreflang links so Google
 * understands the page is available in EN and UK, not duplicates.
 */
export async function getAlternateLanguages(pathname: string) {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/$/, '')
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`

  return {
    languages: {
      en: `${baseUrl}/en${normalizedPath === '/' ? '' : normalizedPath}`,
      uk: `${baseUrl}/uk${normalizedPath === '/' ? '' : normalizedPath}`,
      'x-default': `${baseUrl}${normalizedPath}`,
    },
  }
}
