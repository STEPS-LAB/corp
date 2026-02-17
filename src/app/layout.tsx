import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import ScrollAnimations from '@/components/ScrollAnimations'
import { ModalProvider } from '@/hooks/useModal'

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

export const metadata: Metadata = {
  title: 'STEPS LAB — Розробка, що має сенс',
  description: 'AI-first digital studio, яка створює зрозумілі та ефективні цифрові продукти.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
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
              // Preloader - показується тільки при першому завантаженні
              const preloader = document.getElementById('preloader');
              const hasVisited = sessionStorage.getItem('hasVisited');
              
              if (!hasVisited) {
                  // Перший візит - показуємо preloader
                  window.addEventListener('load', () => {
                      setTimeout(() => {
                          // Спочатку плавно робимо прозорим
                          preloader.style.transition = 'opacity 0.6s ease';
                          preloader.style.opacity = '0';
                          document.body.classList.add('loaded');
                          
                          // Після завершення transition встановлюємо display: none
                          setTimeout(() => {
                              preloader.style.display = 'none';
                              sessionStorage.setItem('hasVisited', 'true');
                          }, 600);
                      }, 2000);
                  });
              } else {
                  // Не перший візит - одразу ховаємо preloader
                  preloader.style.display = 'none';
                  document.body.classList.add('loaded');
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Форсуємо перезапуск анімації для preloader
              (function() {
                  function forceAnimation() {
                      var preloader = document.getElementById('preloader');
                      if (!preloader) {
                          setTimeout(forceAnimation, 10);
                          return;
                      }
                      
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
                  } else {
                      forceAnimation();
                  }
              })();
            `,
          }}
        />
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Modal />
          <ScrollAnimations />
        </ModalProvider>
      </body>
    </html>
  )
}

