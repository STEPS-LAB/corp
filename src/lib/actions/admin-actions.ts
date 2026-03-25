'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import {
  type ApproachPageCMS,
  type CaseCMS,
  type CollectionLandingPage,
  type ConceptCMS,
  type NewsCMS,
  type PagesContent,
  type PublicCmsPayload,
  type ServiceCMS,
  type SiteFooterCMS,
  type SiteHeaderCMS,
  DEFAULT_CASES_CMS,
  DEFAULT_CONCEPTS_CMS,
  DEFAULT_SERVICES_CMS,
  emptyCasePageDetail,
  emptySeo,
} from '@/lib/cms-types'
import { COLLECTION_PAGE_SLUGS } from '@/lib/cms-granular-keys'
import { getAdminCookieName, verifyAdminToken } from '@/lib/admin-auth'
import {
  deleteCaseItem,
  deleteConceptItem,
  deleteNewsItem,
  deleteServiceItem,
  getCasesFromKv,
  getConceptsFromKv,
  getFullCmsPayload,
  getNewsFromKv,
  getPagesFromKv,
  getServicesFromKv,
  mergePagesOnto,
  seedCmsIfEmpty,
  setApproachPageKv,
  setCasesToKv,
  setCollectionLandingPageKv,
  setConceptsToKv,
  setNewsToKv,
  setPagesToKv,
  setServicesToKv,
  setSiteFooterKv,
  setSiteHeaderKv,
  writeCaseItem,
  writeConceptItem,
  writeNewsItem,
  writeServiceItem,
} from '@/lib/kv'

export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: string }

async function assertAdmin(): Promise<ActionResult> {
  const token = cookies().get(getAdminCookieName())?.value
  const ok = await verifyAdminToken(token)
  if (!ok) return { ok: false, error: 'Unauthorized' }
  return { ok: true }
}

function revalidateCmsPaths() {
  const locales = ['en', 'uk'] as const
  for (const loc of locales) {
    revalidatePath(`/${loc}`, 'page')
    revalidatePath(`/${loc}/concepts`, 'layout')
    revalidatePath(`/${loc}/cases`, 'layout')
    revalidatePath(`/${loc}/services`, 'page')
    revalidatePath(`/${loc}/news`, 'page')
    revalidatePath(`/${loc}/about`, 'page')
    revalidatePath(`/${loc}/contacts`, 'page')
  }
}

function normalizePublicHref(href: string): string {
  const t = href.trim()
  return t.startsWith('/') ? t : `/${t}`
}

function revalidateServiceDetailByHref(href: string) {
  const h = normalizePublicHref(href).replace(/^\/+/, '')
  if (!h.startsWith('services/')) return
  for (const loc of ['en', 'uk'] as const) {
    revalidatePath(`/${loc}/${h}`, 'page')
  }
}

function revalidateAllServiceDetails(services: ServiceCMS[]) {
  for (const s of services) {
    if (s.href) revalidateServiceDetailByHref(s.href)
  }
}

function revalidateNewsDetailBySlug(slug: string) {
  if (!slug.trim()) return
  for (const loc of ['en', 'uk'] as const) {
    revalidatePath(`/${loc}/news/${slug}`, 'page')
  }
}

/** CMS case href is stored as `/cases/slug`; URL is `/[locale]/cases/slug`. */
function revalidateCaseDetailByHref(href: string) {
  const h = href.replace(/^\/+/, '')
  if (!h.startsWith('cases/')) return
  for (const loc of ['en', 'uk'] as const) {
    revalidatePath(`/${loc}/${h}`, 'page')
  }
}

function revalidateAllCaseDetails(cases: CaseCMS[]) {
  for (const c of cases) {
    if (c.href) revalidateCaseDetailByHref(c.href)
  }
}

async function okWithFreshPayload(): Promise<{ ok: true; data: PublicCmsPayload }> {
  return { ok: true, data: await getFullCmsPayload() }
}

export async function seedCmsAction(): Promise<ActionResult<{ seeded: boolean; payload: PublicCmsPayload }>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const result = await seedCmsIfEmpty()
    revalidateCmsPaths()
    const payload = await getFullCmsPayload()
    revalidateAllCaseDetails(payload.cases)
    revalidateAllServiceDetails(payload.services)
    return { ok: true, data: { seeded: result.seeded, payload } }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Seed failed'
    return { ok: false, error: msg }
  }
}

export async function savePagesAction(pages: PagesContent): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setPagesToKv(pages)
    revalidateCmsPaths()
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

