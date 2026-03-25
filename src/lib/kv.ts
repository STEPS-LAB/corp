import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from 'redis'
import { kv } from '@vercel/kv'
import type {
  ApproachPageCMS,
  ApproachStepCMS,
  BilingualText,
  CaseCMS,
  CasePageDetail,
  CmsNavLink,
  CollectionLandingPage,
  ConceptCMS,
  FooterMenuColumnCMS,
  HeroStatItem,
  NewsCMS,
  PagesContent,
  PublicCmsPayload,
  ServiceCMS,
  ServiceProcessStep,
  ServiceProjectTypeCard,
  ServiceResultMetric,
  SiteFooterCMS,
  SiteHeaderCMS,
} from '@/lib/cms-types'
import {
  DEFAULT_APPROACH_PAGE_CMS,
  DEFAULT_CASES_CMS,
  DEFAULT_CONCEPTS_CMS,
  DEFAULT_LAB_INDEX,
  DEFAULT_NEWS_INDEX,
  DEFAULT_PAGES_CONTENT,
  DEFAULT_PORTFOLIO_INDEX,
  DEFAULT_SERVICES_CMS,
  DEFAULT_SERVICES_INDEX,
  DEFAULT_SITE_FOOTER_CMS,
  DEFAULT_SITE_HEADER_CMS,
  KV_KEYS,
  defaultCmsPayload,
  emptySeo,
  slugFromCaseHref,
} from '@/lib/cms-types'
import { CMS_GLOBAL_KEYS, COLLECTION_PAGE_SLUGS, GRANULAR, type CmsCollection } from '@/lib/cms-granular-keys'
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

export async function deleteKvKey(key: string): Promise<void> {
  const mode = storageMode()
  if (mode === 'none') return
  if (mode === 'redis') {
    const redis = await getRedis()
    await redis.del(key)
    return
  }
  await kv.del(key)
}

function mergeCollectionLanding(partial: unknown, def: CollectionLandingPage): CollectionLandingPage {
  if (!partial || typeof partial !== 'object') return def
  const p = partial as Partial<CollectionLandingPage>
  return {
    badge: mb(def.badge, p.badge),
    heroTitleLine1: mb(def.heroTitleLine1, p.heroTitleLine1),
    heroTitleLine2: mb(def.heroTitleLine2, p.heroTitleLine2),
    heroDescription: mb(def.heroDescription, p.heroDescription),
    sectionTitle: mb(def.sectionTitle, p.sectionTitle),
    seo: {
      metaTitle: mb(def.seo.metaTitle, p.seo?.metaTitle),
      metaDescription: mb(def.seo.metaDescription, p.seo?.metaDescription),
    },
    featuredIds: Array.isArray(p.featuredIds) ? p.featuredIds : def.featuredIds,
  }
}

export async function getCollectionLandingPageKv(slug: string, fallback: CollectionLandingPage): Promise<CollectionLandingPage> {
  const raw = await getJson<unknown>(GRANULAR.page(slug))
  return mergeCollectionLanding(raw, fallback)
}

export async function setCollectionLandingPageKv(slug: string, data: CollectionLandingPage): Promise<void> {
  await setJson(GRANULAR.page(slug), data)
}

function sanitizeCmsNavLink(raw: unknown, def: CmsNavLink): CmsNavLink {
  if (!raw || typeof raw !== 'object') return def
  const x = raw as Partial<CmsNavLink>
  return {
    href: typeof x.href === 'string' ? x.href : def.href,
    label: mb(def.label, x.label),
  }
}

function sanitizeFooterColumn(raw: unknown, def: FooterMenuColumnCMS): FooterMenuColumnCMS {
  if (!raw || typeof raw !== 'object') return def
  const x = raw as Partial<FooterMenuColumnCMS>
  const defLink = def.links[0] ?? { href: '/', label: { en: '', uk: '' } }
  const links = Array.isArray(x.links)
    ? x.links.map((l, i) => sanitizeCmsNavLink(l, def.links[i] ?? defLink))
    : def.links
  return {
    title: mb(def.title, x.title),
    links: links.length ? links : def.links,
  }
}

export function sanitizeSiteHeader(raw: unknown): SiteHeaderCMS {
  const d = DEFAULT_SITE_HEADER_CMS
  if (!raw || typeof raw !== 'object') return d
  const x = raw as Partial<SiteHeaderCMS>
  const navLinks = Array.isArray(x.navLinks)
    ? x.navLinks.map((l, i) => sanitizeCmsNavLink(l, d.navLinks[i] ?? d.navLinks[0]!))
    : d.navLinks
  const cta = x.cta && typeof x.cta === 'object' ? x.cta : d.cta
  return {
    logoUrl: typeof x.logoUrl === 'string' ? x.logoUrl : d.logoUrl,
    navLinks: navLinks.length ? navLinks : d.navLinks,
    cta: {
      text: mb(d.cta.text, cta.text),
      href: typeof cta.href === 'string' ? cta.href : d.cta.href,
    },
  }
}

