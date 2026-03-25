'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import type { PagesContent } from '@/lib/cms-types'
import { defaultCmsPayload } from '@/lib/cms-types'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { loadCmsPayloadAction, savePagesAction } from '@/lib/actions/admin-actions'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { MediaPagesEditor } from '@/components/admin/AdminPageEditors'

export function CmsMediaClient({ initialPages }: { initialPages: PagesContent }) {
  const router = useRouter()
  const [pages, setPages] = useState<PagesContent>(initialPages)
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const baselineRef = useRef(JSON.stringify(initialPages))
  const isDirty = useMemo(() => JSON.stringify(pages) !== baselineRef.current, [pages])

  const save = useCallback(async () => {
    setMsg(null)
    const r = await savePagesAction(pages)
    if (r.ok && r.data) {
      setPages(r.data.pages)
      baselineRef.current = JSON.stringify(r.data.pages)
      setMsg('Saved.')
      router.refresh()
      notifyPublicCmsUpdated()
    } else setMsg(r.ok ? 'Save failed' : r.error)
  }, [pages, router])

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs items={[{ label: 'Media' }]} />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Media</h1>
            <p className="mt-1 text-sm text-neutral-500">Shared images referenced across the site.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border border-neutral-800 px-3 py-2 text-xs text-neutral-400 hover:border-neutral-600"
              onClick={() =>
                startTransition(() => {
                  void loadCmsPayloadAction().then((r) => {
                    if (r.ok && r.data) {
                      setPages(r.data.pages ?? defaultCmsPayload().pages)
                      baselineRef.current = JSON.stringify(r.data.pages)
                      setMsg('Reloaded.')
                    }
                  })
                })
              }
            >
              Reload from DB
            </button>
            <button
              type="button"
              disabled={pending || !isDirty}
              onClick={() => startTransition(() => void save())}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-40"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </button>
          </div>
        </div>
        {msg ? <p className="mb-6 text-sm text-amber-200">{msg}</p> : null}
        <MediaPagesEditor pages={pages} setPages={setPages} />
      </div>
    </main>
  )
}