/** Deep-merge a partial pages JSON document into the current KV pages blob. */
export async function savePagesPatchAction(patch: unknown): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const current = await getPagesFromKv()
    const next = mergePagesOnto(current, patch)
    await setPagesToKv(next)
    revalidateCmsPaths()
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveSiteHeaderAction(header: SiteHeaderCMS): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setSiteHeaderKv(header)
    revalidateCmsPaths()
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveSiteFooterAction(footer: SiteFooterCMS): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setSiteFooterKv(footer)
    revalidateCmsPaths()
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveApproachPageAction(page: ApproachPageCMS): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setApproachPageKv(page)
    revalidateCmsPaths()
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

/** Atomically persist all four CMS collections (floating “Save all”). */
export async function saveFullCmsPayloadAction(payload: PublicCmsPayload): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await Promise.all([
      setPagesToKv(payload.pages),
      setServicesToKv(payload.services),
      setCasesToKv(payload.cases),
      setConceptsToKv(payload.concepts),
      setNewsToKv(payload.news),
      setCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.portfolioIndex, payload.portfolioIndex),
      setCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.servicesIndex, payload.servicesIndex),
      setCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.labIndex, payload.labIndex),
      setCollectionLandingPageKv(COLLECTION_PAGE_SLUGS.newsIndex, payload.newsIndex),
      setSiteHeaderKv(payload.siteHeader),
      setSiteFooterKv(payload.siteFooter),
      setApproachPageKv(payload.approachPage),
    ])
    revalidateCmsPaths()
    revalidateAllCaseDetails(payload.cases)
    revalidateAllServiceDetails(payload.services)
    for (const c of payload.concepts) {
      revalidatePath(`/en/concepts/${c.slug}`, 'page')
      revalidatePath(`/uk/concepts/${c.slug}`, 'page')
    }
    for (const n of payload.news) {
      revalidateNewsDetailBySlug(n.slug)
    }
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveServicesAction(services: ServiceCMS[]): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setServicesToKv(services)
    revalidateCmsPaths()
    revalidateAllServiceDetails(services)
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveCasesAction(cases: CaseCMS[]): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setCasesToKv(cases)
    revalidateCmsPaths()
    revalidateAllCaseDetails(cases)
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveConceptsAction(concepts: ConceptCMS[]): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setConceptsToKv(concepts)
    revalidateCmsPaths()
    for (const c of concepts) {
      revalidatePath(`/en/concepts/${c.slug}`, 'page')
      revalidatePath(`/uk/concepts/${c.slug}`, 'page')
    }
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function addServiceAction(): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = await getServicesFromKv()
  const id = `svc-${crypto.randomUUID().slice(0, 8)}`
  const next: ServiceCMS = {
    ...DEFAULT_SERVICES_CMS[0],
    id,
    href: '/services/new-item',
    icon_name: 'circle',
    title: { en: 'New service', uk: 'Нова послуга' },
    description: { en: '', uk: '' },
    longDescription: { en: '', uk: '' },
    price: { en: '', uk: '' },
    benefits: { en: [], uk: [] },
    pricingNote: { en: '', uk: '' },
    processSteps: { en: [], uk: [] },
    order: list.length,
    updatedAt: new Date().toISOString(),
    status: 'draft',
  }
  const merged = [...list, next]
  await setServicesToKv(merged)
  revalidateCmsPaths()
  revalidateAllServiceDetails(merged)
  return okWithFreshPayload()
}

export async function deleteServiceAction(id: string): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const prev = await getServicesFromKv()
    const victim = prev.find((s) => s.id === id)
    await deleteServiceItem(id)
    revalidateCmsPaths()
    if (victim?.href) revalidateServiceDetailByHref(victim.href)
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Delete failed' }
  }
}

export async function addCaseAction(): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = await getCasesFromKv()
  const id = `case-${crypto.randomUUID().slice(0, 8)}`
  const slug = `new-${id.slice(-8)}`
  const next: CaseCMS = {
    ...DEFAULT_CASES_CMS[0],
    id,
    slug,
    href: `/cases/${slug}`,
    title: { en: 'New case', uk: 'Новий кейс' },
    description: { en: '', uk: '' },
    result: { en: '', uk: '' },
    previewImageUrl: '',
    thumbnailUrl: '',
    galleryImages: [],
    techStackTags: [],
    detail: emptyCasePageDetail(),
    order: list.length,
    updatedAt: new Date().toISOString(),
    status: 'draft',
  }
  const merged = [...list, next]
  await setCasesToKv(merged)
  revalidateCmsPaths()
  revalidateAllCaseDetails(merged)
  return okWithFreshPayload()
}

export async function deleteCaseAction(id: string): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const prev = await getCasesFromKv()
    const victim = prev.find((c) => c.id === id)
    await deleteCaseItem(id)
    revalidateCmsPaths()
    if (victim?.href) revalidateCaseDetailByHref(victim.href)
    const list = prev.filter((c) => c.id !== id)
    revalidateAllCaseDetails(list)
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Delete failed' }
  }
}