export function sanitizeSiteFooter(raw: unknown): SiteFooterCMS {
  const d = DEFAULT_SITE_FOOTER_CMS
  if (!raw || typeof raw !== 'object') return d
  const x = raw as Partial<SiteFooterCMS>
  const social = x.socialLinks && typeof x.socialLinks === 'object' ? x.socialLinks : d.socialLinks
  const columns = Array.isArray(x.columns)
    ? x.columns.map((c, i) => sanitizeFooterColumn(c, d.columns[i] ?? d.columns[0]!))
    : d.columns
  return {
    copyright: mb(d.copyright, x.copyright),
    socialLinks: {
      linkedin: typeof social.linkedin === 'string' ? social.linkedin : d.socialLinks.linkedin,
      github: typeof social.github === 'string' ? social.github : d.socialLinks.github,
      x: typeof social.x === 'string' ? social.x : d.socialLinks.x,
    },
    contactEmail: typeof x.contactEmail === 'string' ? x.contactEmail : d.contactEmail,
    phone: typeof x.phone === 'string' ? x.phone : d.phone,
    columns: columns.length ? columns : d.columns,
  }
}

function sanitizeApproachStep(raw: unknown, def: ApproachStepCMS): ApproachStepCMS {
  if (!raw || typeof raw !== 'object') return def
  const x = raw as Partial<ApproachStepCMS>
  return {
    number: typeof x.number === 'string' ? x.number : def.number,
    title: mb(def.title, x.title),
    text: mb(def.text, x.text),
  }
}

export function sanitizeApproachPage(raw: unknown): ApproachPageCMS {
  const d = DEFAULT_APPROACH_PAGE_CMS
  if (!raw || typeof raw !== 'object') return d
  const x = raw as Partial<ApproachPageCMS>
  const seo = x.seo && typeof x.seo === 'object' ? x.seo : d.seo
  const steps = Array.isArray(x.steps)
    ? x.steps.map((s, i) => sanitizeApproachStep(s, d.steps[i] ?? d.steps[0]!))
    : d.steps
  const whyBullets = Array.isArray(x.whyBullets)
    ? x.whyBullets.map((b, i) => {
        const bi = d.whyBullets[i] ?? { en: '', uk: '' }
        if (!b || typeof b !== 'object') return bi
        return mb(bi, b as Partial<BilingualText>)
      })
    : d.whyBullets
  return {
    seo: {
      metaTitle: mb(d.seo.metaTitle, seo.metaTitle),
      metaDescription: mb(d.seo.metaDescription, seo.metaDescription),
    },
    badge: mb(d.badge, x.badge),
    heroTitleLine1: mb(d.heroTitleLine1, x.heroTitleLine1),
    heroTitleLine2: mb(d.heroTitleLine2, x.heroTitleLine2),
    heroDescription: mb(d.heroDescription, x.heroDescription),
    sectionTitle: mb(d.sectionTitle, x.sectionTitle),
    sectionSubtitle: mb(d.sectionSubtitle, x.sectionSubtitle),
    steps: steps.length ? steps : d.steps,
    whyTitle: mb(d.whyTitle, x.whyTitle),
    whyBullets: whyBullets.length ? whyBullets : d.whyBullets,
    whyQuote: mb(d.whyQuote, x.whyQuote),
    whyImageUrl: typeof x.whyImageUrl === 'string' ? x.whyImageUrl : d.whyImageUrl,
  }
}

export async function getSiteHeaderKv(): Promise<SiteHeaderCMS> {
  const raw = await getJson<unknown>(CMS_GLOBAL_KEYS.header)
  return sanitizeSiteHeader(raw)
}

export async function setSiteHeaderKv(data: SiteHeaderCMS): Promise<void> {
  await setJson(CMS_GLOBAL_KEYS.header, sanitizeSiteHeader(data))
}

export async function getSiteFooterKv(): Promise<SiteFooterCMS> {
  const raw = await getJson<unknown>(CMS_GLOBAL_KEYS.footer)
  return sanitizeSiteFooter(raw)
}

export async function setSiteFooterKv(data: SiteFooterCMS): Promise<void> {
  await setJson(CMS_GLOBAL_KEYS.footer, sanitizeSiteFooter(data))
}

export async function getApproachPageKv(): Promise<ApproachPageCMS> {
  const raw = await getJson<unknown>(CMS_GLOBAL_KEYS.approach)
  return sanitizeApproachPage(raw)
}

