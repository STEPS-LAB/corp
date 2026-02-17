import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import MVPStartupsContent from './MVPStartupsContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { servicePages: { mvpStartups: { metaTitle: string; metaDescription: string } } }).servicePages.mvpStartups
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/services/mvp-startups')).languages },
  }
}

export default function MVPStartupsPage() {
  return <MVPStartupsContent />
}
