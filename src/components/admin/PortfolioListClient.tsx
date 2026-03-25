'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { Loader2, Plus, Search } from 'lucide-react'
import type { CaseCMS } from '@/lib/cms-types'
import { pickLang } from '@/lib/cms-types'
import { createCaseDraftAction } from '@/lib/actions/admin-actions'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

function statusPill(status: string) {
  const pub = status === 'published'
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        pub ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'
      }`}
    >
      {pub ? 'Published' : 'Draft'}
    </span>
  )
}

export function PortfolioListClient({ initialCases }: { initialCases: CaseCMS[] }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'all' | 'draft' | 'published'>('all')
  const [pending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return initialCases
      .filter((c) => (status === 'all' ? true : c.status === status))
      .filter((c) => {
        if (!needle) return true
        const t = `${pickLang(c.title, 'en')} ${pickLang(c.title, 'uk')} ${c.slug} ${c.id}`.toLowerCase()
        return t.includes(needle)
      })
      .sort((a, b) => a.order - b.order)
  }, [initialCases, q, status])

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs
          items={[{ label: 'Portfolio', href: '/admin/portfolio' }, { label: 'All cases' }]}
        />
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">All cases</h1>
            <p className="mt-1 text-sm text-neutral-500">Search, filter, open a workspace, or add a draft.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                startTransition(() => {
                  void createCaseDraftAction().then((r) => {
                    if (r.ok && r.data) router.push(`/admin/portfolio/edit/${r.data.id}`)
                    else router.refresh()
                  })
                })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add new
            </button>
            <Link
              href="/admin/portfolio/landing"
              className="inline-flex items-center rounded-xl border border-neutral-700 px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-900"
            >
              Landing page
            </Link>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, slug, id…"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-neutral-600"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-200"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <ul className="space-y-2">
          {filtered.map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/portfolio/edit/${c.id}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3 transition hover:border-neutral-600"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-neutral-100">{pickLang(c.title, 'en')}</p>
                  <p className="truncate text-xs text-neutral-500">
                    {c.slug} · {c.href}
                  </p>
                </div>
                {statusPill(c.status)}
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length === 0 ? <p className="py-12 text-center text-sm text-neutral-500">No matches.</p> : null}
      </div>
    </main>
  )
}
