import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import WebDevelopmentContent from './WebDevelopmentContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { servicePages: { webDev: { metaTitle: string; metaDescription: string } } }).servicePages.webDev
  return { title: m.metaTitle, description: m.metaDescription }
}

export default function WebDevelopmentPage() {
  return <WebDevelopmentContent />
}
