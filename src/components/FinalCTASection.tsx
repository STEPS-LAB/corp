'use client'

import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'

export default function FinalCTASection() {
  const { openModal } = useModal()
  const { t } = useLocale()

  return (
    <section className="final-cta-alt" id="contact">
      <div className="container-custom">
        <div className="final-cta-alt-content">
          <div className="final-cta-alt-left">
            <h2 className="final-cta-alt-title">{t('finalCta.title')}</h2>
          </div>
          <div className="final-cta-alt-right">
            <button
              onClick={openModal}
              className="btn btn-primary btn-large"
            >
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
