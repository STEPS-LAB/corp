import Link from 'next/link'

export default function ServicesSection() {
  const services = [
    {
      href: '/services/web-development',
      title: 'Розробка сайтів',
      text: 'Веб-розробка сайтів: бізнес-сайти, лендинги, корпоративні платформи. Website development під ваш бізнес.',
    },
    {
      href: '/services/ai-automation',
      title: 'AI development та автоматизація',
      text: 'AI development для бізнесу: форми, CRM-інтеграції, автоматизація контент-процесів.',
    },
    {
      href: '/services/mvp-startups',
      title: 'MVP для стартапів',
      text: 'Швидка розробка мінімального продукту. Site development для перевірки гіпотез на ринку.',
    },
    {
      href: '/services/support-scaling',
      title: 'Підтримка та масштабування',
      text: 'Підтримка сайтів та веб-додатків, оптимізація та розвиток проєктів.',
    },
  ]

  return (
    <section className="services-alt" id="services">
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
  )
}
