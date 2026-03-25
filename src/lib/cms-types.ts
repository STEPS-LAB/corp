import type { Locale } from '@/lib/i18n'
import type { SiteContent } from '@/lib/content'
import { builtInCaseDetail } from '@/lib/cms-case-defaults'

export { emptyCasePageDetail } from '@/lib/cms-case-defaults'

export type BilingualText = { en: string; uk: string }

export function b(en: string, uk: string): BilingualText {
  return { en, uk }
}

/** Hero stats row (value is short e.g. "2x", label is bilingual). */
export type HeroStatItem = { value: string; label: BilingualText }

/** Static pages / global sections (Hero, About, Footer UI copy). */
export type PagesContent = {
  hero: {
    title: BilingualText
    subtitle: BilingualText
    ctaText: BilingualText
    ctaLink: string
    heroImageUrl: string
    /** Secondary link next to primary CTA (e.g. “View cases →”). */
    viewCasesLabel: BilingualText
    /** Typically three rows under hero copy. */
    stats: HeroStatItem[]
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
    servicesSectionTitle: BilingualText
    aboutSectionTitle: BilingualText
    casesSectionTitle: BilingualText
    conceptsHeading: BilingualText
    conceptsViewAll: BilingualText
    casesViewCase: BilingualText
  }
  /** Home — “Why STEPS LAB” block. */
  homeWhy: {
    title: BilingualText
    /** Four lines; CMS order matches UI. */
    bullets: BilingualText[]
    quote: BilingualText
  }
  /** Home — tech logo strip title only (logo assets stay in /public). */
  homeTechStack: {
    title: BilingualText
  }
  /** Home — bottom CTA band above footer. */
  homeFinalCta: {
    title: BilingualText
    buttonLabel: BilingualText
  }
  /** Shared headings on all case study inner pages. */
  casePageLabels: {
    aboutProject: BilingualText
    whatWeDid: BilingualText
    results: BilingualText
    client: BilingualText
    timeline: BilingualText
    technologies: BilingualText
  }
  /** /about — falls back to next-intl keys when empty. */
  aboutPageContent: {
    heroBadge: BilingualText
    heroTitle: BilingualText
    heroSubtitle: BilingualText
    philosophyTitle: BilingualText
    philosophyText: BilingualText
    customFocusTitle: BilingualText
    customFocusText: BilingualText
    conceptsTitle: BilingualText
    conceptsCta: BilingualText
  }
  /** /contacts — falls back to next-intl when empty. */
  contactPageContent: {
    badge: BilingualText
    title1: BilingualText
    title2: BilingualText
    description: BilingualText
    writeUs: BilingualText
    or: BilingualText
    leaveRequest: BilingualText
    namePlaceholder: BilingualText
    companyPlaceholder: BilingualText
    messagePlaceholder: BilingualText
    submit: BilingualText
    submitting: BilingualText
    successTitle: BilingualText
    successText: BilingualText
    writeAgain: BilingualText
    errorDefault: BilingualText
  }
}

export type CasePageImages = {
  heroBackground: string
  heroMain: string
  screen1: string
  screen2: string
  screen3: string
  screen4: string
  fullscreen: string
}

/** Full inner case page (per case item). Card title/description/result stay on CaseCMS. */
export type CasePageDetail = {
  screensSectionTitle: BilingualText
  breadcrumb: BilingualText
  subtitle: BilingualText
  overviewP1: BilingualText
  overviewP2: BilingualText
  screen1Caption: BilingualText
  screen2Caption: BilingualText
  screen3Caption: BilingualText
  screen4Caption: BilingualText
  feature1Title: BilingualText
  feature1Text: BilingualText
  feature2Title: BilingualText
  feature2Text: BilingualText
  feature3Title: BilingualText
  feature3Text: BilingualText
  feature4Title: BilingualText
  feature4Text: BilingualText
  fullscreenCaption: BilingualText
  result1Value: string
  result2Value: string
  result3Value: string
  result1Label: BilingualText
  result2Label: BilingualText
  result3Label: BilingualText
  clientType: BilingualText
  timelineValue: BilingualText
  technologies: string[]
  ctaTitle: BilingualText
  images: CasePageImages
}

