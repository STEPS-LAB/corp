'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import {
  type CaseCMS,
  type ConceptCMS,
  type PagesContent,
  type PublicCmsPayload,
  type ServiceCMS,
  emptyCasePageDetail,
} from '@/lib/cms-types'
import { getAdminCookieName, verifyAdminToken } from '@/lib/admin-auth'
import {
  getCasesFromKv,
  getConceptsFromKv,
  getFullCmsPayload,
  getPagesFromKv,
  getServicesFromKv,
  seedCmsIfEmpty,
  setCasesToKv,
  setConceptsToKv,
  setPagesToKv,
  setServicesToKv,
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
    revalidatePath(`/${loc}/about`, 'page')
    revalidatePath(`/${loc}/contacts`, 'page')
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

export async function saveServicesAction(services: ServiceCMS[]): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setServicesToKv(services)
    revalidateCmsPaths()
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
    id,
    href: '/services',
    icon_name: 'circle',
    title: { en: 'New service', uk: 'Нова послуга' },
    description: { en: '', uk: '' },
    price: { en: '', uk: '' },
    order: list.length,
    updatedAt: new Date().toISOString(),
  }
  const merged = [...list, next]
  await setServicesToKv(merged)
  revalidateCmsPaths()
  return okWithFreshPayload()
}

export async function deleteServiceAction(id: string): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = (await getServicesFromKv()).filter((s) => s.id !== id)
  await setServicesToKv(list)
  revalidateCmsPaths()
  return okWithFreshPayload()
}

export async function addCaseAction(): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = await getCasesFromKv()
  const id = `case-${crypto.randomUUID().slice(0, 8)}`
  const next: CaseCMS = {
    id,
    href: '/cases',
    title: { en: 'New case', uk: 'Новий кейс' },
    description: { en: '', uk: '' },
    result: { en: '', uk: '' },
    previewImageUrl: '',
    detail: emptyCasePageDetail(),
    order: list.length,
    updatedAt: new Date().toISOString(),
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
  const prev = await getCasesFromKv()
  const victim = prev.find((c) => c.id === id)
  const list = prev.filter((c) => c.id !== id)
  await setCasesToKv(list)
  revalidateCmsPaths()
  if (victim?.href) revalidateCaseDetailByHref(victim.href)
  revalidateAllCaseDetails(list)
  return okWithFreshPayload()
}

export async function addConceptAction(): Promise<ActionResult<PublicCmsPayload>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = await getConceptsFromKv()
  const slug = `concept-${crypto.randomUUID().slice(0, 8)}`
  const id = `concept-${crypto.randomUUID().slice(0, 8)}`
  const next: ConceptCMS = {
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
    order: list.length,
    updatedAt: new Date().toISOString(),
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
  const list = await getConceptsFromKv()
  const victim = list.find((c) => c.id === id)
  const filtered = list.filter((c) => c.id !== id)
  await setConceptsToKv(filtered)
  revalidateCmsPaths()
  if (victim) {
    revalidatePath(`/en/concepts/${victim.slug}`, 'page')
    revalidatePath(`/uk/concepts/${victim.slug}`, 'page')
  }
  return okWithFreshPayload()
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
