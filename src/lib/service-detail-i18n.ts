/** Maps canonical service href to `messages.*.servicePages.{ns}` for fallback copy. */
export type ServiceI18nNs = 'webDev' | 'aiAutomation' | 'mvpStartups' | 'supportScaling'

const HREF_TO_NS: Record<string, ServiceI18nNs> = {
  '/services/web-development': 'webDev',
  '/services/ai-automation': 'aiAutomation',
  '/services/mvp-startups': 'mvpStartups',
  '/services/support-scaling': 'supportScaling',
}

export function normalizeServiceHref(href: string): string {
  const t = href.trim()
  if (!t) return ''
  return t.startsWith('/') ? t.replace(/\/+$/, '') || '/' : `/${t.replace(/\/+$/, '')}`
}

export function serviceI18nNsFromHref(href: string): ServiceI18nNs | null {
  return HREF_TO_NS[normalizeServiceHref(href)] ?? null
}

export type LegacyFeature = { titleKey: string; descKey: string }

export const LEGACY_SERVICE_FEATURES: Record<ServiceI18nNs, LegacyFeature[]> = {
  webDev: [
    { titleKey: 'servicePages.webDev.businessSites', descKey: 'servicePages.webDev.businessSites_desc' },
    { titleKey: 'servicePages.webDev.landings', descKey: 'servicePages.webDev.landings_desc' },
    { titleKey: 'servicePages.webDev.corporatePlatforms', descKey: 'servicePages.webDev.corporatePlatforms_desc' },
  ],
  aiAutomation: [
    { titleKey: 'servicePages.aiAutomation.crm', descKey: 'servicePages.aiAutomation.crm_desc' },
    { titleKey: 'servicePages.aiAutomation.contentProcesses', descKey: 'servicePages.aiAutomation.contentProcesses_desc' },
    { titleKey: 'servicePages.aiAutomation.formsData', descKey: 'servicePages.aiAutomation.formsData_desc' },
  ],
  mvpStartups: [
    { titleKey: 'servicePages.mvpStartups.saasMvp', descKey: 'servicePages.mvpStartups.saasMvp_desc' },
    { titleKey: 'servicePages.mvpStartups.mobileApps', descKey: 'servicePages.mvpStartups.mobileApps_desc' },
    { titleKey: 'servicePages.mvpStartups.webPlatforms', descKey: 'servicePages.mvpStartups.webPlatforms_desc' },
  ],
  supportScaling: [
    { titleKey: 'servicePages.supportScaling.techSupport', descKey: 'servicePages.supportScaling.techSupport_desc' },
    { titleKey: 'servicePages.supportScaling.optimization', descKey: 'servicePages.supportScaling.optimization_desc' },
    { titleKey: 'servicePages.supportScaling.scaling', descKey: 'servicePages.supportScaling.scaling_desc' },
  ],
}

export const LEGACY_SERVICE_TECH: Record<ServiceI18nNs, string[]> = {
  webDev: ['React / Next.js', 'Vue.js / Nuxt', 'Node.js', 'TypeScript', 'Headless CMS', 'API Integration'],
  aiAutomation: ['OpenAI API', 'LangChain', 'Zapier / Make', 'Custom Integrations', 'Webhooks', 'Data Processing'],
  mvpStartups: ['React', 'Node.js', 'MongoDB', 'Fast API', 'Analytics', 'AI Tools'],
  supportScaling: ['Monitoring', 'CI/CD', 'Cloud', 'Analytics', 'Security', 'Performance'],
}

const PROCESS_NUMBERS = ['01', '02', '03', '04'] as const

export function legacyProcessKeys(ns: ServiceI18nNs) {
  return PROCESS_NUMBERS.map((num, i) => {
    const n = i + 1
    return {
      number: num,
      titleKey: `servicePages.${ns}.process_${n}_title` as const,
      textKey: `servicePages.${ns}.process_${n}_text` as const,
    }
  })
}
