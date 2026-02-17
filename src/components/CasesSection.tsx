'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'

export default function CasesSection() {
  const { t } = useLocale()
  const cases = [
    { href: '/cases/ecommerce', titleKey: 'cases.ecommerce_title', descKey: 'cases.ecommerce_desc', resultKey: 'cases.ecommerce_result' },
    { href: '/cases/saas', titleKey: 'cases.saas_title', descKey: 'cases.saas_desc', resultKey: 'cases.saas_result' },
    { href: '/cases/corporate', titleKey: 'cases.corporate_title', descKey: 'cases.corporate_desc', resultKey: 'cases.corporate_result' },
  ]

  return (
    <section className="cases-alt" id="cases">
      <div className="container-custom">
        <h2 className="section-title-alt">{t('cases.sectionTitle')}</h2>
      </div>
      <div className="cases-alt-list">
        {cases.map((caseItem, index) => (
          <Link
            key={index}
            href={caseItem.href}
            className="case-alt-item"
          >
            <div className="case-alt-preview"></div>
            <div className="case-alt-content">
              <h3 className="case-alt-title">{t(caseItem.titleKey)}</h3>
              <p className="case-alt-description">{t(caseItem.descKey)}</p>
              <p className="case-alt-result">{t(caseItem.resultKey)}</p>
              <span className="case-alt-link">{t('cases.viewCase')}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
