'use client'

import type { Locale } from '@/lib/i18n'

export function CmsLocaleBar({
  L,
  setL,
}: {
  L: Locale
  setL: (loc: Locale) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-neutral-500">Language</span>
      <div className="flex rounded-lg border border-neutral-800 p-0.5">
        {(['en', 'uk'] as const).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setL(loc)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase ${
              L === loc ? 'bg-white text-black' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}
