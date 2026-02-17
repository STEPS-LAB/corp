import { cookies } from 'next/headers'
import { LOCALE_COOKIE, DEFAULT_LOCALE, type Locale } from '@/lib/i18n'

export async function getServerLocale(): Promise<Locale> {
  const c = await cookies()
  const v = c.get(LOCALE_COOKIE)?.value
  return (v === 'uk' || v === 'en') ? v : DEFAULT_LOCALE
}
