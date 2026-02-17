import Link from 'next/link'

export default function ServicesSection() {
  const services = [
    {
      href: '/services/web-development',
      title: 'Web development',
      text: 'Бізнес-сайти, лендинги, корпоративні платформи.',
    },
    {
      href: '/services/ai-automation',
      title: 'AI automation',
      text: 'Форми, CRM-інтеграції, контент-процеси.',
    },
    {
      href: '/services/mvp-startups',
      title: 'MVP for startups',
      text: 'Швидкий запуск і перевірка гіпотез.',
    },
    {
      href: '/services/support-scaling',
      title: 'Support & scaling',
      text: 'Підтримка, оптимізація, розвиток.',
    },
  ]

  return (
    <section className="services-alt" id="services">
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
  )
}
