import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from 'redis'
import { kv } from '@vercel/kv'
import type {
  BilingualText,
  CaseCMS,
  CasePageDetail,
  ConceptCMS,
  HeroStatItem,
  PagesContent,
  PublicCmsPayload,
  ServiceCMS,
} from '@/lib/cms-types'
import {
  DEFAULT_CASES_CMS,
  DEFAULT_CONCEPTS_CMS,
  DEFAULT_PAGES_CONTENT,
  DEFAULT_SERVICES_CMS,
  KV_KEYS,
  defaultCmsPayload,
} from '@/lib/cms-types'
import { builtInCaseDetail } from '@/lib/cms-case-defaults'

function hasRedisUrl(): boolean {
  return Boolean(process.env.REDIS_URL?.trim())
}

function hasKvRestEnv(): boolean {
  return Boolean(process.env.KV_REST_API_URL?.trim() && process.env.KV_REST_API_TOKEN?.trim())
}

function storageMode(): 'redis' | 'kv' | 'none' {
  if (hasRedisUrl()) return 'redis'
  if (hasKvRestEnv()) return 'kv'
  return 'none'
}

type RedisClient = ReturnType<typeof createClient>

declare global {
  // eslint-disable-next-line no-var
  var __stepslabRedis: RedisClient | undefined
}

async function getRedis(): Promise<RedisClient> {
  const url = process.env.REDIS_URL?.trim()
  if (!url) {
    throw new Error('REDIS_URL is not set')
  }
  if (!globalThis.__stepslabRedis) {
    const client = createClient({ url })
    client.on('error', (err) => console.error('[redis]', err))
    globalThis.__stepslabRedis = client
  }
  const client = globalThis.__stepslabRedis
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}

async function getJson<T>(key: string): Promise<T | null> {
  const mode = storageMode()
  if (mode === 'none') return null

  try {
    if (mode === 'redis') {
      const redis = await getRedis()
      const raw = await redis.get(key)
      if (raw == null) return null
      try {
        return JSON.parse(raw) as T
      } catch {
        return null
      }
    }

    const raw = await kv.get<T | string>(key)
    if (raw == null) return null
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw) as T
      } catch {
        return null
      }
    }
    return raw as T
  } catch (e) {
    console.error('[kv] getJson', key, e)
    return null
  }
}

function mb(base: BilingualText, patch?: Partial<BilingualText>): BilingualText {
  return { ...base, ...(patch ?? {}) }
}

function mergeCasePageDetail(base: CasePageDetail, patch?: Partial<CasePageDetail>): CasePageDetail {
  if (!patch) return base
  return {
    screensSectionTitle: mb(base.screensSectionTitle, patch.screensSectionTitle),
    breadcrumb: mb(base.breadcrumb, patch.breadcrumb),
    subtitle: mb(base.subtitle, patch.subtitle),
    overviewP1: mb(base.overviewP1, patch.overviewP1),
    overviewP2: mb(base.overviewP2, patch.overviewP2),
    screen1Caption: mb(base.screen1Caption, patch.screen1Caption),
    screen2Caption: mb(base.screen2Caption, patch.screen2Caption),
    screen3Caption: mb(base.screen3Caption, patch.screen3Caption),
    screen4Caption: mb(base.screen4Caption, patch.screen4Caption),
    feature1Title: mb(base.feature1Title, patch.feature1Title),
    feature1Text: mb(base.feature1Text, patch.feature1Text),
    feature2Title: mb(base.feature2Title, patch.feature2Title),
    feature2Text: mb(base.feature2Text, patch.feature2Text),
    feature3Title: mb(base.feature3Title, patch.feature3Title),
    feature3Text: mb(base.feature3Text, patch.feature3Text),
    feature4Title: mb(base.feature4Title, patch.feature4Title),
    feature4Text: mb(base.feature4Text, patch.feature4Text),
    fullscreenCaption: mb(base.fullscreenCaption, patch.fullscreenCaption),
    result1Value: patch.result1Value ?? base.result1Value,
    result2Value: patch.result2Value ?? base.result2Value,
    result3Value: patch.result3Value ?? base.result3Value,
    result1Label: mb(base.result1Label, patch.result1Label),
    result2Label: mb(base.result2Label, patch.result2Label),
    result3Label: mb(base.result3Label, patch.result3Label),
    clientType: mb(base.clientType, patch.clientType),
    timelineValue: mb(base.timelineValue, patch.timelineValue),
    technologies: Array.isArray(patch.technologies) ? patch.technologies : base.technologies,
    ctaTitle: mb(base.ctaTitle, patch.ctaTitle),
    images: { ...base.images, ...(patch.images ?? {}) },
  }
}

