'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ServiceCMS } from '@/lib/cms-types'
import { pickLang } from '@/lib/cms-types'
import { useLocale } from '@/context/LocaleContext'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'
import { localizePath } from '@/lib/locale-path'
import {
  LEGACY_SERVICE_FEATURES,
  LEGACY_SERVICE_TECH,
  legacyProcessKeys,
  serviceI18nNsFromHref,
} from '@/lib/service-detail-i18n'

type Props = { service: ServiceCMS }

export default function ServiceDetailContent({ service }: Props) {
  const { t, locale } = useLocale()
  const L = locale
  const ns = serviceI18nNsFromHref(service.href)
  const base = ns ? (`servicePages.${ns}` as const) : null
  const p = (k: string) => (base ? t(`${base}.${k}`) : '')

  const title = pickLang(service.title, L).trim() || (ns ? p('title') : '')
  const intro = pickLang(service.description, L).trim() || (ns ? p('intro') : '')
  const longBody = pickLang(service.longDescription, L).trim()
  const whatParas =
    longBody
      ? longBody.split(/\n\n+/).filter(Boolean)
      : ns
        ? [p('whatWeDo_p1'), p('whatWeDo_p2')].filter(Boolean)
        : []

  const benefits = (service.benefits[L] ?? []).map((x) => x.trim()).filter(Boolean)
  const processCms = (service.processSteps[L] ?? []).map((x) => x.trim()).filter(Boolean)

  const featureTitle = ns ? p('projectTypes') : pickLang({ en: 'Highlights', uk: 'Основне' }, L)
  const whatTitle = ns ? p('whatWeDo') : pickLang({ en: 'Overview', uk: 'Огляд' }, L)
  const processTitle = ns ? p('process') : pickLang({ en: 'Process', uk: 'Процес' }, L)
  const techTitle = ns ? p('technologies') : pickLang({ en: 'Technologies', uk: 'Технології' }, L)
  const resultsTitle = ns ? p('results') : pickLang({ en: 'Outcomes', uk: 'Результат' }, L)

  const resultsBody =
    pickLang(service.pricingNote, L).trim() ||
    (ns ? p('resultsText') : '') ||
    pickLang(service.price, L).trim()

  const techLines =
    (service.techStackLines[L] ?? []).map((x) => x.trim()).filter(Boolean).length > 0
      ? (service.techStackLines[L] ?? []).map((x) => x.trim()).filter(Boolean)
      : ns
        ? LEGACY_SERVICE_TECH[ns]
        : []

  const cover = service.coverImageUrl?.trim()
  const gallery = (service.galleryImages ?? []).map((u) => u.trim()).filter(Boolean)

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-bg-dark pb-20 pt-20 text-text-light md:pb-[120px]">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[900px]">
            <Link
              href={localizePath('/services', locale)}
              className="mb-10 inline-block rounded-lg bg-accent/10 px-3 py-1.5 text-sm tracking-wide text-accent opacity-70 transition-all duration-500 hover:bg-accent/20 hover:opacity-100 no-underline"
            >
              ← {t('pages.services.backToServices')}
            </Link>
            {cover ? (
              <div className="relative mb-10 aspect-[21/9] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10">
                <Image src={cover} alt="" fill className="object-cover" sizes="(max-width:900px) 100vw, 900px" />
              </div>
            ) : null}
            <h1 className="mb-6 font-manrope text-4xl font-semibold leading-[1.1] tracking-[-2px] sm:text-5xl md:text-6xl lg:text-[72px]">
              {title}
            </h1>
            {intro ? <p className="text-base leading-relaxed opacity-80 sm:text-lg md:text-xl">{intro}</p> : null}
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-slate-50 py-section-spacing text-slate-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-20">
            <div>
              {whatParas.length > 0 ? (
                <>
                  <h2 className="mb-6 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:mb-8 md:text-4xl lg:text-[48px]">
                    {whatTitle}
                  </h2>
                  <div className="mb-16 flex flex-col gap-6 text-base leading-relaxed text-slate-700">
                    {whatParas.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </>
              ) : null}

              {benefits.length > 0 ? (
                <>
                  <h2 className="mb-6 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:mb-8 md:text-4xl lg:text-[48px]">
                    {featureTitle}
                  </h2>
                  <ul className="mb-16 flex list-none flex-col gap-4">
                    {benefits.map((line, i) => (
                      <li
                        key={i}
                        className="relative border-l-2 border-accent pl-4 text-base leading-relaxed text-slate-700"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </>
              ) : ns ? (
                <>
                  <h2 className="mb-6 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:mb-8 md:text-4xl lg:text-[48px]">
                    {featureTitle}
                  </h2>
                  <div className="mb-16 flex flex-col gap-8">
                    {LEGACY_SERVICE_FEATURES[ns].map((f, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50"
                      >
                        <h3 className="mb-3 font-manrope text-2xl font-semibold text-slate-900">{t(f.titleKey)}</h3>
                        <p className="text-base leading-relaxed text-slate-700">{t(f.descKey)}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              <h2 className="mb-6 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:mb-8 md:text-4xl lg:text-[48px]">
                {processTitle}
              </h2>
              <div className="flex flex-col gap-8">
                {processCms.length > 0
                  ? processCms.map((step, index) => (
                      <div key={index} className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                        <div className="min-w-[60px] rounded-lg bg-accent/10 px-3 py-1.5 text-center text-sm tracking-wide text-accent opacity-70">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-base leading-relaxed text-slate-700">{step}</p>
                      </div>
                    ))
                  : ns
                    ? legacyProcessKeys(ns).map((item, index) => (
                        <div key={index} className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                          <div className="min-w-[60px] rounded-lg bg-accent/10 px-3 py-1.5 text-center text-sm tracking-wide text-accent opacity-70">
                            {item.number}
                          </div>
                          <div>
                            <h3 className="mb-2 font-manrope text-xl font-semibold text-slate-900">
                              {t(item.titleKey)}
                            </h3>
                            <p className="text-base leading-relaxed text-slate-700">{t(item.textKey)}</p>
                          </div>
                        </div>
                      ))
                    : null}
              </div>

              {gallery.length > 0 ? (
                <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gallery.map((url, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-8">
              {pickLang(service.price, L).trim() ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8">
                  <h3 className="mb-2 font-manrope text-xl font-semibold text-slate-900">
                    {pickLang({ en: 'Pricing', uk: 'Вартість' }, L)}
                  </h3>
                  <p className="text-lg font-medium text-slate-800">{pickLang(service.price, L)}</p>
                </div>
              ) : null}
              {techLines.length > 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8">
                  <h3 className="mb-6 font-manrope text-xl font-semibold text-slate-900">{techTitle}</h3>
                  <ul className="flex list-none flex-col gap-3">
                    {techLines.map((tech, index) => (
                      <li
                        key={index}
                        className="relative pl-6 text-base text-slate-700 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:content-['']"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {resultsBody ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8">
                  <h3 className="mb-6 font-manrope text-xl font-semibold text-slate-900">{resultsTitle}</h3>
                  <p className="text-base leading-relaxed text-slate-700">{resultsBody}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
