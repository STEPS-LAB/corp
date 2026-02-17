'use client'

import Link from 'next/link'
import { useModal } from '@/hooks/useModal'

export default function SaaSCasePage() {
  const { openModal } = useModal()

  return (
    <>
      {/* Case Hero */}
      <section className="case-hero">
        <div className="case-hero-image"></div>
        <div className="container-custom">
          <div className="case-hero-content">
            <Link href="/cases" className="service-breadcrumb">← Cases</Link>
            <h1 className="case-hero-title">SaaS MVP</h1>
            <p className="case-hero-subtitle">Мінімальний продукт для стартапу з AI-інтеграцією</p>
          </div>
        </div>
      </section>

      {/* Case Hero Image */}
      <section className="case-hero-image-section">
        <div className="container-custom">
          <div className="case-hero-image-wrapper">
            <div className="case-hero-image-main case-hero-image-saas"></div>
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
                <p>Стартап потребував швидкого запуску MVP для перевірки бізнес-гіпотези. Завдання: створити функціональний продукт за мінімальний термін без втрати якості.</p>
                <p>Використовуючи AI-прискорену розробку, ми створили повнофункціональний MVP, який дозволив клієнту швидко отримати фідбек від ринку та валідувати бізнес-модель.</p>
              </div>

              {/* Screens Section */}
              <div className="case-screens-section">
                <h2 className="case-section-title">Інтерфейс продукту</h2>
                <div className="case-screens-grid">
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-saas-1"></div>
                    <p className="case-screen-caption">Головна панель з дашбордом</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-saas-2"></div>
                    <p className="case-screen-caption">Автоматизація процесів</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-saas-3"></div>
                    <p className="case-screen-caption">AI-аналітика та звіти</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-saas-4"></div>
                    <p className="case-screen-caption">Налаштування та інтеграції</p>
                  </div>
                </div>
              </div>

              <h2 className="case-section-title">Що ми зробили</h2>
              <div className="case-features">
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Швидка розробка MVP</h3>
                  <p className="case-feature-text">Створили мінімальний продукт з core функціональністю за 8 тижнів, використовуючи AI для прискорення розробки.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Автоматизація бізнес-процесів</h3>
                  <p className="case-feature-text">Впровадили автоматизацію рутинних завдань, що дозволило команді зосередитись на стратегії та розвитку.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">AI-інтеграція для аналітики</h3>
                  <p className="case-feature-text">Додали AI-модуль для аналізу даних користувачів та генерації інсайтів для прийняття рішень.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Система аналітики</h3>
                  <p className="case-feature-text">Вбудували комплексну систему відстеження ключових метрик для моніторингу успіху продукту.</p>
                </div>
              </div>

              {/* Full Width Screen */}
              <div className="case-fullscreen-section">
                <div className="case-fullscreen-image case-fullscreen-saas"></div>
                <p className="case-fullscreen-caption">Мобільна версія продукту</p>
              </div>

              <h2 className="case-section-title">Результати</h2>
              <div className="case-results">
                <div className="case-result-item">
                  <div className="case-result-number">8 тижнів</div>
                  <div className="case-result-label">Від ідеї до запуску</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">100+</div>
                  <div className="case-result-label">Платних користувачів за місяць</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">Валідація</div>
                  <div className="case-result-label">Бізнес-моделі підтверджена</div>
                </div>
              </div>
            </div>

            <div className="case-sidebar">
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Клієнт</h3>
                <p className="case-sidebar-text">Tech стартап</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Термін</h3>
                <p className="case-sidebar-text">8 тижнів</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Технології</h3>
                <ul className="service-tech-list">
                  <li>React</li>
                  <li>Node.js</li>
                  <li>MongoDB</li>
                  <li>AI APIs</li>
                  <li>Analytics</li>
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
              <h2 className="final-cta-alt-title">Готові запустити свій MVP?</h2>
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
