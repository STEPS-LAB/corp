import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALE_COOKIE, type Locale } from '@/lib/i18n'

function getLocaleFromGeo(request: NextRequest): Locale {
  const country = request.geo?.country?.toUpperCase()
  return country === 'UA' ? 'uk' : 'en'
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const isSystemRoute =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    /\.[^/]+$/.test(pathname)

  if (isSystemRoute) {
    return NextResponse.next()
  }

  if (/^\/(en|uk)(\/|$)/.test(pathname)) {
    const locale = pathname.split('/')[1] as Locale
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    return response
  }

  const locale = getLocaleFromGeo(request)
  const redirectUrl = new URL(`/${locale}${pathname}${search}`, request.url)
  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
