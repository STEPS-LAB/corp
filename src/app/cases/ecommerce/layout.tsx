import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { casePages: { ecommerce: { metaTitle: string; metaDescription: string } } }).casePages.ecommerce
  return { title: m.metaTitle, description: m.metaDescription }
}

export default function EcommerceCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
