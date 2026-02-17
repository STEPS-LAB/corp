'use client'

import { useLocale } from '@/context/LocaleContext'

export default function TrustStrip() {
  const { t } = useLocale()
  return (
    <section className="trust-strip-alt">
      <div className="container-custom">
        <div className="trust-strip-content">
          <span className="trust-item-alt">{t('trust.item1')}</span>
          <span className="trust-divider">•</span>
          <span className="trust-item-alt">{t('trust.item2')}</span>
          <span className="trust-divider">•</span>
          <span className="trust-item-alt">{t('trust.item3')}</span>
          <span className="trust-divider">•</span>
          <span className="trust-item-alt">{t('trust.item4')}</span>
        </div>
      </div>
    </section>
  )
}
