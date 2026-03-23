'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'

type FeatureCard = {
  title: string
  text: string
  href: string
}

type HomeCopy = {
  badge: string
  title: string
  subtitle: string
  sectionHeadings: string[]
  stackItems: string[]
  cards: FeatureCard[]
  ctaPrimary: string
  ctaSecondary: string
}

const CONTENT: Record<'en' | 'uk', HomeCopy> = {
  en: {
    badge: 'STEPS LAB',
    title: 'Next-Gen AI-Supported Development',
    subtitle:
      'A powerhouse team with 5-6 years of commercial experience. Premium website development with speed and precision.',
    sectionHeadings: [
      'The Edge of AI-Augmented Development',
      'Speed vs. Quality: We Deliver Both',
      'Our Tech Stack: Next.js, Cursor, Claude, QWEN',
    ],
    stackItems: ['Next.js performance optimization', 'Custom admin panels', 'AI-supported development workflow'],
    cards: [
      {
        title: 'Premium Websites',
        text: 'Conversion-focused product websites and landing systems. Fast delivery, production-grade quality.',
        href: '/services',
      },
      {
        title: 'Custom Admin Panels',
        text: 'Clean internal tools for operations, content, and sales teams. Built for clarity and control.',
        href: '/services',
      },
      {
        title: 'AI Delivery Engine',
        text: 'Cursor + Claude acceleration, senior engineering decisions. Higher velocity without quality loss.',
        href: '/about',
      },
    ],
    ctaPrimary: 'Start Project',
    ctaSecondary: 'View Cases',
  },
  uk: {
    badge: 'STEPS LAB',
    title: 'Next-Gen AI-Supported Development',
    subtitle:
      'Потужна команда з 5-6 роками комерційного досвіду. Преміальна веб-розробка зі швидким delivery.',
    sectionHeadings: [
      'The Edge of AI-Augmented Development',
      'Speed vs. Quality: We Deliver Both',
      'Our Tech Stack: Next.js, Cursor, Claude, QWEN',
    ],
    stackItems: ['Next.js performance optimization', 'Custom admin panels', 'AI-supported development workflow'],
    cards: [
      {
        title: 'Premium Websites',
        text: 'Сайти та продуктні сторінки з фокусом на конверсію. Швидко, чисто, production-ready.',
        href: '/services',
      },
      {
        title: 'Custom Admin Panels',
        text: 'Внутрішні системи під ваші процеси. Контроль, прозорість, масштабування.',
        href: '/services',
      },
      {
        title: 'AI Delivery Engine',
        text: 'Cursor + Claude + досвід команди. Вища швидкість без втрати якості.',
        href: '/about',
      },
    ],
    ctaPrimary: 'Почати проєкт',
    ctaSecondary: 'Переглянути кейси',
  },
}

export default function HomePremiumContent() {
  const { locale } = useLocale()
  const copy = CONTENT[locale]

  return (
    <main className="bg-bg-light">
      <section className="container-custom max-w-6xl pt-36 pb-24">
        <p className="text-accent text-xs md:text-sm uppercase tracking-[0.18em] mb-5">{copy.badge}</p>
        <h1 className="text-5xl md:text-7xl font-manrope font-semibold tracking-[-0.03em] text-text-dark max-w-4xl leading-[1.02]">
          {copy.title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-text-dark/70 max-w-3xl leading-relaxed">{copy.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contacts" className="px-7 py-3 rounded-xl bg-accent text-text-light font-medium transition-colors hover:bg-[#2d4ae6]">
            {copy.ctaPrimary}
          </Link>
          <Link href="/cases" className="px-7 py-3 rounded-xl border border-black/15 text-text-dark font-medium transition-colors hover:border-black/35">
            {copy.ctaSecondary}
          </Link>
        </div>
      </section>

      <section className="container-custom max-w-6xl pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {copy.cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-black/10 bg-white p-7">
              <h2 className="text-2xl font-manrope font-semibold text-text-dark tracking-tight mb-3">{card.title}</h2>
              <p className="text-text-dark/70 leading-relaxed text-sm mb-5">{card.text}</p>
              <Link href={card.href} className="text-accent text-sm font-semibold">
                {locale === 'uk' ? 'Детальніше' : 'Learn more'}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container-custom max-w-6xl pb-28">
        <div className="rounded-3xl bg-bg-dark text-text-light p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-manrope font-semibold tracking-tight mb-6">
            {copy.sectionHeadings[2]}
          </h2>
          <ul className="grid md:grid-cols-3 gap-3 md:gap-4">
            {copy.stackItems.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-text-light/90">
                {item}
              </li>
            ))}
          </ul>
          <div className="sr-only">
            <h2>{copy.sectionHeadings[0]}</h2>
            <h2>{copy.sectionHeadings[1]}</h2>
            <p>
              {locale === 'uk'
                ? 'AI-supported development, premium website development, custom admin panels, Next.js performance optimization.'
                : 'AI-supported development, premium website development, custom admin panels, Next.js performance optimization.'}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom max-w-6xl pb-20">
        <Image
          src="/steps-lab-logo.webp"
          alt="AI-supported development and Next.js performance optimization by STEPS LAB"
          title="Premium website development by STEPS LAB"
          width={1200}
          height={480}
          priority
          className="w-full h-auto rounded-2xl border border-black/10 bg-white p-8"
        />
      </section>
    </main>
  )
}
