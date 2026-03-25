'use client'

import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'

export default function FinalCTASection() {
  const { openModal } = useModal()
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const fc = payload.pages.homeFinalCta ?? DEFAULT_PAGES_CONTENT.homeFinalCta
  const { title, buttonLabel } = fc

  return (
    <section className="final-cta-alt" id="contact">
      <div className="container-custom">
        <div className="final-cta-alt-content">
          <div className="final-cta-alt-left">
            <h2 className="final-cta-alt-title">{pickLang(title, locale)}</h2>
          </div>
          <div className="final-cta-alt-right">
            <button
              onClick={openModal}
              className="btn btn-primary btn-large"
            >
              {pickLang(buttonLabel, locale)}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