export type PublishStatus = 'draft' | 'published'

export type BilingualSEO = {
  metaTitle: BilingualText
  metaDescription: BilingualText
}

export type TestimonialBlock = {
  quote: BilingualText
  author: BilingualText
  role: BilingualText
}

export type ProjectLink = {
  label: BilingualText
  url: string
}

export type ServiceCMS = {
  id: string
  href: string
  icon_name: string
  title: BilingualText
  /** Short card blurb on listings. */
  description: BilingualText
  /** Long body for service detail views / admin. */
  longDescription: BilingualText
  price: BilingualText
  /** Bullet benefits per locale (one string per line in admin). */
  benefits: { en: string[]; uk: string[] }
  /** Optional pricing / process note blocks. */
  pricingNote: BilingualText
  processSteps: { en: string[]; uk: string[] }
  /** Hero / cover image (Vercel Blob URL). */
  coverImageUrl: string
  /** Extra images for the detail page gallery. */
  galleryImages: string[]
  /** Sidebar “technologies” list per locale. */
  techStackLines: { en: string[]; uk: string[] }
  seo: BilingualSEO
  status: PublishStatus
  order: number
  updatedAt: string
}

/** News / blog post (Redis JSON). */
export type NewsCMS = {
  id: string
  /** URL segment after /news/ */
  slug: string
  title: BilingualText
  publishedAt: string
  coverImageUrl: string
  /** Markdown per locale. */
  content: BilingualText
  seo: BilingualSEO
  status: PublishStatus
  order: number
  updatedAt: string
}

export type CaseCMS = {
  id: string
  /** URL segment after /cases/ (e.g. ecommerce). */
  slug: string
  href: string
  category: BilingualText
  title: BilingualText
  description: BilingualText
  result: BilingualText
  /** Card / listing thumbnail (Blob URL). */
  previewImageUrl: string
  /** Alias for featured layouts; falls back to preview when empty. */
  thumbnailUrl: string
  galleryImages: string[]
  /** Quick tags for cards; inner page still uses detail.technologies. */
  techStackTags: string[]
  testimonial: TestimonialBlock
  projectLinks: ProjectLink[]
  seo: BilingualSEO
  status: PublishStatus
  /** Inner /cases/... page copy and images. */
  detail: CasePageDetail
  order: number
  updatedAt: string
}

export type ConceptCMS = {
  id: string
  slug: string
  category: BilingualText
  title: BilingualText
  shortDescription: BilingualText
  description: BilingualText
  improvements: { en: string[]; uk: string[] }
  technologies: { en: string[]; uk: string[] }
  desktopImage: string
  mobileImage: string
  oldDesktopImage: string
  oldMobileImage: string
  thumbnailUrl: string
  galleryImages: string[]
  testimonial: TestimonialBlock
  projectLinks: ProjectLink[]
  seo: BilingualSEO
  status: PublishStatus
  order: number
  updatedAt: string
}

/** Hero + SEO wrapper for /cases, /services, /concepts index routes. */
export type CollectionLandingPage = {
  badge: BilingualText
  heroTitleLine1: BilingualText
  heroTitleLine2: BilingualText
  heroDescription: BilingualText
  sectionTitle: BilingualText
  seo: BilingualSEO
  /** Ordered ids to feature on the listing (cases, services, or concepts). */
  featuredIds: string[]
}

export type CmsNavLink = { href: string; label: BilingualText }

export type SiteHeaderCMS = {
  logoUrl: string
  navLinks: CmsNavLink[]
  cta: { text: BilingualText; href: string }
}

