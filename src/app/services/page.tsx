import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import ServicesPageContent from './ServicesPageContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { pages: { services: { metaTitle: string; metaDescription: string } } }).pages.services
  return { title: m.metaTitle, description: m.metaDescription }
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
