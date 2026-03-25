'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { ExternalLink, Loader2, Trash2 } from 'lucide-react'
import type { ConceptCMS, ProjectLink } from '@/lib/cms-types'
import { pickLang } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'
import {
  deleteConceptAction,
  loadCmsPayloadAction,
  saveCmsItemAction,
} from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { CmsLocaleBar } from '@/components/admin/CmsLocaleBar'
import { AdminField, adminInputClass } from '@/components/admin/admin-ui'
import ImageUploader from '@/components/admin/ImageUploader'

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

export function ConceptWorkspace({ initialConcept }: { initialConcept: ConceptCMS }) {
  const router = useRouter()
  const [c, setC] = useState<ConceptCMS>(initialConcept)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [deletePending, setDeletePending] = useState(false)

  const previewUrl = `/${L}/concepts/${c.slug}`

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveCmsItemAction('concepts', { ...c, updatedAt: new Date().toISOString() }).then((r) => {
        if (r.ok) {
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.error ?? 'Error')
      })
    })
  }, [c, router])

  const remove = useCallback(() => {
    if (!confirm('Delete this concept?')) return
    setDeletePending(true)
    startTransition(() => {
      void deleteConceptAction(c.id).then((r) => {
        setDeletePending(false)
        if (r.ok) {
          notifyPublicCmsUpdated()
          router.push('/admin/lab')
          queueMicrotask(() => router.refresh())
        } else setMsg(r.error ?? 'Delete failed')
      })
    })
  }, [c.id, router])

  const galleryText = c.galleryImages.join('\n')
  const updLink = (i: number, next: ProjectLink) =>
    setC((prev) => ({
      ...prev,
      projectLinks: prev.projectLinks.map((p, j) => (j === i ? next : p)),
      updatedAt: new Date().toISOString(),
    }))

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs
          items={[
            { label: 'Lab', href: '/admin/lab' },
            { label: pickLang(c.title, 'en') || c.slug },
          ]}
        />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Concept workspace</h1>
            {statusPill(c.status)}
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
              View on site
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
              <input className={adminInputClass + ' opacity-70'} readOnly value={c.id} />
            </AdminField>
            <AdminField label="Slug (URL)">
              <input
                className={adminInputClass}
                value={c.slug}
                onChange={(e) =>
                  setC((p) => ({ ...p, slug: e.target.value, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label={`Category (${L})`}>
              <input
                className={adminInputClass}
                value={c.category[L]}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    category: { ...p.category, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label="Status">
              <select
                className={adminInputClass}
                value={c.status}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    status: e.target.value as ConceptCMS['status'],
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
                value={c.title[L]}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    title: { ...p.title, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Short description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-16'}
                value={c.shortDescription[L]}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    shortDescription: { ...p.shortDescription, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Full description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-32'}
                value={c.description[L]}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    description: { ...p.description, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Improvements (${L}) one per line`}>
              <textarea
                className={adminInputClass + ' min-h-24'}
                value={c.improvements[L].join('\n')}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    improvements: {
                      ...p.improvements,
                      [L]: e.target.value
                        .split('\n')
                        .map((x) => x.trim())
                        .filter(Boolean),
                    },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Technologies (${L}) comma-separated`}>
              <input
                className={adminInputClass}
                value={c.technologies[L].join(', ')}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    technologies: {
                      ...p.technologies,
                      [L]: e.target.value
                        .split(',')
                        .map((x) => x.trim())
                        .filter(Boolean),
                    },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label="Order">
              <input
                type="number"
                className={adminInputClass}
                value={c.order}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    order: Number(e.target.value),
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-neutral-400">Media, testimonial, links, SEO</h2>
            <AdminField label="Thumbnail">
              <ImageUploader
                value={c.thumbnailUrl}
                onUrlChange={(url) =>
                  setC((p) => ({ ...p, thumbnailUrl: url, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label="Desktop">
              <ImageUploader
                value={c.desktopImage}
                onUrlChange={(url) =>
                  setC((p) => ({ ...p, desktopImage: url, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label="Mobile">
              <ImageUploader
                value={c.mobileImage}
                onUrlChange={(url) =>
                  setC((p) => ({ ...p, mobileImage: url, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label="Gallery URLs (one per line)">
              <textarea
                className={adminInputClass + ' min-h-24 font-mono text-xs'}
                value={galleryText}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    galleryImages: e.target.value
                      .split('\n')
                      .map((x) => x.trim())
                      .filter(Boolean),
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Testimonial (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-16'}
                value={c.testimonial.quote[L]}
                onChange={(e) =>
                  setC((p) => ({
                    ...p,
                    testimonial: {
                      ...p.testimonial,
                      quote: { ...p.testimonial.quote, [L]: e.target.value },
                    },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-500">Project links</p>
              {c.projectLinks.map((pl, i) => (
                <div key={`pl-${i}`} className="grid gap-2 rounded-lg border border-neutral-800 p-3 md:grid-cols-2">
                  <input
                    className={adminInputClass}
                    value={pl.label[L]}
                    onChange={(e) =>
                      updLink(i, { ...pl, label: { ...pl.label, [L]: e.target.value } })
                    }
                  />
                  <input
                    className={adminInputClass}
                    value={pl.url}
                    onChange={(e) => updLink(i, { ...pl, url: e.target.value })}
                  />
                </div>
              ))}
              <button
                type="button"
                className="text-xs text-neutral-400 hover:text-white"
                onClick={() =>
                  setC((p) => ({
                    ...p,
                    projectLinks: [...p.projectLinks, { label: { en: '', uk: '' }, url: '' }],
                    updatedAt: new Date().toISOString(),
                  }))
                }
              >
                + Add link
              </button>
            </div>
            <AdminField label={`Meta title (${L})`}>
              <input
                className={adminInputClass}
                value={c.seo.metaTitle[L]}
                onChange={(e) =>
                  setC((p) => ({
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
                value={c.seo.metaDescription[L]}
                onChange={(e) =>
                  setC((p) => ({
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
