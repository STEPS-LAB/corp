import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import ApproachPageContent from './ApproachPageContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { pages: { approach: { metaTitle: string; metaDescription: string } } }).pages.approach
  return { title: m.metaTitle, description: m.metaDescription }
}

export default function ApproachPage() {
  return <ApproachPageContent />
}
