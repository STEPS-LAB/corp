import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getAlternateLanguages } from '@/lib/hreflang'
import { SITE_URL } from '@/lib/constants'
import { Inter, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import JsonLd from '@/components/JsonLd'
import { ModalProvider } from '@/hooks/useModal'
import { LocaleProvider } from '@/context/LocaleContext'
import type { Locale } from '@/lib/i18n'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'optional',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-manrope',
  display: 'optional',
})

const messages: Record<Locale, { pages: { home: { metaTitle: string; metaDescription: string } } }> = { en, uk }

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || DEFAULT_LOCALE
  const m = messages[locale]?.pages?.home ?? messages.en.pages.home
  return {
    metadataBase: new URL(SITE_URL),
    title: m.metaTitle,
    description: m.metaDescription,
    keywords: locale === 'uk'
      ? 'розробка сайтів, веб-розробка, AI-розробка, веб-студія, створення сайту'
      : 'website development, web development, AI development, web studio',
    icons: { icon: '/steps-lab-logo.webp' },
    openGraph: {
      title: m.metaTitle,
      description: m.metaDescription,
      type: 'website',
      url: SITE_URL,
    },
    alternates: {
      canonical: '/',
      languages: (await getAlternateLanguages('/')).languages,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || DEFAULT_LOCALE

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-inter antialiased" style={{ backgroundColor: '#0E0E11' }}>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [getOrganizationSchema(), getWebsiteSchema()],
          }}
        />
        <LocaleProvider initialLocale={locale}>
          <ModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Modal />
          </ModalProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
