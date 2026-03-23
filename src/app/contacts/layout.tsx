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
  const m = (messages[locale] as { pages: { contact: { metaTitle: string; metaDescription: string } } }).pages.contact
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: (await getAlternateLanguages('/contacts')).languages },
  }
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            getBreadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Contacts', path: '/contacts' },
            ]),
          ],
        }}
      />
      {children}
    </>
  )
}