export async function addConceptAction(): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = await getConceptsFromKv()
  const slug = `concept-${crypto.randomUUID().slice(0, 8)}`
  const id = `concept-${crypto.randomUUID().slice(0, 8)}`
  const next: ConceptCMS = {
    ...DEFAULT_CONCEPTS_CMS[0],
    id,
    slug,
    title: { en: 'New concept', uk: 'Новий концепт' },
    shortDescription: { en: '', uk: '' },
    description: { en: '', uk: '' },
    improvements: { en: [], uk: [] },
    technologies: { en: [], uk: [] },
    desktopImage: '',
    mobileImage: '',
    oldDesktopImage: '',
    oldMobileImage: '',
    galleryImages: [],
    order: list.length,
    updatedAt: new Date().toISOString(),
    status: 'draft',
  }
  const merged = [...list, next]
  await setConceptsToKv(merged)
  revalidateCmsPaths()
  revalidatePath(`/en/concepts/${slug}`, 'page')
  revalidatePath(`/uk/concepts/${slug}`, 'page')
  return okWithFreshPayload()
}

export async function deleteConceptAction(id: string): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const list = await getConceptsFromKv()
    const victim = list.find((c) => c.id === id)
    await deleteConceptItem(id)
    revalidateCmsPaths()
    if (victim) {
      revalidatePath(`/en/concepts/${victim.slug}`, 'page')
      revalidatePath(`/uk/concepts/${victim.slug}`, 'page')
    }
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Delete failed' }
  }
}

export type CmsItemCollection = 'cases' | 'services' | 'concepts'

/** Granular persistence alias (collection + id). */
export async function saveItem(
  collection: CmsItemCollection,
  id: string,
  data: CaseCMS | ServiceCMS | ConceptCMS
): Promise<ActionResult<PublicCmsPayload>> {
  const next = { ...(data as any), id } as CaseCMS | ServiceCMS | ConceptCMS
  return saveCmsItemAction(collection, next)
}

/** Granular persistence alias (collection + id). */
export async function deleteItem(
  collection: CmsItemCollection,
  id: string
): Promise<ActionResult<PublicCmsPayload>> {
  if (collection === 'cases') return deleteCaseAction(id)
  if (collection === 'services') return deleteServiceAction(id)
  return deleteConceptAction(id)
}

/** Granular page metadata alias (slug + page data). */
export async function updatePageMetadata(
  slug: CollectionLandingSlug,
  data: CollectionLandingPage
): Promise<ActionResult<PublicCmsPayload>> {
  return saveCollectionLandingAction(slug, data)
}

export async function saveCmsItemAction(
  collection: CmsItemCollection,
  item: CaseCMS | ServiceCMS | ConceptCMS
): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    if (collection === 'cases') {
      const c = item as CaseCMS
      await writeCaseItem(c)
      revalidateCmsPaths()
      revalidateCaseDetailByHref(c.href)
      return okWithFreshPayload()
    }
    if (collection === 'services') {
      const svc = item as ServiceCMS
      await writeServiceItem(svc)
      revalidateCmsPaths()
      revalidateServiceDetailByHref(svc.href)
      return okWithFreshPayload()
    }
    const con = item as ConceptCMS
    await writeConceptItem(con)
    revalidateCmsPaths()
    revalidatePath(`/en/concepts/${con.slug}`, 'page')
    revalidatePath(`/uk/concepts/${con.slug}`, 'page')
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export type CollectionLandingSlug = (typeof COLLECTION_PAGE_SLUGS)[keyof typeof COLLECTION_PAGE_SLUGS]

export async function createCaseDraftAction(): Promise<ActionResult<{ id: string }>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const list = await getCasesFromKv()
    const id = `case-${crypto.randomUUID().slice(0, 8)}`
    const slug = `new-${id.slice(-8)}`
    const next: CaseCMS = {
      ...DEFAULT_CASES_CMS[0],
      id,
      slug,
      href: `/cases/${slug}`,
      title: { en: 'New case', uk: 'Новий кейс' },
      description: { en: '', uk: '' },
      result: { en: '', uk: '' },
      previewImageUrl: '',
      thumbnailUrl: '',
      galleryImages: [],
      techStackTags: [],
      detail: emptyCasePageDetail(),
      order: list.length,
      updatedAt: new Date().toISOString(),
      status: 'draft',
    }
    await writeCaseItem(next)
    revalidateCmsPaths()
    revalidateAllCaseDetails([...list, next])
    return { ok: true, data: { id } }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Create failed' }
  }
}

