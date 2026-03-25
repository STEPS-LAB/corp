import Link from 'next/link'
import { getFullCmsPayload } from '@/lib/kv'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminDashboardPage() {
  const payload = await getFullCmsPayload()

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10">
        <AdminBreadcrumbs items={[{ label: 'Dashboard' }]} />
        <h1 className="text-2xl font-semibold tracking-tight text-white">Content overview</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Redis-backed CMS. Use the sidebar for pages, collections, and landing wrappers. Each case, service, and concept has its own workspace.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Services', String(payload.services.length)],
            ['Portfolio cases', String(payload.cases.length)],
            ['Lab concepts', String(payload.concepts.length)],
            ['Gallery images', String(payload.pages.images.gallery.length)],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-neutral-500">{k}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link
            href="/admin/portfolio"
            className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-5 py-4 text-sm text-neutral-200 transition hover:border-neutral-600"
          >
            <span className="font-medium text-white">Portfolio</span>
            <span className="mt-1 block text-neutral-500">All cases &amp; /cases landing</span>
          </Link>
          <Link
            href="/admin/services"
            className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-5 py-4 text-sm text-neutral-200 transition hover:border-neutral-600"
          >
            <span className="font-medium text-white">Services</span>
            <span className="mt-1 block text-neutral-500">All services &amp; /services landing</span>
          </Link>
          <Link
            href="/admin/lab"
            className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-5 py-4 text-sm text-neutral-200 transition hover:border-neutral-600"
          >
            <span className="font-medium text-white">Lab</span>
            <span className="mt-1 block text-neutral-500">Concepts &amp; /concepts landing</span>
          </Link>
          <Link
            href="/admin/pages/home"
            className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-5 py-4 text-sm text-neutral-200 transition hover:border-neutral-600"
          >
            <span className="font-medium text-white">Static pages</span>
            <span className="mt-1 block text-neutral-500">Home, About, Contacts, Footer</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
