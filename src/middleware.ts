import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALE_COOKIE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n'
import { getAdminCookieName, verifyAdminToken } from '@/lib/admin-auth'

const UKRAINE_COUNTRY = 'UA'
const BOT_UA_RE =
  /(googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver)/i

function getGeoLocale(request: NextRequest): Locale {
  const country =
    request.geo?.country ??
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry') ??
    null

  return country === UKRAINE_COUNTRY ? 'uk' : 'en'
}

/** First URL segment, canonical `en` | `uk` only (handles `/UK`, trailing segments). */
function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0]
  if (!segment) return null
  const lower = segment.toLowerCase()
  if (lower === 'en' || lower === 'uk') {
    return lower as Locale
  }
  return null
}

/** `/uk/admin/dashboard` → `/admin/dashboard`; `/admin/dashboard` → unchanged */
function stripLocalePrefix(pathname: string): { pathnameWithoutLocale: string } {
  const locale = getLocaleFromPath(pathname)
  if (!locale) {
    return { pathnameWithoutLocale: pathname }
  }
  const raw = pathname.split('/').filter(Boolean)[0]!
  const rest = pathname.slice(`/${raw}`.length) || '/'
  return { pathnameWithoutLocale: rest }
}

async function handleAdminRoute(
  request: NextRequest,
  pathnameWithoutLocale: string
): Promise<NextResponse> {
  const isAdminLogin = pathnameWithoutLocale === '/admin/login'
  const token = request.cookies.get(getAdminCookieName())?.value
  const isAuthenticated = await verifyAdminToken(token)

  if (!isAuthenticated && !isAdminLogin) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('next', pathnameWithoutLocale)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isAdminLogin) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/admin'
    dashboardUrl.search = ''
    return NextResponse.redirect(dashboardUrl)
  }

  const rewriteUrl = request.nextUrl.clone()
  rewriteUrl.pathname = pathnameWithoutLocale
  return NextResponse.rewrite(rewriteUrl)
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const { pathnameWithoutLocale } = stripLocalePrefix(pathname)

  if (pathnameWithoutLocale.startsWith('/admin')) {
    return await handleAdminRoute(request, pathnameWithoutLocale)
  }

  const pathLocale = getLocaleFromPath(pathname)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const hasValidCookieLocale = SUPPORTED_LOCALES.includes(cookieLocale as Locale)
  const userAgent = request.headers.get('user-agent') ?? ''
  const isKnownBot = BOT_UA_RE.test(userAgent)

  // Do NOT rewrite /en or /uk → /. That hits `app/page.tsx` (redirect('/en')) and loops forever.
  // Same rule for both locales: real pages live under `app/[locale]/...`.
  if (pathLocale) {
    const segments = pathname.split('/').filter(Boolean)
    const rawFirst = segments[0]
    if (rawFirst && rawFirst !== pathLocale) {
      const tail = segments.slice(1)
      const canonical = request.nextUrl.clone()
      canonical.pathname = `/${pathLocale}${tail.length ? `/${tail.join('/')}` : ''}`
      canonical.search = search
      const response = NextResponse.redirect(canonical)
      response.cookies.set(LOCALE_COOKIE, pathLocale, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
      return response
    }

    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, pathLocale, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    })
    return response
  }

  if (isKnownBot) {
    const response = NextResponse.next()
    if (hasValidCookieLocale) {
      response.cookies.set(LOCALE_COOKIE, cookieLocale as Locale, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    return response
  }

  const targetLocale = hasValidCookieLocale ? (cookieLocale as Locale) : getGeoLocale(request)
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`
  redirectUrl.search = search

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(LOCALE_COOKIE, targetLocale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
