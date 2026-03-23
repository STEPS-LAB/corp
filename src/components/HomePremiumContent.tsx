'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'

type HomeCopy = {
  badge: string
  title: string
  intro: string
  sections: Array<{ heading: string; paragraphs: string[] }>
  ctaTitle: string
  ctaText: string
}

const CONTENT: Record<'en' | 'uk', HomeCopy> = {
  en: {
    badge: 'STEPS LAB - Premium AI Development',
    title: 'AI-augmented premium development for teams that value speed, quality, and measurable performance',
    intro:
      'STEPS LAB is a new brand built by a powerhouse team of developers with 5-6 years of commercial experience. We build premium websites and web platforms that are engineered for conversion, maintainability, and 90+ PageSpeed performance from day one.',
    sections: [
      {
        heading: 'The Edge of AI-Augmented Development',
        paragraphs: [
          'Most agencies still treat AI as a marketing slogan. We treat it as production infrastructure. Our AI-supported development workflow combines senior engineering judgment with carefully orchestrated tooling in Cursor, Claude, and QWEN. That means we use AI where it creates objective leverage: architecture drafts, code generation for repetitive layers, internal QA prompts, and test scenario expansion. We do not use AI to bypass engineering discipline. Every critical decision is reviewed, validated, and measured by experienced developers.',
          'This model gives our clients a practical business advantage. Instead of paying for slow and fragmented cycles, you get a tighter execution loop where product decisions move faster from concept to validated release. We can scope features with technical reality in mind, implement with high consistency, and remove friction before it affects your launch timeline. In premium website development, speed only matters when quality holds under pressure. Our process is designed precisely for that: accelerate output while increasing reliability.',
          'Because our team has 5-6 years of hands-on commercial delivery, we know exactly where AI is useful and where human expertise is non-negotiable. We have seen the long-tail cost of rushed code, unclear architecture, and weak handoff practices. That is why our AI-supported development is always paired with robust code structure, explicit implementation standards, and clean documentation. The result is not just fast delivery. The result is a product your team can confidently scale.',
        ],
      },
      {
        heading: 'Speed vs. Quality: Why We Deliver Both',
        paragraphs: [
          'In many projects, speed and quality are treated like opposites. We reject that trade-off. Our engineering process is built around performance budgets, modular architecture, and strict implementation checkpoints. Every page, component, and request flow is designed with clear responsibility boundaries. This keeps complexity predictable and makes iteration safer. When features evolve, you can extend the system without rewriting core logic every sprint.',
          'For business stakeholders, this translates into reduced delivery risk. You get stable releases, transparent progress, and technical decisions tied to outcomes. We focus on what directly impacts growth: conversion paths, loading performance, and operational efficiency in your internal workflows. If your business needs custom admin panels to manage content, operations, or sales pipelines, we design them as practical systems, not generic dashboards. The interface is fast, role-aware, and aligned to your real processes.',
          'Performance is a non-negotiable KPI in our workflow. Next.js performance optimization is integrated into architecture planning, not postponed to the final week. We optimize above-the-fold rendering, reduce script overhead, and keep animation logic lightweight so the interface feels immediate on real devices. Our target is straightforward: premium experiences with measurable technical quality, including 90+ mobile performance and near-perfect desktop scores where project scope allows.',
        ],
      },
      {
        heading: 'Our Tech Stack: Next.js, Cursor, Claude, QWEN',
        paragraphs: [
          'We use a deliberate stack because premium delivery depends on predictable engineering systems. Next.js is our core framework for high-performance rendering, SEO-ready architecture, and scalable routing. Tailwind CSS keeps UI implementation clean and modular. We combine this with robust API patterns and maintainable component structures so teams can evolve products without accumulating technical debt.',
          'Cursor is embedded into our daily coding workflow to speed implementation, refactoring, and pattern consistency. Claude supports requirement interpretation, architecture alternatives, and deeper reasoning around edge cases. QWEN complements rapid analysis and generation tasks in tightly scoped technical workflows. Together, these tools help us move faster with fewer blind spots. But tooling alone is never the value. The value is how experienced engineers apply these tools with discipline.',
          'When you partner with STEPS LAB, you are not buying generic AI fluff. You are investing in a focused engineering partner that can deliver premium website development, production-grade custom admin panels, and scalable web products with clear performance goals. We build fast, but we build for the next stage of your business, not just the next demo. If your team needs a high-velocity, high-accountability technical partner, we are ready to execute.',
        ],
      },
    ],
    ctaTitle: 'Plan your next release with STEPS LAB',
    ctaText:
      'Tell us your goals, current bottlenecks, and expected business outcomes. We will propose a focused implementation roadmap with performance targets and delivery milestones.',
  },
  uk: {
    badge: 'STEPS LAB - Преміальна AI-розробка',
    title:
      'Преміальна AI-augmented розробка для бізнесу, якому потрібні швидкість, якість і вимірювана продуктивність',
    intro:
      'STEPS LAB - новий бренд, за яким стоїть потужна команда розробників із 5-6 роками комерційного досвіду. Ми створюємо premium website development рішення, які одразу орієнтовані на конверсію, стабільну підтримку та технічну продуктивність на рівні 90+ у PageSpeed.',
    sections: [
      {
        heading: 'The Edge of AI-Augmented Development',
        paragraphs: [
          'Багато агенцій сьогодні використовують AI як гучний ярлик у презентації. Ми використовуємо його як робочу інженерну інфраструктуру. Наш підхід до AI-supported development поєднує сильну експертизу команди та кероване застосування інструментів Cursor, Claude і QWEN. Ми автоматизуємо те, що справді прискорює результат: підготовку технічних рішень, генерацію повторюваних частин коду, перевірку гіпотез, розширення тестових сценаріїв. Але фінальні рішення завжди приймає команда з реальним production-досвідом.',
          'Такий підхід дає бізнесу відчутну перевагу. Замість довгих і фрагментованих циклів ви отримуєте компактний процес, у якому ідеї швидко переходять у перевірений реліз. Ми плануємо функціональність із урахуванням архітектури, впроваджуємо рішення з високою консистентністю і прибираємо вузькі місця до того, як вони починають впливати на запуск. У premium website development швидкість має сенс лише тоді, коли якість витримує навантаження. Саме це ми і забезпечуємо.',
          'Наші 5-6 років комерційної розробки дають чітке розуміння: де AI справді корисний, а де критично важлива інженерна відповідальність. Ми знаємо ціну хаотичного коду, слабкої структури та неякісної передачі проєкту. Тому AI-supported development у STEPS LAB завжди доповнюється чистою архітектурою, чіткими стандартами реалізації і зрозумілою документацією. Ви отримуєте не просто швидкий старт, а систему, яку можна безпечно масштабувати.',
        ],
      },
      {
        heading: 'Speed vs. Quality: Why We Deliver Both',
        paragraphs: [
          'У багатьох проєктах швидкість і якість досі сприймаються як взаємовиключні речі. Ми працюємо інакше. Наш процес побудований навколо performance-бюджетів, модульної архітектури і чітких контрольних точок реалізації. Кожен блок інтерфейсу, бізнес-логіки та API має зрозумілу зону відповідальності. Це робить розробку передбачуваною і суттєво знижує ризики під час ітерацій.',
          'Для бізнесу це означає стабільні релізи, прозору комунікацію і технічні рішення, привʼязані до результату. Ми концентруємося на тому, що впливає на ріст: конверсійний шлях користувача, швидкість завантаження, ефективність внутрішніх процесів. Якщо вам потрібні custom admin panels для контенту, продажів або операційної роботи, ми проєктуємо їх як прикладні інструменти під ваші процеси, а не як шаблонні дашборди. Це дає команді реальну керованість і швидші операційні цикли.',
          'Next.js performance optimization для нас - не постфактум, а частина архітектури з першого дня. Ми оптимізуємо above-the-fold контент, контролюємо обсяг скриптів і залишаємо тільки легкі CSS-анімації, щоб інтерфейс був швидким на реальних пристроях. Наша ціль проста: преміальна якість із вимірюваними технічними показниками, включно з 90+ mobile performance і максимально високими desktop метриками там, де це дозволяє обсяг продукту.',
        ],
      },
      {
        heading: 'Our Tech Stack (Next.js, Cursor, Claude, QWEN)',
        paragraphs: [
          'Ми свідомо обрали стек, який забезпечує контрольований і швидкий delivery. Next.js - основа для високої продуктивності, SEO-ready структури і масштабованого маршрутизаційного шару. Tailwind CSS допомагає зберігати чисту, модульну UI-реалізацію. Разом із надійними API-патернами це формує кодову базу, яку легко розвивати без накопичення технічного боргу.',
          'Cursor інтегрований у щоденний процес реалізації: прискорює рефакторинг, повторювані задачі і консистентність коду. Claude підтримує глибший аналіз вимог, порівняння архітектурних альтернатив і опрацювання edge-case сценаріїв. QWEN використовується для швидких технічних ітерацій, коли важлива оперативність без втрати керованості. Разом ці інструменти підсилюють команду, але не замінюють інженерне мислення.',
          'Працюючи зі STEPS LAB, ви отримуєте не абстрактні обіцянки, а партнера, який вміє швидко створювати premium website development продукти, production-ready custom admin panels і масштабовані веб-платформи з прозорими KPI. Ми працюємо швидко, але будуємо рішення на перспективу, а не тільки до найближчого демо. Якщо вам потрібна команда з високою швидкістю виконання і високою відповідальністю, ми готові підключатися.',
        ],
      },
    ],
    ctaTitle: 'Заплануйте наступний реліз зі STEPS LAB',
    ctaText:
      'Опишіть ваші цілі, поточні обмеження та очікуваний бізнес-результат. Ми підготуємо фокусний roadmap із технічними етапами та performance-орієнтирами.',
  },
}

