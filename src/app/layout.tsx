import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Inter, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import ScrollAnimations from '@/components/ScrollAnimations'
import { ModalProvider } from '@/hooks/useModal'
import { LocaleProvider } from '@/context/LocaleContext'
import type { Locale } from '@/lib/i18n'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const messages: Record<Locale, { pages: { home: { metaTitle: string; metaDescription: string } } }> = { en, uk }

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || DEFAULT_LOCALE
  const m = messages[locale]?.pages?.home ?? messages.en.pages.home
  return {
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.body.style.backgroundColor = '#0E0E11';
                } catch(e) {}
              })();
            `,
          }}
        />
        <div id="preloader" className="preloader" suppressHydrationWarning>
          <div className="preloader-content">
            <div className="preloader-text">
              <span className="preloader-char">S</span>
              <span className="preloader-char">T</span>
              <span className="preloader-char">E</span>
              <span className="preloader-char">P</span>
              <span className="preloader-char">S</span>
            </div>
            <div className="preloader-subtitle">LAB</div>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const preloader = document.getElementById('preloader');
              const hasVisited = sessionStorage.getItem('hasVisited');
              if (!hasVisited) {
                  window.addEventListener('load', () => {
                      setTimeout(() => {
                          preloader.style.transition = 'opacity 0.6s ease';
                          preloader.style.opacity = '0';
                          document.body.classList.add('loaded');
                          setTimeout(() => {
                              preloader.style.display = 'none';
                              sessionStorage.setItem('hasVisited', 'true');
                          }, 600);
                      }, 2000);
                  });
              } else {
                  preloader.style.display = 'none';
                  document.body.classList.add('loaded');
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                  function forceAnimation() {
                      var preloader = document.getElementById('preloader');
                      if (!preloader) { setTimeout(forceAnimation, 10); return; }
                      var hasVisited = sessionStorage.getItem('hasVisited');
                      if (hasVisited) return;
                      setTimeout(function() {
                          var chars = preloader.querySelectorAll('.preloader-char');
                          for (var i = 0; i < chars.length; i++) {
                              var char = chars[i];
                              char.style.animation = 'none';
                              void char.offsetWidth;
                              char.style.animation = '';
                          }
                          var subtitle = preloader.querySelector('.preloader-subtitle');
                          if (subtitle) {
                              subtitle.style.animation = 'none';
                              void subtitle.offsetWidth;
                              subtitle.style.animation = '';
                          }
                      }, 100);
                  }
                  if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', forceAnimation);
                  } else { forceAnimation(); }
              })();
            `,
          }}
        />
        <LocaleProvider initialLocale={locale}>
          <ModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Modal />
            <ScrollAnimations />
          </ModalProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
