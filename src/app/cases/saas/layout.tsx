import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/server-locale'
import { getAlternateLanguages } from '@/lib/hreflang'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages = { en, uk } as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const m = (messages[locale] as { casePages: { saas: { metaTitle: string; metaDescription: string } } }).casePages.saas
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/cases/saas')).languages },
  }
}

export default async function SaaSCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getServerLocale()
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            getBreadcrumbSchema([
              { name: locale === 'uk' ? 'Головна' : 'Home', path: '/' },
              { name: locale === 'uk' ? 'Кейси' : 'Cases', path: '/cases' },
              { name: 'SaaS MVP', path: '/cases/saas' },
            ]),
          ],
        }}
      />
      {children}
    </>
  )
}
