'use client'

import { useLocale } from '@/context/LocaleContext'
import type { Locale } from '@/lib/i18n'
import { useRef, useState, useEffect } from 'react'

const OPTIONS: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'uk', label: 'UA' },
]

export default function LanguageSelect() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-text-light text-sm font-medium opacity-80 hover:opacity-100 transition-opacity py-1.5 px-2 rounded-md border border-transparent hover:border-white/20 min-w-[4rem]"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span>{OPTIONS.find((o) => o.value === locale)?.label ?? locale.toUpperCase()}</span>
        <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute top-full right-0 mt-1 py-1 min-w-[4rem] rounded-lg bg-bg-dark border border-white/10 shadow-lg z-[1002]"
          role="listbox"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.value} role="option" aria-selected={locale === opt.value}>
              <button
                type="button"
                onClick={() => {
                  setLocale(opt.value)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  locale === opt.value ? 'text-accent font-medium' : 'text-text-light opacity-80 hover:opacity-100'
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
