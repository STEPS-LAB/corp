'use client'

import { ExternalLink } from 'lucide-react'
import type { ConceptLinkDisplay } from '@/lib/concepts'

const BLOCK_TITLE: Record<'en' | 'uk', string> = {
  en: 'Concept Links',
  uk: 'Посилання на концепт',
}

type Props = {
  locale: 'en' | 'uk'
  links: ConceptLinkDisplay[]
}

export default function ConceptConceptLinksCard({ locale, links }: Props) {
  if (links.length === 0) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <h3 className="mb-6 font-manrope text-xl font-semibold text-slate-900">{BLOCK_TITLE[locale]}</h3>
      <ul className="flex list-none flex-col gap-3">
        {links.map((link, i) => (
          <li key={`${i}-${link.url}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg text-base font-medium text-slate-800 underline decoration-slate-300 underline-offset-4 transition hover:text-accent hover:decoration-accent/60"
            >
              <ExternalLink
                className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-accent"
                aria-hidden
              />
              <span>{link.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
