'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState, useTransition } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { CmsNavLink, FooterMenuColumnCMS, SiteFooterCMS } from '@/lib/cms-types'
import { b } from '@/lib/cms-types'
import { saveSiteFooterAction } from '@/lib/actions/admin-actions'
import { notifyPublicCmsUpdated } from '@/lib/cms-client-sync'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { CmsLocaleBar } from '@/components/admin/CmsLocaleBar'
import { AdminField, AdminSection, adminInputClass } from '@/components/admin/admin-ui'

function emptyColumn(): FooterMenuColumnCMS {
  return { title: b('Column', 'Колонка'), links: [{ href: '/', label: b('Link', 'Посилання') }] }
}

export function CmsSiteFooterClient({ initial }: { initial: SiteFooterCMS }) {
  const router = useRouter()
  const [data, setData] = useState<SiteFooterCMS>(initial)
  const [L, setL] = useState<Locale>('en')
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const baselineRef = useRef(JSON.stringify(initial))
  const isDirty = useMemo(() => JSON.stringify(data) !== baselineRef.current, [data])

  const save = useCallback(() => {
    setMsg(null)
    startTransition(() => {
      void saveSiteFooterAction(data).then((r) => {
        if (r.ok && r.data) {
          setData(r.data.siteFooter)
          baselineRef.current = JSON.stringify(r.data.siteFooter)
          setMsg('Saved.')
          router.refresh()
          notifyPublicCmsUpdated()
        } else setMsg(r.ok ? 'Save failed' : r.error)
      })
    })
  }, [data, router])

  const setLink = (ci: number, li: number, patch: Partial<CmsNavLink>) => {
    const columns = data.columns.map((col, cj) => {
      if (cj !== ci) return col
      const links = col.links.map((row, lj) =>
        lj === li ? { ...row, ...patch, label: patch.label ? { ...row.label, ...patch.label } : row.label } : row
      )
      return { ...col, links }
    })
    setData({ ...data, columns })
  }

  const addLink = (ci: number) => {
    const columns = data.columns.map((col, cj) =>
      cj === ci ? { ...col, links: [...col.links, { href: '/', label: b('New', 'Нове') }] } : col
    )
    setData({ ...data, columns })
  }

  const removeLink = (ci: number, li: number) => {
    const columns = data.columns.map((col, cj) =>
      cj === ci ? { ...col, links: col.links.filter((_, lj) => lj !== li) } : col
    )
    setData({ ...data, columns })
  }

  const addColumn = () => setData({ ...data, columns: [...data.columns, emptyColumn()] })
  const removeColumn = (ci: number) => setData({ ...data, columns: data.columns.filter((_, j) => j !== ci) })

  const setColTitle = (ci: number, title: Partial<{ en: string; uk: string }>) => {
    const columns = data.columns.map((col, j) => (j === ci ? { ...col, title: { ...col.title, ...title } } : col))
    setData({ ...data, columns })
  }

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs
          items={[{ label: 'Global', href: '/admin/global/header' }, { label: 'Footer' }]}
        />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Site footer</h1>
            <p className="mt-1 text-sm text-neutral-500">Copyright, social, contact, menu columns — global:footer.</p>
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

        <AdminSection title="Copyright">
          <AdminField label={`Copyright (${L})`} className="md:col-span-2">
            <input
              className={adminInputClass}
              value={data.copyright[L]}
              onChange={(e) => setData({ ...data, copyright: { ...data.copyright, [L]: e.target.value } })}
            />
          </AdminField>
        </AdminSection>

        <div className="mt-8">
        <AdminSection title="Social links (URLs)">
          <AdminField label="LinkedIn">
            <input
              className={adminInputClass}
              value={data.socialLinks.linkedin}
              onChange={(e) =>
                setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="GitHub">
            <input
              className={adminInputClass}
              value={data.socialLinks.github}
              onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, github: e.target.value } })}
            />
          </AdminField>
          <AdminField label="X">
            <input
              className={adminInputClass}
              value={data.socialLinks.x}
              onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, x: e.target.value } })}
            />
          </AdminField>
        </AdminSection>
        </div>

        <div className="mt-8">
        <AdminSection title="Contact">
          <AdminField label="Email">
            <input
              className={adminInputClass}
              value={data.contactEmail}
              onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
            />
          </AdminField>
          <AdminField label="Phone">
            <input
              className={adminInputClass}
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </AdminField>
        </AdminSection>
        </div>

        <div className="mt-8">
        <AdminSection title="Footer menu columns">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={addColumn}
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-900"
            >
              <Plus className="h-3.5 w-3.5" />
              Add column
            </button>
          </div>
          {data.columns.map((col, ci) => (
            <div key={ci} className="mb-6 rounded-lg border border-neutral-800 p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <AdminField label={`Column title (${L})`} className="min-w-[200px] flex-1">
                  <input
                    className={adminInputClass}
                    value={col.title[L]}
                    onChange={(e) => setColTitle(ci, { [L]: e.target.value })}
                  />
                </AdminField>
                <button
                  type="button"
                  onClick={() => removeColumn(ci)}
                  className="rounded-lg border border-red-900/50 p-2 text-red-400 hover:bg-red-950/30"
                  aria-label="Remove column"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => addLink(ci)}
                className="mb-3 inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <Plus className="h-3 w-3" />
                Add link
              </button>
              {col.links.map((row, li) => (
                <div key={li} className="mb-3 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <input
                    className={adminInputClass}
                    placeholder="href"
                    value={row.href}
                    onChange={(e) => setLink(ci, li, { href: e.target.value })}
                  />
                  <input
                    className={adminInputClass}
                    placeholder={`label (${L})`}
                    value={row.label[L]}
                    onChange={(e) => setLink(ci, li, { label: { ...row.label, [L]: e.target.value } })}
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(ci, li)}
                    className="rounded border border-neutral-700 p-2 text-neutral-500 hover:bg-neutral-900"
                    aria-label="Remove link"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </AdminSection>
        </div>
      </div>
    </main>
  )
}
