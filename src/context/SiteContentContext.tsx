'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_SITE_CONTENT, sanitizeSiteContent, type SiteContent } from '@/lib/content'

type SiteContentContextValue = {
  content: SiteContent
  isLoading: boolean
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: DEFAULT_SITE_CONTENT,
  isLoading: true,
})

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT)
  const [isLoading, setIsLoading] = useState(true)

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
        if (isMounted) setContent(sanitizeSiteContent(data))
      } catch {
        // Keep defaults when the API is unavailable.
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

  const value = useMemo(() => ({ content, isLoading }), [content, isLoading])
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  return useContext(SiteContentContext)
}
