export default function WhyStepsLabSection() {
  const items = [
    { label: '01', text: 'Передбачувані результати розробки' },
    { label: '02', text: 'Зрозуміла комунікація зі студією' },
    { label: '03', text: 'Без хайпу — лише логіка в development' },
    { label: '04', text: 'AI development без хаосу' },
  ]

  return (
    <section className="why-steps-lab-alt">
      <div className="why-steps-lab-alt-bg">
        <div className="why-steps-lab-alt-gradient why-steps-lab-alt-gradient-1"></div>
        <div className="why-steps-lab-alt-gradient why-steps-lab-alt-gradient-2"></div>
        <div className="why-steps-lab-alt-circle why-steps-lab-alt-circle-1"></div>
        <div className="why-steps-lab-alt-circle why-steps-lab-alt-circle-2"></div>
        <div className="why-steps-lab-alt-dot why-steps-lab-alt-dot-1"></div>
        <div className="why-steps-lab-alt-dot why-steps-lab-alt-dot-2"></div>
        <div className="why-steps-lab-alt-dot why-steps-lab-alt-dot-3"></div>
        <div className="why-steps-lab-alt-grid-pattern"></div>
      </div>
      <div className="container-custom">
        <h2 className="section-title-alt">Чому веб-студія STEPS LAB</h2>
        <div className="why-steps-lab-alt-content">
          <div className="why-steps-lab-alt-list">
            {items.map((item, index) => (
              <div key={index} className="why-steps-lab-alt-item">
                <div className="why-steps-lab-alt-label">{item.label}</div>
                <div className="why-steps-lab-alt-text">{item.text}</div>
              </div>
            ))}
          </div>
          <div className="why-steps-lab-alt-quote">
            <p>Ми не продаємо тренди.<br />Студія розробки, яка будує сайти та системи, що працюють.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
