export default function ApproachSection() {
  const approaches = [
    {
      number: '01',
      title: 'Логіка перед усім',
      text: 'Кожне рішення в розробці сайту має бізнес-обґрунтування, а не лише гарний дизайн.',
    },
    {
      number: '02',
      title: 'AI development під контролем',
      text: 'Використовуємо AI для прискорення веб-розробки, але фінальні рішення завжди за командою.',
    },
    {
      number: '03',
      title: 'Орієнтація на результат',
      text: 'Website development — це створення інструменту для зростання бізнесу, а не просто сторінки в інтернеті.',
    },
  ]

  return (
    <section className="approach-alt" id="approach">
      <div className="container-custom">
        <div className="approach-alt-header">
          <h2 className="section-title-alt">Наш підхід до веб-розробки</h2>
          <p className="section-subtitle">Студія розробки, яка будує системи та сайти, що працюють</p>
        </div>
        <div className="approach-alt-grid">
          {approaches.map((approach, index) => (
            <div key={index} className="approach-alt-item">
              <div className="approach-alt-number">{approach.number}</div>
              <h3 className="approach-alt-title">{approach.title}</h3>
              <p className="approach-alt-text">{approach.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
