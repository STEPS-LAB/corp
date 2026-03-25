'use client'

import { useStableRowKeys } from '@/hooks/useStableRowKeys'
import type { Locale } from '@/lib/i18n'
import type { CaseCMS, ConceptCMS, ProjectLink, ServiceCMS } from '@/lib/cms-types'
import ImageUploader from '@/components/admin/ImageUploader'
import { ConceptSetOfImagesEditor } from '@/components/admin/ConceptSetOfImagesEditor'
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
  deletingItemId,
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
  /** When set, that row’s delete control shows a spinner and is disabled. */
  deletingItemId?: string | null
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
        <div
          key={rowKeys[i] ?? `row-${i}`}
          className={`rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 ${deletingItemId === item.id ? 'opacity-60' : ''}`}
        >
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              disabled={Boolean(deletingItemId)}
              onClick={() => onDelete(item.id)}
              className="text-red-400 hover:text-red-300 disabled:pointer-events-none disabled:opacity-40"
              aria-label={deletingItemId === item.id ? 'Deleting…' : 'Delete'}
            >
              {deletingItemId === item.id ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
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
      <AdminField label="Cover (detail)" className="md:col-span-2">
        <ImageUploader
          value={s.coverImageUrl ?? ''}
          onUrlChange={(url) => upd({ ...s, coverImageUrl: url, updatedAt: new Date().toISOString() })}
        />
      </AdminField>
      <AdminField label="Gallery URLs (one per line)" className="md:col-span-2">
        <textarea
          className={adminInputClass + ' min-h-16 font-mono text-xs'}
          value={(s.galleryImages ?? []).join('\n')}
          onChange={(e) =>
            upd({
              ...s,
              galleryImages: e.target.value
                .split('\n')
                .map((x) => x.trim())
                .filter(Boolean),
              updatedAt: new Date().toISOString(),
            })
          }
        />
      </AdminField>
      <AdminField label={`Tech stack (${L}) one per line`} className="md:col-span-2">
        <textarea
          className={adminInputClass + ' min-h-16 font-mono text-xs'}
          value={(s.techStackLines[L] ?? []).join('\n')}
          onChange={(e) =>
            upd({
              ...s,
              techStackLines: {
                ...s.techStackLines,
                [L]: e.target.value
                  .split('\n')
                  .map((x) => x.trim())
                  .filter(Boolean),
              },
              updatedAt: new Date().toISOString(),
            })
          }
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
      <div className="md:col-span-2 space-y-3 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
        <h3 className="text-sm font-medium text-neutral-200">Project links</h3>
        <p className="text-xs text-neutral-500">
          Link text (bilingual via EN/UK toggle) and URL (shared). Shown as Case Links on the public case detail page.
        </p>
        {(c.projectLinks ?? []).map((pl, i) => (
          <div key={`case-pl-${i}`} className="space-y-2 rounded-lg border border-neutral-800 bg-black/20 p-3">
            <AdminField label={`Link text (${L === 'en' ? 'EN' : 'UK'})`}>
              <input
                className={adminInputClass}
                value={pl.text[L]}
                onChange={(e) => {
                  const next: ProjectLink = { ...pl, text: { ...pl.text, [L]: e.target.value } }
                  upd({
                    ...c,
                    projectLinks: (c.projectLinks ?? []).map((p, j) => (j === i ? next : p)),
                    updatedAt: new Date().toISOString(),
                  })
                }}
              />
            </AdminField>
            <AdminField label="URL">
              <input
                className={adminInputClass + ' font-mono text-xs'}
                value={pl.url}
                onChange={(e) =>
                  upd({
                    ...c,
                    projectLinks: (c.projectLinks ?? []).map((p, j) =>
                      j === i ? { ...p, url: e.target.value } : p
                    ),
                    updatedAt: new Date().toISOString(),
                  })
                }
              />
            </AdminField>
            <button
              type="button"
              className="text-xs text-red-400/90 hover:text-red-300"
              onClick={() =>
                upd({
                  ...c,
                  projectLinks: (c.projectLinks ?? []).filter((_, j) => j !== i),
                  updatedAt: new Date().toISOString(),
                })
              }
            >
              Remove link
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-xs text-neutral-400 hover:text-white"
          onClick={() =>
            upd({
              ...c,
              projectLinks: [...(c.projectLinks ?? []), { text: { en: '', uk: '' }, url: '' }],
              updatedAt: new Date().toISOString(),
            })
          }
        >
          + Add link
        </button>
      </div>
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
  deletingItemId,
}: {
  concepts: ConceptCMS[]
  setConcepts: (c: ConceptCMS[]) => void
  L: Locale
  onSave: () => void
  onAdd: () => void
  onDelete: (id: string) => void
  isPending: boolean
  hideSaveBar?: boolean
  deletingItemId?: string | null
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
      deletingItemId={deletingItemId}
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
          <div className="md:col-span-2">
            <ConceptSetOfImagesEditor
              sets={concept.setOfImages ?? []}
              L={L}
              onChange={(setOfImages) => upd({ ...concept, setOfImages, updatedAt: new Date().toISOString() })}
            />
          </div>
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
