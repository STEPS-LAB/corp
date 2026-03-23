import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'
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

export default async function SupportScalingPage() {
  const locale = await getServerLocale()
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            getBreadcrumbSchema([
              { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
              { name: locale === 'uk' ? 'Послуги' : 'Services', path: '/services' },
              { name: locale === 'uk' ? 'Підтримка та масштабування' : 'Support and Scaling', path: '/services/support-scaling' },
            ]),
          ],
        }}
      />
      <SupportScalingContent />
    </>
  )
}
