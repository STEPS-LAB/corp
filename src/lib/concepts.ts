import en from '@/messages/en.json'
import uk from '@/messages/uk.json'
import type { ConceptCMS } from '@/lib/cms-types'
import { pickLang, projectLinksForLocale } from '@/lib/cms-types'
import { isCmsPublished } from '@/lib/cms-types'
import { getConceptsFromKv } from '@/lib/kv'

export type ConceptLinkDisplay = {
  text: string
  url: string
}

export type ConceptPreviewSet = {
  /** Empty when only a mobile image is configured for this set. */
  desktopUrl: string
  /** Set in CMS only; omit when no mobile image — phone mockup is hidden. */
  mobileUrl?: string
  alt: string
}

export type ConceptItem = {
  slug: string
  title: string
  shortDescription: string
  description: string
  technologies: string[]
  improvements: string[]
  /** Locale-resolved preview image sets for the detail gallery. */
  previewSets: ConceptPreviewSet[]
  /** Resolved for active locale; non-empty text + valid URL only. */
  conceptLinks: ConceptLinkDisplay[]
}

const BASE_ITEMS = [
  {
    slug: 'ribas-karpaty',
    desktopImage: '/concepts/ribas-karpaty-desktop.png',
    mobileImage: '/concepts/ribas-karpaty-mobile.png',
  },
  {
    slug: 'amstelski',
    desktopImage: '/concepts/amstelski-desktop.png',
    mobileImage: '/concepts/amstelski-mobile.png',
  },
  {
    slug: 'chudodievo',
    desktopImage: '/concepts/chudodievo-desktop.png',
    mobileImage: '/concepts/chudodievo-mobile.png',
  },
  {
    slug: 'kosmodent',
    desktopImage: '/concepts/kosmodent-desktop.png',
    mobileImage: '/concepts/kosmodent-mobile.png',
  },
  {
    slug: 'asklepiy',
    desktopImage: '/concepts/asklepiy-desktop.png',
    mobileImage: '/concepts/asklepiy-mobile.png',
  },
] as const

type ConceptsMessageShape = {
  concepts: {
    heading: string
    subtitle: string
    viewAll: string
    listBadge: string
    listTitle1: string
    listTitle2: string
    listDescription: string
    detailHeroLine2: string
    detailBack: string
    detailCompareTitle: string
    detailTechTitle: string
    shortPreviewTitle?: string
    technologies: string[]
    items: Record<
      string,
      {
        title: string
        shortDescription: string
        description: string
        improvements: string[]
      }
    >
  }
}

function getMessages(locale: 'en' | 'uk') {
  return (locale === 'uk' ? uk : en) as unknown as ConceptsMessageShape
}

export function getConceptTexts(locale: 'en' | 'uk') {
  const m = getMessages(locale).concepts
  return {
    ...m,
    shortPreviewTitle:
      m.shortPreviewTitle ?? (locale === 'uk' ? "Коротке прев'ю концепту" : 'Short concept preview'),
  }
}

export function getConcepts(locale: 'en' | 'uk'): ConceptItem[] {
  const concepts = getMessages(locale).concepts
  return BASE_ITEMS.map((item) => {
    const localized = concepts.items[item.slug]
    return {
      slug: item.slug,
      title: localized.title,
      shortDescription: localized.shortDescription,
      description: localized.description,
      improvements: localized.improvements,
      technologies: concepts.technologies,
      previewSets: [
        {
          desktopUrl: item.desktopImage,
          mobileUrl: item.mobileImage,
          alt: localized.title,
        },
      ],
      conceptLinks: [],
    }
  })
}

export function conceptCmsToItem(row: ConceptCMS, locale: 'en' | 'uk'): ConceptItem {
  const title = pickLang(row.title, locale)
  const previewSets: ConceptPreviewSet[] = (row.setOfImages ?? [])
    .map((s) => {
      const d = (s.desktopImageUrl ?? '').trim()
      const m = (s.mobileImageUrl ?? '').trim()
      if (!d && !m) return null
      const altRaw = pickLang(s.altText, locale).trim()
      return {
        desktopUrl: d,
        mobileUrl: m || undefined,
        alt: altRaw || title,
      }
    })
    .filter(Boolean) as ConceptPreviewSet[]

  return {
    slug: row.slug,
    title,
    shortDescription: pickLang(row.shortDescription, locale),
    description: pickLang(row.description, locale),
    technologies: row.technologies[locale].length ? row.technologies[locale] : row.technologies.en,
    improvements: row.improvements[locale].length ? row.improvements[locale] : row.improvements.en,
    previewSets,
    conceptLinks: projectLinksForLocale(row.projectLinks, locale),
  }
}

/** Prefer KV-backed concepts; fall back to bundled messages + static assets. */
export async function getConceptsForLocale(locale: 'en' | 'uk'): Promise<ConceptItem[]> {
  try {
    const cms = await getConceptsFromKv()
    if (cms.length > 0) {
      return cms
        .filter((c) => isCmsPublished(c.status))
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((c) => conceptCmsToItem(c, locale))
    }
  } catch {
    /* KV unavailable */
  }
  return getConcepts(locale)
}

export async function getConceptBySlug(locale: 'en' | 'uk', slug: string): Promise<ConceptItem | undefined> {
  try {
    const cms = await getConceptsFromKv()
    const row = cms.find((c) => c.slug === slug)
    if (row) return conceptCmsToItem(row, locale)
  } catch {
    /* fallback */
  }
  return getConcepts(locale).find((item) => item.slug === slug)
}
