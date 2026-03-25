'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { PagesContent, PublicCmsPayload } from '@/lib/cms-types'
import { defaultCmsPayload } from '@/lib/cms-types'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import type { AdminView } from '@/lib/admin-nav'
import { pathForAdminView } from '@/lib/admin-nav'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import {
  CaseFields,
  CollectionTab,
  ConceptsEditor,
  ServiceFields,
} from '@/components/admin/AdminCollectionEditors'
import {
  AboutPagesEditor,
  ContactsPagesEditor,
  FooterTemplateEditor,
  HomePagesEditor,
  MediaPagesEditor,
} from '@/components/admin/AdminPageEditors'
import {
  type ActionResult,
  addCaseAction,
  addConceptAction,
  addServiceAction,
  deleteCaseAction,
  deleteConceptAction,
  deleteServiceAction,
  loadCmsPayloadAction,
  saveCasesAction,
  saveConceptsAction,
  savePagesAction,
  saveServicesAction,
  seedCmsAction,
} from '@/lib/actions/admin-actions'

type Props = {
  initialPayload: PublicCmsPayload
  initialView: AdminView
}

function viewTitle(v: AdminView): string {
  switch (v.kind) {
    case 'dashboard':
      return 'Dashboard'
    case 'pages':
      return `Pages · ${v.page}`
    case 'services':
      return 'Services'
    case 'portfolio':
      return 'Portfolio'
    case 'lab':
      return 'Lab'
    case 'media':
      return 'Media'
    default:
      return 'CMS'
  }
}

