import { getCasesFromKv } from '@/lib/kv'
import { PortfolioListClient } from '@/components/admin/PortfolioListClient'

export default async function AdminPortfolioListPage() {
  const cases = await getCasesFromKv()
  return <PortfolioListClient initialCases={cases} />
}
