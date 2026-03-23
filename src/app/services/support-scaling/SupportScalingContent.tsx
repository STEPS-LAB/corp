'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'
import { localizePath } from '@/lib/locale-path'

const processKeys = [
  { number: '01', titleKey: 'servicePages.supportScaling.process_1_title', textKey: 'servicePages.supportScaling.process_1_text' },
  { number: '02', titleKey: 'servicePages.supportScaling.process_2_title', textKey: 'servicePages.supportScaling.process_2_text' },
  { number: '03', titleKey: 'servicePages.supportScaling.process_3_title', textKey: 'servicePages.supportScaling.process_3_text' },
  { number: '04', titleKey: 'servicePages.supportScaling.process_4_title', textKey: 'servicePages.supportScaling.process_4_text' },
] as const

const TECH_LIST = ['Monitoring', 'CI/CD', 'Cloud', 'Analytics', 'Security', 'Performance']

export default function SupportScalingContent() {
  const { t, locale } = useLocale()
  const p = (k: string) => t(`servicePages.supportScaling.${k}`)
  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-20 md:pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[900px]">
            <Link href={localizePath('/services', locale)} aria-label="Back to AI-supported development services" className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10 transition-all duration-500 hover:opacity-100 hover:bg-accent/20 no-underline">
              ← {t('pages.services.backToServices')}
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.1] mb-6 tracking-[-2px] font-manrope">{p('title')}</h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-80">{p('intro')}</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-slate-50 text-slate-900 py-section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-6 md:mb-8 text-slate-900 tracking-[-1.5px] font-manrope">{p('whatWeDo')}</h2>
              <div className="flex flex-col gap-6 text-base leading-relaxed text-slate-700 mb-16">
                <p>{p('whatWeDo_p1')}</p>
                <p>{p('whatWeDo_p2')}</p>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-6 md:mb-8 text-slate-900 tracking-[-1.5px] font-manrope">{p('projectTypes')}</h2>
              <div className="flex flex-col gap-8 mb-16">
                <div className="p-6 rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:bg-slate-50 hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 font-manrope">{p('techSupport')}</h3>
                  <p className="text-base leading-relaxed text-slate-700">{p('techSupport_desc')}</p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:bg-slate-50 hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 font-manrope">{p('optimization')}</h3>
                  <p className="text-base leading-relaxed text-slate-700">{p('optimization_desc')}</p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:bg-slate-50 hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 font-manrope">{p('scaling')}</h3>
                  <p className="text-base leading-relaxed text-slate-700">{p('scaling_desc')}</p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-6 md:mb-8 text-slate-900 tracking-[-1.5px] font-manrope">{p('process')}</h2>
              <div className="flex flex-col gap-8">
                {processKeys.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                    <div className="text-sm tracking-wide text-accent min-w-[60px] opacity-70 px-3 py-1.5 rounded-lg bg-accent/10 text-center">{item.number}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2 font-manrope">{t(item.titleKey)}</h3>
                      <p className="text-base leading-relaxed text-slate-700">{t(item.textKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 font-manrope">{p('technologies')}</h3>
                <ul className="flex flex-col gap-3 list-none">
                  {TECH_LIST.map((tech, index) => (
                    <li key={index} className="text-base text-slate-700 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 font-manrope">{p('results')}</h3>
                <p className="text-base leading-relaxed text-slate-700">{p('resultsText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
