import { AdminSidebar } from '@/components/admin/AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-neutral-100">
      <AdminSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
