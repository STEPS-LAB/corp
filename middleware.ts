import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const UKRAINE_COUNTRY = 'UA'

export function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const existing = request.cookies.get(LOCALE_COOKIE)?.value

  if (existing === 'en' || existing === 'uk') {
    return res
  }

  const country =
    request.geo?.country ??
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry') ??
    null

  const locale = country === UKRAINE_COUNTRY ? 'uk' : 'en'
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 31536000, sameSite: 'lax' })
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
