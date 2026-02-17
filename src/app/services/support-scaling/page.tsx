import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import SupportScalingContent from './SupportScalingContent'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { servicePages: { supportScaling: { metaTitle: string; metaDescription: string } } }).servicePages.supportScaling
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/services/support-scaling')).languages },
  }
}

export default function SupportScalingPage() {
  return <SupportScalingContent />
}
