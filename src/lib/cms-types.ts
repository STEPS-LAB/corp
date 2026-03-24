import type { Locale } from '@/lib/i18n'
import type { SiteContent } from '@/lib/content'

export type BilingualText = { en: string; uk: string }

export function b(en: string, uk: string): BilingualText {
  return { en, uk }
}

/** Static pages / global sections (Hero, About, Footer UI copy). */
export type PagesContent = {
  hero: {
    title: BilingualText
    subtitle: BilingualText
    ctaText: BilingualText
    ctaLink: string
    heroImageUrl: string
  }
  aboutTech: {
    workflowDescription: BilingualText
    teamExperience: BilingualText
  }
  images: {
    logo: string
    hero: string
    gallery: string[]
  }
  footer: {
    socialLinks: { linkedin: string; github: string; x: string }
    contactEmail: string
    phone: string
    copyrightText: BilingualText
  }
  /** Section headings and shared labels (optional overrides per locale). */
  labels: {
    casesSectionTitle: BilingualText
    conceptsHeading: BilingualText
    conceptsViewAll: BilingualText
    casesViewCase: BilingualText
  }
}

export type ServiceCMS = {
  id: string
  href: string
  icon_name: string
  title: BilingualText
  description: BilingualText
  price: BilingualText
  order: number
  updatedAt: string
}

export type CaseCMS = {
  id: string
  href: string
  title: BilingualText
  description: BilingualText
  result: BilingualText
  previewImageUrl: string
  order: number
  updatedAt: string
}

export type ConceptCMS = {
  id: string
  slug: string
  title: BilingualText
  shortDescription: BilingualText
  description: BilingualText
  improvements: { en: string[]; uk: string[] }
  technologies: { en: string[]; uk: string[] }
  desktopImage: string
  mobileImage: string
  oldDesktopImage: string
  oldMobileImage: string
  order: number
  updatedAt: string
}

export type PublicCmsPayload = {
  pages: PagesContent
  services: ServiceCMS[]
  cases: CaseCMS[]
  concepts: ConceptCMS[]
}

/** API + KV shape */
export const KV_KEYS = {
  pages: 'content:pages',
  services: 'content:services',
  cases: 'content:cases',
  concepts: 'content:concepts',
} as const

const iso = () => new Date().toISOString()

export const DEFAULT_PAGES_CONTENT: PagesContent = {
  hero: {
    title: b(
      'Next-Gen AI-Supported Development',
      'Next-Gen AI-Supported Development'
    ),
    subtitle: b(
      'A powerhouse team with 5-6 years of commercial experience. Premium website development with speed and precision.',
      'Потужна команда з 5-6 роками комерційного досвіду. Преміальна веб-розробка зі швидким delivery.'
    ),
    ctaText: b('Start Project', 'Почати проєкт'),
    ctaLink: '/contacts',
    heroImageUrl: '/steps-lab_logo-w.webp',
  },
  aboutTech: {
    workflowDescription: b(
      'We combine Cursor, Claude, and Qwen with senior engineering standards to deliver faster without sacrificing quality.',
      'Поєднуємо Cursor, Claude та Qwen з інженерними стандартами, щоб поставляти швидше без втрати якості.'
    ),
    teamExperience: b(
      'Our team has 5-6 years of commercial product development experience across SaaS, eCommerce, and corporate platforms.',
      'Команда має 5-6 років досвіду в продуктовій розробці: SaaS, eCommerce та корпоративні платформи.'
    ),
  },
  images: {
    logo: '/steps-lab_logo-w.webp',
    hero: '/steps-lab_logo-w.webp',
    gallery: [],
  },
  footer: {
    socialLinks: {
      linkedin: 'https://linkedin.com/company/stepslab',
      github: '#',
      x: '#',
    },
    contactEmail: 'stepslab.contact@gmail.com',
    phone: '+380000000000',
    copyrightText: b('STEPS LAB. All rights reserved.', 'STEPS LAB. Усі права захищені.'),
  },
  labels: {
    casesSectionTitle: b('Website development cases', 'Кейси розробки сайтів'),
    conceptsHeading: b('Concepts', 'Концепти'),
    conceptsViewAll: b('View All Concepts', 'Переглянути всі концепти'),
    casesViewCase: b('View case →', 'Переглянути кейс →'),
  },
}