export type FooterMenuColumnCMS = {
  title: BilingualText
  links: CmsNavLink[]
}

export type SiteFooterCMS = {
  copyright: BilingualText
  socialLinks: { linkedin: string; github: string; x: string }
  contactEmail: string
  phone: string
  columns: FooterMenuColumnCMS[]
}

export type ApproachStepCMS = {
  number: string
  title: BilingualText
  text: BilingualText
}

export type ApproachPageCMS = {
  seo: BilingualSEO
  badge: BilingualText
  heroTitleLine1: BilingualText
  heroTitleLine2: BilingualText
  heroDescription: BilingualText
  sectionTitle: BilingualText
  sectionSubtitle: BilingualText
  steps: ApproachStepCMS[]
  whyTitle: BilingualText
  whyBullets: BilingualText[]
  whyQuote: BilingualText
  whyImageUrl: string
}

export type PublicCmsPayload = {
  pages: PagesContent
  services: ServiceCMS[]
  cases: CaseCMS[]
  concepts: ConceptCMS[]
  news: NewsCMS[]
  portfolioIndex: CollectionLandingPage
  servicesIndex: CollectionLandingPage
  labIndex: CollectionLandingPage
  newsIndex: CollectionLandingPage
  siteHeader: SiteHeaderCMS
  siteFooter: SiteFooterCMS
  approachPage: ApproachPageCMS
}

/** API + KV shape */
export const KV_KEYS = {
  pages: 'content:pages',
  services: 'content:services',
  cases: 'content:cases',
  concepts: 'content:concepts',
  news: 'content:news',
} as const

const iso = () => new Date().toISOString()

export function emptySeo(): BilingualSEO {
  return { metaTitle: b('', ''), metaDescription: b('', '') }
}

export function emptyTestimonial(): TestimonialBlock {
  return {
    quote: b('', ''),
    author: b('', ''),
    role: b('', ''),
  }
}

export function slugFromCaseHref(href: string): string {
  const h = href.replace(/^\/+/, '')
  if (!h.startsWith('cases/')) return ''
  const rest = h.slice('cases/'.length).split('/')[0]
  return rest ?? ''
}

export function isCmsPublished(status?: PublishStatus): boolean {
  return status !== 'draft'
}

export const DEFAULT_PORTFOLIO_INDEX: CollectionLandingPage = {
  badge: b('Cases', 'Кейси'),
  heroTitleLine1: b('Selected', 'Обрані'),
  heroTitleLine2: b('client work', 'роботи клієнтів'),
  heroDescription: b(
    'Production websites and platforms we engineered end-to-end.',
    'Продакшн-сайти та платформи, які ми зібрали end-to-end.'
  ),
  sectionTitle: b('All cases', 'Усі кейси'),
  seo: {
    metaTitle: b('Cases — STEPS LAB', 'Кейси — STEPS LAB'),
    metaDescription: b(
      'Website development case studies: e-commerce, SaaS, corporate.',
      'Кейси веб-розробки: e-commerce, SaaS, корпоративні сайти.'
    ),
  },
  featuredIds: [],
}

export const DEFAULT_SERVICES_INDEX: CollectionLandingPage = {
  badge: b('Services', 'Послуги'),
  heroTitleLine1: b('Web studio', 'Веб-студія'),
  heroTitleLine2: b('services', 'послуги'),
  heroDescription: b(
    'From product sites to AI automation — scoped, engineered, shipped.',
    'Від продуктових сайтів до AI-автоматизації — під ключ.'
  ),
  sectionTitle: b('What we deliver', 'Що поставляємо'),
  seo: {
    metaTitle: b('Services — STEPS LAB', 'Послуги — STEPS LAB'),
    metaDescription: b(
      'Web development, AI automation, MVP delivery, support & scaling.',
      'Розробка сайтів, AI-автоматизація, MVP, підтримка та масштабування.'
    ),
  },
  featuredIds: [],
}

