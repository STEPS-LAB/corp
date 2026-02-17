'use client'

import Link from 'next/link'
import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'

export default function EcommerceCasePage() {
  const { openModal } = useModal()
  const { t } = useLocale()
  const c = (k: string) => t(`casePages.ecommerce.${k}`)
  const g = (k: string) => t(`casePages.${k}`)

  return (
    <>
      <section className="case-hero">
        <div className="case-hero-image"></div>
        <div className="container-custom">
          <div className="case-hero-content">
            <Link href="/cases" className="service-breadcrumb">{c('breadcrumb')}</Link>
            <h1 className="case-hero-title">{c('title')}</h1>
            <p className="case-hero-subtitle">{c('subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="case-hero-image-section">
        <div className="container-custom">
          <div className="case-hero-image-wrapper">
            <div className="case-hero-image-main"></div>
          </div>
        </div>
      </section>

      <section className="case-overview">
        <div className="container-custom">
          <div className="case-overview-grid">
            <div className="case-overview-main">
              <h2 className="case-section-title">{g('aboutProject')}</h2>
              <div className="case-text-content">
                <p>{c('overview_p1')}</p>
                <p>{c('overview_p2')}</p>
              </div>

              <div className="case-screens-section">
                <h2 className="case-section-title">{g('interface')}</h2>
                <div className="case-screens-grid">
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-1"></div>
                    <p className="case-screen-caption">{c('screen1')}</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-2"></div>
                    <p className="case-screen-caption">{c('screen2')}</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-3"></div>
                    <p className="case-screen-caption">{c('screen3')}</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-4"></div>
                    <p className="case-screen-caption">{c('screen4')}</p>
                  </div>
                </div>
              </div>

              <h2 className="case-section-title">{g('whatWeDid')}</h2>
              <div className="case-features">
                <div className="case-feature-item">
                  <h3 className="case-feature-title">{c('feature1_title')}</h3>
                  <p className="case-feature-text">{c('feature1_text')}</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">{c('feature2_title')}</h3>
                  <p className="case-feature-text">{c('feature2_text')}</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">{c('feature3_title')}</h3>
                  <p className="case-feature-text">{c('feature3_text')}</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">{c('feature4_title')}</h3>
                  <p className="case-feature-text">{c('feature4_text')}</p>
                </div>
              </div>

              <div className="case-fullscreen-section">
                <div className="case-fullscreen-image case-fullscreen-1"></div>
                <p className="case-fullscreen-caption">{c('fullscreenCaption')}</p>
              </div>

              <h2 className="case-section-title">{g('results')}</h2>
              <div className="case-results">
                <div className="case-result-item">
                  <div className="case-result-number">340%</div>
                  <div className="case-result-label">{c('result1')}</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">60%</div>
                  <div className="case-result-label">{c('result2')}</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">85%</div>
                  <div className="case-result-label">{c('result3')}</div>
                </div>
              </div>
            </div>

            <div className="case-sidebar">
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">{g('client')}</h3>
                <p className="case-sidebar-text">{c('clientType')}</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">{g('timeline')}</h3>
                <p className="case-sidebar-text">{c('timelineValue')}</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">{g('technologies')}</h3>
                <ul className="service-tech-list">
                  <li>Next.js</li>
                  <li>Node.js</li>
                  <li>PostgreSQL</li>
                  <li>Payment APIs</li>
                  <li>AI Integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-alt">
        <div className="container-custom">
          <div className="final-cta-alt-content">
            <div className="final-cta-alt-left">
              <h2 className="final-cta-alt-title">{c('ctaTitle')}</h2>
            </div>
            <div className="final-cta-alt-right">
              <button onClick={openModal} className="btn btn-primary btn-large">
                {t('hero.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
