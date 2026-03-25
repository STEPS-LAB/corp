'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import type { CollectionLandingPage } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'
import type { CollectionLandingSlug } from '@/lib/actions/admin-actions'
import { saveCollectionLandingAction } from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { AdminBreadcrumbs, type Crumb } from '@/components/admin/AdminBreadcrumbs'
import { CmsLocaleBar } from '@/components/admin/CmsLocaleBar'
import { AdminField, adminInputClass } from '@/components/admin/admin-ui'

type Props = {
  slug: CollectionLandingSlug
  initial: CollectionLandingPage
  breadcrumbs: Crumb[]
  listHref: string
}

export function CollectionLandingForm({ slug, initial, breadcrumbs, listHref }: Props) {
  const router = useRouter()
  const [data, setData] = useState<CollectionLandingPage>(initial)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveCollectionLandingAction(slug, data).then((r) => {
        if (r.ok) {
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.error ?? 'Error')
      })
    })
  }, [data, router, slug])

  const featuredText = data.featuredIds.join('\n')

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs items={breadcrumbs} />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Landing page</h1>
            <p className="mt-1 text-sm text-neutral-500">Hero, section title, SEO, and featured item IDs for the public listing.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CmsLocaleBar L={L} setL={setL} />
            <a
              href={listHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-900"
            >
              View on site
            </a>
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

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-neutral-300">Hero</h2>
            <AdminField label={`Badge (${L})`}>
              <input
                className={adminInputClass}
                value={data.badge[L]}
                onChange={(e) => setData({ ...data, badge: { ...data.badge, [L]: e.target.value } })}
              />
            </AdminField>
            <AdminField label={`Title line 1 (${L})`}>
              <input
                className={adminInputClass}
                value={data.heroTitleLine1[L]}
                onChange={(e) =>
                  setData({ ...data, heroTitleLine1: { ...data.heroTitleLine1, [L]: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label={`Title line 2 (${L})`}>
              <input
                className={adminInputClass}
                value={data.heroTitleLine2[L]}
                onChange={(e) =>
                  setData({ ...data, heroTitleLine2: { ...data.heroTitleLine2, [L]: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label={`Description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-24'}
                value={data.heroDescription[L]}
                onChange={(e) =>
                  setData({ ...data, heroDescription: { ...data.heroDescription, [L]: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label={`Section title (${L})`}>
              <input
                className={adminInputClass}
                value={data.sectionTitle[L]}
                onChange={(e) =>
                  setData({ ...data, sectionTitle: { ...data.sectionTitle, [L]: e.target.value } })
                }
              />
            </AdminField>
          </div>
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-neutral-300">SEO &amp; featured</h2>
            <AdminField label={`Meta title (${L})`}>
              <input
                className={adminInputClass}
                value={data.seo.metaTitle[L]}
                onChange={(e) =>
                  setData({
                    ...data,
                    seo: { ...data.seo, metaTitle: { ...data.seo.metaTitle, [L]: e.target.value } },
                  })
                }
              />
            </AdminField>
            <AdminField label={`Meta description (${L})`}>
              <textarea
                className={adminInputClass + ' min-h-20'}
                value={data.seo.metaDescription[L]}
                onChange={(e) =>
                  setData({
                    ...data,
                    seo: {
                      ...data.seo,
                      metaDescription: { ...data.seo.metaDescription, [L]: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Featured item IDs (one per line)" className="lg:col-span-2">
              <textarea
                className={adminInputClass + ' min-h-32 font-mono text-xs'}
                value={featuredText}
                onChange={(e) =>
                  setData({
                    ...data,
                    featuredIds: e.target.value
                      .split('\n')
                      .map((x) => x.trim())
                      .filter(Boolean),
                  })
                }
              />
            </AdminField>
          </div>
        </div>
      </div>
    </main>
  )
}
