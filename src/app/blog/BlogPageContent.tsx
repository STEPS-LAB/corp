'use client'

import { useLocale } from '@/context/LocaleContext'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function BlogPageContent() {
  const { locale } = useLocale()

  const copy =
    locale === 'uk'
      ? {
          badge: 'Блог',
          title1: 'STEPS LAB',
          title2: 'Insights',
          description:
            'Практичні матеріали про AI-supported development, Next.js performance optimization та архітектуру digital-продуктів.',
        }
      : {
          badge: 'Blog',
          title1: 'STEPS LAB',
          title2: 'Insights',
          description:
            'Practical insights on AI-supported development, Next.js performance optimization, and scalable digital product architecture.',
        }

  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {copy.badge}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{copy.title1}</span>
              <span className="hero-alt-title-line">{copy.title2}</span>
            </h1>
            <p className="hero-alt-description">{copy.description}</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <section className="about-alt">
        <div className="container-custom">
          <div className="about-alt-content">
            <h2 className="section-title-alt">{locale === 'uk' ? 'Скоро' : 'Coming Soon'}</h2>
            <p className="about-alt-text">
              {locale === 'uk'
                ? 'Готуємо серію коротких, практичних статей для команд, яким потрібен швидкий, якісний та стабільний delivery.'
                : 'We are preparing concise, practical articles for teams that need fast, high-quality, and reliable delivery.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