export const DEFAULT_SERVICES_CMS: ServiceCMS[] = [
  {
    id: 'web-development',
    href: '/services/web-development',
    icon_name: 'globe',
    title: b('Web Development', 'Розробка сайтів'),
    description: b(
      'Production-grade Next.js websites focused on conversion and performance.',
      'Сайти на Next.js з фокусом на конверсію та швидкість.'
    ),
    price: b('From $1,200', 'Від $1,200'),
    order: 0,
    updatedAt: iso(),
  },
  {
    id: 'ai-automation',
    href: '/services/ai-automation',
    icon_name: 'sparkles',
    title: b('AI Automation', 'AI та автоматизація'),
    description: b(
      'AI-powered workflows and copilots to accelerate operations and growth.',
      'AI-сценарії та автоматизація для операцій і зростання.'
    ),
    price: b('From $1,500', 'Від $1,500'),
    order: 1,
    updatedAt: iso(),
  },
  {
    id: 'mvp-startups',
    href: '/services/mvp-startups',
    icon_name: 'rocket',
    title: b('MVP for Startups', 'MVP для стартапів'),
    description: b(
      'Launch-ready MVP delivery with senior engineering and rapid iteration.',
      'MVP під запуск з досвідженою командою та швидкими ітераціями.'
    ),
    price: b('From $2,000', 'Від $2,000'),
    order: 2,
    updatedAt: iso(),
  },
  {
    id: 'support-scaling',
    href: '/services/support-scaling',
    icon_name: 'shield-check',
    title: b('Support & Scaling', 'Підтримка та масштабування'),
    description: b(
      'Stability, optimization, and ongoing growth support for live products.',
      'Стабільність, оптимізація та супровід live-продуктів.'
    ),
    price: b('Custom', 'Індивідуально'),
    order: 3,
    updatedAt: iso(),
  },
]

export const DEFAULT_CASES_CMS: CaseCMS[] = [
  {
    id: 'case-ecommerce',
    href: '/cases/ecommerce',
    title: b('E-commerce platform', 'E-commerce платформа'),
    description: b(
      'Web development of a full-featured online store: payment integration, inventory management, ready to scale.',
      'Веб-розробка повнофункціонального сайту для онлайн-продажів: інтеграція платежів, склад, готовність до масштабування.'
    ),
    result: b(
      'Result: 340% increase in online sales in 6 months, 60% reduction in processing time.',
      'Результат: збільшення онлайн-продажів на 340% за 6 місяців, зниження часу обробки на 60%.'
    ),
    previewImageUrl: '',
    order: 0,
    updatedAt: iso(),
  },
  {
    id: 'case-saas',
    href: '/cases/saas',
    title: b('SaaS MVP', 'SaaS MVP'),
    description: b(
      'AI development for startup: minimum product with business process automation and AI analytics. In 8 weeks.',
      'AI-розробка для стартапу: мінімальний продукт з автоматизацією та AI-аналітикою. За 8 тижнів.'
    ),
    result: b(
      'Result: launch in 8 weeks, 100+ paying users in a month, business model validation.',
      'Результат: запуск за 8 тижнів, 100+ платних користувачів за місяць, валідація бізнес-моделі.'
    ),
    previewImageUrl: '',
    order: 1,
    updatedAt: iso(),
  },
  {
    id: 'case-corporate',
    href: '/cases/corporate',
    title: b('Corporate website', 'Корпоративний сайт'),
    description: b(
      'Corporate website development: the studio built a site with CMS and CRM integration for lead generation automation. SEO optimization.',
      'Розробка корпоративного сайту з CMS та CRM для автоматизації лідів. SEO.'
    ),
    result: b(
      'Result: +250% conversion, +180% leads, improved SEO rankings.',
      'Результат: конверсія +250%, заявки +180%, покращення SEO-позицій.'
    ),
    previewImageUrl: '',
    order: 2,
    updatedAt: iso(),
  },
]

const techEn = ['Next.js', 'React', 'Node.js', 'Cursor', 'Claude', 'QWEN']

