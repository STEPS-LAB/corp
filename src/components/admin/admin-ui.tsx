'use client'

export function AdminField({
  label,
  className = '',
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`block text-sm text-neutral-400 ${className}`}>
      {label}
      {children}
    </label>
  )
}

export function AdminSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <details
      open={defaultOpen}
      className="rounded-xl border border-neutral-800 bg-neutral-950/50 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="cursor-pointer select-none border-b border-neutral-800 px-4 py-3 text-sm font-medium text-neutral-100">
        {title}
      </summary>
      <div className="grid gap-4 p-4 md:grid-cols-2">{children}</div>
    </details>
  )
}

export const adminInputClass =
  'mt-1 w-full rounded-lg border border-neutral-700 bg-black px-3 py-2 text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500'
