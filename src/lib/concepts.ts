import en from '@/messages/en.json'
import uk from '@/messages/uk.json'

export type ConceptItem = {
  slug: string
  title: string
  shortDescription: string
  description: string
  technologies: string[]
  improvements: string[]
  desktopImage: string
  mobileImage: string
  oldDesktopImage: string
  oldMobileImage: string
}

const BASE_ITEMS = [
  {
    slug: 'ribas-karpaty',
    desktopImage: '/concepts/ribas-karpaty-desktop.png',
    mobileImage: '/concepts/ribas-karpaty-mobile.png',
    oldDesktopImage: '/concepts/ribas-karpaty-desktop.png',
    oldMobileImage: '/concepts/ribas-karpaty-mobile.png',
  },
  {
    slug: 'amstelski',
    desktopImage: '/concepts/amstelski-desktop.png',
    mobileImage: '/concepts/amstelski-mobile.png',
    oldDesktopImage: '/concepts/amstelski-desktop.png',
    oldMobileImage: '/concepts/amstelski-mobile.png',
  },
  {
    slug: 'chudodievo',
    desktopImage: '/concepts/chudodievo-desktop.png',
    mobileImage: '/concepts/chudodievo-mobile.png',
    oldDesktopImage: '/concepts/chudodievo-desktop.png',
    oldMobileImage: '/concepts/chudodievo-mobile.png',
  },
  {
    slug: 'kosmodent',
    desktopImage: '/concepts/kosmodent-desktop.png',
    mobileImage: '/concepts/kosmodent-mobile.png',
    oldDesktopImage: '/concepts/kosmodent-desktop.png',
    oldMobileImage: '/concepts/kosmodent-mobile.png',
  },
  {
    slug: 'asklepiy',
    desktopImage: '/concepts/asklepiy-desktop.png',
    mobileImage: '/concepts/asklepiy-mobile.png',
    oldDesktopImage: '/concepts/asklepiy-desktop.png',
    oldMobileImage: '/concepts/asklepiy-mobile.png',
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
    oldVersionTitle: string
    newVersionTitle: string
    oldCaptionMobile: string
    oldCaptionDesktop: string
    newCaptionMobile: string
    newCaptionDesktop: string
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
  return getMessages(locale).concepts
}

export function getConcepts(locale: 'en' | 'uk'): ConceptItem[] {
  const concepts = getMessages(locale).concepts
  return BASE_ITEMS.map((item) => {
    const localized = concepts.items[item.slug]
    return {
      ...item,
      title: localized.title,
      shortDescription: localized.shortDescription,
      description: localized.description,
      improvements: localized.improvements,
      technologies: concepts.technologies,
    }
  })
}

export function getConceptBySlug(locale: 'en' | 'uk', slug: string) {
  return getConcepts(locale).find((item) => item.slug === slug)
}
