import Link from 'next/link'

export default function CasesSection() {
  const cases = [
    {
      href: '/cases/ecommerce',
      title: 'E-commerce Platform',
      description: 'Що зробили: Розробили повнофункціональну платформу для онлайн-продажів з інтеграцією платежних систем та системи управління складом.',
      result: 'Результат: Збільшення онлайн-продажів на 340% за перші 6 місяців, зниження часу обробки замовлень на 60%.',
    },
    {
      href: '/cases/saas',
      title: 'SaaS MVP',
      description: 'Що зробили: Створили мінімальний продукт для стартапу з автоматизацією бізнес-процесів та AI-інтеграцією для аналітики.',
      result: 'Результат: Запуск за 8 тижнів, перші 100 платних користувачів за місяць, валідація бізнес-моделі.',
    },
    {
      href: '/cases/corporate',
      title: 'Corporate Website',
      description: 'Що зробили: Розробили корпоративний сайт з системою управління контентом та інтеграцією з CRM для автоматизації лідогенерації.',
      result: 'Результат: Збільшення конверсії на 250%, зростання кількості заявок на 180%, покращення SEO-позицій.',
    },
  ]

  return (
    <section className="cases-alt" id="cases">
      <div className="container-custom">
        <h2 className="section-title-alt">Selected cases</h2>
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
              <span className="case-alt-link">View case →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
