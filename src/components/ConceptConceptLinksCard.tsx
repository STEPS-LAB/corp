'use client'

import { ExternalLink } from 'lucide-react'
import type { ConceptLinkDisplay } from '@/lib/concepts'

const CONCEPT_TITLES: Record<'en' | 'uk', string> = {
  en: 'Concept Links',
  uk: 'Посилання на концепт',
}

const CASE_TITLES: Record<'en' | 'uk', string> = {
  en: 'Case Links',
  uk: 'Посилання кейсу',
}

type Props = {
  locale: 'en' | 'uk'
  links: ConceptLinkDisplay[]
  /** `concept` — white card on the concept detail page. `case` — inner content only; wrap with `case-sidebar-card` on case pages. */
  placement?: 'concept' | 'case'
}

export default function ConceptConceptLinksCard({ locale, links, placement = 'concept' }: Props) {
  if (links.length === 0) return null

  const title = placement === 'case' ? CASE_TITLES[locale] : CONCEPT_TITLES[locale]
  const linkClass =
    placement === 'case'
      ? 'group inline-flex items-center gap-2.5 rounded-lg text-base font-medium text-text-dark underline decoration-text-dark/25 underline-offset-4 transition hover:text-accent hover:decoration-accent/60'
      : 'group inline-flex items-center gap-2.5 rounded-lg text-base font-medium text-slate-800 underline decoration-slate-300 underline-offset-4 transition hover:text-accent hover:decoration-accent/60'
  const iconClass =
    placement === 'case'
      ? 'h-4 w-4 shrink-0 text-text-dark/40 transition group-hover:text-accent'
      : 'h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-accent'

  const body = (
    <>
      <h3
        className={
          placement === 'case'
            ? 'case-sidebar-title'
            : 'mb-6 font-manrope text-xl font-semibold text-slate-900'
        }
      >
        {title}
      </h3>
      <ul className="flex list-none flex-col gap-3">
        {links.map((link, i) => (
          <li key={`${i}-${link.url}`}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <ExternalLink className={iconClass} aria-hidden />
              <span>{link.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  )

  if (placement === 'case') {
    return body
  }

  return <div className="rounded-2xl border border-slate-200 bg-white p-8">{body}</div>
}
