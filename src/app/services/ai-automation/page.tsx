import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import AIAutomationContent from './AIAutomationContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { servicePages: { aiAutomation: { metaTitle: string; metaDescription: string } } }).servicePages.aiAutomation
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/services/ai-automation')).languages },
  }
}

export default function AIAutomationPage() {
  return <AIAutomationContent />
}
