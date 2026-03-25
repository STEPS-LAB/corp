import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import JsonLd from '@/components/SEO/JsonLd'
import { ModalProvider } from '@/hooks/useModal'
import { LocaleProvider } from '@/context/LocaleContext'
import { SiteContentProvider } from '@/context/SiteContentContext'
import { getAlternateLanguages } from '@/lib/hreflang'
import { SITE_URL } from '@/lib/constants'
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema'
import type { Locale } from '@/lib/i18n'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const messages: Record<Locale, { pages: { home: { metaTitle: string; metaDescription: string } } }> = { en, uk }
const SUPPORTED_LOCALES: Locale[] = ['en', 'uk']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const currentLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : 'en'
  const m = messages[currentLocale]?.pages?.home ?? messages.en.pages.home

  return {
    metadataBase: new URL(SITE_URL),
    title: m.metaTitle,
    description:
      currentLocale === 'uk'
        ? 'STEPS LAB: AI-підтримувана веб-розробка, Next.js performance optimization та custom admin panels для бізнесу.'
        : 'STEPS LAB: AI-supported development studio focused on premium Next.js performance, conversion-ready websites, and custom admin panels.',
    keywords:
      currentLocale === 'uk'
        ? 'AI-supported development, Next.js performance, веб-розробка, custom admin panels'
        : 'AI-supported development, Next.js performance, premium website development, custom admin panels',
    icons: { icon: '/steps-lab_logo-w.webp' },
    openGraph: {
      title: m.metaTitle,
      description: m.metaDescription,
      type: 'website',
      url: `${SITE_URL}/${currentLocale}`,
    },
    alternates: {
      canonical: `/${currentLocale}`,
      languages: (await getAlternateLanguages('/')).languages,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound()
  }

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [getOrganizationSchema(), getWebsiteSchema()],
        }}
      />
      <LocaleProvider initialLocale={locale as Locale}>
        <SiteContentProvider>
          <ModalProvider>
            <Header />
            <main className="relative min-w-0 w-full max-w-full overflow-x-clip">{children}</main>
            <Footer />
            <Modal />
          </ModalProvider>
        </SiteContentProvider>
      </LocaleProvider>
    </>
  )
}
