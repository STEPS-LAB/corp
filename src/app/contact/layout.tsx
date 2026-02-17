import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { pages: { contact: { metaTitle: string; metaDescription: string } } }).pages.contact
  return { title: m.metaTitle, description: m.metaDescription }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
