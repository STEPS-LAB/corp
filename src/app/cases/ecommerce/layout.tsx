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
  const m = (messages[locale] as { casePages: { ecommerce: { metaTitle: string; metaDescription: string } } }).casePages.ecommerce
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/cases/ecommerce')).languages },
  }
}

export default async function EcommerceCaseLayout({
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
              { name: 'E-commerce', path: '/cases/ecommerce' },
            ]),
          ],
        }}
      />
      {children}
    </>
  )
}
