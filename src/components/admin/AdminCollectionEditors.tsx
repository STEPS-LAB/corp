'use client'

import { useStableRowKeys } from '@/hooks/useStableRowKeys'
import type { Locale } from '@/lib/i18n'
import type { CaseCMS, ConceptCMS, ServiceCMS } from '@/lib/cms-types'
import ImageUploader from '@/components/admin/ImageUploader'
import CaseDetailEditor from '@/components/admin/CaseDetailEditor'
import { AdminField, adminInputClass } from '@/components/admin/admin-ui'
import { Loader2, Plus, Trash2 } from 'lucide-react'

export function CollectionTab<T extends { id: string }>({
  title,
  items,
  setItems,
  onSave,
  onAdd,
  onDelete,
  renderFields,
  isPending,
  hideSaveBar,
}: {
  title: string
  items: T[]
  setItems: (items: T[]) => void
  onSave: () => void
  onAdd: () => void
  onDelete: (id: string) => void
  renderFields: (item: T, index: number, update: (u: T) => void) => React.ReactNode
  isPending: boolean
  hideSaveBar?: boolean
}) {
  const rowKeys = useStableRowKeys(items)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
        >
          <Plus className="h-4 w-4" /> Add new
        </button>
      </div>
      {items.map((item, i) => (
        <div key={rowKeys[i] ?? `row-${i}`} className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="text-red-400 hover:text-red-300"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {renderFields(item, i, (u) => setItems(items.map((x, j) => (j === i ? u : x))))}
        </div>
      ))}
      {!hideSaveBar ? (
        <div className="pt-2">
          <button
            type="button"
            disabled={isPending}
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save &amp; publish
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function ServiceFields({
  s,
  upd,
  L,
}: {
  s: ServiceCMS
  upd: (u: ServiceCMS) => void
  L: Locale
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <AdminField label="ID">
        <input className={adminInputClass} value={s.id} onChange={(e) => upd({ ...s, id: e.target.value })} />
      </AdminField>
      <AdminField label="Href">
        <input className={adminInputClass} value={s.href} onChange={(e) => upd({ ...s, href: e.target.value })} />
      </AdminField>
      <AdminField label="Icon">
        <input className={adminInputClass} value={s.icon_name} onChange={(e) => upd({ ...s, icon_name: e.target.value })} />
      </AdminField>
      <AdminField label={`Title (${L})`}>
        <input
          className={adminInputClass}
          value={s.title[L]}
          onChange={(e) => upd({ ...s, title: { ...s.title, [L]: e.target.value } })}
        />
      </AdminField>
      <AdminField label={`Description (${L})`} className="md:col-span-2">
        <textarea
          className={adminInputClass + ' min-h-20'}
          value={s.description[L]}
          onChange={(e) => upd({ ...s, description: { ...s.description, [L]: e.target.value } })}
        />
      </AdminField>
      <AdminField label={`Price (${L})`}>
        <input
          className={adminInputClass}
          value={s.price[L]}
          onChange={(e) => upd({ ...s, price: { ...s.price, [L]: e.target.value } })}
        />
      </AdminField>
      <AdminField label="Order">
        <input
          type="number"
          className={adminInputClass}
          value={s.order}
          onChange={(e) => upd({ ...s, order: Number(e.target.value), updatedAt: new Date().toISOString() })}
        />
      </AdminField>
    </div>
  )
}

export function CaseFields({ c, upd, L }: { c: CaseCMS; upd: (u: CaseCMS) => void; L: Locale }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <AdminField label="ID">
        <input className={adminInputClass} value={c.id} onChange={(e) => upd({ ...c, id: e.target.value })} />
      </AdminField>
      <AdminField label="Href (public URL path)">
        <p className="mb-1 text-xs text-neutral-500">
          Must start with <code className="text-neutral-400">/cases/</code>, e.g. <code className="text-neutral-400">/cases/ecommerce</code>.
        </p>
        <input className={adminInputClass} value={c.href} onChange={(e) => upd({ ...c, href: e.target.value })} />
      </AdminField>
      <AdminField label={`Title (${L})`} className="md:col-span-2">
        <input
          className={adminInputClass}
          value={c.title[L]}
          onChange={(e) => upd({ ...c, title: { ...c.title, [L]: e.target.value } })}
        />
      </AdminField>
      <AdminField label={`Description (${L})`} className="md:col-span-2">
        <textarea
          className={adminInputClass + ' min-h-20'}
          value={c.description[L]}
          onChange={(e) => upd({ ...c, description: { ...c.description, [L]: e.target.value } })}
        />
      </AdminField>
      <AdminField label={`Result (${L})`} className="md:col-span-2">
        <textarea
          className={adminInputClass + ' min-h-16'}
          value={c.result[L]}
          onChange={(e) => upd({ ...c, result: { ...c.result, [L]: e.target.value } })}
        />
      </AdminField>
      <AdminField label="Card preview (home section)" className="md:col-span-2">
        <ImageUploader
          label="Upload or paste URL"
          value={c.previewImageUrl}
          onUrlChange={(url) => upd({ ...c, previewImageUrl: url })}
        />
      </AdminField>
      <AdminField label="Order">
        <input
          type="number"
          className={adminInputClass}
          value={c.order}
          onChange={(e) => upd({ ...c, order: Number(e.target.value), updatedAt: new Date().toISOString() })}
        />
      </AdminField>
      <details className="md:col-span-2 rounded-xl border border-neutral-800 bg-black/40 p-4 open:pb-6">
        <summary className="cursor-pointer text-sm font-medium text-neutral-200">Full case page</summary>
        <CaseDetailEditor detail={c.detail} L={L} onChange={(detail) => upd({ ...c, detail })} />
      </details>
    </div>
  )
}

export function ConceptsEditor({
  concepts,
  setConcepts,
  L,
  onSave,
  onAdd,
  onDelete,
  isPending,
  hideSaveBar,
}: {
  concepts: ConceptCMS[]
  setConcepts: (c: ConceptCMS[]) => void
  L: Locale
  onSave: () => void
  onAdd: () => void
  onDelete: (id: string) => void
  isPending: boolean
  hideSaveBar?: boolean
}) {
  return (
    <CollectionTab<ConceptCMS>
      title="Concepts"
      items={concepts}
      setItems={setConcepts}
      onSave={onSave}
      onAdd={onAdd}
      onDelete={onDelete}
      isPending={isPending}
      hideSaveBar={hideSaveBar}
      renderFields={(concept, i, upd) => (
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField label="Slug">
            <input
              className={adminInputClass}
              value={concept.slug}
              onChange={(e) => upd({ ...concept, slug: e.target.value })}
            />
          </AdminField>
          <AdminField label="ID">
            <input className={adminInputClass} value={concept.id} onChange={(e) => upd({ ...concept, id: e.target.value })} />
          </AdminField>
          <AdminField label={`Title (${L})`} className="md:col-span-2">
            <input
              className={adminInputClass}
              value={concept.title[L]}
              onChange={(e) => upd({ ...concept, title: { ...concept.title, [L]: e.target.value } })}
            />
          </AdminField>
          <AdminField label={`Short (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-16'}
              value={concept.shortDescription[L]}
              onChange={(e) => upd({ ...concept, shortDescription: { ...concept.shortDescription, [L]: e.target.value } })}
            />
          </AdminField>
          <AdminField label={`Description (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-24'}
              value={concept.description[L]}
              onChange={(e) => upd({ ...concept, description: { ...concept.description, [L]: e.target.value } })}
            />
          </AdminField>
          <AdminField label={`Improvements (${L}) one per line`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-20'}
              value={concept.improvements[L].join('\n')}
              onChange={(e) =>
                upd({
                  ...concept,
                  improvements: {
                    ...concept.improvements,
                    [L]: e.target.value
                      .split('\n')
                      .map((x) => x.trim())
                      .filter(Boolean),
                  },
                })
              }
            />
          </AdminField>
          <AdminField label={`Technologies (${L}) comma-separated`} className="md:col-span-2">
            <input
              className={adminInputClass}
              value={concept.technologies[L].join(', ')}
              onChange={(e) =>
                upd({
                  ...concept,
                  technologies: {
                    ...concept.technologies,
                    [L]: e.target.value
                      .split(',')
                      .map((x) => x.trim())
                      .filter(Boolean),
                  },
                })
              }
            />
          </AdminField>
          <AdminField label="Desktop" className="md:col-span-2">
            <ImageUploader value={concept.desktopImage} onUrlChange={(url) => upd({ ...concept, desktopImage: url })} />
          </AdminField>
          <AdminField label="Mobile" className="md:col-span-2">
            <ImageUploader value={concept.mobileImage} onUrlChange={(url) => upd({ ...concept, mobileImage: url })} />
          </AdminField>
          <AdminField label="Old desktop" className="md:col-span-2">
            <ImageUploader value={concept.oldDesktopImage} onUrlChange={(url) => upd({ ...concept, oldDesktopImage: url })} />
          </AdminField>
          <AdminField label="Old mobile" className="md:col-span-2">
            <ImageUploader value={concept.oldMobileImage} onUrlChange={(url) => upd({ ...concept, oldMobileImage: url })} />
          </AdminField>
          <AdminField label="Order">
            <input
              type="number"
              className={adminInputClass}
              value={concept.order}
              onChange={(e) => upd({ ...concept, order: Number(e.target.value), updatedAt: new Date().toISOString() })}
            />
          </AdminField>
        </div>
      )}
    />
  )
}
