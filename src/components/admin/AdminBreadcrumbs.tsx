/* eslint-disable react/no-unknown-property */
'use client'

import Link from 'next/link'

export type Crumb = { label: string; href?: string }

export function AdminBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-neutral-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <span className="text-neutral-700">/</span> : null}
            {c.href ? (
              <Link href={c.href} className="text-neutral-400 transition hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-neutral-200">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
