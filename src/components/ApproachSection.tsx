export default function ApproachSection() {
  const approaches = [
    {
      number: '01',
      title: 'Logic first',
      text: 'Кожне рішення має бізнес-обґрунтування, а не лише дизайн.',
    },
    {
      number: '02',
      title: 'AI as a tool',
      text: 'Ми використовуємо AI для швидкості, але контроль залишаємо за людьми.',
    },
    {
      number: '03',
      title: 'Result focused',
      text: 'Сайт — це інструмент для зростання, а не просто сторінка в інтернеті.',
    },
  ]

  return (
    <section className="approach-alt" id="approach">
      <div className="container-custom">
        <div className="approach-alt-header">
          <h2 className="section-title-alt">Our approach</h2>
          <p className="section-subtitle">Ми будуємо системи, які працюють</p>
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
