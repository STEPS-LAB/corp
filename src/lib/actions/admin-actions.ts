'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import {
  type CaseCMS,
  type ConceptCMS,
  type PagesContent,
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
  const caseSlugs = ['ecommerce', 'saas', 'corporate'] as const
  for (const loc of locales) {
    revalidatePath(`/${loc}`, 'page')
    revalidatePath(`/${loc}/concepts`, 'layout')
    revalidatePath(`/${loc}/cases`, 'page')
    revalidatePath(`/${loc}/services`, 'page')
    revalidatePath(`/${loc}/about`, 'page')
    revalidatePath(`/${loc}/contacts`, 'page')
    for (const slug of caseSlugs) {
      revalidatePath(`/${loc}/cases/${slug}`, 'page')
    }
  }
}

export async function seedCmsAction(): Promise<ActionResult<{ seeded: boolean }>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    const result = await seedCmsIfEmpty()
    revalidateCmsPaths()
    return { ok: true, data: result }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Seed failed'
    return { ok: false, error: msg }
  }
}

export async function savePagesAction(pages: PagesContent): Promise<ActionResult> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setPagesToKv(pages)
    revalidateCmsPaths()
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveServicesAction(services: ServiceCMS[]): Promise<ActionResult> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setServicesToKv(services)
    revalidateCmsPaths()
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveCasesAction(cases: CaseCMS[]): Promise<ActionResult> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setCasesToKv(cases)
    revalidateCmsPaths()
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function saveConceptsAction(concepts: ConceptCMS[]): Promise<ActionResult> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  try {
    await setConceptsToKv(concepts)
    revalidateCmsPaths()
    for (const c of concepts) {
      revalidatePath(`/en/concepts/${c.slug}`, 'page')
      revalidatePath(`/uk/concepts/${c.slug}`, 'page')
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' }
  }
}

export async function addServiceAction(): Promise<ActionResult<ServiceCMS[]>> {
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
  return { ok: true, data: merged }
}

export async function deleteServiceAction(id: string): Promise<ActionResult<ServiceCMS[]>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = (await getServicesFromKv()).filter((s) => s.id !== id)
  await setServicesToKv(list)
  revalidateCmsPaths()
  return { ok: true, data: list }
}

export async function addCaseAction(): Promise<ActionResult<CaseCMS[]>> {
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
  return { ok: true, data: merged }
}

export async function deleteCaseAction(id: string): Promise<ActionResult<CaseCMS[]>> {
  const auth = await assertAdmin()
  if (!auth.ok) return auth
  const list = (await getCasesFromKv()).filter((c) => c.id !== id)
  await setCasesToKv(list)
  revalidateCmsPaths()
  return { ok: true, data: list }
}

export async function addConceptAction(): Promise<ActionResult<ConceptCMS[]>> {
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
  return { ok: true, data: merged }
}

export async function deleteConceptAction(id: string): Promise<ActionResult<ConceptCMS[]>> {
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
  return { ok: true, data: filtered }
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
