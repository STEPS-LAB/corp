import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export const metadata: Metadata = {
  title: 'Послуги веб-студії | Розробка сайтів, AI development — STEPS LAB',
  description: 'Послуги студії: веб-розробка сайтів, AI development, MVP для стартапів, підтримка та масштабування. Website development для бізнесу.',
}

export default function ServicesPage() {
  const services = [
    {
      href: '/services/web-development',
      title: 'Розробка сайтів',
      text: 'Веб-розробка: бізнес-сайти, лендинги, корпоративні платформи. Website development, що працює на результат.',
    },
    {
      href: '/services/ai-automation',
      title: 'AI development та автоматизація',
      text: 'Форми, CRM-інтеграції, контент-процеси. Автоматизуємо рутинні завдання, щоб ви могли зосередитись на стратегії.',
    },
    {
      href: '/services/mvp-startups',
      title: 'MVP для стартапів',
      text: 'Швидкий запуск і перевірка гіпотез. Створюємо мінімальний продукт, який дозволяє швидко отримати фідбек від ринку.',
    },
    {
      href: '/services/support-scaling',
      title: 'Підтримка та масштабування',
      text: 'Підтримка, оптимізація, розвиток. Допомагаємо вашому продукту рости разом з бізнесом.',
    },
  ]

  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              Services
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">Послуги веб-студії</span>
              <span className="hero-alt-title-line">для вашого бізнесу</span>
            </h1>
            <p className="hero-alt-description">
              Розробка сайтів, веб-розробка, AI development. Website development, що працює на результат.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="services-alt">
        <div className="container-custom">
          <h2 className="section-title-alt">Послуги веб-студії</h2>
          <div className="services-alt-list">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="service-alt-item"
              >
                <div className="service-alt-header">
                  <h3 className="service-alt-title">{service.title}</h3>
                  <span className="service-alt-arrow">→</span>
                </div>
                <p className="service-alt-text">{service.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

