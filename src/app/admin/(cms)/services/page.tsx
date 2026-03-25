import { getServicesFromKv } from '@/lib/kv'
import { ServicesListClient } from '@/components/admin/ServicesListClient'

export default async function AdminServicesListPage() {
  const services = await getServicesFromKv()
  return <ServicesListClient initialServices={services} />
}
