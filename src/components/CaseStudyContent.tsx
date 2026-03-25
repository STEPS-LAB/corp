'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { localizePath } from '@/lib/locale-path'
import ConceptConceptLinksCard from '@/components/ConceptConceptLinksCard'
import { pickLang, projectLinksForLocale, type CasePageDetail } from '@/lib/cms-types'

type CaseVariant = 'ecommerce' | 'saas' | 'corporate'

function variantFromHref(href: string): CaseVariant {
  if (href.includes('saas')) return 'saas'
  if (href.includes('corporate')) return 'corporate'
  return 'ecommerce'
}

function screenClass(variant: CaseVariant, i: 1 | 2 | 3 | 4): string {
  const base = 'case-screen-image'
  if (variant === 'ecommerce') return `${base} case-screen-${i}`
  if (variant === 'saas') return `${base} case-screen-saas-${i}`
  return `${base} case-screen-corporate-${i}`
}

function heroMainClass(variant: CaseVariant): string {
  if (variant === 'saas') return 'case-hero-image-main case-hero-image-saas'
  if (variant === 'corporate') return 'case-hero-image-main case-hero-image-corporate'
  return 'case-hero-image-main'
}

function fullscreenClass(variant: CaseVariant): string {
  if (variant === 'saas') return 'case-fullscreen-image case-fullscreen-saas'
  if (variant === 'corporate') return 'case-fullscreen-image case-fullscreen-corporate'
  return 'case-fullscreen-image case-fullscreen-1'
}

function bgStyle(url: string | undefined) {
  const u = url?.trim()
  if (!u) return undefined
  return {
    backgroundImage: `url(${u})`,
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center' as const,
  }
}

function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/(en|uk)(?=\/|$)/, '') || '/'
}

type Props = {
  caseHref: string
}

export default function CaseStudyContent({ caseHref }: Props) {
  const { openModal } = useModal()
  const { t, locale } = useLocale()
  const pathname = usePathname() ?? ''
  const { payload } = useSiteContent()
  const normalized = stripLocalePrefix(pathname)
  const caseItem = payload.cases.find((c) => c.href === caseHref || c.href === normalized)
  const variant = variantFromHref(caseHref)
  const L = locale

  const labels = payload.pages.casePageLabels
  const gl = (k: keyof typeof labels) => pickLang(labels[k], L) || t(`casePages.${k}`)

  if (!caseItem) {
    return (
      <section className="case-overview py-24">
        <div className="container-custom text-center text-text-dark/70">Case not found.</div>
      </section>
    )
  }

  const d: CasePageDetail = caseItem.detail
  const caseLinks = projectLinksForLocale(caseItem.projectLinks, L)

  const ctaLabel = pickLang(payload.pages.hero.ctaText, L) || t('hero.cta')

  return (
    <>
      <section className="case-hero">
        <div className="case-hero-image" style={bgStyle(d.images.heroBackground)} />
        <div className="container-custom">
          <div className="case-hero-content">
            <Link
              href={localizePath('/cases', locale)}
              aria-label="Back to cases"
              className="service-breadcrumb"
            >
              {pickLang(d.breadcrumb, L)}
            </Link>
            <h1 className="case-hero-title">{pickLang(caseItem.title, L)}</h1>
            <p className="case-hero-subtitle">{pickLang(d.subtitle, L)}</p>
          </div>
        </div>
      </section>

      <section className="case-hero-image-section">
        <div className="container-custom">
          <div className="case-hero-image-wrapper">
            <div className={heroMainClass(variant)} style={bgStyle(d.images.heroMain)} />
          </div>
        </div>
      </section>

      <section className="case-overview">
        <div className="container-custom">
          <div className="case-overview-grid">
            <div className="case-overview-main">
              <h2 className="case-section-title">{gl('aboutProject')}</h2>
              <div className="case-text-content">
                <p>{pickLang(d.overviewP1, L)}</p>
                <p>{pickLang(d.overviewP2, L)}</p>
              </div>

              <div className="case-screens-section">
                <h2 className="case-section-title">{pickLang(d.screensSectionTitle, L)}</h2>
                <div className="case-screens-grid">
                  {(
                    [
                      [1, d.images.screen1, d.screen1Caption],
                      [2, d.images.screen2, d.screen2Caption],
                      [3, d.images.screen3, d.screen3Caption],
                      [4, d.images.screen4, d.screen4Caption],
                    ] as const
                  ).map(([n, img, cap]) => (
                    <div key={n} className="case-screen-item">
                      <div className={screenClass(variant, n)} style={bgStyle(img)} />
                      <p className="case-screen-caption">{pickLang(cap, L)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="case-section-title">{gl('whatWeDid')}</h2>
              <div className="case-features">
                {(
                  [
                    [d.feature1Title, d.feature1Text],
                    [d.feature2Title, d.feature2Text],
                    [d.feature3Title, d.feature3Text],
                    [d.feature4Title, d.feature4Text],
                  ] as const
                ).map(([title, text], idx) => (
                  <div key={idx} className="case-feature-item">
                    <h3 className="case-feature-title">{pickLang(title, L)}</h3>
                    <p className="case-feature-text">{pickLang(text, L)}</p>
                  </div>
                ))}
              </div>

              <div className="case-fullscreen-section">
                <div className={fullscreenClass(variant)} style={bgStyle(d.images.fullscreen)} />
                <p className="case-fullscreen-caption">{pickLang(d.fullscreenCaption, L)}</p>
              </div>

              <h2 className="case-section-title">{gl('results')}</h2>
              <div className="case-results">
                <div className="case-result-item">
                  <div className="case-result-number">{d.result1Value}</div>
                  <div className="case-result-label">{pickLang(d.result1Label, L)}</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">{d.result2Value}</div>
                  <div className="case-result-label">{pickLang(d.result2Label, L)}</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">{d.result3Value}</div>
                  <div className="case-result-label">{pickLang(d.result3Label, L)}</div>
                </div>
              </div>
            </div>

            <div className="case-sidebar">
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">{gl('client')}</h3>
                <p className="case-sidebar-text">{pickLang(d.clientType, L)}</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">{gl('timeline')}</h3>
                <p className="case-sidebar-text">{pickLang(d.timelineValue, L)}</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">{gl('technologies')}</h3>
                <ul className="service-tech-list">
                  {d.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
              {caseLinks.length > 0 ? (
                <div className="case-sidebar-card">
                  <ConceptConceptLinksCard locale={L} links={caseLinks} placement="case" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-alt">
        <div className="container-custom">
          <div className="final-cta-alt-content">
            <div className="final-cta-alt-left">
              <h2 className="final-cta-alt-title">{pickLang(d.ctaTitle, L)}</h2>
            </div>
            <div className="final-cta-alt-right">
              <button type="button" onClick={openModal} className="btn btn-primary btn-large">
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