async function setJson<T>(key: string, value: T): Promise<void> {
  const mode = storageMode()
  if (mode === 'none') {
    throw new Error(
      'No CMS storage configured. Set REDIS_URL (Redis Cloud TCP URL) or KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV REST). See .env.example.'
    )
  }
  if (mode === 'redis') {
    const redis = await getRedis()
    await redis.set(key, JSON.stringify(value))
    return
  }
  await kv.set(key, value)
}

function mergeHeroStats(patch: unknown, base: HeroStatItem[]): HeroStatItem[] {
  if (!Array.isArray(patch)) return base
  return patch.map((row, i) => {
    const b = base[i] ?? { value: '', label: { en: '', uk: '' } }
    if (!row || typeof row !== 'object') return b
    const r = row as Partial<HeroStatItem> & { label?: Partial<BilingualText> }
    return {
      value: typeof r.value === 'string' ? r.value : b.value,
      label: mb(b.label, r.label),
    }
  })
}

function mergeWhyBullets(patch: unknown, base: BilingualText[]): BilingualText[] {
  if (!Array.isArray(patch)) return base
  return patch.map((x, i) => {
    const bi = base[i] ?? { en: '', uk: '' }
    if (!x || typeof x !== 'object') return bi
    return mb(bi, x as Partial<BilingualText>)
  })
}

/** Merge partial JSON onto an existing pages document (for deep patches from admin). */
export function mergePagesOnto(base: PagesContent, partial: unknown): PagesContent {
  if (!partial || typeof partial !== 'object') return base
  const p = partial as Partial<PagesContent>
  const d = base
  return {
    hero: {
      title: mb(d.hero.title, p.hero?.title),
      subtitle: mb(d.hero.subtitle, p.hero?.subtitle),
      ctaText: mb(d.hero.ctaText, p.hero?.ctaText),
      ctaLink: p.hero?.ctaLink ?? d.hero.ctaLink,
      heroImageUrl: p.hero?.heroImageUrl ?? d.hero.heroImageUrl,
      viewCasesLabel: mb(d.hero.viewCasesLabel, p.hero?.viewCasesLabel),
      stats: mergeHeroStats(p.hero?.stats, d.hero.stats),
    },
    aboutTech: {
      workflowDescription: mb(d.aboutTech.workflowDescription, p.aboutTech?.workflowDescription),
      teamExperience: mb(d.aboutTech.teamExperience, p.aboutTech?.teamExperience),
    },
    images: {
      logo: p.images?.logo ?? d.images.logo,
      hero: p.images?.hero ?? d.images.hero,
      gallery: Array.isArray(p.images?.gallery) ? p.images.gallery : d.images.gallery,
    },
    footer: {
      socialLinks: { ...d.footer.socialLinks, ...(p.footer?.socialLinks ?? {}) },
      contactEmail: p.footer?.contactEmail ?? d.footer.contactEmail,
      phone: p.footer?.phone ?? d.footer.phone,
      copyrightText: mb(d.footer.copyrightText, p.footer?.copyrightText),
    },
    labels: {
      servicesSectionTitle: mb(d.labels.servicesSectionTitle, p.labels?.servicesSectionTitle),
      aboutSectionTitle: mb(d.labels.aboutSectionTitle, p.labels?.aboutSectionTitle),
      casesSectionTitle: mb(d.labels.casesSectionTitle, p.labels?.casesSectionTitle),
      conceptsHeading: mb(d.labels.conceptsHeading, p.labels?.conceptsHeading),
      conceptsViewAll: mb(d.labels.conceptsViewAll, p.labels?.conceptsViewAll),
      casesViewCase: mb(d.labels.casesViewCase, p.labels?.casesViewCase),
    },
    homeWhy: {
      title: mb(d.homeWhy.title, p.homeWhy?.title),
      bullets: mergeWhyBullets(p.homeWhy?.bullets, d.homeWhy.bullets),
      quote: mb(d.homeWhy.quote, p.homeWhy?.quote),
    },
    homeTechStack: {
      title: mb(d.homeTechStack.title, p.homeTechStack?.title),
    },
    homeFinalCta: {
      title: mb(d.homeFinalCta.title, p.homeFinalCta?.title),
      buttonLabel: mb(d.homeFinalCta.buttonLabel, p.homeFinalCta?.buttonLabel),
    },
    casePageLabels: {
      aboutProject: mb(d.casePageLabels.aboutProject, p.casePageLabels?.aboutProject),
      whatWeDid: mb(d.casePageLabels.whatWeDid, p.casePageLabels?.whatWeDid),
      results: mb(d.casePageLabels.results, p.casePageLabels?.results),
      client: mb(d.casePageLabels.client, p.casePageLabels?.client),
      timeline: mb(d.casePageLabels.timeline, p.casePageLabels?.timeline),
      technologies: mb(d.casePageLabels.technologies, p.casePageLabels?.technologies),
    },
    aboutPageContent: {
      heroBadge: mb(d.aboutPageContent.heroBadge, p.aboutPageContent?.heroBadge),
      heroTitle: mb(d.aboutPageContent.heroTitle, p.aboutPageContent?.heroTitle),
      heroSubtitle: mb(d.aboutPageContent.heroSubtitle, p.aboutPageContent?.heroSubtitle),
      philosophyTitle: mb(d.aboutPageContent.philosophyTitle, p.aboutPageContent?.philosophyTitle),
      philosophyText: mb(d.aboutPageContent.philosophyText, p.aboutPageContent?.philosophyText),
      customFocusTitle: mb(d.aboutPageContent.customFocusTitle, p.aboutPageContent?.customFocusTitle),
      customFocusText: mb(d.aboutPageContent.customFocusText, p.aboutPageContent?.customFocusText),
      conceptsTitle: mb(d.aboutPageContent.conceptsTitle, p.aboutPageContent?.conceptsTitle),
      conceptsCta: mb(d.aboutPageContent.conceptsCta, p.aboutPageContent?.conceptsCta),
    },
    contactPageContent: {
      badge: mb(d.contactPageContent.badge, p.contactPageContent?.badge),
      title1: mb(d.contactPageContent.title1, p.contactPageContent?.title1),
      title2: mb(d.contactPageContent.title2, p.contactPageContent?.title2),
      description: mb(d.contactPageContent.description, p.contactPageContent?.description),
      writeUs: mb(d.contactPageContent.writeUs, p.contactPageContent?.writeUs),
      or: mb(d.contactPageContent.or, p.contactPageContent?.or),
      leaveRequest: mb(d.contactPageContent.leaveRequest, p.contactPageContent?.leaveRequest),
      namePlaceholder: mb(d.contactPageContent.namePlaceholder, p.contactPageContent?.namePlaceholder),
      companyPlaceholder: mb(d.contactPageContent.companyPlaceholder, p.contactPageContent?.companyPlaceholder),
      messagePlaceholder: mb(d.contactPageContent.messagePlaceholder, p.contactPageContent?.messagePlaceholder),
      submit: mb(d.contactPageContent.submit, p.contactPageContent?.submit),
      submitting: mb(d.contactPageContent.submitting, p.contactPageContent?.submitting),
      successTitle: mb(d.contactPageContent.successTitle, p.contactPageContent?.successTitle),
      successText: mb(d.contactPageContent.successText, p.contactPageContent?.successText),
      writeAgain: mb(d.contactPageContent.writeAgain, p.contactPageContent?.writeAgain),
      errorDefault: mb(d.contactPageContent.errorDefault, p.contactPageContent?.errorDefault),
    },
  }
}