export function AdminCmsDashboard({ initialPayload, initialView }: Props) {
  const router = useRouter()
  const [payload, setPayload] = useState<PublicCmsPayload>(initialPayload ?? defaultCmsPayload())
  const [editLocale, setEditLocale] = useState<Locale>('en')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)
  const baselineRef = useRef(JSON.stringify(initialPayload ?? defaultCmsPayload()))
  const L = editLocale

  const setPages = useCallback((p: PagesContent) => setPayload((prev) => ({ ...prev, pages: p })), [])

  const isDirty = useMemo(() => JSON.stringify(payload) !== baselineRef.current, [payload])

  const syncBaseline = useCallback((p: PublicCmsPayload) => {
    baselineRef.current = JSON.stringify(p)
  }, [])

  const run = useCallback(
    async (fn: () => Promise<ActionResult<PublicCmsPayload>>) => {
      setMessage(null)
      const r = await fn()
      if (r.ok) {
        if (r.data) {
          setPayload(r.data)
          syncBaseline(r.data)
        }
        setMessage('Saved.')
        router.refresh()
        notifyPublicCmsUpdated()
      } else {
        setMessage(r.error ?? 'Error')
      }
    },
    [router, syncBaseline]
  )

  const main = (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{viewTitle(initialView)}</h1>
            <p className="mt-1 text-sm text-neutral-500">Redis JSON + Vercel Blob · {pathForAdminView(initialView)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500">Language</span>
            <div className="flex rounded-lg border border-neutral-800 p-0.5">
              {(['en', 'uk'] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setEditLocale(loc)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase ${
                    L === loc ? 'bg-white text-black' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="rounded-lg border border-neutral-800 px-3 py-2 text-xs text-neutral-400 hover:border-neutral-600"
              onClick={() =>
                startTransition(() =>
                  void loadCmsPayloadAction().then((r) => {
                    if (r.ok && r.data) {
                      setPayload(r.data)
                      syncBaseline(r.data)
                      setMessage('Reloaded from database.')
                    } else setMessage(r.ok ? 'Load failed' : r.error)
                  })
                )
              }
            >
              Reload from DB
            </button>
            <button
              type="button"
              className="rounded-lg border border-neutral-800 px-3 py-2 text-xs text-neutral-400 hover:border-neutral-600"
              onClick={() =>
                startTransition(() =>
                  void seedCmsAction().then((r) => {
                    if (r.ok && r.data) {
                      setPayload(r.data.payload)
                      syncBaseline(r.data.payload)
                      setMessage(
                        r.data.seeded ? 'Defaults seeded (was empty).' : 'Synced from database (already seeded).'
                      )
                      notifyPublicCmsUpdated()
                    } else setMessage(r.ok ? 'Seed failed' : r.error)
                  })
                )
              }
            >
              Seed defaults
            </button>
          </div>
        </div>

        {message ? <p className="mb-6 text-sm text-amber-200">{message}</p> : null}

        {initialView.kind === 'dashboard' && (
          <div className="space-y-6 text-neutral-300">
            <p className="text-sm text-neutral-400">
              Overview of your site content. Use the sidebar to edit pages, collections, and media. Changes apply on the public site
              after you save (full revalidation).
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Services', String(payload.services.length)],
                ['Portfolio cases', String(payload.cases.length)],
                ['Lab concepts', String(payload.concepts.length)],
                ['News posts', String(payload.news.length)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">{k}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {initialView.kind === 'pages' && initialView.page === 'home' && (
          <HomePagesEditor pages={payload.pages} setPages={setPages} L={L} />
        )}
        {initialView.kind === 'pages' && initialView.page === 'about' && (
          <AboutPagesEditor pages={payload.pages} setPages={setPages} L={L} />
        )}
        {initialView.kind === 'pages' && initialView.page === 'contacts' && (
          <ContactsPagesEditor pages={payload.pages} setPages={setPages} L={L} />
        )}
        {initialView.kind === 'pages' && initialView.page === 'footer' && (
          <FooterTemplateEditor pages={payload.pages} setPages={setPages} L={L} />
        )}

        {initialView.kind === 'services' && (
          <CollectionTab
            title="Services"
            items={payload.services}
            setItems={(services) => setPayload((p) => ({ ...p, services }))}
            onSave={() => run(() => saveServicesAction(payload.services))}
            hideSaveBar
            onAdd={() =>
              startTransition(() => {
                void addServiceAction().then((r) => {
                  if (r.ok && r.data) {
                    setPayload(r.data)
                    syncBaseline(r.data)
                    notifyPublicCmsUpdated()
                    router.refresh()
                  }
                })
              })
            }
            onDelete={(id) =>
              startTransition(() => {
                setDeletingItemId(id)
                void deleteServiceAction(id).then((r) => {
                  setDeletingItemId(null)
                  if (r.ok && r.data) {
                    setPayload(r.data)
                    syncBaseline(r.data)
                    notifyPublicCmsUpdated()
                    router.refresh()
                  }
                })
              })
            }
            renderFields={(s, _i, upd) => <ServiceFields s={s} upd={upd} L={L} />}
            isPending={isPending}
            deletingItemId={deletingItemId}
          />
        )}

        {initialView.kind === 'portfolio' && (
          <CollectionTab
            title="Portfolio"
            items={payload.cases}
            setItems={(cases) => setPayload((p) => ({ ...p, cases }))}
            onSave={() => run(() => saveCasesAction(payload.cases))}
            hideSaveBar
            onAdd={() =>
              startTransition(() => {
                void addCaseAction().then((r) => {
                  if (r.ok && r.data) {
                    setPayload(r.data)
                    syncBaseline(r.data)
                    notifyPublicCmsUpdated()
                    router.refresh()
                  }
                })
              })
            }
            onDelete={(id) =>
              startTransition(() => {
                setDeletingItemId(id)
                void deleteCaseAction(id).then((r) => {
                  setDeletingItemId(null)
                  if (r.ok && r.data) {
                    setPayload(r.data)
                    syncBaseline(r.data)
                    notifyPublicCmsUpdated()
                    router.refresh()
                  }
                })
              })
            }
            renderFields={(c, _i, upd) => <CaseFields c={c} upd={upd} L={L} />}
            isPending={isPending}
            deletingItemId={deletingItemId}
          />
        )}

        {initialView.kind === 'lab' && (
          <ConceptsEditor
            concepts={payload.concepts}
            setConcepts={(concepts) => setPayload((p) => ({ ...p, concepts }))}
            L={L}
            onSave={() => run(() => saveConceptsAction(payload.concepts))}
            hideSaveBar
            onAdd={() =>
              startTransition(() => {
                void addConceptAction().then((r) => {
                  if (r.ok && r.data) {
                    setPayload(r.data)
                    syncBaseline(r.data)
                    notifyPublicCmsUpdated()
                    router.refresh()
                  }
                })
              })
            }
            onDelete={(id) =>
              startTransition(() => {
                setDeletingItemId(id)
                void deleteConceptAction(id).then((r) => {
                  setDeletingItemId(null)
                  if (r.ok && r.data) {
                    setPayload(r.data)
                    syncBaseline(r.data)
                    notifyPublicCmsUpdated()
                    router.refresh()
                  }
                })
              })
            }
            isPending={isPending}
            deletingItemId={deletingItemId}
          />
        )}

        {initialView.kind === 'media' && <MediaPagesEditor pages={payload.pages} setPages={setPages} />}
      </div>
    </main>
  )

  const showFloatingSave =
    isDirty && initialView.kind !== 'dashboard' && !(initialView.kind === 'services' || initialView.kind === 'portfolio' || initialView.kind === 'lab')

  const floatingForCollections =
    isDirty && (initialView.kind === 'services' || initialView.kind === 'portfolio' || initialView.kind === 'lab')

  return (
    <div className="flex min-h-screen bg-black text-neutral-100">
      <AdminSidebar />
      {main}
      {showFloatingSave ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 md:p-6">
          <div className="pointer-events-auto flex w-full max-w-lg items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-950/95 px-5 py-3 shadow-2xl backdrop-blur">
            <p className="text-sm text-neutral-400">Unsaved changes</p>
            <button
              type="button"
              disabled={isPending}
              onClick={() => void run(() => savePagesAction(payload.pages))}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save pages
            </button>
          </div>
        </div>
      ) : null}
      {floatingForCollections ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 md:p-6">
          <div className="pointer-events-auto flex w-full max-w-lg items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-950/95 px-5 py-3 shadow-2xl backdrop-blur">
            <p className="text-sm text-neutral-400">Unsaved changes</p>
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                if (initialView.kind === 'services') void run(() => saveServicesAction(payload.services))
                if (initialView.kind === 'portfolio') void run(() => saveCasesAction(payload.cases))
                if (initialView.kind === 'lab') void run(() => saveConceptsAction(payload.concepts))
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
