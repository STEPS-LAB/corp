export type ServiceItem = {
  id: string
  title: string
  description: string
  icon_name: string
  price: string
}

export type SiteContent = {
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    heroImageUrl: string
  }
  services: ServiceItem[]
  aboutTech: {
    workflowDescription: string
    teamExperience: string
  }
  images: {
    logo: string
    hero: string
    gallery: string[]
  }
  footer: {
    socialLinks: {
      linkedin: string
      github: string
      x: string
    }
    contactEmail: string
    phone: string
    copyrightText: string
  }
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    title: 'Next-Gen AI-Supported Development',
    subtitle:
      'A powerhouse team with 5-6 years of commercial experience. Premium website development with speed and precision.',
    ctaText: 'Start Project',
    ctaLink: '/contacts',
    heroImageUrl: '/steps-lab_logo-w.webp',
  },
  services: [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Production-grade Next.js websites focused on conversion and performance.',
      icon_name: 'globe',
      price: 'From $1,200',
    },
    {
      id: 'ai-automation',
      title: 'AI Automation',
      description: 'AI-powered workflows and copilots to accelerate operations and growth.',
      icon_name: 'sparkles',
      price: 'From $1,500',
    },
    {
      id: 'mvp-startups',
      title: 'MVP for Startups',
      description: 'Launch-ready MVP delivery with senior engineering and rapid iteration.',
      icon_name: 'rocket',
      price: 'From $2,000',
    },
    {
      id: 'support-scaling',
      title: 'Support & Scaling',
      description: 'Stability, optimization, and ongoing growth support for live products.',
      icon_name: 'shield-check',
      price: 'Custom',
    },
  ],
  aboutTech: {
    workflowDescription:
      'We combine Cursor, Claude, and Qwen with senior engineering standards to deliver faster without sacrificing quality.',
    teamExperience:
      'Our team has 5-6 years of commercial product development experience across SaaS, eCommerce, and corporate platforms.',
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
    copyrightText: 'STEPS LAB. All rights reserved.',
  },
}

function mergeContent(input: unknown): SiteContent {
  const candidate = (input ?? {}) as Partial<SiteContent>
  return {
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...(candidate.hero ?? {}) },
    services: Array.isArray(candidate.services) && candidate.services.length > 0
      ? candidate.services.map((service, index) => ({
          id: service?.id ?? `service-${index + 1}`,
          title: service?.title ?? 'Untitled service',
          description: service?.description ?? '',
          icon_name: service?.icon_name ?? 'circle',
          price: service?.price ?? 'Custom',
        }))
      : DEFAULT_SITE_CONTENT.services,
    aboutTech: { ...DEFAULT_SITE_CONTENT.aboutTech, ...(candidate.aboutTech ?? {}) },
    images: {
      ...DEFAULT_SITE_CONTENT.images,
      ...(candidate.images ?? {}),
      gallery: Array.isArray(candidate.images?.gallery)
        ? candidate.images.gallery.filter(Boolean)
        : DEFAULT_SITE_CONTENT.images.gallery,
    },
    footer: {
      ...DEFAULT_SITE_CONTENT.footer,
      ...(candidate.footer ?? {}),
      socialLinks: {
        ...DEFAULT_SITE_CONTENT.footer.socialLinks,
        ...(candidate.footer?.socialLinks ?? {}),
      },
    },
  }
}

export function sanitizeSiteContent(input: unknown): SiteContent {
  return mergeContent(input)
}
