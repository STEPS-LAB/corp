import { AdminShell } from '@/components/admin/AdminShell'

export default function AdminCmsLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
