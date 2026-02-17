'use client'

import Link from 'next/link'
import { useModal } from '@/hooks/useModal'

export default function CorporateCasePage() {
  const { openModal } = useModal()

  return (
    <>
      {/* Case Hero */}
      <section className="case-hero">
        <div className="case-hero-image"></div>
        <div className="container-custom">
          <div className="case-hero-content">
            <Link href="/cases" className="service-breadcrumb">← Cases</Link>
            <h1 className="case-hero-title">Corporate Website</h1>
            <p className="case-hero-subtitle">Корпоративний сайт з CRM-інтеграцією та автоматизацією</p>
          </div>
        </div>
      </section>

      {/* Case Hero Image */}
      <section className="case-hero-image-section">
        <div className="container-custom">
          <div className="case-hero-image-wrapper">
            <div className="case-hero-image-main case-hero-image-corporate"></div>
          </div>
        </div>
      </section>

      {/* Case Overview */}
      <section className="case-overview">
        <div className="container-custom">
          <div className="case-overview-grid">
            <div className="case-overview-main">
              <h2 className="case-section-title">Про проєкт</h2>
              <div className="case-text-content">
                <p>Клієнт потребував сучасного корпоративного сайту, який би не тільки представляв компанію, але й працював як інструмент для генерації лідів та автоматизації продажів.</p>
                <p>Завдання: створити сайт з системою управління контентом, інтеграцією з CRM та автоматизацією процесу обробки заявок.</p>
              </div>

              {/* Screens Section */}
              <div className="case-screens-section">
                <h2 className="case-section-title">Дизайн та інтерфейс</h2>
                <div className="case-screens-grid">
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-corporate-1"></div>
                    <p className="case-screen-caption">Головна сторінка</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-corporate-2"></div>
                    <p className="case-screen-caption">Сторінка послуг</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-corporate-3"></div>
                    <p className="case-screen-caption">Форма зворотного зв'язку</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-corporate-4"></div>
                    <p className="case-screen-caption">Блог та новини</p>
                  </div>
                </div>
              </div>

              <h2 className="case-section-title">Що ми зробили</h2>
              <div className="case-features">
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Розробка корпоративного сайту</h3>
                  <p className="case-feature-text">Створили сучасний корпоративний сайт з адаптивним дизайном, системою управління контентом та оптимізацією для пошукових систем.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">CRM-інтеграція</h3>
                  <p className="case-feature-text">Підключили сайт до CRM-системи для автоматичної синхронізації заявок, контактів та історії взаємодії з клієнтами.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Автоматизація лідогенерації</h3>
                  <p className="case-feature-text">Налаштували автоматичну обробку форм, розподіл лідів між менеджерами та відстеження джерел трафіку.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">SEO-оптимізація</h3>
                  <p className="case-feature-text">Провели комплексну SEO-оптимізацію, що дозволило покращити позиції в пошукових системах та збільшити органічний трафік.</p>
                </div>
              </div>

              {/* Full Width Screen */}
              <div className="case-fullscreen-section">
                <div className="case-fullscreen-image case-fullscreen-corporate"></div>
                <p className="case-fullscreen-caption">Адаптивний дизайн для мобільних пристроїв</p>
              </div>

              <h2 className="case-section-title">Результати</h2>
              <div className="case-results">
                <div className="case-result-item">
                  <div className="case-result-number">250%</div>
                  <div className="case-result-label">Збільшення конверсії</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">180%</div>
                  <div className="case-result-label">Зростання кількості заявок</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">SEO</div>
                  <div className="case-result-label">Покращення позицій</div>
                </div>
              </div>
            </div>

            <div className="case-sidebar">
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Клієнт</h3>
                <p className="case-sidebar-text">Корпорація</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Термін</h3>
                <p className="case-sidebar-text">10 тижнів</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Технології</h3>
                <ul className="service-tech-list">
                  <li>Next.js</li>
                  <li>Headless CMS</li>
                  <li>CRM API</li>
                  <li>Analytics</li>
                  <li>SEO Tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-alt">
        <div className="container-custom">
          <div className="final-cta-alt-content">
            <div className="final-cta-alt-left">
              <h2 className="final-cta-alt-title">Готові створити свій успішний кейс?</h2>
            </div>
            <div className="final-cta-alt-right">
              <button
                onClick={openModal}
                className="btn btn-primary btn-large"
              >
                Get consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