function mergePages(partial: unknown): PagesContent {
  return mergePagesOnto(DEFAULT_PAGES_CONTENT, partial)
}

function sanitizeServiceItem(s: unknown, index: number): ServiceCMS {
  const d = DEFAULT_SERVICES_CMS[index] ?? DEFAULT_SERVICES_CMS[0]
  if (!s || typeof s !== 'object') return { ...d, id: d?.id ?? `svc-${index}` }
  const x = s as Partial<ServiceCMS>
  const def = d ?? DEFAULT_SERVICES_CMS[0]
  return {
    id: x.id ?? def.id,
    href: x.href ?? def.href,
    icon_name: x.icon_name ?? def.icon_name,
    title: { ...def.title, ...(x.title ?? {}) },
    description: { ...def.description, ...(x.description ?? {}) },
    price: { ...def.price, ...(x.price ?? {}) },
    order: typeof x.order === 'number' ? x.order : def.order,
    updatedAt: typeof x.updatedAt === 'string' ? x.updatedAt : def.updatedAt,
  }
}

function sanitizeServices(arr: unknown): ServiceCMS[] {
  if (!Array.isArray(arr)) return DEFAULT_SERVICES_CMS
  if (arr.length === 0) return []
  return arr.map((item, i) => sanitizeServiceItem(item, i))
}

function sanitizeCaseItem(c: unknown, index: number): CaseCMS {
  const fallback = DEFAULT_CASES_CMS[index] ?? DEFAULT_CASES_CMS[0]
  if (!c || typeof c !== 'object') return fallback
  const x = c as Partial<CaseCMS>
  const id = typeof x.id === 'string' && x.id.length > 0 ? x.id : fallback.id
  const def = DEFAULT_CASES_CMS.find((dc) => dc.id === id) ?? fallback
  const baseDetail = builtInCaseDetail(id)
  const mergedDetail = mergeCasePageDetail(baseDetail, x.detail)
  return {
    id,
    href: x.href ?? def.href,
    title: { ...def.title, ...(x.title ?? {}) },
    description: { ...def.description, ...(x.description ?? {}) },
    result: { ...def.result, ...(x.result ?? {}) },
    previewImageUrl: x.previewImageUrl ?? def.previewImageUrl,
    detail: mergedDetail,
    order: typeof x.order === 'number' ? x.order : def.order,
    updatedAt: typeof x.updatedAt === 'string' ? x.updatedAt : def.updatedAt,
  }
}

