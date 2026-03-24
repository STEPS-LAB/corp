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

function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/')[1]
  if (SUPPORTED_LOCALES.includes(segment as Locale)) {
    return segment as Locale
  }
  return null
}

/** `/uk/admin/dashboard` → `/admin/dashboard`; `/admin/dashboard` → unchanged */
function stripLocalePrefix(pathname: string): { pathnameWithoutLocale: string } {
  const locale = getLocaleFromPath(pathname)
  if (!locale) {
    return { pathnameWithoutLocale: pathname }
  }
  const rest = pathname.slice(`/${locale}`.length) || '/'
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
    dashboardUrl.pathname = '/admin/dashboard'
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

  if (pathLocale) {
    const internalPath = pathname.replace(`/${pathLocale}`, '') || '/'
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = internalPath

    const response = NextResponse.rewrite(rewriteUrl)
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
