import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import CasesPageContent from './CasesPageContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { pages: { cases: { metaTitle: string; metaDescription: string } } }).pages.cases
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/cases')).languages },
  }
}

export default function CasesPage() {
  return <CasesPageContent />
}