export const DEFAULT_LAB_INDEX: CollectionLandingPage = {
  badge: b('Lab', 'Лабораторія'),
  heroTitleLine1: b('Concept', 'Концепти'),
  heroTitleLine2: b('explorations', 'та досліди'),
  heroDescription: b(
    'Rethinking industries with sharper UX, conversion, and craft.',
    'Переосмислення індустрій через UX, конверсію та крафт.'
  ),
  sectionTitle: b('All concepts', 'Усі концепти'),
  seo: {
    metaTitle: b('Concepts — STEPS LAB', 'Концепти — STEPS LAB'),
    metaDescription: b(
      'Design concepts and product explorations from STEPS LAB.',
      'Дизайн-концепти та продуктові досліди STEPS LAB.'
    ),
  },
  featuredIds: [],
}

export const DEFAULT_NEWS_INDEX: CollectionLandingPage = {
  badge: b('News', 'Новини'),
  heroTitleLine1: b('STEPS LAB', 'STEPS LAB'),
  heroTitleLine2: b('Insights', 'Огляди'),
  heroDescription: b(
    'Notes on AI-supported engineering, performance, and product delivery.',
    'Нотатки про AI-інженерію, performance та продуктовий delivery.'
  ),
  sectionTitle: b('Latest', 'Останні'),
  seo: {
    metaTitle: b('News — STEPS LAB', 'Новини — STEPS LAB'),
    metaDescription: b(
      'Updates and articles from STEPS LAB.',
      'Оновлення та статті від STEPS LAB.'
    ),
  },
  featuredIds: [],
}

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
    viewCasesLabel: b('View cases →', 'Переглянути кейси →'),
    stats: [
      { value: '2x', label: b('Faster', 'Швидше') },
      { value: 'AI', label: b('Development', 'Розробка') },
      { value: '24/7', label: b('Support', 'Підтримка') },
    ],
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
    servicesSectionTitle: b('Web studio services', 'Послуги веб-студії'),
    aboutSectionTitle: b('About the web studio', 'Про веб-студію'),
    casesSectionTitle: b('Website development cases', 'Кейси розробки сайтів'),
    conceptsHeading: b('Concepts', 'Концепти'),
    conceptsViewAll: b('View All Concepts', 'Переглянути всі концепти'),
    casesViewCase: b('View case →', 'Переглянути кейс →'),
  },
  homeWhy: {
    title: b('Why web studio STEPS LAB', 'Чому веб-студія STEPS LAB'),
    bullets: [
      b('Predictable development outcomes', 'Передбачувані результати розробки'),
      b('Clear communication with the studio', 'Зрозуміла комунікація зі студією'),
      b('No hype — only logic in development', 'Без хайпу — лише логіка в розробці'),
      b('AI development without chaos', 'AI-розробка без хаосу'),
    ],
    quote: b(
      "We don't sell trends.\nA development studio that builds websites and systems that work.",
      'Ми не продаємо тренди.\nСтудія розробки, яка будує сайти та системи, що працюють.'
    ),
  },
  homeTechStack: {
    title: b('Technologies We Use', 'Наш стек'),
  },
  homeFinalCta: {
    title: b('Ready to discuss your project?', 'Готові обговорити проєкт?'),
    buttonLabel: b('Get consultation', 'Отримати консультацію'),
  },
  casePageLabels: {
    aboutProject: b('About the project', 'Про проєкт'),
    whatWeDid: b('What we did', 'Що ми зробили'),
    results: b('Results', 'Результати'),
    client: b('Client', 'Клієнт'),
    timeline: b('Timeline', 'Термін'),
    technologies: b('Technologies', 'Технології'),
  },
  aboutPageContent: {
    heroBadge: b('About Us', 'Про нас'),
    heroTitle: b('Experience, amplified by intelligence.', 'Досвід, посилений інтелектом.'),
    heroSubtitle: b(
      'We combined 6 years of commercial software delivery with the capabilities of generative AI. STEPS LAB is not mass-market production; it is complex solution engineering where every line of code is controlled by an experienced developer.',
      'Ми поєднали 6 років комерційної розробки ПЗ із можливостями генеративного AI. STEPS LAB — це не масове виробництво, а інженерія складних рішень, де кожен рядок коду контролює досвідчений розробник.'
    ),
    philosophyTitle: b('Technology as the standard.', 'Технологія як стандарт.'),
    philosophyText: b(
      'We do not believe in magical numbers, we believe in architecture. Using Next.js and custom solutions, we deliver consistently high speed and flexibility that no standard CMS can provide. Your website performs fast because it is engineered correctly.',
      'Ми не віримо в магічні цифри — віримо в архітектуру. На Next.js і кастомних рішеннях ми даємо стабільно високу швидкість і гнучкість, якої не дає жодна типова CMS. Сайт швидкий, бо він спроєктований правильно.'
    ),
    customFocusTitle: b('Custom focus', 'Кастомний фокус'),
    customFocusText: b(
      'Instead of templates, we build proprietary admin panels around your real workflows. This guarantees security, scalability, and zero codebase clutter. AI helps us deliver this 2-3x faster without sacrificing premium output quality.',
      'Замість шаблонів будуємо власні адмін-панелі під ваші процеси. Це дає безпеку, масштабованість і чистий код. AI допомагає поставляти в 2–3 рази швидше без втрати якості.'
    ),
    conceptsTitle: b('See how we rethink existing businesses', 'Подивіться, як ми переосмислюємо бізнеси'),
    conceptsCta: b('View concepts', 'До концептів'),
  },
  contactPageContent: {
    badge: b('Contact', 'Контакт'),
    title1: b('Get in touch', 'Зв’яжіться'),
    title2: b('with the studio', 'зі студією'),
    description: b(
      "Let's discuss your website or web app project. Free consultation.",
      'Обговорімо ваш сайт або веб-застосунок. Безкоштовна консультація.'
    ),
    writeUs: b('Write to us', 'Напишіть нам'),
    or: b('OR', 'АБО'),
    leaveRequest: b('Leave a request', 'Залишити заявку'),
    namePlaceholder: b('Name', 'Ім’я'),
    companyPlaceholder: b('Company (optional)', 'Компанія (необов’язково)'),
    messagePlaceholder: b('Message', 'Повідомлення'),
    submit: b('Send', 'Надіслати'),
    submitting: b('Sending...', 'Надсилання...'),
    successTitle: b('Thank you!', 'Дякуємо!'),
    successText: b(
      "We've received your message and will contact you shortly.",
      'Ми отримали ваше повідомлення і невдовзі зв’яжемося.'
    ),
    writeAgain: b('Write again', 'Написати ще раз'),
    errorDefault: b('Something went wrong. Please try again.', 'Щось пішло не так. Спробуйте ще раз.'),
  },
}

