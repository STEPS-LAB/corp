import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'MVP для стартапів | Швидка розробка — STEPS LAB',
  description: 'Розробка MVP для стартапів: швидкий запуск, перевірка гіпотез. Студія розробки сайтів та веб-додатків за 6-10 тижнів. AI-прискорена веб-розробка.',
}

export default function MVPStartupsPage() {
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-20 md:pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[900px]">
            <Link href="/services" className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10 transition-all duration-500 hover:opacity-100 hover:bg-accent/20 no-underline">
              ← Послуги
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.1] mb-6 tracking-[-2px] font-manrope">MVP для стартапів</h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-80">
              Швидка розробка мінімального продукту. Веб-студія створює MVP для перевірки гіпотез та отримання фідбеку від ринку. За тижні.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-bg-light py-section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-6 md:mb-8 text-text-dark tracking-[-1.5px] font-manrope">Що ми робимо</h2>
              <div className="flex flex-col gap-6 text-base leading-relaxed text-text-dark opacity-70 mb-16">
                <p>MVP — мінімальна версія продукту для швидкої перевірки бізнес-гіпотези. Веб-студія спеціалізується на розробці MVP: сайти та веб-додатки за мінімальний термін.</p>
                <p>Розробка MVP за 6-10 тижнів: фокус на ключових функціях, AI-прискорена веб-розробка, швидке отримання фідбеку від ринку.</p>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-6 md:mb-8 text-text-dark tracking-[-1.5px] font-manrope">Типи проєктів</h2>
              <div className="flex flex-col gap-8 mb-16">
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">SaaS MVP</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Мінімальна версія SaaS-продукту з ключовими функціями для валідації бізнес-моделі.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Мобільні додатки</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">MVP для iOS та Android з фокусом на основній функціональності.</p>
                </div>
                <div className="p-6 rounded-2xl transition-all duration-500 hover:bg-[rgba(14,14,17,0.02)] hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope">Веб-платформи</h3>
                  <p className="text-base leading-relaxed text-text-dark opacity-70">Швидкий запуск веб-платформ для тестування ринку.</p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-6 md:mb-8 text-text-dark tracking-[-1.5px] font-manrope">Процес роботи</h2>
              <div className="flex flex-col gap-8">
                {[
                  { number: '01', title: 'Визначення MVP', text: 'Визначаємо мінімальний набір функцій для перевірки гіпотези.' },
                  { number: '02', title: 'Швидка розробка', text: 'AI-прискорена розробка з фокусом на швидкість та якість.' },
                  { number: '03', title: 'Запуск та тестування', text: 'Запускаємо MVP та збираємо фідбек від перших користувачів.' },
                  { number: '04', title: 'Ітерації', text: 'Швидко ітеруємо на основі отриманих даних та відгуків.' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
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
                  {['Next.js / React', 'Vercel / Netlify', 'Supabase / Firebase', 'Stripe Integration', 'Rapid Prototyping', 'AI Tools'].map((tech, index) => (
                    <li key={index} className="text-base text-text-dark opacity-70 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[rgba(14,14,17,0.02)] p-8 rounded-2xl border border-[rgba(14,14,17,0.05)]">
                <h3 className="text-xl font-semibold text-text-dark mb-6 font-manrope">Результати</h3>
                <p className="text-base leading-relaxed text-text-dark opacity-70">
                  Запуск MVP за 6-10 тижнів з можливістю швидкої валідації бізнес-моделі.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

