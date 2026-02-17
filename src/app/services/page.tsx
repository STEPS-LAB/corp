import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function ServicesPage() {
  const services = [
    {
      href: '/services/web-development',
      title: 'Web development',
      text: 'Бізнес-сайти, лендинги, корпоративні платформи. Створюємо веб-рішення, які працюють на результат, а не просто виглядають красиво.',
    },
    {
      href: '/services/ai-automation',
      title: 'AI Automation',
      text: 'Форми, CRM-інтеграції, контент-процеси. Автоматизуємо рутинні завдання, щоб ви могли зосередитись на стратегії.',
    },
    {
      href: '/services/mvp-startups',
      title: 'MVP for Startups',
      text: 'Швидкий запуск і перевірка гіпотез. Створюємо мінімальний продукт, який дозволяє швидко отримати фідбек від ринку.',
    },
    {
      href: '/services/support-scaling',
      title: 'Support & Scaling',
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
              <span className="hero-alt-title-line">Послуги</span>
              <span className="hero-alt-title-line">для вашого бізнесу</span>
            </h1>
            <p className="hero-alt-description">
              Створюємо цифрові рішення, які працюють на результат.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="services-alt">
        <div className="container-custom">
          <h2 className="section-title-alt">Services</h2>
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