function sanitizeCases(arr: unknown): CaseCMS[] {
  if (!Array.isArray(arr)) return DEFAULT_CASES_CMS
  if (arr.length === 0) return []
  return arr.map((item, i) => sanitizeCaseItem(item, i))
}

function sanitizeConceptItem(c: unknown, index: number): ConceptCMS {
  const d = DEFAULT_CONCEPTS_CMS[index] ?? DEFAULT_CONCEPTS_CMS[0]
  if (!c || typeof c !== 'object') return { ...d, id: d?.id ?? `concept-${index}` }
  const x = c as Partial<ConceptCMS>
  const def = d ?? DEFAULT_CONCEPTS_CMS[0]
  return {
    id: x.id ?? def.id,
    slug: x.slug ?? def.slug,
    title: { ...def.title, ...(x.title ?? {}) },
    shortDescription: { ...def.shortDescription, ...(x.shortDescription ?? {}) },
    description: { ...def.description, ...(x.description ?? {}) },
    improvements: {
      en: Array.isArray(x.improvements?.en) ? x.improvements.en : def.improvements.en,
      uk: Array.isArray(x.improvements?.uk) ? x.improvements.uk : def.improvements.uk,
    },
    technologies: {
      en: Array.isArray(x.technologies?.en) ? x.technologies.en : def.technologies.en,
      uk: Array.isArray(x.technologies?.uk) ? x.technologies.uk : def.technologies.uk,
    },
    desktopImage: x.desktopImage ?? def.desktopImage,
    mobileImage: x.mobileImage ?? def.mobileImage,
    oldDesktopImage: x.oldDesktopImage ?? def.oldDesktopImage,
    oldMobileImage: x.oldMobileImage ?? def.oldMobileImage,
    order: typeof x.order === 'number' ? x.order : def.order,
    updatedAt: typeof x.updatedAt === 'string' ? x.updatedAt : def.updatedAt,
  }
}

function sanitizeConcepts(arr: unknown): ConceptCMS[] {
  if (!Array.isArray(arr)) return DEFAULT_CONCEPTS_CMS
  if (arr.length === 0) return []
  return arr.map((item, i) => sanitizeConceptItem(item, i))
}

export async function getPagesFromKv(): Promise<PagesContent> {
  const raw = await getJson<unknown>(KV_KEYS.pages)
  return mergePages(raw)
}

export async function setPagesToKv(pages: PagesContent): Promise<void> {
  await setJson(KV_KEYS.pages, pages)
}

export async function getServicesFromKv(): Promise<ServiceCMS[]> {
  const raw = await getJson<unknown>(KV_KEYS.services)
  return sanitizeServices(raw)
}

export async function setServicesToKv(services: ServiceCMS[]): Promise<void> {
  await setJson(KV_KEYS.services, services)
}

export async function getCasesFromKv(): Promise<CaseCMS[]> {
  const raw = await getJson<unknown>(KV_KEYS.cases)
  return sanitizeCases(raw)
}

export async function setCasesToKv(cases: CaseCMS[]): Promise<void> {
  await setJson(KV_KEYS.cases, cases)
}

export async function getConceptsFromKv(): Promise<ConceptCMS[]> {
  const raw = await getJson<unknown>(KV_KEYS.concepts)
  return sanitizeConcepts(raw)
}

export async function setConceptsToKv(concepts: ConceptCMS[]): Promise<void> {
  await setJson(KV_KEYS.concepts, concepts)
}

export async function getFullCmsPayload(): Promise<PublicCmsPayload> {
  noStore()
  try {
    const [pages, services, cases, concepts] = await Promise.all([
      getPagesFromKv(),
      getServicesFromKv(),
      getCasesFromKv(),
      getConceptsFromKv(),
    ])
    return { pages, services, cases, concepts }
  } catch (e) {
    console.error('[kv] getFullCmsPayload', e)
    return defaultCmsPayload()
  }
}

/** Seed KV with defaults (idempotent). Use after creating the store. */
export async function seedCmsIfEmpty(): Promise<{ seeded: boolean }> {
  const pages = await getJson(KV_KEYS.pages)
  if (pages != null) return { seeded: false }
  const payload = defaultCmsPayload()
  await Promise.all([
    setJson(KV_KEYS.pages, payload.pages),
    setJson(KV_KEYS.services, payload.services),
    setJson(KV_KEYS.cases, payload.cases),
    setJson(KV_KEYS.concepts, payload.concepts),
  ])
  return { seeded: true }
}