const defaultServiceExtras = () => ({
  longDescription: b('', ''),
  benefits: { en: [] as string[], uk: [] as string[] },
  pricingNote: b('', ''),
  processSteps: { en: [] as string[], uk: [] as string[] },
  coverImageUrl: '',
  galleryImages: [] as string[],
  techStackLines: { en: [] as string[], uk: [] as string[] },
  seo: emptySeo(),
  status: 'published' as PublishStatus,
})

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
    ...defaultServiceExtras(),
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
    ...defaultServiceExtras(),
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
    ...defaultServiceExtras(),
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
    ...defaultServiceExtras(),
  },
]

const defaultCaseExtras = (href: string) => ({
  slug: slugFromCaseHref(href),
  category: b('', ''),
  thumbnailUrl: '',
  galleryImages: [] as string[],
  techStackTags: [] as string[],
  testimonial: emptyTestimonial(),
  projectLinks: [] as ProjectLink[],
  seo: emptySeo(),
  status: 'published' as PublishStatus,
})

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
    detail: builtInCaseDetail('case-ecommerce'),
    order: 0,
    updatedAt: iso(),
    ...defaultCaseExtras('/cases/ecommerce'),
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
    detail: builtInCaseDetail('case-saas'),
    order: 1,
    updatedAt: iso(),
    ...defaultCaseExtras('/cases/saas'),
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
    detail: builtInCaseDetail('case-corporate'),
    order: 2,
    updatedAt: iso(),
    ...defaultCaseExtras('/cases/corporate'),
  },
]