export async function setApproachPageKv(data: ApproachPageCMS): Promise<void> {
  await setJson(CMS_GLOBAL_KEYS.approach, sanitizeApproachPage(data))
}

async function ensureGranularMigrated(collection: CmsCollection, legacyKey: string): Promise<void> {
  const idx = await getJson<string[]>(GRANULAR.index(collection))
  if (idx !== null) return
  const raw = await getJson<unknown>(legacyKey)
  if (raw == null || !Array.isArray(raw) || raw.length === 0) return

  if (collection === 'cases') {
    const list = raw.map((item, i) => sanitizeCaseItem(item, i))
    await setJson(
      GRANULAR.index('cases'),
      list.slice().sort((a, b) => a.order - b.order).map((c) => c.id)
    )
    for (const c of list) await setJson(GRANULAR.item('cases', c.id), c)
    return
  }
  if (collection === 'services') {
    const list = raw.map((item, i) => sanitizeServiceItem(item, i))
    await setJson(
      GRANULAR.index('services'),
      list.slice().sort((a, b) => a.order - b.order).map((s) => s.id)
    )
    for (const s of list) await setJson(GRANULAR.item('services', s.id), s)
    return
  }
  const list = raw.map((item, i) => sanitizeConceptItem(item, i))
  await setJson(
    GRANULAR.index('concepts'),
    list.slice().sort((a, b) => a.order - b.order).map((c) => c.id)
  )
  for (const c of list) await setJson(GRANULAR.item('concepts', c.id), c)
}

async function ensureNewsMigrated(): Promise<void> {
  const idx = await getJson<string[]>(GRANULAR.index('news'))
  if (idx !== null) return
  const raw = await getJson<unknown>(KV_KEYS.news)
  if (raw == null || !Array.isArray(raw) || raw.length === 0) {
    await setJson(GRANULAR.index('news'), [])
    return
  }
  const list = raw.map((item, i) => sanitizeNewsItem(item, i))
  await setJson(
    GRANULAR.index('news'),
    list
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((n) => n.id)
  )
  for (const n of list) await setJson(GRANULAR.item('news', n.id), n)
}

async function syncNewsLegacyFromGranular(): Promise<void> {
  const idx = await getJson<string[]>(GRANULAR.index('news'))
  if (!idx || idx.length === 0) {
    await setJson(KV_KEYS.news, [])
    return
  }
  const items: NewsCMS[] = []
  for (const id of idx) {
    const raw = await getJson<unknown>(GRANULAR.item('news', id))
    if (raw) items.push(sanitizeNewsItem(raw, 0))
  }
  items.sort((a, b) => a.order - b.order)
  await setJson(KV_KEYS.news, items)
}

