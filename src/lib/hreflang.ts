import { headers } from 'next/headers'

/**
 * Returns alternates.languages for metadata - hreflang links so Google
 * understands the page is available in EN and UK, not duplicates.
 */
export async function getAlternateLanguages(pathname: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  let url: string
  if (baseUrl) {
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`
    url = `${baseUrl.replace(/\/$/, '')}${path}`
  } else {
    const headersList = await headers()
    const host = headersList.get('host') || 'stepslab.com'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`
    url = `${protocol}://${host}${path}`
  }
  return {
    languages: {
      'en': url,
      'uk': url,
      'x-default': url,
    },
  }
}
