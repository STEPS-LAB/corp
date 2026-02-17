import Link from 'next/link'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'

export default function AIAutomationPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[900px]">
            <Link href="/services" className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10 transition-all duration-500 hover:opacity-100 hover:bg-accent/20 no-underline">
              ← Services
            </Link>
            <h1 className="text-[72px] font-semibold leading-[1.1] mb-6 tracking-[-2px] font-manrope">AI Automation</h1>
            <p className="text-xl leading-relaxed opacity-80">
              Форми, CRM-інтеграції, контент-процеси. Автоматизуємо рутинні завдання, щоб ви могли зосередитись на стратегії.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-bg-light py-section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-[1fr_400px] gap-20">
            <div>
              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Що ми робимо</h2>
              <div className="flex flex-col gap-6 text-base leading-relaxed text-text-dark opacity-70 mb-16">
                <p>Автоматизація бізнес-процесів за допомогою AI та сучасних інструментів. Ми інтегруємо розумні рішення, які економлять час та ресурси.</p>
                <p>Наш підхід до AI — контрольований та прозорий. Ми використовуємо технології як інструмент, а не як чорну скриньку.</p>
              </div>

              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Типи проєктів</h2>
              <div className="flex flex-col gap-8 mb-16">
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">CRM-інтеграції</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Автоматизація обробки заявок, лідогенерації та комунікацій з клієнтами.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Контент-процеси</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">AI-асистоване створення та обробка контенту з контролем якості.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Форми та обробка даних</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Розумні форми з автоматичною валідацією та обробкою даних.</p>
                </div>
              </div>

              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Процес роботи</h2>
              <div className="flex flex-col gap-8">
                {[
                  { number: '01', title: 'Аналіз процесів', text: 'Виявляємо рутинні завдання та можливості для автоматизації.' },
                  { number: '02', title: 'Проектування рішення', text: 'Розробляємо архітектуру автоматизації з урахуванням бізнес-логіки.' },
                  { number: '03', title: 'Інтеграція та налаштування', text: 'Впроваджуємо AI-інструменти та налаштовуємо процеси.' },
                  { number: '04', title: 'Тестування та оптимізація', text: 'Перевіряємо роботу системи та оптимізуємо для максимальної ефективності.' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="text-sm tracking-wide text-accent min-w-[60px] opacity-70 px-3 py-1.5 rounded-lg bg-accent/10 text-center">
                      {item.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-dark mb-2 font-manrope">{item.title}</h3>
                      <p className="text-base leading-relaxed text-text-dark opacity-70">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-[rgba(14,14,17,0.02)] p-8 rounded-2xl border border-[rgba(14,14,17,0.05)]">
                <h3 className="text-xl font-semibold text-text-dark mb-6 font-manrope">Технології</h3>
                <ul className="flex flex-col gap-3 list-none">
                  {['OpenAI API', 'LangChain', 'Zapier / Make', 'Custom Integrations', 'Webhooks', 'Data Processing'].map((tech, index) => (
                    <li key={index} className="text-base text-text-dark opacity-70 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[rgba(14,14,17,0.02)] p-8 rounded-2xl border border-[rgba(14,14,17,0.05)]">
                <h3 className="text-xl font-semibold text-text-dark mb-6 font-manrope">Результати</h3>
                <p className="text-base leading-relaxed text-text-dark opacity-70">
                  Економія часу на 60-80% завдяки автоматизації рутинних процесів.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

