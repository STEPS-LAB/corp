'use client'

import type { ConceptImageSet } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'
import { AdminField, adminInputClass } from '@/components/admin/admin-ui'
import ImageUploader from '@/components/admin/ImageUploader'

type Props = {
  sets: ConceptImageSet[]
  onChange: (next: ConceptImageSet[]) => void
  L: Locale
}

export function ConceptSetOfImagesEditor({ sets, onChange, L }: Props) {
  const updSet = (i: number, next: ConceptImageSet) =>
    onChange(sets.map((s, j) => (j === i ? next : s)))

  return (
    <div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-200">Коротке прев&apos;ю концепту</h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          Short concept preview — pairs of desktop and mobile screenshots. Use the language toggle to edit alt text per
          locale. URLs are shared across locales.
        </p>
      </div>
      {sets.map((set, i) => (
        <div key={`set-${i}`} className="space-y-3 rounded-lg border border-neutral-800 bg-black/20 p-3">
          <AdminField label="Desktop image">
            <ImageUploader
              value={set.desktopImageUrl}
              onUrlChange={(url) => updSet(i, { ...set, desktopImageUrl: url })}
            />
          </AdminField>
          <AdminField label="Mobile image">
            <ImageUploader
              value={set.mobileImageUrl}
              onUrlChange={(url) => updSet(i, { ...set, mobileImageUrl: url })}
            />
          </AdminField>
          <div className="space-y-2">
            <p className="text-xs font-medium text-neutral-400">Edit Alt text</p>
            <AdminField label={`Alt (${L === 'en' ? 'EN' : 'UK'})`}>
              <input
                className={adminInputClass}
                value={set.altText[L]}
                onChange={(e) =>
                  updSet(i, {
                    ...set,
                    altText: { ...set.altText, [L]: e.target.value },
                  })
                }
              />
            </AdminField>
          </div>
          <button
            type="button"
            className="text-xs text-red-400/90 hover:text-red-300"
            onClick={() => onChange(sets.filter((_, j) => j !== i))}
          >
            Delete Set
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-neutral-400 hover:text-white"
        onClick={() =>
          onChange([...sets, { desktopImageUrl: '', mobileImageUrl: '', altText: { en: '', uk: '' } }])
        }
      >
        + Add New Set
      </button>
    </div>
  )
}