const techEn = ['Next.js', 'React', 'Node.js', 'Cursor', 'Claude', 'QWEN']

const defaultConceptExtras = () => ({
  category: b('', ''),
  thumbnailUrl: '',
  galleryImages: [] as string[],
  testimonial: emptyTestimonial(),
  projectLinks: [] as ProjectLink[],
  seo: emptySeo(),
  status: 'published' as PublishStatus,
})

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
    ...defaultConceptExtras(),
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
    ...defaultConceptExtras(),
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
    ...defaultConceptExtras(),
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
    ...defaultConceptExtras(),
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
    ...defaultConceptExtras(),
  },
]

export const DEFAULT_SITE_HEADER_CMS: SiteHeaderCMS = {
  logoUrl: '/steps-lab_logo-w.webp',
  navLinks: [
    { href: '/', label: b('Home', 'Головна') },
    { href: '/services', label: b('Services', 'Послуги') },
    { href: '/cases', label: b('Cases', 'Кейси') },
    { href: '/concepts', label: b('Concepts', 'Концепти') },
    { href: '/blog', label: b('Blog', 'Блог') },
    { href: '/about', label: b('About', 'Про нас') },
    { href: '/contacts', label: b('Contact', 'Контакти') },
  ],
  cta: { text: b('Get consultation', 'Отримати консультацію'), href: '/contacts' },
}

export const DEFAULT_SITE_FOOTER_CMS: SiteFooterCMS = {
  copyright: b('STEPS LAB. All rights reserved.', 'STEPS LAB. Усі права захищені.'),
  socialLinks: {
    linkedin: 'https://linkedin.com/company/stepslab',
    github: '#',
    x: '#',
  },
  contactEmail: 'stepslab.contact@gmail.com',
  phone: '+380000000000',
  columns: [
    {
      title: b('Navigate', 'Навігація'),
      links: [
        { href: '/', label: b('Home', 'Головна') },
        { href: '/services', label: b('Services', 'Послуги') },
        { href: '/approach', label: b('Approach', 'Підхід') },
        { href: '/cases', label: b('Cases', 'Кейси') },
        { href: '/concepts', label: b('Concepts', 'Концепти') },
        { href: '/blog', label: b('Blog', 'Блог') },
        { href: '/about', label: b('About', 'Про нас') },
        { href: '/contacts', label: b('Contact', 'Контакти') },
      ],
    },
  ],
}