async function syncLegacyBlobFromGranular(
  collection: CmsCollection,
  legacyKey: string,
  sanitizeOne: (raw: unknown) => CaseCMS | ServiceCMS | ConceptCMS
): Promise<void> {
  const idx = await getJson<string[]>(GRANULAR.index(collection))
  if (!idx || idx.length === 0) {
    await setJson(legacyKey, [])
    return
  }
  const items: (CaseCMS | ServiceCMS | ConceptCMS)[] = []
  for (const id of idx) {
    const raw = await getJson<unknown>(GRANULAR.item(collection, id))
    if (raw) items.push(sanitizeOne(raw))
  }
  items.sort((a, b) => a.order - b.order)
  await setJson(legacyKey, items)
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

type LegacyServiceBlob = Partial<ServiceCMS> & {
  benefits?: { en?: string[]; uk?: string[] }
  processSteps?: { en?: string[]; uk?: string[] }
}

function sanitizeServiceProjectTypeCard(row: unknown): ServiceProjectTypeCard | null {
  if (!row || typeof row !== 'object') return null
  const r = row as Partial<{ title?: Partial<BilingualText>; description?: Partial<BilingualText> }>
  const t = r.title ?? {}
  const d = r.description ?? {}
  return {
    title: { en: typeof t.en === 'string' ? t.en : '', uk: typeof t.uk === 'string' ? t.uk : '' },
    description: { en: typeof d.en === 'string' ? d.en : '', uk: typeof d.uk === 'string' ? d.uk : '' },
  }
}

function migrateProjectTypes(x: LegacyServiceBlob, def: ServiceCMS): ServiceProjectTypeCard[] {
  const raw = (x as { projectTypes?: unknown }).projectTypes
  if (Array.isArray(raw) && raw.length > 0) {
    const cards = raw.map(sanitizeServiceProjectTypeCard).filter(Boolean) as ServiceProjectTypeCard[]
    if (cards.length) return cards
  }
  const ben = x.benefits
  if (ben && (Array.isArray(ben.en) || Array.isArray(ben.uk))) {
    const en = Array.isArray(ben.en) ? ben.en : []
    const uk = Array.isArray(ben.uk) ? ben.uk : []
    const n = Math.max(en.length, uk.length)
    return Array.from({ length: n }, (_, i) => ({
      title: { en: en[i] ?? '', uk: uk[i] ?? '' },
      description: { en: '', uk: '' },
    }))
  }
  return def.projectTypes
}

function sanitizeServiceProcessStep(row: unknown): ServiceProcessStep | null {
  if (!row || typeof row !== 'object') return null
  const r = row as Partial<{ title?: Partial<BilingualText>; description?: Partial<BilingualText> }>
  const t = r.title ?? {}
  const d = r.description ?? {}
  return {
    title: { en: typeof t.en === 'string' ? t.en : '', uk: typeof t.uk === 'string' ? t.uk : '' },
    description: { en: typeof d.en === 'string' ? d.en : '', uk: typeof d.uk === 'string' ? d.uk : '' },
  }
}

function migrateWorkProcess(x: LegacyServiceBlob, def: ServiceCMS): ServiceProcessStep[] {
  const raw = (x as { workProcess?: unknown }).workProcess
  if (Array.isArray(raw) && raw.length > 0) {
    const steps = raw.map(sanitizeServiceProcessStep).filter(Boolean) as ServiceProcessStep[]
    if (steps.length) return steps
  }
  const ps = x.processSteps
  if (ps && (Array.isArray(ps.en) || Array.isArray(ps.uk))) {
    const en = Array.isArray(ps.en) ? ps.en : []
    const uk = Array.isArray(ps.uk) ? ps.uk : []
    const n = Math.max(en.length, uk.length)
    return Array.from({ length: n }, (_, i) => ({
      title: { en: en[i] ?? '', uk: uk[i] ?? '' },
      description: { en: '', uk: '' },
    }))
  }
  return def.workProcess
}

function sanitizeServiceResultMetric(row: unknown): ServiceResultMetric | null {
  if (!row || typeof row !== 'object') return null
  const r = row as Partial<{ label?: Partial<BilingualText>; value?: string }>
  const l = r.label ?? {}
  return {
    label: { en: typeof l.en === 'string' ? l.en : '', uk: typeof l.uk === 'string' ? l.uk : '' },
    value: typeof r.value === 'string' ? r.value : '',
  }
}

function migrateResultsMetrics(x: LegacyServiceBlob, def: ServiceCMS): ServiceResultMetric[] {
  const raw = (x as { resultsMetrics?: unknown }).resultsMetrics
  if (!Array.isArray(raw) || raw.length === 0) return def.resultsMetrics
  const out = raw.map(sanitizeServiceResultMetric).filter(Boolean) as ServiceResultMetric[]
  return out.length ? out : def.resultsMetrics
}

function sanitizeServiceItem(s: unknown, index: number): ServiceCMS {
  const fallback = DEFAULT_SERVICES_CMS[index] ?? DEFAULT_SERVICES_CMS[0]
  if (!s || typeof s !== 'object') return { ...fallback, id: fallback.id }
  const x = s as LegacyServiceBlob
  const id = typeof x.id === 'string' && x.id.length > 0 ? x.id : fallback.id
  const def = DEFAULT_SERVICES_CMS.find((d) => d.id === id) ?? fallback
  const seo = x.seo ?? def.seo
  return {
    id,
    href: x.href ?? def.href,
    icon_name: x.icon_name ?? def.icon_name,
    title: { ...def.title, ...(x.title ?? {}) },
    description: { ...def.description, ...(x.description ?? {}) },
    longDescription: mb(def.longDescription, x.longDescription),
    price: { ...def.price, ...(x.price ?? {}) },
    projectTypes: migrateProjectTypes(x, def),
    pricingNote: mb(def.pricingNote, x.pricingNote),
    workProcess: migrateWorkProcess(x, def),
    resultsMetrics: migrateResultsMetrics(x, def),
    coverImageUrl: typeof x.coverImageUrl === 'string' ? x.coverImageUrl : def.coverImageUrl ?? '',
    galleryImages: Array.isArray(x.galleryImages) ? x.galleryImages : def.galleryImages ?? [],
    techStackLines: {
      en: Array.isArray(x.techStackLines?.en) ? x.techStackLines.en : def.techStackLines?.en ?? [],
      uk: Array.isArray(x.techStackLines?.uk) ? x.techStackLines.uk : def.techStackLines?.uk ?? [],
    },
    seo: {
      metaTitle: mb(def.seo.metaTitle, seo?.metaTitle),
      metaDescription: mb(def.seo.metaDescription, seo?.metaDescription),
    },
    status: x.status === 'draft' || x.status === 'published' ? x.status : def.status,
    order: typeof x.order === 'number' ? x.order : def.order,
    updatedAt: typeof x.updatedAt === 'string' ? x.updatedAt : def.updatedAt,
  }
}

const isoDate = () => new Date().toISOString()

function sanitizeNewsItem(n: unknown, index: number): NewsCMS {
  const base: NewsCMS = {
    id: `news-${index}`,
    slug: `post-${index}`,
    title: { en: '', uk: '' },
    publishedAt: isoDate().slice(0, 10),
    coverImageUrl: '',
    content: { en: '', uk: '' },
    seo: emptySeo(),
    status: 'draft',
    order: index,
    updatedAt: isoDate(),
  }
  if (!n || typeof n !== 'object') return base
  const x = n as Partial<NewsCMS>
  const id = typeof x.id === 'string' && x.id.length > 0 ? x.id : base.id
  const seo = x.seo ?? base.seo
  return {
    id,
    slug: typeof x.slug === 'string' && x.slug.length > 0 ? x.slug : base.slug,
    title: { ...base.title, ...(x.title ?? {}) },
    publishedAt: typeof x.publishedAt === 'string' ? x.publishedAt : base.publishedAt,
    coverImageUrl: typeof x.coverImageUrl === 'string' ? x.coverImageUrl : '',
    content: { ...base.content, ...(x.content ?? {}) },
    seo: {
      metaTitle: mb(base.seo.metaTitle, seo?.metaTitle),
      metaDescription: mb(base.seo.metaDescription, seo?.metaDescription),
    },
    status: x.status === 'draft' || x.status === 'published' ? x.status : base.status,
    order: typeof x.order === 'number' ? x.order : base.order,
    updatedAt: typeof x.updatedAt === 'string' ? x.updatedAt : base.updatedAt,
  }
}

function sanitizeServices(arr: unknown): ServiceCMS[] {
  if (!Array.isArray(arr)) return DEFAULT_SERVICES_CMS
  if (arr.length === 0) return []
  return arr.map((item, i) => sanitizeServiceItem(item, i))
}

function parseProjectLinks(raw: unknown): CaseCMS['projectLinks'] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((p) => {
      if (!p || typeof p !== 'object') return null
      const o = p as { label?: Partial<BilingualText>; url?: string }
      return {
        label: { en: o.label?.en ?? '', uk: o.label?.uk ?? '' },
        url: typeof o.url === 'string' ? o.url : '',
      }
    })
    .filter(Boolean) as CaseCMS['projectLinks']
}

