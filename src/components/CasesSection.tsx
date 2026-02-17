import Link from 'next/link'

export default function CasesSection() {
  const cases = [
    {
      href: '/cases/ecommerce',
      title: 'E-commerce платформа',
      description: 'Веб-розробка повнофункціонального сайту для онлайн-продажів: інтеграція платежів, система управління складом, готовність до масштабування.',
      result: 'Результат: збільшення онлайн-продажів на 340% за 6 місяців, зниження часу обробки на 60%.',
    },
    {
      href: '/cases/saas',
      title: 'SaaS MVP',
      description: 'AI-розробка для стартапу: мінімальний продукт з автоматизацією бізнес-процесів та AI-аналітикою. За 8 тижнів.',
      result: 'Результат: запуск за 8 тижнів, 100+ платних користувачів за місяць, валідація бізнес-моделі.',
    },
    {
      href: '/cases/corporate',
      title: 'Корпоративний сайт',
      description: 'Розробка корпоративного сайту: веб-студія створила сайт з CMS та CRM-інтеграцією для автоматизації лідогенерації. Оптимізація під SEO.',
      result: 'Результат: конверсія +250%, заявки +180%, покращення SEO-позицій.',
    },
  ]

  return (
    <section className="cases-alt" id="cases">
      <div className="container-custom">
        <h2 className="section-title-alt">Кейси розробки сайтів</h2>
      </div>
      <div className="cases-alt-list">
        {cases.map((caseItem, index) => (
          <Link
            key={index}
            href={caseItem.href}
            className="case-alt-item"
          >
            <div className="case-alt-preview"></div>
            <div className="case-alt-content">
              <h3 className="case-alt-title">{caseItem.title}</h3>
              <p className="case-alt-description">{caseItem.description}</p>
              <p className="case-alt-result">{caseItem.result}</p>
              <span className="case-alt-link">Переглянути кейс →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
