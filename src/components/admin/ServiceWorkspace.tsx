'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { ExternalLink, Loader2, Trash2 } from 'lucide-react'
import type { ServiceCMS } from '@/lib/cms-types'
import { pickLang } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'
import { deleteServiceAction, loadCmsPayloadAction, saveCmsItemAction } from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
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

export function ServiceWorkspace({ initialService }: { initialService: ServiceCMS }) {
  const router = useRouter()
  const [s, setS] = useState<ServiceCMS>(initialService)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const previewUrl = `/${L}${s.href.startsWith('/') ? s.href : `/${s.href}`}`

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveCmsItemAction('services', { ...s, updatedAt: new Date().toISOString() }).then((r) => {
        if (r.ok) {
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.error ?? 'Error')
      })
    })
  }, [router, s])

  const remove = useCallback(() => {
    if (!window.confirm('Delete this service?')) return
    startTransition(() => {
      void deleteServiceAction(s.id).then((r) => {
        if (r.ok) {
          notifyPublicCmsUpdated()
          router.push('/admin/services')
        } else setMsg(r.error ?? 'Delete failed')
      })
    })
  }, [router, s.id])

  const benefitsText = s.benefits[L].join('\n')
  const processText = s.processSteps[L].join('\n')
  const galleryText = (s.galleryImages ?? []).join('\n')
  const techStackText = (s.techStackLines[L] ?? []).join('\n')

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs
          items={[{ label: 'Services', href: '/admin/services' }, { label: pickLang(s.title, 'en') || s.id }]}
        />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Service workspace</h1>
            {statusPill(s.status)}
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
              onClick={remove}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/50 px-3 py-2 text-xs text-red-300 hover:bg-red-950/40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
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
              <input className={adminInputClass + ' opacity-70'} readOnly value={s.id} />
            </AdminField>
            <AdminField label="Href (public path)">
              <input
                className={adminInputClass}
                value={s.href}
                onChange={(e) =>
                  setS((p) => ({ ...p, href: e.target.value, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label="Icon name">
              <input
                className={adminInputClass}
                value={s.icon_name}
                onChange={(e) =>
                  setS((p) => ({ ...p, icon_name: e.target.value, updatedAt: new Date().toISOString() }))
                }
              />
            </AdminField>
            <AdminField label="Status">
              <select
                className={adminInputClass}
                value={s.status}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    status: e.target.value as ServiceCMS['status'],
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
                value={s.title[L]}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    title: { ...p.title, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Short description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-20'}
                value={s.description[L]}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    description: { ...p.description, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Long description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-32'}
                value={s.longDescription[L]}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    longDescription: { ...p.longDescription, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Price label (${L})`}>
              <input
                className={adminInputClass}
                value={s.price[L]}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    price: { ...p.price, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label="Order">
              <input
                type="number"
                className={adminInputClass}
                value={s.order}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    order: Number(e.target.value),
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
          </div>
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-neutral-400">Benefits, process, SEO</h2>
            <AdminField label={`Benefits (${L}) one per line`}>
              <textarea
                className={adminInputClass + ' min-h-28'}
                value={benefitsText}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    benefits: {
                      ...p.benefits,
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
            <AdminField label={`Pricing note (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-20'}
                value={s.pricingNote[L]}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    pricingNote: { ...p.pricingNote, [L]: e.target.value },
                    updatedAt: new Date().toISOString(),
                  }))
                }
              />
            </AdminField>
            <AdminField label={`Process steps (${L}) one per line`}>
              <textarea
                className={adminInputClass + ' min-h-28'}
                value={processText}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    processSteps: {
                      ...p.processSteps,
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
            <AdminField label={`Meta title (${L})`}>
              <input
                className={adminInputClass}
                value={s.seo.metaTitle[L]}
                onChange={(e) =>
                  setS((p) => ({
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
                value={s.seo.metaDescription[L]}
                onChange={(e) =>
                  setS((p) => ({
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

        <div className="mt-10 space-y-4 border-t border-neutral-800 pt-10">
          <h2 className="text-sm font-medium text-neutral-400">Media & tech stack</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <AdminField label="Cover image (detail hero)">
              <ImageUploader
                value={s.coverImageUrl ?? ''}
                onUrlChange={(url) => setS((p) => ({ ...p, coverImageUrl: url, updatedAt: new Date().toISOString() }))}
              />
            </AdminField>
            <AdminField label="Gallery image URLs (one per line)">
              <textarea
                className={adminInputClass + ' min-h-28'}
                value={galleryText}
                onChange={(e) =>
                  setS((p) => ({
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
            <AdminField label={`Technology lines (${L}) one per line`} className="lg:col-span-2">
              <textarea
                className={adminInputClass + ' min-h-24'}
                value={techStackText}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    techStackLines: {
                      ...p.techStackLines,
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
          </div>
        </div>
      </div>
    </main>
  )
}
