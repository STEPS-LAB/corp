'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState, useTransition } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { CmsNavLink, SiteHeaderCMS } from '@/lib/cms-types'
import { b } from '@/lib/cms-types'
import { saveSiteHeaderAction } from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { CmsLocaleBar } from '@/components/admin/CmsLocaleBar'
import ImageUploader from '@/components/admin/ImageUploader'
import { AdminField, AdminSection, adminInputClass } from '@/components/admin/admin-ui'

export function CmsSiteHeaderClient({ initial }: { initial: SiteHeaderCMS }) {
  const router = useRouter()
  const [data, setData] = useState<SiteHeaderCMS>(initial)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const baselineRef = useRef(JSON.stringify(initial))
  const isDirty = useMemo(() => JSON.stringify(data) !== baselineRef.current, [data])

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveSiteHeaderAction(data).then((r) => {
        if (r.ok && r.data) {
          setData(r.data.siteHeader)
          baselineRef.current = JSON.stringify(r.data.siteHeader)
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.ok ? 'Save failed' : r.error)
      })
    })
  }, [data, router])

  const setNav = (i: number, patch: Partial<CmsNavLink>) => {
    const navLinks = data.navLinks.map((row, j) =>
      j === i ? { ...row, ...patch, label: patch.label ? { ...row.label, ...patch.label } : row.label } : row
    )
    setData({ ...data, navLinks })
  }

  const addNav = () => {
    setData({
      ...data,
      navLinks: [...data.navLinks, { href: '/', label: b('New', 'Нове') }],
    })
  }

  const removeNav = (i: number) => {
    setData({ ...data, navLinks: data.navLinks.filter((_, j) => j !== i) })
  }

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs
          items={[{ label: 'Global', href: '/admin/global/header' }, { label: 'Header' }]}
        />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Site header</h1>
            <p className="mt-1 text-sm text-neutral-500">Logo (Blob), navigation, CTA — stored as global:header.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CmsLocaleBar L={L} setL={setL} />
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

        <AdminSection title="Logo">
          <ImageUploader label="Logo image" value={data.logoUrl} onUrlChange={(logoUrl) => setData({ ...data, logoUrl })} />
        </AdminSection>

        <div className="mt-8">
        <AdminSection title="Navigation">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={addNav}
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-900"
            >
              <Plus className="h-3.5 w-3.5" />
              Add link
            </button>
          </div>
          {data.navLinks.map((row, i) => (
            <div
              key={i}
              className="mb-4 grid gap-3 rounded-lg border border-neutral-800 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <AdminField label="Path (href)">
                <input
                  className={adminInputClass}
                  value={row.href}
                  onChange={(e) => setNav(i, { href: e.target.value })}
                />
              </AdminField>
              <AdminField label={`Label (${L})`}>
                <input
                  className={adminInputClass}
                  value={row.label[L]}
                  onChange={(e) => setNav(i, { label: { ...row.label, [L]: e.target.value } })}
                />
              </AdminField>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeNav(i)}
                  className="rounded-lg border border-red-900/50 p-2 text-red-400 hover:bg-red-950/30"
                  aria-label="Remove link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </AdminSection>
        </div>

        <div className="mt-8">
        <AdminSection title="CTA button">
          <AdminField label={`Button text (${L})`}>
            <input
              className={adminInputClass}
              value={data.cta.text[L]}
              onChange={(e) =>
                setData({
                  ...data,
                  cta: { ...data.cta, text: { ...data.cta.text, [L]: e.target.value } },
                })
              }
            />
          </AdminField>
          <AdminField label="Link (path, e.g. /contacts)">
            <input
              className={adminInputClass}
              value={data.cta.href}
              onChange={(e) => setData({ ...data, cta: { ...data.cta, href: e.target.value } })}
            />
          </AdminField>
          <p className="text-xs text-neutral-500">
            Paths <code className="text-neutral-400">/contacts</code> or <code className="text-neutral-400">/contact</code>{' '}
            keep the consultation modal; other paths open as normal links.
          </p>
        </AdminSection>
        </div>
      </div>
    </main>
  )
}