export async function createServiceDraftAction(): Promise<ActionResult<{ id: string }>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const list = await getServicesFromKv()
    const id = `svc-${crypto.randomUUID().slice(0, 8)}`
    const next: ServiceCMS = {
      ...DEFAULT_SERVICES_CMS[0],
      id,
      href: '/services/new-item',
      icon_name: 'circle',
      title: { en: 'New service', uk: 'Нова послуга' },
      description: { en: '', uk: '' },
      longDescription: { en: '', uk: '' },
      price: { en: '', uk: '' },
      benefits: { en: [], uk: [] },
      pricingNote: { en: '', uk: '' },
      processSteps: { en: [], uk: [] },
      order: list.length,
      updatedAt: new Date().toISOString(),
      status: 'draft',
    }
    await writeServiceItem(next)
    revalidateCmsPaths()
    revalidateServiceDetailByHref(next.href)
    return { ok: true, data: { id } }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Create failed' }
  }
}

export async function createNewsDraftAction(): Promise<ActionResult<{ id: string }>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const list = await getNewsFromKv()
    const id = `news-${crypto.randomUUID().slice(0, 8)}`
    const slug = `post-${id.slice(-8)}`
    const next: NewsCMS = {
      id,
      slug,
      title: { en: 'New post', uk: 'Новий пост' },
      publishedAt: new Date().toISOString().slice(0, 10),
      coverImageUrl: '',
      content: { en: '', uk: '' },
      seo: emptySeo(),
      status: 'draft',
      order: list.length,
      updatedAt: new Date().toISOString(),
    }
    await writeNewsItem(next)
    revalidateCmsPaths()
    revalidateNewsDetailBySlug(slug)
    return { ok: true, data: { id } }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Create failed' }
  }
}

export async function deleteNewsAction(id: string): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const list = await getNewsFromKv()
    const victim = list.find((n) => n.id === id)
    await deleteNewsItem(id)
    revalidateCmsPaths()
    if (victim) revalidateNewsDetailBySlug(victim.slug)
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Delete failed' }
  }
}

export async function saveNewsItemAction(item: NewsCMS): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await writeNewsItem({ ...item, updatedAt: new Date().toISOString() })
    revalidateCmsPaths()
    revalidateNewsDetailBySlug(item.slug)
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function createConceptDraftAction(): Promise<ActionResult<{ id: string }>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const list = await getConceptsFromKv()
    const slug = `new-${crypto.randomUUID().slice(0, 8)}`
    const id = `concept-${slug}`
    const next: ConceptCMS = {
      ...DEFAULT_CONCEPTS_CMS[0],
      id,
      slug,
      title: { en: 'New concept', uk: 'Новий концепт' },
      shortDescription: { en: '', uk: '' },
      description: { en: '', uk: '' },
      improvements: { en: [], uk: [] },
      technologies: { en: [], uk: [] },
      desktopImage: '',
      mobileImage: '',
      oldDesktopImage: '',
      oldMobileImage: '',
      galleryImages: [],
      order: list.length,
      updatedAt: new Date().toISOString(),
      status: 'draft',
    }
    await writeConceptItem(next)
    revalidateCmsPaths()
    revalidatePath(`/en/concepts/${slug}`, 'page')
    revalidatePath(`/uk/concepts/${slug}`, 'page')
    return { ok: true, data: { id } }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Create failed' }
  }
}

export async function saveCollectionLandingAction(
  slug: CollectionLandingSlug,
  data: CollectionLandingPage
): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setCollectionLandingPageKv(slug, data)
    revalidateCmsPaths()
    if (slug === COLLECTION_PAGE_SLUGS.portfolioIndex) {
      revalidatePath('/en/cases', 'layout')
      revalidatePath('/uk/cases', 'layout')
    }
    if (slug === COLLECTION_PAGE_SLUGS.servicesIndex) {
      revalidatePath('/en/services', 'page')
      revalidatePath('/uk/services', 'page')
    }
    if (slug === COLLECTION_PAGE_SLUGS.labIndex) {
      revalidatePath('/en/concepts', 'layout')
      revalidatePath('/uk/concepts', 'layout')
    }
    if (slug === COLLECTION_PAGE_SLUGS.newsIndex) {
      revalidatePath('/en/news', 'page')
      revalidatePath('/uk/news', 'page')
    }
    return okWithFreshPayload()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function loadCmsPayloadAction(): Promise<ActionResult<Awaited<ReturnType<typeof getFullCmsPayload>>>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const data = await getFullCmsPayload()
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Load failed' }
  }
}

export async function getPagesForAdminAction(): Promise<ActionResult<PagesContent>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const pages = await getPagesFromKv()
  return { ok: true, data: pages }
}
