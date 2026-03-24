'use client'

import type { Locale } from '@/lib/i18n'
import type { CasePageDetail } from '@/lib/cms-types'
import ImageUploader from '@/components/admin/ImageUploader'

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

type Props = {
  detail: CasePageDetail
  onChange: (next: CasePageDetail) => void
  L: Locale
}

export default function CaseDetailEditor({ detail: d, onChange, L }: Props) {
  const set = (patch: Partial<CasePageDetail>) => onChange({ ...d, ...patch })
  const setImg = (key: keyof CasePageDetail['images'], url: string) =>
    onChange({ ...d, images: { ...d.images, [key]: url } })

  return (
    <div className="mt-4 space-y-6 border-t border-zinc-800 pt-4">
      <p className="text-sm font-medium text-zinc-200">Case page (full URL /cases/…)</p>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label={`Screens block title (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.screensSectionTitle[L]}
            onChange={(e) =>
              set({ screensSectionTitle: { ...d.screensSectionTitle, [L]: e.target.value } })
            }
          />
        </Field>
        <Field label={`Breadcrumb (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.breadcrumb[L]}
            onChange={(e) => set({ breadcrumb: { ...d.breadcrumb, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Subtitle (${L})`} className="md:col-span-2">
          <textarea
            className="mt-1 min-h-16 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.subtitle[L]}
            onChange={(e) => set({ subtitle: { ...d.subtitle, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Overview p1 (${L})`} className="md:col-span-2">
          <textarea
            className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.overviewP1[L]}
            onChange={(e) => set({ overviewP1: { ...d.overviewP1, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Overview p2 (${L})`} className="md:col-span-2">
          <textarea
            className="mt-1 min-h-20 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.overviewP2[L]}
            onChange={(e) => set({ overviewP2: { ...d.overviewP2, [L]: e.target.value } })}
          />
        </Field>
        {([1, 2, 3, 4] as const).map((n) => {
          const capKey = `screen${n}Caption` as const
          const cap = d[capKey]
          return (
            <Field key={n} label={`Screen ${n} caption (${L})`} className="md:col-span-2">
              <input
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                value={cap[L]}
                onChange={(e) =>
                  set({
                    [capKey]: { ...cap, [L]: e.target.value },
                  } as Partial<CasePageDetail>)
                }
              />
            </Field>
          )
        })}
        {([1, 2, 3, 4] as const).map((n) => {
          const tk = `feature${n}Title` as const
          const xk = `feature${n}Text` as const
          const title = d[tk]
          const text = d[xk]
          return (
            <div key={n} className="md:col-span-2 grid gap-2 md:grid-cols-2">
              <Field label={`Feature ${n} title (${L})`}>
                <input
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  value={title[L]}
                  onChange={(e) =>
                    set({
                      [tk]: { ...title, [L]: e.target.value },
                    } as Partial<CasePageDetail>)
                  }
                />
              </Field>
              <Field label={`Feature ${n} text (${L})`} className="md:col-span-2">
                <textarea
                  className="mt-1 min-h-16 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  value={text[L]}
                  onChange={(e) =>
                    set({
                      [xk]: { ...text, [L]: e.target.value },
                    } as Partial<CasePageDetail>)
                  }
                />
              </Field>
            </div>
          )
        })}
        <Field label={`Fullscreen caption (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.fullscreenCaption[L]}
            onChange={(e) => set({ fullscreenCaption: { ...d.fullscreenCaption, [L]: e.target.value } })}
          />
        </Field>
        <Field label="Result 1 number (e.g. 340%)">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.result1Value}
            onChange={(e) => set({ result1Value: e.target.value })}
          />
        </Field>
        <Field label="Result 2 number">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.result2Value}
            onChange={(e) => set({ result2Value: e.target.value })}
          />
        </Field>
        <Field label="Result 3 number / label">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.result3Value}
            onChange={(e) => set({ result3Value: e.target.value })}
          />
        </Field>
        <Field label={`Result 1 label (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.result1Label[L]}
            onChange={(e) => set({ result1Label: { ...d.result1Label, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Result 2 label (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.result2Label[L]}
            onChange={(e) => set({ result2Label: { ...d.result2Label, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Result 3 label (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.result3Label[L]}
            onChange={(e) => set({ result3Label: { ...d.result3Label, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Client type (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.clientType[L]}
            onChange={(e) => set({ clientType: { ...d.clientType, [L]: e.target.value } })}
          />
        </Field>
        <Field label={`Timeline (${L})`}>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.timelineValue[L]}
            onChange={(e) => set({ timelineValue: { ...d.timelineValue, [L]: e.target.value } })}
          />
        </Field>
        <Field label="Technologies (comma-separated, shared)" className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.technologies.join(', ')}
            onChange={(e) =>
              set({
                technologies: e.target.value
                  .split(',')
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label={`Bottom CTA title (${L})`} className="md:col-span-2">
          <input
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            value={d.ctaTitle[L]}
            onChange={(e) => set({ ctaTitle: { ...d.ctaTitle, [L]: e.target.value } })}
          />
        </Field>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Case page images</p>
        <ImageUploader label="Hero background" value={d.images.heroBackground} onUrlChange={(url) => setImg('heroBackground', url)} />
        <ImageUploader label="Hero main (below fold)" value={d.images.heroMain} onUrlChange={(url) => setImg('heroMain', url)} />
        <ImageUploader label="Screen 1" value={d.images.screen1} onUrlChange={(url) => setImg('screen1', url)} />
        <ImageUploader label="Screen 2" value={d.images.screen2} onUrlChange={(url) => setImg('screen2', url)} />
        <ImageUploader label="Screen 3" value={d.images.screen3} onUrlChange={(url) => setImg('screen3', url)} />
        <ImageUploader label="Screen 4" value={d.images.screen4} onUrlChange={(url) => setImg('screen4', url)} />
        <ImageUploader label="Fullscreen section" value={d.images.fullscreen} onUrlChange={(url) => setImg('fullscreen', url)} />
      </div>
    </div>
  )
}
