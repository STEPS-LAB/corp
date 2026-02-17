export default function WhyStepsLabSection() {
  const items = [
    { label: '01', text: 'Predictable results' },
    { label: '02', text: 'Clear communication' },
    { label: '03', text: 'No hype, only logic' },
    { label: '04', text: 'AI without chaos' },
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
        <h2 className="section-title-alt">Why STEPS LAB</h2>
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
            <p>Ми не продаємо тренди.<br />Ми будуємо системи, які працюють.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
