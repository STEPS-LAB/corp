'use client'

import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { DEFAULT_SITE_CONTENT, type SiteContent } from '@/lib/content'
import {
  type PublicCmsPayload,
  defaultCmsPayload,
  flattenToSiteContent,
} from '@/lib/cms-types'
import { subscribeToCmsUpdates } from '@/lib/cms-client-sync'

type SiteContentContextValue = {
  content: SiteContent
  payload: PublicCmsPayload
  isLoading: boolean
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: DEFAULT_SITE_CONTENT,
  payload: defaultCmsPayload(),
  isLoading: true,
})

function mergePayloadPatch(server: unknown): PublicCmsPayload {
  const d = defaultCmsPayload()
  if (!server || typeof server !== 'object') return d
  const s = server as Partial<PublicCmsPayload>
  return {
    pages: s.pages ?? d.pages,
    // Empty arrays are valid CMS state (e.g. user deleted all cases). Do not fall back to bundled defaults.
    services: Array.isArray(s.services) ? s.services : d.services,
    cases: Array.isArray(s.cases) ? s.cases : d.cases,
    concepts: Array.isArray(s.concepts) ? s.concepts : d.concepts,
    news: Array.isArray(s.news) ? s.news : d.news,
    portfolioIndex: s.portfolioIndex ?? d.portfolioIndex,
    servicesIndex: s.servicesIndex ?? d.servicesIndex,
    labIndex: s.labIndex ?? d.labIndex,
    newsIndex: s.newsIndex ?? d.newsIndex,
    siteHeader: s.siteHeader ?? d.siteHeader,
    siteFooter: s.siteFooter ?? d.siteFooter,
    approachPage: s.approachPage ?? d.approachPage,
  }
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale()
  const pathname = usePathname()
  const [payload, setPayload] = useState<PublicCmsPayload>(defaultCmsPayload())
  const [isLoading, setIsLoading] = useState(true)

  const content = useMemo(() => flattenToSiteContent(payload, locale), [payload, locale])

  const fetchPayload = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`/api/content?_=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        signal,
      })
      if (!response.ok) return
      const data: unknown = await response.json()
      if (!data || typeof data !== 'object') return
      const o = data as Record<string, unknown>
      if ('error' in o && !Array.isArray(o.cases)) return
      if (!o.pages || !Array.isArray(o.cases) || !Array.isArray(o.services) || !Array.isArray(o.news)) return
      setPayload(mergePayloadPatch(data))
    } catch {
      /* aborted or network — keep existing payload */
    } finally {
      setIsLoading(false)
    }
  }, [])

  /** Refetch on route / locale change — client state was not updated after admin Save until navigation. */
  useEffect(() => {
    const controller = new AbortController()
    void fetchPayload(controller.signal)
    return () => controller.abort()
  }, [pathname, fetchPayload])

  /** Refetch when tab becomes visible again (e.g. edited CMS in another tab). */
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      void fetchPayload()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [fetchPayload])

  /** Refetch when admin saves in this or another tab (admin is outside this provider). */
  useEffect(() => {
    return subscribeToCmsUpdates(() => {
      void fetchPayload()
    })
  }, [fetchPayload])

  const value = useMemo(
    () => ({ content, payload, isLoading }),
    [content, payload, isLoading]
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent(): SiteContentContextValue {
  return useContext(SiteContentContext)
}
