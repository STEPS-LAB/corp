import { SCHEMA_IDS, SITE_LOGO_URL, SITE_NAME, SITE_URL } from '@/lib/constants'

export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO_URL,
    description:
      'Premium AI-supported web development studio. High-performance Next.js websites built by experts with 5-6 years of experience.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zhytomyr',
      addressCountry: 'UA',
    },
  }
}

export function getWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: 'STEPS LAB - AI Development Studio',
    publisher: { '@id': SCHEMA_IDS.organization },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/en/news?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getServicesSchemaGraph() {
  return [
    {
      '@type': 'Service',
      '@id': SCHEMA_IDS.webDevelopmentService,
      serviceType: 'Web Development',
      provider: { '@id': SCHEMA_IDS.organization },
      areaServed: 'Worldwide',
      description:
        'Premium website development and Next.js performance optimization for conversion-focused digital products.',
    },
    {
      '@type': 'Service',
      '@id': SCHEMA_IDS.aiSolutionsService,
      serviceType: 'AI Solutions',
      provider: { '@id': SCHEMA_IDS.organization },
      areaServed: 'Worldwide',
      description:
        'AI-supported development, workflow automation, and custom admin panels for operational efficiency.',
    },
    {
      '@type': 'ProfessionalService',
      '@id': SCHEMA_IDS.professionalService,
      name: SITE_NAME,
      url: SITE_URL,
      areaServed: 'Worldwide',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zhytomyr',
        addressCountry: 'UA',
      },
      sameAs: [SITE_URL],
    },
  ]
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
