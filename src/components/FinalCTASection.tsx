'use client'

import { useModal } from '@/hooks/useModal'

export default function FinalCTASection() {
  const { openModal } = useModal()

  return (
    <section className="final-cta-alt" id="contact">
      <div className="container-custom">
        <div className="final-cta-alt-content">
          <div className="final-cta-alt-left">
            <h2 className="final-cta-alt-title">Створимо сайт або веб-додаток, що працює на результат.</h2>
          </div>
          <div className="final-cta-alt-right">
            <button
              onClick={openModal}
              className="btn btn-primary btn-large"
            >
              Отримати консультацію
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
