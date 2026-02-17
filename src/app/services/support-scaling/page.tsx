import Link from 'next/link'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'

export default function SupportScalingPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[900px]">
            <Link href="/services" className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10 transition-all duration-500 hover:opacity-100 hover:bg-accent/20 no-underline">
              ← Services
            </Link>
            <h1 className="text-[72px] font-semibold leading-[1.1] mb-6 tracking-[-2px] font-manrope">Support & Scaling</h1>
            <p className="text-xl leading-relaxed opacity-80">
              Підтримка, оптимізація, розвиток. Допомагаємо вашому продукту рости разом з бізнесом.
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
                <p>Після запуску продукту важливо продовжувати його розвиток та оптимізацію. Ми надаємо підтримку та допомагаємо масштабувати рішення.</p>
                <p>Наш підхід включає моніторинг продуктивності, регулярні оновлення, оптимізацію та додавання нових функцій на основі даних.</p>
              </div>

              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Типи послуг</h2>
              <div className="flex flex-col gap-8 mb-16">
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Технічна підтримка</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">24/7 моніторинг, виправлення помилок та технічна підтримка.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Оптимізація</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Покращення продуктивності, швидкості та користувацького досвіду.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Масштабування</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Додавання нових функцій та масштабування архітектури під зростання.</p>
                </div>
              </div>

              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Процес роботи</h2>
              <div className="flex flex-col gap-8">
                {[
                  { number: '01', title: 'Аудит та аналіз', text: 'Оцінюємо поточний стан продукту та визначаємо точки росту.' },
                  { number: '02', title: 'Планування розвитку', text: 'Створюємо roadmap розвитку на основі бізнес-цілей та даних.' },
                  { number: '03', title: 'Впровадження змін', text: 'Поступово впроваджуємо покращення та нові функції.' },
                  { number: '04', title: 'Моніторинг та оптимізація', text: 'Постійно моніторимо продуктивність та оптимізуємо рішення.' },
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
                  {['Performance Monitoring', 'CI/CD Pipelines', 'Cloud Infrastructure', 'Database Optimization', 'Security Updates', 'Analytics Integration'].map((tech, index) => (
                    <li key={index} className="text-base text-text-dark opacity-70 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[rgba(14,14,17,0.02)] p-8 rounded-2xl border border-[rgba(14,14,17,0.05)]">
                <h3 className="text-xl font-semibold text-text-dark mb-6 font-manrope">Результати</h3>
                <p className="text-base leading-relaxed text-text-dark opacity-70">
                  Стабільна робота продукту, покращення продуктивності на 30-50% та готовність до масштабування.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

