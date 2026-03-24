'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState, useTransition } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type {
  CaseCMS,
  ConceptCMS,
  PagesContent,
  PublicCmsPayload,
  ServiceCMS,
} from '@/lib/cms-types'
import { defaultCmsPayload } from '@/lib/cms-types'
import ImageUploader from '@/components/admin/ImageUploader'
import {
  type ActionResult,
  addCaseAction,
  addConceptAction,
  addServiceAction,
  deleteCaseAction,
  deleteConceptAction,
  deleteServiceAction,
  saveCasesAction,
  saveConceptsAction,
  savePagesAction,
  saveServicesAction,
  seedCmsAction,
} from '@/lib/actions/admin-actions'

const VALID_TABS = ['general', 'services', 'cases', 'concepts', 'media'] as const
type TabId = (typeof VALID_TABS)[number]

function normalizeTab(tab: string): TabId {
  return VALID_TABS.includes(tab as TabId) ? (tab as TabId) : 'general'
}

type Props = {
  initialPayload: PublicCmsPayload
  initialTab: string
}

export function AdminCmsDashboard({ initialPayload, initialTab }: Props) {
  const router = useRouter()
  const tab = normalizeTab(initialTab)
  const [payload, setPayload] = useState<PublicCmsPayload>(initialPayload ?? defaultCmsPayload())
  const [editLocale, setEditLocale] = useState<Locale>('en')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const L = editLocale

  const setPages = useCallback((p: PagesContent) => setPayload((prev) => ({ ...prev, pages: p })), [])

  const run = useCallback(
    async (fn: () => Promise<ActionResult>) => {
      setMessage(null)
      const r = await fn()
      if (r.ok) {
        setMessage('Saved.')
        router.refresh()
      } else {
        setMessage(r.error ?? 'Error')
      }
    },
    [router]
  )

  const tabLinks = useMemo(
    () =>
      [
        { id: 'general' as const, label: 'General', href: '/admin' },
        { id: 'services' as const, label: 'Services', href: '/admin/services' },
        { id: 'cases' as const, label: 'Cases', href: '/admin/cases' },
        { id: 'concepts' as const, label: 'Concepts', href: '/admin/concepts' },
        { id: 'media' as const, label: 'Media', href: '/admin/media' },
      ] as const,
    []
  )

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-zinc-500">STEPS LAB</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">CMS</h1>
            <p className="mt-1 text-sm text-zinc-400">Minimal editor · KV + Blob</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-zinc-500">Edit language</span>
            <div className="flex rounded-lg border border-zinc-700 p-0.5">
              {(['en', 'uk'] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setEditLocale(loc)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                    L === loc ? 'bg-white text-zinc-900' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="rounded-lg border border-zinc-600 px-3 py-2 text-xs text-zinc-300 hover:border-zinc-500"
              onClick={() => startTransition(() => void seedCmsAction().then((r) => setMessage(r.ok ? 'Seed OK (only if empty)' : r.error)))}
            >
              Seed defaults
            </button>
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2">
          {tabLinks.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className={`rounded-lg border px-3 py-2 text-sm ${
                tab === t.id ? 'border-white bg-white text-black' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        {message ? <p className="mb-4 text-sm text-amber-200">{message}</p> : null}

        {tab === 'general' && (
          <GeneralTab
            pages={payload.pages}
            setPages={setPages}
            L={L}
            onSave={() => run(() => savePagesAction(payload.pages))}
            isPending={isPending}
          />
        )}

        {tab === 'services' && (
          <CollectionTab<ServiceCMS>
            title="Services"
            items={payload.services}
            setItems={(services) => setPayload((p) => ({ ...p, services }))}
            onSave={() => run(() => saveServicesAction(payload.services))}
            onAdd={() =>
              startTransition(() => {
                void addServiceAction().then((r) => {
                  if (r.ok && r.data) setPayload((p) => ({ ...p, services: r.data! }))
                })
              })
            }
            onDelete={(id) =>
              startTransition(() => {
                void deleteServiceAction(id).then((r) => {
                  if (r.ok && r.data) setPayload((p) => ({ ...p, services: r.data! }))
                })
              })
            }
            renderFields={(s, _i, upd) => <ServiceFields s={s} upd={upd} L={L} />}
            isPending={isPending}
          />
        )}

        {tab === 'cases' && (
          <CollectionTab<CaseCMS>
            title="Cases"
            items={payload.cases}
            setItems={(cases) => setPayload((p) => ({ ...p, cases }))}
            onSave={() => run(() => saveCasesAction(payload.cases))}
            onAdd={() =>
              startTransition(() => {
                void addCaseAction().then((r) => {
                  if (r.ok && r.data) setPayload((p) => ({ ...p, cases: r.data! }))
                })
              })
            }
            onDelete={(id) =>
              startTransition(() => {
                void deleteCaseAction(id).then((r) => {
                  if (r.ok && r.data) setPayload((p) => ({ ...p, cases: r.data! }))
                })
              })
            }
            renderFields={(c, _i, upd) => <CaseFields c={c} upd={upd} L={L} />}
            isPending={isPending}
          />
        )}

        {tab === 'concepts' && (
          <ConceptsEditor
            concepts={payload.concepts}
            setConcepts={(concepts) => setPayload((p) => ({ ...p, concepts }))}
            L={L}
            onSave={() => run(() => saveConceptsAction(payload.concepts))}
            onAdd={() =>
              startTransition(() => {
                void addConceptAction().then((r) => {
                  if (r.ok && r.data) setPayload((p) => ({ ...p, concepts: r.data! }))
                })
              })
            }
            onDelete={(id) =>
              startTransition(() => {
                void deleteConceptAction(id).then((r) => {
                  if (r.ok && r.data) setPayload((p) => ({ ...p, concepts: r.data! }))
                })
              })
            }
            isPending={isPending}
          />
        )}

        {tab === 'media' && (
          <MediaTab
            pages={payload.pages}
            setPages={setPages}
            onSave={() => run(() => savePagesAction(payload.pages))}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  )
}

function GeneralTab({
  pages,
  setPages,
  L,
  onSave,
  isPending,
}: {
  pages: PagesContent
  setPages: (p: PagesContent) => void
  L: Locale
  onSave: () => void
  isPending: boolean
}) {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 className="text-lg font-semibold">General · Hero &amp; About · Labels</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={`Hero title (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.hero.title[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                hero: { ...pages.hero, title: { ...pages.hero.title, [L]: e.target.value } },
              })
            }
          />
        </Field>
        <Field label={`CTA link`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.hero.ctaLink}
            onChange={(e) => setPages({ ...pages, hero: { ...pages.hero, ctaLink: e.target.value } })}
          />
        </Field>
        <Field label={`Hero subtitle (${L})`} className="md:col-span-2">
          <textarea
            className="mt-1 min-h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.hero.subtitle[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                hero: { ...pages.hero, subtitle: { ...pages.hero.subtitle, [L]: e.target.value } },
              })
            }
          />
        </Field>
        <Field label={`CTA text (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.hero.ctaText[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                hero: { ...pages.hero, ctaText: { ...pages.hero.ctaText, [L]: e.target.value } },
              })
            }
          />
        </Field>
        <Field label={`Workflow (${L})`} className="md:col-span-2">
          <textarea
            className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.aboutTech.workflowDescription[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                aboutTech: {
                  ...pages.aboutTech,
                  workflowDescription: {
                    ...pages.aboutTech.workflowDescription,
                    [L]: e.target.value,
                  },
                },
              })
            }
          />
        </Field>
        <Field label={`Team (${L})`} className="md:col-span-2">
          <textarea
            className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.aboutTech.teamExperience[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                aboutTech: {
                  ...pages.aboutTech,
                  teamExperience: { ...pages.aboutTech.teamExperience, [L]: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label={`Cases section title (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.labels.casesSectionTitle[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: {
                  ...pages.labels,
                  casesSectionTitle: { ...pages.labels.casesSectionTitle, [L]: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label={`Concepts heading (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.labels.conceptsHeading[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: {
                  ...pages.labels,
                  conceptsHeading: { ...pages.labels.conceptsHeading, [L]: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label={`View all concepts (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.labels.conceptsViewAll[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: {
                  ...pages.labels,
                  conceptsViewAll: { ...pages.labels.conceptsViewAll, [L]: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label={`View case label (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.labels.casesViewCase[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: {
                  ...pages.labels,
                  casesViewCase: { ...pages.labels.casesViewCase, [L]: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label="Footer email">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.footer.contactEmail}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: { ...pages.footer, contactEmail: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Footer phone">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.footer.phone}
            onChange={(e) => setPages({ ...pages, footer: { ...pages.footer, phone: e.target.value } })}
          />
        </Field>
        <Field label={`Copyright (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.footer.copyrightText[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: {
                  ...pages.footer,
                  copyrightText: { ...pages.footer.copyrightText, [L]: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label="LinkedIn URL">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.footer.socialLinks.linkedin}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: {
                  ...pages.footer,
                  socialLinks: { ...pages.footer.socialLinks, linkedin: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label="GitHub URL">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.footer.socialLinks.github}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: {
                  ...pages.footer,
                  socialLinks: { ...pages.footer.socialLinks, github: e.target.value },
                },
              })
            }
          />
        </Field>
        <Field label="X URL">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={pages.footer.socialLinks.x}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: {
                  ...pages.footer,
                  socialLinks: { ...pages.footer.socialLinks, x: e.target.value },
                },
              })
            }
          />
        </Field>
      </div>
      <SaveBar onSave={onSave} isPending={isPending} />
    </div>
  )
}

function MediaTab({
  pages,
  setPages,
  onSave,
  isPending,
}: {
  pages: PagesContent
  setPages: (p: PagesContent) => void
  onSave: () => void
  isPending: boolean
}) {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 className="text-lg font-semibold">Media</h2>
      <ImageUploader label="Logo" value={pages.images.logo} onUrlChange={(url) => setPages({ ...pages, images: { ...pages.images, logo: url } })} />
      <ImageUploader label="Hero image URL" value={pages.images.hero} onUrlChange={(url) => setPages({ ...pages, images: { ...pages.images, hero: url } })} />
      <ImageUploader
        label="Hero (section) image"
        value={pages.hero.heroImageUrl}
        onUrlChange={(url) => setPages({ ...pages, hero: { ...pages.hero, heroImageUrl: url } })}
      />
      <Field label="Gallery URLs (one per line)">
        <textarea
          className="mt-1 min-h-32 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={pages.images.gallery.join('\n')}
          onChange={(e) =>
            setPages({
              ...pages,
              images: {
                ...pages.images,
                gallery: e.target.value
                  .split('\n')
                  .map((x) => x.trim())
                  .filter(Boolean),
              },
            })
          }
        />
      </Field>
      <SaveBar onSave={onSave} isPending={isPending} />
    </div>
  )
}

function Field({
  label,
  className = '',
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`block text-sm text-zinc-300 ${className}`}>
      {label}
      {children}
    </label>
  )
}

function SaveBar({ onSave, isPending }: { onSave: () => void; isPending: boolean }) {
  return (
    <div className="pt-4">
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
  )
}

function CollectionTab<T extends { id: string }>({
  title,
  items,
  setItems,
  onSave,
  onAdd,
  onDelete,
  renderFields,
  isPending,
}: {
  title: string
  items: T[]
  setItems: (items: T[]) => void
  onSave: () => void
  onAdd: () => void
  onDelete: (id: string) => void
  renderFields: (item: T, index: number, update: (u: T) => void) => React.ReactNode
  isPending: boolean
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" /> Add new
        </button>
      </div>
      {items.map((item, i) => (
        <div key={item.id} className="rounded-xl border border-zinc-800 p-4">
          <div className="mb-3 flex justify-end">
            <button type="button" onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-300" aria-label="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {renderFields(item, i, (u) => setItems(items.map((x, j) => (j === i ? u : x))))}
        </div>
      ))}
      <SaveBar onSave={onSave} isPending={isPending} />
    </div>
  )
}

function ServiceFields({
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
      <Field label="ID">
        <input className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={s.id} onChange={(e) => upd({ ...s, id: e.target.value })} />
      </Field>
      <Field label="Href">
        <input className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={s.href} onChange={(e) => upd({ ...s, href: e.target.value })} />
      </Field>
      <Field label="Icon">
        <input
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={s.icon_name}
          onChange={(e) => upd({ ...s, icon_name: e.target.value })}
        />
      </Field>
      <Field label={`Title (${L})`}>
        <input
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={s.title[L]}
          onChange={(e) => upd({ ...s, title: { ...s.title, [L]: e.target.value } })}
        />
      </Field>
      <Field label={`Description (${L})`} className="md:col-span-2">
        <textarea
          className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={s.description[L]}
          onChange={(e) => upd({ ...s, description: { ...s.description, [L]: e.target.value } })}
        />
      </Field>
      <Field label={`Price (${L})`}>
        <input
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={s.price[L]}
          onChange={(e) => upd({ ...s, price: { ...s.price, [L]: e.target.value } })}
        />
      </Field>
      <Field label="Order">
        <input
          type="number"
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={s.order}
          onChange={(e) => upd({ ...s, order: Number(e.target.value), updatedAt: new Date().toISOString() })}
        />
      </Field>
    </div>
  )
}

function CaseFields({ c, upd, L }: { c: CaseCMS; upd: (u: CaseCMS) => void; L: Locale }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label="ID">
        <input className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={c.id} onChange={(e) => upd({ ...c, id: e.target.value })} />
      </Field>
      <Field label="Href">
        <input className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={c.href} onChange={(e) => upd({ ...c, href: e.target.value })} />
      </Field>
      <Field label={`Title (${L})`} className="md:col-span-2">
        <input
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={c.title[L]}
          onChange={(e) => upd({ ...c, title: { ...c.title, [L]: e.target.value }, updatedAt: new Date().toISOString() })}
        />
      </Field>
      <Field label={`Description (${L})`} className="md:col-span-2">
        <textarea
          className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={c.description[L]}
          onChange={(e) => upd({ ...c, description: { ...c.description, [L]: e.target.value }, updatedAt: new Date().toISOString() })}
        />
      </Field>
      <Field label={`Result (${L})`} className="md:col-span-2">
        <textarea
          className="mt-1 min-h-16 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={c.result[L]}
          onChange={(e) => upd({ ...c, result: { ...c.result, [L]: e.target.value }, updatedAt: new Date().toISOString() })}
        />
      </Field>
      <Field label="Preview image URL" className="md:col-span-2">
        <input
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          value={c.previewImageUrl}
          onChange={(e) => upd({ ...c, previewImageUrl: e.target.value })}
        />
      </Field>
    </div>
  )
}

function ConceptsEditor({
  concepts,
  setConcepts,
  L,
  onSave,
  onAdd,
  onDelete,
  isPending,
}: {
  concepts: ConceptCMS[]
  setConcepts: (c: ConceptCMS[]) => void
  L: Locale
  onSave: () => void
  onAdd: () => void
  onDelete: (id: string) => void
  isPending: boolean
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
      renderFields={(concept, i, upd) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Slug">
            <input
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
              value={concept.slug}
              onChange={(e) => upd({ ...concept, slug: e.target.value, updatedAt: new Date().toISOString() })}
            />
          </Field>
          <Field label="ID">
            <input className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={concept.id} onChange={(e) => upd({ ...concept, id: e.target.value })} />
          </Field>
          <Field label={`Title (${L})`} className="md:col-span-2">
            <input
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
              value={concept.title[L]}
              onChange={(e) => upd({ ...concept, title: { ...concept.title, [L]: e.target.value }, updatedAt: new Date().toISOString() })}
            />
          </Field>
          <Field label={`Short (${L})`} className="md:col-span-2">
            <textarea
              className="mt-1 min-h-16 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
              value={concept.shortDescription[L]}
              onChange={(e) => upd({ ...concept, shortDescription: { ...concept.shortDescription, [L]: e.target.value }, updatedAt: new Date().toISOString() })}
            />
          </Field>
          <Field label={`Description (${L})`} className="md:col-span-2">
            <textarea
              className="mt-1 min-h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
              value={concept.description[L]}
              onChange={(e) => upd({ ...concept, description: { ...concept.description, [L]: e.target.value }, updatedAt: new Date().toISOString() })}
            />
          </Field>
          <Field label={`Improvements (${L}) one per line`} className="md:col-span-2">
            <textarea
              className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
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
                  updatedAt: new Date().toISOString(),
                })
              }
            />
          </Field>
          <Field label={`Technologies (${L}) comma-separated`} className="md:col-span-2">
            <input
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
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
                  updatedAt: new Date().toISOString(),
                })
              }
            />
          </Field>
          <Field label="Desktop" className="md:col-span-2">
            <ImageUploader value={concept.desktopImage} onUrlChange={(url) => upd({ ...concept, desktopImage: url })} />
          </Field>
          <Field label="Mobile" className="md:col-span-2">
            <ImageUploader value={concept.mobileImage} onUrlChange={(url) => upd({ ...concept, mobileImage: url })} />
          </Field>
          <Field label="Old desktop" className="md:col-span-2">
            <ImageUploader value={concept.oldDesktopImage} onUrlChange={(url) => upd({ ...concept, oldDesktopImage: url })} />
          </Field>
          <Field label="Old mobile" className="md:col-span-2">
            <ImageUploader value={concept.oldMobileImage} onUrlChange={(url) => upd({ ...concept, oldMobileImage: url })} />
          </Field>
          <Field label="Order">
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
              value={concept.order}
              onChange={(e) => upd({ ...concept, order: Number(e.target.value), updatedAt: new Date().toISOString() })}
            />
          </Field>
        </div>
      )}
    />
  )
}