export const DEFAULT_CONCEPTS_CMS: ConceptCMS[] = [
  {
    id: 'concept-ribas-karpaty',
    slug: 'ribas-karpaty',
    title: b('Ribas Karpaty', 'Ribas Karpaty'),
    shortDescription: b(
      'Premium resort concept focused on booking clarity and visual storytelling.',
      'Преміум-концепт курорту з акцентом на бронювання та візуальний storytelling.'
    ),
    description: b(
      'A redesign concept for a mountain resort website focused on conversion-first booking flow, cleaner information hierarchy, and premium visuals.',
      'Редизайн-концепт сайту гірського курорту з фокусом на конверсійний сценарій бронювання та преміальну подачу.'
    ),
    improvements: {
      en: [
        'Simplified booking funnel from the first screen.',
        'Cleaner typography rhythm and section spacing.',
        'Improved mobile readability and CTA focus.',
      ],
      uk: [
        'Спростили сценарій бронювання з першого екрану.',
        'Покращили ритм типографіки та секційні відступи.',
        'Підсилили читабельність і CTA на мобільних.',
      ],
    },
    technologies: { en: techEn, uk: techEn },
    desktopImage: '/concepts/ribas-karpaty-desktop.png',
    mobileImage: '/concepts/ribas-karpaty-mobile.png',
    oldDesktopImage: '/concepts/ribas-karpaty-desktop.png',
    oldMobileImage: '/concepts/ribas-karpaty-mobile.png',
    order: 0,
    updatedAt: iso(),
  },
  {
    id: 'concept-amstelski',
    slug: 'amstelski',
    title: b('AmstelSki', 'AmstelSki'),
    shortDescription: b(
      'Ski-tour concept with stronger package presentation and faster browsing.',
      'Концепт ski-туру з кращою подачею пакетів і швидшим скануванням.'
    ),
    description: b(
      'A concept upgrade for a ski destination site with clearer package cards, better seasonal offers visibility, and stronger trust cues.',
      'Оновлений концепт туристичного сайту з чіткішою презентацією пакетів та офферів.'
    ),
    improvements: {
      en: [
        'Rebuilt package overview for rapid comparison.',
        'Reduced visual noise in offer-heavy sections.',
        'Improved mobile navigation and offer scanning.',
      ],
      uk: [
        'Перезібрали пакетні блоки для швидкого порівняння.',
        'Зменшили візуальний шум у перевантажених секціях.',
        'Покращили мобільну навігацію та перегляд офферів.',
      ],
    },
    technologies: { en: techEn, uk: techEn },
    desktopImage: '/concepts/amstelski-desktop.png',
    mobileImage: '/concepts/amstelski-mobile.png',
    oldDesktopImage: '/concepts/amstelski-desktop.png',
    oldMobileImage: '/concepts/amstelski-mobile.png',
    order: 1,
    updatedAt: iso(),
  },
  {
    id: 'concept-chudodievo',
    slug: 'chudodievo',
    title: b('Chudodievo', 'Chudodievo'),
    shortDescription: b(
      'Hospitality concept with stronger storytelling and structured page flow.',
      'Концепт hospitality-сайту з сильнішим storytelling та структурованим контент-флоу.'
    ),
    description: b(
      'A redesign concept for a family recreation complex with polished storytelling, event-focused blocks, and improved user journey logic.',
      'Редизайн-концепт для рекреаційного комплексу з кращим наративом та логікою шляху користувача.'
    ),
    improvements: {
      en: [
        'Sharper hero narrative with direct conversion points.',
        'More predictable structure for content-heavy sections.',
        'Optimized touch-friendly interaction patterns on mobile.',
      ],
      uk: [
        'Підсилили hero-наратив і точки конверсії.',
        'Вирівняли структуру довгих контентних секцій.',
        'Оптимізували touch-взаємодії на мобільних.',
      ],
    },
    technologies: { en: techEn, uk: techEn },
    desktopImage: '/concepts/chudodievo-desktop.png',
    mobileImage: '/concepts/chudodievo-mobile.png',
    oldDesktopImage: '/concepts/chudodievo-desktop.png',
    oldMobileImage: '/concepts/chudodievo-mobile.png',
    order: 2,
    updatedAt: iso(),
  },
  {
    id: 'concept-kosmodent',
    slug: 'kosmodent',
    title: b('Kosmodent', 'Kosmodent'),
    shortDescription: b(
      'Dental clinic concept with trust-first UX and cleaner medical information blocks.',
      'Концепт стоматології з trust-first UX і чіткою медичною ієрархією.'
    ),
    description: b(
      'A healthcare website concept balancing credibility and conversion, with stronger doctor and service presentation plus a cleaner appointment flow.',
      'Медичний сайт з балансом довіри та конверсії: лікарі, послуги, запис.'
    ),
    improvements: {
      en: [
        'Reworked service and doctor sections for trust.',
        'Clearer hierarchy for treatment information.',
        'Faster appointment action path across devices.',
      ],
      uk: [
        'Переосмислили подачу лікарів та послуг для довіри.',
        'Спростили сприйняття медичного контенту.',
        'Скоротили шлях до запису для мобільного користувача.',
      ],
    },
    technologies: { en: techEn, uk: techEn },
    desktopImage: '/concepts/kosmodent-desktop.png',
    mobileImage: '/concepts/kosmodent-mobile.png',
    oldDesktopImage: '/concepts/kosmodent-desktop.png',
    oldMobileImage: '/concepts/kosmodent-mobile.png',
    order: 3,
    updatedAt: iso(),
  },
  {
    id: 'concept-asklepiy',
    slug: 'asklepiy',
    title: b('Asklepiy', 'Asklepiy'),
    shortDescription: b(
      'Medical platform concept optimized for speed, structure, and conversion clarity.',
      'Концепт медичної платформи зі швидкою навігацією та структурною ясністю.'
    ),
    description: b(
      'A modernized clinic platform concept with improved CTA cadence, content scannability, and mobile-first interaction polish.',
      'Оновлений концепт сайту клініки з покращеною логікою CTA та mobile-first взаємодією.'
    ),
    improvements: {
      en: [
        'Streamlined navigation between key medical services.',
        'Cleaner layout system with stronger visual rhythm.',
        'Improved mobile conversion touchpoints.',
      ],
      uk: [
        'Оптимізували перемикання між ключовими послугами.',
        'Побудували більш ритмічну і передбачувану сітку.',
        'Підсилили конверсійні елементи на мобільних.',
      ],
    },
    technologies: { en: techEn, uk: techEn },
    desktopImage: '/concepts/asklepiy-desktop.png',
    mobileImage: '/concepts/asklepiy-mobile.png',
    oldDesktopImage: '/concepts/asklepiy-desktop.png',
    oldMobileImage: '/concepts/asklepiy-mobile.png',
    order: 4,
    updatedAt: iso(),
  },
]

