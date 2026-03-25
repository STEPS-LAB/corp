'use client'

import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { DEFAULT_SITE_CONTENT, type SiteContent } from '@/lib/content'
import { type PublicCmsPayload, defaultCmsPayload, flattenToSiteContent } from '@/lib/cms-types'
import { mergePayloadPatch } from '@/lib/merge-cms-payload'
import { subscribeToCmsUpdates } from '@/lib/cms-client-sync'

type SiteContentContextValue = {
  content: SiteContent
  payload: PublicCmsPayload
  isLoading: boolean
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: DEFAULT_SITE_CONTENT,
  payload: defaultCmsPayload(),
  isLoading: false,
})

export function SiteContentProvider({
  children,
  initialPayload,
}: {
  children: React.ReactNode
  initialPayload: PublicCmsPayload
}) {
  const { locale } = useLocale()
  const pathname = usePathname()
  const [payload, setPayload] = useState<PublicCmsPayload>(() => mergePayloadPatch(initialPayload))
  const [isLoading, setIsLoading] = useState(false)
  const skipNextPathnameFetchRef = useRef(true)

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

  /**
   * First paint uses `initialPayload` from the server layout (Redis) so hardcoded defaults never flash.
   * Subsequent pathname changes refetch so in-app navigation stays in sync after CMS edits.
   */
  useEffect(() => {
    const controller = new AbortController()
    if (skipNextPathnameFetchRef.current) {
      skipNextPathnameFetchRef.current = false
      return () => controller.abort()
    }
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
