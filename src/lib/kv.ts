import { createClient } from 'redis'
import { kv } from '@vercel/kv'
import type { CaseCMS, ConceptCMS, PagesContent, PublicCmsPayload, ServiceCMS } from '@/lib/cms-types'
import {
  DEFAULT_CASES_CMS,
  DEFAULT_CONCEPTS_CMS,
  DEFAULT_PAGES_CONTENT,
  DEFAULT_SERVICES_CMS,
  KV_KEYS,
  defaultCmsPayload,
} from '@/lib/cms-types'

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

function mergePages(partial: unknown): PagesContent {
  const d = DEFAULT_PAGES_CONTENT
  if (!partial || typeof partial !== 'object') return d
  const p = partial as Partial<PagesContent>
  return {
    hero: {
      title: { ...d.hero.title, ...(p.hero?.title ?? {}) },
      subtitle: { ...d.hero.subtitle, ...(p.hero?.subtitle ?? {}) },
      ctaText: { ...d.hero.ctaText, ...(p.hero?.ctaText ?? {}) },
      ctaLink: p.hero?.ctaLink ?? d.hero.ctaLink,
      heroImageUrl: p.hero?.heroImageUrl ?? d.hero.heroImageUrl,
    },
    aboutTech: {
      workflowDescription: {
        ...d.aboutTech.workflowDescription,
        ...(p.aboutTech?.workflowDescription ?? {}),
      },
      teamExperience: {
        ...d.aboutTech.teamExperience,
        ...(p.aboutTech?.teamExperience ?? {}),
      },
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
      copyrightText: {
        ...d.footer.copyrightText,
        ...(p.footer?.copyrightText ?? {}),
      },
    },
    labels: {
      casesSectionTitle: {
        ...d.labels.casesSectionTitle,
        ...(p.labels?.casesSectionTitle ?? {}),
      },
      conceptsHeading: { ...d.labels.conceptsHeading, ...(p.labels?.conceptsHeading ?? {}) },
      conceptsViewAll: { ...d.labels.conceptsViewAll, ...(p.labels?.conceptsViewAll ?? {}) },
      casesViewCase: { ...d.labels.casesViewCase, ...(p.labels?.casesViewCase ?? {}) },
    },
  }
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
  if (!Array.isArray(arr) || arr.length === 0) return DEFAULT_SERVICES_CMS
  return arr.map((item, i) => sanitizeServiceItem(item, i))
}

function sanitizeCaseItem(c: unknown, index: number): CaseCMS {
  const d = DEFAULT_CASES_CMS[index] ?? DEFAULT_CASES_CMS[0]
  if (!c || typeof c !== 'object') return { ...d, id: d?.id ?? `case-${index}` }
  const x = c as Partial<CaseCMS>
  const def = d ?? DEFAULT_CASES_CMS[0]
  return {
    id: x.id ?? def.id,
    href: x.href ?? def.href,
    title: { ...def.title, ...(x.title ?? {}) },
    description: { ...def.description, ...(x.description ?? {}) },
    result: { ...def.result, ...(x.result ?? {}) },
    previewImageUrl: x.previewImageUrl ?? def.previewImageUrl,
    order: typeof x.order === 'number' ? x.order : def.order,
    updatedAt: typeof x.updatedAt === 'string' ? x.updatedAt : def.updatedAt,
  }
}

function sanitizeCases(arr: unknown): CaseCMS[] {
  if (!Array.isArray(arr) || arr.length === 0) return DEFAULT_CASES_CMS
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
  if (!Array.isArray(arr) || arr.length === 0) return DEFAULT_CONCEPTS_CMS
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
