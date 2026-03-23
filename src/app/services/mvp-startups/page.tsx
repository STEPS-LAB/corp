import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'
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

export default async function MVPStartupsPage() {
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
              { name: locale === 'uk' ? 'MVP для стартапів' : 'MVP for Startups', path: '/services/mvp-startups' },
            ]),
          ],
        }}
      />
      <MVPStartupsContent />
    </>
  )
}
