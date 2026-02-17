'use client'

import Link from 'next/link'
import { useModal } from '@/hooks/useModal'

export default function EcommerceCasePage() {
  const { openModal } = useModal()

  return (
    <>
      {/* Case Hero */}
      <section className="case-hero">
        <div className="case-hero-image"></div>
        <div className="container-custom">
          <div className="case-hero-content">
            <Link href="/cases" className="service-breadcrumb">← Cases</Link>
            <h1 className="case-hero-title">E-commerce Platform</h1>
            <p className="case-hero-subtitle">Повнофункціональна платформа для онлайн-продажів</p>
          </div>
        </div>
      </section>

      {/* Case Hero Image */}
      <section className="case-hero-image-section">
        <div className="container-custom">
          <div className="case-hero-image-wrapper">
            <div className="case-hero-image-main"></div>
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
                <p>Клієнт потребував сучасної платформи для онлайн-продажів, яка б об'єднала функціональність інтернет-магазину, системи управління складом та інтеграції з платіжними системами.</p>
                <p>Завдання: створити масштабоване рішення, яке дозволить обробляти великі обсяги замовлень та автоматизувати бізнес-процеси.</p>
              </div>

              {/* Screens Section */}
              <div className="case-screens-section">
                <h2 className="case-section-title">Інтерфейс платформи</h2>
                <div className="case-screens-grid">
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-1"></div>
                    <p className="case-screen-caption">Головна сторінка з каталогом товарів</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-2"></div>
                    <p className="case-screen-caption">Сторінка товару з деталями</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-3"></div>
                    <p className="case-screen-caption">Кошик та оформлення замовлення</p>
                  </div>
                  <div className="case-screen-item">
                    <div className="case-screen-image case-screen-4"></div>
                    <p className="case-screen-caption">Особистий кабінет користувача</p>
                  </div>
                </div>
              </div>

              <h2 className="case-section-title">Що ми зробили</h2>
              <div className="case-features">
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Розробка платформи</h3>
                  <p className="case-feature-text">Створили повнофункціональну e-commerce платформу з каталогом товарів, кошиком, системою замовлень та особистим кабінетом користувача.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Інтеграція платежів</h3>
                  <p className="case-feature-text">Підключили кілька платіжних систем, включаючи карткові платежі, електронні гаманці та оплату при отриманні.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">Система управління складом</h3>
                  <p className="case-feature-text">Розробили модуль для відстеження залишків, автоматичного резервування товарів та управління постачанням.</p>
                </div>
                <div className="case-feature-item">
                  <h3 className="case-feature-title">AI-оптимізація</h3>
                  <p className="case-feature-text">Впровадили AI-рекомендації товарів, автоматичну категорізацію та оптимізацію пошуку для покращення конверсії.</p>
                </div>
              </div>

              {/* Full Width Screen */}
              <div className="case-fullscreen-section">
                <div className="case-fullscreen-image case-fullscreen-1"></div>
                <p className="case-fullscreen-caption">Панель адміністратора з управлінням замовленнями</p>
              </div>

              <h2 className="case-section-title">Результати</h2>
              <div className="case-results">
                <div className="case-result-item">
                  <div className="case-result-number">340%</div>
                  <div className="case-result-label">Збільшення онлайн-продажів за 6 місяців</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">60%</div>
                  <div className="case-result-label">Зниження часу обробки замовлень</div>
                </div>
                <div className="case-result-item">
                  <div className="case-result-number">85%</div>
                  <div className="case-result-label">Автоматизація бізнес-процесів</div>
                </div>
              </div>
            </div>

            <div className="case-sidebar">
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Клієнт</h3>
                <p className="case-sidebar-text">E-commerce компанія</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Термін</h3>
                <p className="case-sidebar-text">12 тижнів</p>
              </div>
              <div className="case-sidebar-card">
                <h3 className="case-sidebar-title">Технології</h3>
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