export function defaultCmsPayload(): PublicCmsPayload {
  return {
    pages: DEFAULT_PAGES_CONTENT,
    services: DEFAULT_SERVICES_CMS,
    cases: DEFAULT_CASES_CMS,
    concepts: DEFAULT_CONCEPTS_CMS,
  }
}

export function pickLang(text: BilingualText, locale: Locale): string {
  return text[locale] || text.en || ''
}

/** Flatten CMS pages + services into legacy `SiteContent` for existing section components. */
export function flattenToSiteContent(
  payload: PublicCmsPayload,
  locale: Locale
): SiteContent {
  const { pages, services } = payload
  return {
    hero: {
      title: pickLang(pages.hero.title, locale),
      subtitle: pickLang(pages.hero.subtitle, locale),
      ctaText: pickLang(pages.hero.ctaText, locale),
      ctaLink: pages.hero.ctaLink,
      heroImageUrl: pages.hero.heroImageUrl,
    },
    services: services
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        id: s.id,
        title: pickLang(s.title, locale),
        description: pickLang(s.description, locale),
        icon_name: s.icon_name,
        price: pickLang(s.price, locale),
      })),
    aboutTech: {
      workflowDescription: pickLang(pages.aboutTech.workflowDescription, locale),
      teamExperience: pickLang(pages.aboutTech.teamExperience, locale),
    },
    images: pages.images,
    footer: {
      socialLinks: pages.footer.socialLinks,
      contactEmail: pages.footer.contactEmail,
      phone: pages.footer.phone,
      copyrightText: pickLang(pages.footer.copyrightText, locale),
    },
  }
}