export default function HomePremiumContent() {
  const { locale } = useLocale()
  const copy = CONTENT[locale]

  return (
    <section className="bg-bg-light pt-32 pb-24">
      <div className="container-custom max-w-5xl">
        <p className="text-accent text-sm uppercase tracking-wide mb-4">{copy.badge}</p>
        <h1 className="text-4xl md:text-6xl font-manrope font-semibold tracking-tight text-text-dark mb-6">
          {copy.title}
        </h1>
        <p className="text-lg text-text-dark/75 leading-relaxed mb-12">{copy.intro}</p>

        <div className="space-y-12">
          {copy.sections.map((section) => (
            <article key={section.heading} className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-manrope font-semibold tracking-tight text-text-dark">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base md:text-lg text-text-dark/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-bg-dark text-text-light p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-manrope font-semibold mb-3">{copy.ctaTitle}</h3>
          <p className="text-text-light/80 mb-6 leading-relaxed">{copy.ctaText}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacts" className="px-6 py-3 rounded-xl bg-accent text-text-light font-medium">
              {locale === 'uk' ? 'Отримати консультацію' : 'Get consultation'}
            </Link>
            <Link href="/cases" className="px-6 py-3 rounded-xl border border-white/20 text-text-light font-medium">
              {locale === 'uk' ? 'Переглянути кейси' : 'View cases'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
