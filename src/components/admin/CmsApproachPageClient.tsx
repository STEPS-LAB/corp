'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState, useTransition } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { ApproachPageCMS, ApproachStepCMS } from '@/lib/cms-types'
import { b } from '@/lib/cms-types'
import { saveApproachPageAction } from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { CmsLocaleBar } from '@/components/admin/CmsLocaleBar'
import ImageUploader from '@/components/admin/ImageUploader'
import { AdminField, AdminSection, adminInputClass } from '@/components/admin/admin-ui'

function emptyStep(n: string): ApproachStepCMS {
  return { number: n, title: b('', ''), text: b('', '') }
}

export function CmsApproachPageClient({ initial }: { initial: ApproachPageCMS }) {
  const router = useRouter()
  const [data, setData] = useState<ApproachPageCMS>(initial)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const baselineRef = useRef(JSON.stringify(initial))
  const isDirty = useMemo(() => JSON.stringify(data) !== baselineRef.current, [data])

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveApproachPageAction(data).then((r) => {
        if (r.ok && r.data) {
          setData(r.data.approachPage)
          baselineRef.current = JSON.stringify(r.data.approachPage)
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.ok ? 'Save failed' : r.error)
      })
    })
  }, [data, router])

  const setStep = (i: number, patch: Partial<ApproachStepCMS>) => {
    const steps = data.steps.map((row, j) =>
      j === i
        ? {
            ...row,
            ...patch,
            title: patch.title ? { ...row.title, ...patch.title } : row.title,
            text: patch.text ? { ...row.text, ...patch.text } : row.text,
          }
        : row
    )
    setData({ ...data, steps })
  }

  const addStep = () => {
    const n = String(data.steps.length + 1).padStart(2, '0')
    setData({ ...data, steps: [...data.steps, emptyStep(n)] })
  }

  const removeStep = (i: number) => setData({ ...data, steps: data.steps.filter((_, j) => j !== i) })

  const setBullet = (i: number, value: string) => {
    const whyBullets = data.whyBullets.map((row, j) => (j === i ? { ...row, [L]: value } : row))
    setData({ ...data, whyBullets })
  }

  const addBullet = () => setData({ ...data, whyBullets: [...data.whyBullets, b('', '')] })
  const removeBullet = (i: number) => setData({ ...data, whyBullets: data.whyBullets.filter((_, j) => j !== i) })

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs items={[{ label: 'Pages', href: '/admin/pages/home' }, { label: 'Approach' }]} />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Approach page</h1>
            <p className="mt-1 text-sm text-neutral-500">Bilingual copy and images — page:approach.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CmsLocaleBar L={L} setL={setL} />
            <a
              href="/en/approach"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-900"
            >
              View on site
            </a>
            <button
              type="button"
              disabled={pending || !isDirty}
              onClick={save}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-40"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </button>
          </div>
        </div>
        {msg ? <p className="mb-6 text-sm text-amber-200">{msg}</p> : null}

        <AdminSection title="SEO">
          <AdminField label={`Meta title (${L})`} className="md:col-span-2">
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
          <AdminField label={`Meta description (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-20'}
              value={data.seo.metaDescription[L]}
              onChange={(e) =>
                setData({
                  ...data,
                  seo: { ...data.seo, metaDescription: { ...data.seo.metaDescription, [L]: e.target.value } },
                })
              }
            />
          </AdminField>
        </AdminSection>

        <div className="mt-8">
        <AdminSection title="Hero">
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
          <AdminField label={`Description (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-24'}
              value={data.heroDescription[L]}
              onChange={(e) =>
                setData({ ...data, heroDescription: { ...data.heroDescription, [L]: e.target.value } })
              }
            />
          </AdminField>
        </AdminSection>
        </div>

        <div className="mt-8">
        <AdminSection title="Process section">
          <AdminField label={`Section title (${L})`} className="md:col-span-2">
            <input
              className={adminInputClass}
              value={data.sectionTitle[L]}
              onChange={(e) => setData({ ...data, sectionTitle: { ...data.sectionTitle, [L]: e.target.value } })}
            />
          </AdminField>
          <AdminField label={`Section subtitle (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-16'}
              value={data.sectionSubtitle[L]}
              onChange={(e) =>
                setData({ ...data, sectionSubtitle: { ...data.sectionSubtitle, [L]: e.target.value } })
              }
            />
          </AdminField>
          <div className="col-span-full mb-2 flex justify-end">
            <button
              type="button"
              onClick={addStep}
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-900"
            >
              <Plus className="h-3.5 w-3.5" />
              Add step
            </button>
          </div>
          {data.steps.map((row, i) => (
            <div key={i} className="col-span-full mb-4 rounded-lg border border-neutral-800 p-4">
              <div className="mb-3 flex justify-between gap-2">
                <AdminField label="Number" className="w-24">
                  <input
                    className={adminInputClass}
                    value={row.number}
                    onChange={(e) => setStep(i, { number: e.target.value })}
                  />
                </AdminField>
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="self-end rounded-lg border border-red-900/50 p-2 text-red-400 hover:bg-red-950/30"
                  aria-label="Remove step"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <AdminField label={`Step title (${L})`}>
                <input
                  className={adminInputClass}
                  value={row.title[L]}
                  onChange={(e) => setStep(i, { title: { ...row.title, [L]: e.target.value } })}
                />
              </AdminField>
              <AdminField label={`Step text (${L})`} className="md:col-span-2">
                <textarea
                  className={adminInputClass + ' min-h-20'}
                  value={row.text[L]}
                  onChange={(e) => setStep(i, { text: { ...row.text, [L]: e.target.value } })}
                />
              </AdminField>
            </div>
          ))}
        </AdminSection>
        </div>

        <div className="mt-8">
        <AdminSection title="Why block (bottom)">
          <AdminField label={`Title (${L})`} className="md:col-span-2">
            <input
              className={adminInputClass}
              value={data.whyTitle[L]}
              onChange={(e) => setData({ ...data, whyTitle: { ...data.whyTitle, [L]: e.target.value } })}
            />
          </AdminField>
          <div className="col-span-full mb-2 flex justify-end">
            <button
              type="button"
              onClick={addBullet}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
            >
              <Plus className="h-3 w-3" />
              Add bullet
            </button>
          </div>
          {data.whyBullets.map((row, i) => (
            <div key={i} className="col-span-full mb-2 flex gap-2">
              <input
                className={adminInputClass + ' flex-1'}
                value={row[L]}
                onChange={(e) => setBullet(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeBullet(i)}
                className="rounded border border-neutral-700 p-2 text-neutral-500 hover:bg-neutral-900"
                aria-label="Remove bullet"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <AdminField label={`Quote (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-24'}
              value={data.whyQuote[L]}
              onChange={(e) => setData({ ...data, whyQuote: { ...data.whyQuote, [L]: e.target.value } })}
            />
          </AdminField>
          <div className="col-span-full">
            <ImageUploader
              label="Why section image (optional)"
              value={data.whyImageUrl}
              onUrlChange={(whyImageUrl) => setData({ ...data, whyImageUrl })}
            />
          </div>
        </AdminSection>
        </div>
      </div>
    </main>
  )
}