function sanitizeCaseItem(c: unknown, index: number): CaseCMS {
  const fallback = DEFAULT_CASES_CMS[index] ?? DEFAULT_CASES_CMS[0]
  if (!c || typeof c !== 'object') return fallback
  const x = c as Partial<CaseCMS>
  const id = typeof x.id === 'string' && x.id.length > 0 ? x.id : fallback.id
  const def = DEFAULT_CASES_CMS.find((dc) => dc.id === id) ?? fallback
  const href = x.href ?? def.href
  const slug =
    typeof x.slug === 'string' && x.slug.length > 0 ? x.slug : slugFromCaseHref(href) || def.slug
  const baseDetail = builtInCaseDetail(id)
  const mergedDetail = mergeCasePageDetail(baseDetail, x.detail)
  const t = x.testimonial ?? def.testimonial
  const seo = x.seo ?? def.seo
  return {
    id,
    slug,
    href,
    category: mb(def.category, x.category),
    title: { ...def.title, ...(x.title ?? {}) },
    description: { ...def.description, ...(x.description ?? {}) },
    result: { ...def.result, ...(x.result ?? {}) },
    previewImageUrl: x.previewImageUrl ?? def.previewImageUrl,
    thumbnailUrl: x.thumbnailUrl ?? def.thumbnailUrl,
    galleryImages: Array.isArray(x.galleryImages) ? x.galleryImages : def.galleryImages,
    techStackTags: Array.isArray(x.techStackTags) ? x.techStackTags : def.techStackTags,
    testimonial: {
      quote: mb(def.testimonial.quote, t?.quote),
      author: mb(def.testimonial.author, t?.author),
      role: mb(def.testimonial.role, t?.role),
    },
    projectLinks: x.projectLinks != null ? parseProjectLinks(x.projectLinks) : def.projectLinks,
    seo: {
      metaTitle: mb(def.seo.metaTitle, seo?.metaTitle),
      metaDescription: mb(def.seo.metaDescription, seo?.metaDescription),
    },
    status: x.status === 'draft' || x.status === 'published' ? x.status : def.status,
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
  const t = x.testimonial ?? def.testimonial
  const seo = x.seo ?? def.seo
  return {
    id: x.id ?? def.id,
    slug: x.slug ?? def.slug,
    category: mb(def.category, x.category),
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
    thumbnailUrl: x.thumbnailUrl ?? def.thumbnailUrl,
    galleryImages: Array.isArray(x.galleryImages) ? x.galleryImages : def.galleryImages,
    testimonial: {
      quote: mb(def.testimonial.quote, t?.quote),
      author: mb(def.testimonial.author, t?.author),
      role: mb(def.testimonial.role, t?.role),
    },
    projectLinks: x.projectLinks != null ? parseProjectLinks(x.projectLinks) : def.projectLinks,
    seo: {
      metaTitle: mb(def.seo.metaTitle, seo?.metaTitle),
      metaDescription: mb(def.seo.metaDescription, seo?.metaDescription),
    },
    status: x.status === 'draft' || x.status === 'published' ? x.status : def.status,
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
  await ensureGranularMigrated('services', KV_KEYS.services)
  const idx = await getJson<string[]>(GRANULAR.index('services'))
  if (idx && idx.length > 0) {
    const out: ServiceCMS[] = []
    for (const id of idx) {
      const raw = await getJson<unknown>(GRANULAR.item('services', id))
      if (raw) out.push(sanitizeServiceItem(raw, 0))
    }
    return out.sort((a, b) => a.order - b.order)
  }
  const raw = await getJson<unknown>(KV_KEYS.services)
  if (!Array.isArray(raw) || raw.length === 0) return []
  return raw.map((item, i) => sanitizeServiceItem(item, i))
}

export async function setServicesToKv(services: ServiceCMS[]): Promise<void> {
  await setJson(KV_KEYS.services, services)
  const ids = services.slice().sort((a, b) => a.order - b.order).map((s) => s.id)
  await setJson(GRANULAR.index('services'), ids)
  for (const s of services) {
    await setJson(GRANULAR.item('services', s.id), s)
  }
}

export async function getCasesFromKv(): Promise<CaseCMS[]> {
  await ensureGranularMigrated('cases', KV_KEYS.cases)
  const idx = await getJson<string[]>(GRANULAR.index('cases'))
  if (idx && idx.length > 0) {
    const out: CaseCMS[] = []
    for (const id of idx) {
      const raw = await getJson<unknown>(GRANULAR.item('cases', id))
      if (raw) out.push(sanitizeCaseItem(raw, 0))
    }
    return out.sort((a, b) => a.order - b.order)
  }
  const raw = await getJson<unknown>(KV_KEYS.cases)
  if (!Array.isArray(raw) || raw.length === 0) return []
  return raw.map((item, i) => sanitizeCaseItem(item, i))
}

export async function setCasesToKv(cases: CaseCMS[]): Promise<void> {
  await setJson(KV_KEYS.cases, cases)
  const ids = cases.slice().sort((a, b) => a.order - b.order).map((c) => c.id)
  await setJson(GRANULAR.index('cases'), ids)
  for (const c of cases) {
    await setJson(GRANULAR.item('cases', c.id), c)
  }
}

export async function getConceptsFromKv(): Promise<ConceptCMS[]> {
  await ensureGranularMigrated('concepts', KV_KEYS.concepts)
  const idx = await getJson<string[]>(GRANULAR.index('concepts'))
  if (idx && idx.length > 0) {
    const out: ConceptCMS[] = []
    for (const id of idx) {
      const raw = await getJson<unknown>(GRANULAR.item('concepts', id))
      if (raw) out.push(sanitizeConceptItem(raw, 0))
    }
    return out.sort((a, b) => a.order - b.order)
  }
  const raw = await getJson<unknown>(KV_KEYS.concepts)
  if (!Array.isArray(raw) || raw.length === 0) return []
  return raw.map((item, i) => sanitizeConceptItem(item, i))
}

export async function setConceptsToKv(concepts: ConceptCMS[]): Promise<void> {
  await setJson(KV_KEYS.concepts, concepts)
  const ids = concepts.slice().sort((a, b) => a.order - b.order).map((c) => c.id)
  await setJson(GRANULAR.index('concepts'), ids)
  for (const c of concepts) {
    await setJson(GRANULAR.item('concepts', c.id), c)
  }
}

export async function getCaseById(caseId: string): Promise<CaseCMS | null> {
  await ensureGranularMigrated('cases', KV_KEYS.cases)
  const raw = await getJson<unknown>(GRANULAR.item('cases', caseId))
  if (raw) return sanitizeCaseItem(raw, 0)
  const legacy = await getJson<unknown>(KV_KEYS.cases)
  if (!Array.isArray(legacy)) return null
  const found = legacy.find((row) => row && typeof row === 'object' && (row as { id?: string }).id === caseId)
  return found ? sanitizeCaseItem(found, 0) : null
}

export async function getServiceById(serviceId: string): Promise<ServiceCMS | null> {
  await ensureGranularMigrated('services', KV_KEYS.services)
  const raw = await getJson<unknown>(GRANULAR.item('services', serviceId))
  if (raw) return sanitizeServiceItem(raw, 0)
  const legacy = await getJson<unknown>(KV_KEYS.services)
  if (!Array.isArray(legacy)) return null
  const found = legacy.find((row) => row && typeof row === 'object' && (row as { id?: string }).id === serviceId)
  return found ? sanitizeServiceItem(found, 0) : null
}

export async function getConceptById(conceptId: string): Promise<ConceptCMS | null> {
  await ensureGranularMigrated('concepts', KV_KEYS.concepts)
  const raw = await getJson<unknown>(GRANULAR.item('concepts', conceptId))
  if (raw) return sanitizeConceptItem(raw, 0)
  const legacy = await getJson<unknown>(KV_KEYS.concepts)
  if (!Array.isArray(legacy)) return null
  const found = legacy.find((row) => row && typeof row === 'object' && (row as { id?: string }).id === conceptId)
  return found ? sanitizeConceptItem(found, 0) : null
}

export async function writeCaseItem(item: CaseCMS): Promise<void> {
  await setJson(GRANULAR.item('cases', item.id), item)
  let idx = (await getJson<string[]>(GRANULAR.index('cases'))) ?? []
  if (!idx.includes(item.id)) idx = [...idx, item.id]
  await setJson(GRANULAR.index('cases'), idx)
  await syncLegacyBlobFromGranular('cases', KV_KEYS.cases, (raw) => sanitizeCaseItem(raw, 0))
}

export async function deleteCaseItem(caseId: string): Promise<void> {
  await deleteKvKey(GRANULAR.item('cases', caseId))
  let idx = (await getJson<string[]>(GRANULAR.index('cases'))) ?? []
  idx = idx.filter((x) => x !== caseId)
  await setJson(GRANULAR.index('cases'), idx)
  await syncLegacyBlobFromGranular('cases', KV_KEYS.cases, (raw) => sanitizeCaseItem(raw, 0))
}

export async function writeServiceItem(item: ServiceCMS): Promise<void> {
  await setJson(GRANULAR.item('services', item.id), item)
  let idx = (await getJson<string[]>(GRANULAR.index('services'))) ?? []
  if (!idx.includes(item.id)) idx = [...idx, item.id]
  await setJson(GRANULAR.index('services'), idx)
  await syncLegacyBlobFromGranular('services', KV_KEYS.services, (raw) => sanitizeServiceItem(raw, 0))
}

export async function deleteServiceItem(serviceId: string): Promise<void> {
  await deleteKvKey(GRANULAR.item('services', serviceId))
  let idx = (await getJson<string[]>(GRANULAR.index('services'))) ?? []
  idx = idx.filter((x) => x !== serviceId)
  await setJson(GRANULAR.index('services'), idx)
  await syncLegacyBlobFromGranular('services', KV_KEYS.services, (raw) => sanitizeServiceItem(raw, 0))
}

export async function writeConceptItem(item: ConceptCMS): Promise<void> {
  await setJson(GRANULAR.item('concepts', item.id), item)
  let idx = (await getJson<string[]>(GRANULAR.index('concepts'))) ?? []
  if (!idx.includes(item.id)) idx = [...idx, item.id]
  await setJson(GRANULAR.index('concepts'), idx)
  await syncLegacyBlobFromGranular('concepts', KV_KEYS.concepts, (raw) => sanitizeConceptItem(raw, 0))
}

export async function deleteConceptItem(conceptId: string): Promise<void> {
  await deleteKvKey(GRANULAR.item('concepts', conceptId))
  let idx = (await getJson<string[]>(GRANULAR.index('concepts'))) ?? []
  idx = idx.filter((x) => x !== conceptId)
  await setJson(GRANULAR.index('concepts'), idx)
  await syncLegacyBlobFromGranular('concepts', KV_KEYS.concepts, (raw) => sanitizeConceptItem(raw, 0))
}

export async function getNewsFromKv(): Promise<NewsCMS[]> {
  await ensureNewsMigrated()
  const idx = await getJson<string[]>(GRANULAR.index('news'))
  if (idx && idx.length > 0) {
    const out: NewsCMS[] = []
    for (const id of idx) {
      const raw = await getJson<unknown>(GRANULAR.item('news', id))
      if (raw) out.push(sanitizeNewsItem(raw, 0))
    }
    return out.sort((a, b) => a.order - b.order)
  }
  const raw = await getJson<unknown>(KV_KEYS.news)
  if (!Array.isArray(raw) || raw.length === 0) return []
  return raw.map((item, i) => sanitizeNewsItem(item, i))
}

export async function setNewsToKv(news: NewsCMS[]): Promise<void> {
  await setJson(KV_KEYS.news, news)
  const ids = news.slice().sort((a, b) => a.order - b.order).map((n) => n.id)
  await setJson(GRANULAR.index('news'), ids)
  for (const n of news) {
    await setJson(GRANULAR.item('news', n.id), n)
  }
}

export async function getNewsById(newsId: string): Promise<NewsCMS | null> {
  await ensureNewsMigrated()
  const raw = await getJson<unknown>(GRANULAR.item('news', newsId))
  if (raw) return sanitizeNewsItem(raw, 0)
  const legacy = await getJson<unknown>(KV_KEYS.news)
  if (!Array.isArray(legacy)) return null
  const found = legacy.find((row) => row && typeof row === 'object' && (row as { id?: string }).id === newsId)
  return found ? sanitizeNewsItem(found, 0) : null
}

export async function writeNewsItem(item: NewsCMS): Promise<void> {
  await setJson(GRANULAR.item('news', item.id), item)
  let idx = (await getJson<string[]>(GRANULAR.index('news'))) ?? []
  if (!idx.includes(item.id)) idx = [...idx, item.id]
  await setJson(GRANULAR.index('news'), idx)
  await syncNewsLegacyFromGranular()
}

export async function deleteNewsItem(newsId: string): Promise<void> {
  await deleteKvKey(GRANULAR.item('news', newsId))
  let idx = (await getJson<string[]>(GRANULAR.index('news'))) ?? []
  idx = idx.filter((x) => x !== newsId)
  await setJson(GRANULAR.index('news'), idx)
  await syncNewsLegacyFromGranular()
}

export async function getFullCmsPayload(): Promise<PublicCmsPayload> {
  noStore()
  try {
    const [
      pages,
      services,
      cases,
      concepts,
      news,
      portfolioIndex,
      servicesIndex,
      labIndex,
      newsIndex,
      siteHeader,
      siteFooter,
      approachPage,
    ] = await Promise.all([
      getPagesFromKv(),
      getServicesFromKv(),
      getCasesFromKv(),
      getConceptsFromKv(),
      getNewsFromKv(),
      getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.portfolioIndex, DEFAULT_PORTFOLIO_INDEX),
      getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.servicesIndex, DEFAULT_SERVICES_INDEX),
      getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.labIndex, DEFAULT_LAB_INDEX),
      getCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.newsIndex, DEFAULT_NEWS_INDEX),
      getSiteHeaderKv(),
      getSiteFooterKv(),
      getApproachPageKv(),
    ])
    return {
      pages,
      services,
      cases,
      concepts,
      news,
      portfolioIndex,
      servicesIndex,
      labIndex,
      newsIndex,
      siteHeader,
      siteFooter,
      approachPage,
    }
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
    setJson(KV_KEYS.news, payload.news),
    setJson(GRANULAR.page(COLLECTION_PAGE_SLUGS.portfolioIndex), payload.portfolioIndex),
    setJson(GRANULAR.page(COLLECTION_PAGE_SLUGS.servicesIndex), payload.servicesIndex),
    setJson(GRANULAR.page(COLLECTION_PAGE_SLUGS.labIndex), payload.labIndex),
    setJson(GRANULAR.page(COLLECTION_PAGE_SLUGS.newsIndex), payload.newsIndex),
    setJson(
      GRANULAR.index('cases'),
      payload.cases.map((c) => c.id)
    ),
    setJson(
      GRANULAR.index('services'),
      payload.services.map((s) => s.id)
    ),
    setJson(
      GRANULAR.index('concepts'),
      payload.concepts.map((c) => c.id)
    ),
    setJson(
      GRANULAR.index('news'),
      payload.news.map((n) => n.id)
    ),
    ...payload.cases.map((c) => setJson(GRANULAR.item('cases', c.id), c)),
    ...payload.services.map((s) => setJson(GRANULAR.item('services', s.id), s)),
    ...payload.concepts.map((c) => setJson(GRANULAR.item('concepts', c.id), c)),
    ...payload.news.map((n) => setJson(GRANULAR.item('news', n.id), n)),
    setJson(CMS_GLOBAL_KEYS.header, payload.siteHeader),
    setJson(CMS_GLOBAL_KEYS.footer, payload.siteFooter),
    setJson(CMS_GLOBAL_KEYS.approach, payload.approachPage),
  ])
  return { seeded: true }
}