export const DEFAULT_APPROACH_PAGE_CMS: ApproachPageCMS = {
  seo: {
    metaTitle: b(
      'Approach to web development | STEPS LAB — development studio',
      'Підхід до веб-розробки | STEPS LAB — студія розробки сайтів'
    ),
    metaDescription: b(
      'How we work: logic, AI development, result-oriented. A transparent process development studio.',
      'Як ми працюємо: логіка, AI-розробка, орієнтація на результат. Студія розробки сайтів з прозорим процесом.'
    ),
  },
  badge: b('Approach', 'Підхід'),
  heroTitleLine1: b('Our approach', 'Наш підхід'),
  heroTitleLine2: b('to web development', 'до веб-розробки'),
  heroDescription: b(
    'A development studio that builds systems. Logic, AI development, results.',
    'Студія розробки сайтів, яка будує системи. Логіка, AI-розробка, результат.'
  ),
  sectionTitle: b('Our approach to web development', 'Наш підхід до веб-розробки'),
  sectionSubtitle: b(
    'A development studio that builds systems and websites that work',
    'Студія розробки, яка будує системи та сайти, що працюють'
  ),
  steps: [
    {
      number: '01',
      title: b('Logic first', 'Логіка перед усім'),
      text: b(
        'Every solution in website development has a business rationale, not just a nice design.',
        'Кожне рішення в розробці сайту має бізнес-обґрунтування, а не лише гарний дизайн.'
      ),
    },
    {
      number: '02',
      title: b('AI development under control', 'AI-розробка під контролем'),
      text: b(
        'We use AI to speed up web development, but final decisions are always made by the team.',
        'Використовуємо AI для прискорення веб-розробки, але фінальні рішення завжди за командою.'
      ),
    },
    {
      number: '03',
      title: b('Result-oriented', 'Орієнтація на результат'),
      text: b(
        'Website development is about creating a tool for business growth, not just a page on the internet.',
        'Розробка сайту — це створення інструменту для зростання бізнесу, а не просто сторінки в інтернеті.'
      ),
    },
  ],
  whyTitle: b('Why web studio STEPS LAB', 'Чому веб-студія STEPS LAB'),
  whyBullets: [
    b('Predictable development outcomes', 'Передбачувані результати розробки'),
    b('Clear communication with the studio', 'Зрозуміла комунікація зі студією'),
    b('No hype — only logic in development', 'Без хайпу — лише логіка в розробці'),
    b('AI development without chaos', 'AI-розробка без хаосу'),
  ],
  whyQuote: b(
    "We don't sell trends.\nA development studio that builds websites and systems that work.",
    'Ми не продаємо тренди.\nСтудія розробки, яка будує сайти та системи, що працюють.'
  ),
  whyImageUrl: '',
}

export function defaultCmsPayload(): PublicCmsPayload {
  return {
    pages: DEFAULT_PAGES_CONTENT,
    services: DEFAULT_SERVICES_CMS,
    cases: DEFAULT_CASES_CMS,
    concepts: DEFAULT_CONCEPTS_CMS,
    news: [],
    portfolioIndex: DEFAULT_PORTFOLIO_INDEX,
    servicesIndex: DEFAULT_SERVICES_INDEX,
    labIndex: DEFAULT_LAB_INDEX,
    newsIndex: DEFAULT_NEWS_INDEX,
    siteHeader: DEFAULT_SITE_HEADER_CMS,
    siteFooter: DEFAULT_SITE_FOOTER_CMS,
    approachPage: DEFAULT_APPROACH_PAGE_CMS,
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
  const { pages, services, siteHeader, siteFooter } = payload
  const logo =
    siteHeader.logoUrl?.trim() ||
    pages.images.logo ||
    DEFAULT_SITE_HEADER_CMS.logoUrl
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
    images: {
      ...pages.images,
      logo,
    },
    headerNav: (siteHeader.navLinks ?? []).map((l) => ({
      href: l.href,
      label: pickLang(l.label, locale),
    })),
    headerCtaText: pickLang(siteHeader.cta.text, locale),
    headerCtaHref: siteHeader.cta.href || '/contacts',
    footer: {
      socialLinks: siteFooter.socialLinks ?? pages.footer.socialLinks,
      contactEmail: siteFooter.contactEmail?.trim() || pages.footer.contactEmail,
      phone: siteFooter.phone?.trim() || pages.footer.phone,
      copyrightText:
        pickLang(siteFooter.copyright, locale) || pickLang(pages.footer.copyrightText, locale),
    },
    footerColumns: (siteFooter.columns ?? []).map((col) => ({
      title: pickLang(col.title, locale),
      links: (col.links ?? []).map((l) => ({
        href: l.href,
        label: pickLang(l.label, locale),
      })),
    })),
  }
}
