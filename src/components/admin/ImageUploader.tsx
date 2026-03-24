'use client'

import { useState } from 'react'
import { ImagePlus, Loader2 } from 'lucide-react'

type ImageUploaderProps = {
  label?: string
  value: string
  onUrlChange: (url: string) => void
  className?: string
}

export default function ImageUploader({
  label = 'Image',
  value,
  onUrlChange,
  className = '',
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      const fd = new FormData()
      fd.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })
      let data: { url?: string; error?: string } = {}
      try {
        const text = await res.text()
        if (text) data = JSON.parse(text) as { url?: string; error?: string }
      } catch {
        /* non-JSON error page */
      }
      if (!res.ok) throw new Error(data.error ?? `Upload failed (HTTP ${res.status})`)
      if (data.url) onUrlChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <span className="text-sm text-zinc-300">{label}</span>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-500">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          <span>{loading ? 'Uploading…' : 'Upload to Blob'}</span>
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={loading} />
        </label>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-12 max-w-[120px] rounded border border-zinc-700 object-contain" />
        ) : null}
      </div>
      <input
        type="url"
        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        placeholder="Or paste image URL (CDN / Blob)"
        value={value}
        onChange={(ev) => onUrlChange(ev.target.value)}
      />
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  )
}
