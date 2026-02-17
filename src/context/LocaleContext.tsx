'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import { LOCALE_COOKIE, getNested, replaceParams } from '@/lib/i18n'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages: Record<Locale, Record<string, unknown>> = { en, uk }

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return
      setLocaleState(newLocale)
      document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
      router.refresh()
    },
    [locale, router]
  )

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const text = getNested(messages[locale] as Record<string, unknown>, key)
      if (text == null) return key
      return params ? replaceParams(text, params) : text
    },
    [locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
