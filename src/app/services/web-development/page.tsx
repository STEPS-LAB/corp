import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'Розробка сайтів | Веб-розробка — STEPS LAB',
  description: 'Веб-розробка та розробка сайтів: бізнес-сайти, лендинги, корпоративні платформи. Website development, site development від веб-студії. AI-прискорена розробка.',
}

export default function WebDevelopmentPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[900px]">
            <Link href="/services" className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10 transition-all duration-500 hover:opacity-100 hover:bg-accent/20 no-underline">
              ← Послуги
            </Link>
            <h1 className="text-[72px] font-semibold leading-[1.1] mb-6 tracking-[-2px] font-manrope">Розробка сайтів та веб-розробка</h1>
            <p className="text-xl leading-relaxed opacity-80">
              Website development для бізнесу: бізнес-сайти, лендинги, корпоративні платформи. Веб-студія створює сайти, що працюють на результат.
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
                <p>Веб-студія STEPS LAB займається розробкою сайтів та веб-додатків, які працюють на ваш бізнес. Кожен проєкт website development починається з аналізу цілей, аудиторії та бізнес-процесів.</p>
                <p>Web development з логікою: ми використовуємо AI для прискорення розробки, але кожне рішення проходить через фільтр бізнес-сенсу. Site development — це не лише код, це результат.</p>
              </div>

              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Типи проєктів</h2>
              <div className="flex flex-col gap-8 mb-16">
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Бізнес-сайти</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Корпоративні сайти з системою управління контентом, інтеграціями та аналітикою.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Лендинги</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Висококонверсійні лендинги для продуктів, послуг та маркетингових кампаній.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Корпоративні платформи</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Складні веб-додатки з багаторівневою архітектурою та інтеграціями.</p>
                </div>
              </div>

              <h2 className="text-[48px] font-semibold mb-8 text-text-dark tracking-[-1.5px] font-manrope">Процес роботи</h2>
              <div className="flex flex-col gap-8">
                {[
                  { number: '01', title: 'Аналіз та планування', text: 'Досліджуємо ваш бізнес, цілі та аудиторію. Визначаємо технічні вимоги та архітектуру рішення.' },
                  { number: '02', title: 'Дизайн та прототипування', text: 'Створюємо структуру та інтерфейс, орієнтований на конверсію та користувацький досвід.' },
                  { number: '03', title: 'Розробка', text: 'AI-прискорена розробка з фокусом на якість коду, продуктивність та масштабованість.' },
                  { number: '04', title: 'Тестування та запуск', text: 'Комплексне тестування, оптимізація та запуск з підтримкою після релізу.' },
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
                  {['React / Next.js', 'Vue.js / Nuxt', 'Node.js', 'TypeScript', 'Headless CMS', 'API Integration'].map((tech, index) => (
                    <li key={index} className="text-base text-text-dark opacity-70 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[rgba(14,14,17,0.02)] p-8 rounded-2xl border border-[rgba(14,14,17,0.05)]">
                <h3 className="text-xl font-semibold text-text-dark mb-6 font-manrope">Результати</h3>
                <p className="text-base leading-relaxed text-text-dark opacity-70">
                  Наші проєкти показують зростання конверсії на 200-400% та покращення SEO-позицій.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

