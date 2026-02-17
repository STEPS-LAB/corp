import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { casePages: { corporate: { metaTitle: string; metaDescription: string } } }).casePages.corporate
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/cases/corporate')).languages },
  }
}

export default function CorporateCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
