'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { ExternalLink, Loader2, Trash2 } from 'lucide-react'
import type { NewsCMS } from '@/lib/cms-types'
import { pickLang } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'
import { deleteNewsAction, loadCmsPayloadAction, saveNewsItemAction } from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { localizePath } from '@/lib/locale-path'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { CmsLocaleBar } from '@/components/admin/CmsLocaleBar'
import ImageUploader from '@/components/admin/ImageUploader'
import { AdminField, adminInputClass } from '@/components/admin/admin-ui'

function statusPill(status: string) {
  const pub = status === 'published'
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
        pub ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'
      }`}
    >
      {pub ? 'Published' : 'Draft'}
    </span>
  )
}

export function NewsWorkspace({ initialNews }: { initialNews: NewsCMS }) {
  const router = useRouter()
  const [n, setN] = useState<NewsCMS>(initialNews)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [deletePending, setDeletePending] = useState(false)
  const previewUrl = localizePath(`/news/${n.slug}`, L)

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveNewsItemAction({ ...n, updatedAt: new Date().toISOString() }).then((r) => {
        if (r.ok) {
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.error ?? 'Error')
      })
    })
  }, [router, n])

  const remove = useCallback(() => {
    if (!window.confirm('Delete this post?')) return
    setDeletePending(true)
    startTransition(() => {
      void deleteNewsAction(n.id).then((r) => {
        setDeletePending(false)
        if (r.ok) {
          notifyPublicCmsUpdated()
          router.push('/admin/news')
          queueMicrotask(() => router.refresh())
        } else setMsg(r.error ?? 'Delete failed')
      })
    })
  }, [router, n.id])

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs
          items={[{ label: 'News', href: '/admin/news' }, { label: pickLang(n.title, 'en') || n.id }]}
        />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white">News editor</h1>
            {statusPill(n.status)}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CmsLocaleBar L={L} setL={setL} />
            <button
              type="button"
              className="rounded-lg border border-neutral-800 px-3 py-2 text-xs text-neutral-400 hover:border-neutral-600"
              onClick={() =>
                startTransition(() => {
                  void loadCmsPayloadAction().then(() => router.refresh())
                })
              }
            >
              Reload
            </button>
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-200 hover:bg-neutral-900"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview
            </a>
            <button
              type="button"
              disabled={deletePending}
              onClick={remove}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/50 px-3 py-2 text-xs text-red-300 hover:bg-red-950/40 disabled:opacity-50"
            >
              {deletePending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              {deletePending ? 'Deleting…' : 'Delete'}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={save}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </button>
          </div>
        </div>
        {msg ? <p className="mb-6 text-sm text-amber-200">{msg}</p> : null}

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-neutral-400">Identity</h2>
            <AdminField label="ID">
              <input className={adminInputClass + ' opacity-70'} readOnly value={n.id} />
            </AdminField>
            <AdminField label="Slug (URL)">
              <input
                className={adminInputClass}
                value={n.slug}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    slug: e.target.value
                      .trim()
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, ''),
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label="Publish date (YYYY-MM-DD)">
              <input
                type="text"
                className={adminInputClass}
                value={n.publishedAt}
                onChange={(e) =>
                  setN((p) => ({ ...p, publishedAt: e.target.value, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label="Status">
              <select
                className={adminInputClass}
                value={n.status}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    status: e.target.value as NewsCMS['status'],
                    updatedAt: new Date().toISOString(),
                  }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </AdminField>
            <AdminField label={`Title (${L})`}>
              <input
                className={adminInputClass}
                value={n.title[L]}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    title: { ...p.title, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Content — Markdown (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-48 font-mono text-sm'}
                value={n.content[L]}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    content: { ...p.content, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label="Order">
              <input
                type="number"
                className={adminInputClass}
                value={n.order}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    order: Number(e.target.value),
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
          </div>
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-neutral-400">Cover & SEO</h2>
            <AdminField label="Cover image">
              <ImageUploader
                value={n.coverImageUrl}
                onUrlChange={(url) => setN((p) => ({ ...p, coverImageUrl: url, updatedAt: new Date().toISOString() }))}
              />
            </AdminField>
            <AdminField label={`Meta title (${L})`}>
              <input
                className={adminInputClass}
                value={n.seo.metaTitle[L]}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    seo: { ...p.seo, metaTitle: { ...p.seo.metaTitle, [L]: e.target.value } },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Meta description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-20'}
                value={n.seo.metaDescription[L]}
                onChange={(e) =>
                  setN((p) => ({
                    ...p,
                    seo: {
                      ...p.seo,
                      metaDescription: { ...p.seo.metaDescription, [L]: e.target.value },
                    },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
          </div>
        </div>
      </div>
    </main>
  )
}
