'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { DEFAULT_SITE_CONTENT, type SiteContent } from '@/lib/content'
import {
  type PublicCmsPayload,
  defaultCmsPayload,
  flattenToSiteContent,
} from '@/lib/cms-types'

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
    services: Array.isArray(s.services) && s.services.length > 0 ? s.services : d.services,
    cases: Array.isArray(s.cases) && s.cases.length > 0 ? s.cases : d.cases,
    concepts: Array.isArray(s.concepts) && s.concepts.length > 0 ? s.concepts : d.concepts,
  }
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale()
  const [payload, setPayload] = useState<PublicCmsPayload>(defaultCmsPayload())
  const [isLoading, setIsLoading] = useState(true)

  const content = useMemo(() => flattenToSiteContent(payload, locale), [payload, locale])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadContent() {
      try {
        const response = await fetch('/api/content', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) return
        const data: unknown = await response.json()
        if (isMounted) setPayload(mergePayloadPatch(data))
      } catch {
        /* keep defaults */
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void loadContent()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const value = useMemo(
    () => ({ content, payload, isLoading }),
    [content, payload, isLoading]
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent(): SiteContentContextValue {
  return useContext(SiteContentContext)
}
