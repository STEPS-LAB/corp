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

function hasProjectTypeContent(service: ServiceCMS, L: 'en' | 'uk'): boolean {
  return service.projectTypes.some(
    (c) => pickLang(c.title, L).trim() || pickLang(c.description, L).trim()
  )
}

function hasWorkProcessContent(service: ServiceCMS, L: 'en' | 'uk'): boolean {
  return service.workProcess.some(
    (c) => pickLang(c.title, L).trim() || pickLang(c.description, L).trim()
  )
}

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

  const projectTypesTitle = ns ? p('projectTypes') : pickLang({ en: 'Project types', uk: 'Типи проєктів' }, L)
  const workProcessTitle = ns ? p('process') : pickLang({ en: 'Work process', uk: 'Процес роботи' }, L)
  const resultsHeading = ns ? p('results') : pickLang({ en: 'Results', uk: 'Результати' }, L)
  const techTitle = ns ? p('technologies') : pickLang({ en: 'Technologies', uk: 'Технології' }, L)
  const summaryTitle = pickLang({ en: 'Summary', uk: 'Підсумок' }, L)

  const cmsProjectTypes = hasProjectTypeContent(service, L) ? service.projectTypes : []
  const showLegacyCards = cmsProjectTypes.length === 0 && ns
  const cmsSteps = hasWorkProcessContent(service, L) ? service.workProcess : []

  const techLines =
    (service.techStackLines[L] ?? []).map((x) => x.trim()).filter(Boolean).length > 0
      ? (service.techStackLines[L] ?? []).map((x) => x.trim()).filter(Boolean)
      : ns
        ? LEGACY_SERVICE_TECH[ns]
        : []

  const cover = service.coverImageUrl?.trim()
  const gallery = (service.galleryImages ?? []).map((u) => u.trim()).filter(Boolean)

  const pricingNote = pickLang(service.pricingNote, L).trim()
  const legacyResultsParagraph = ns ? p('resultsText') : ''

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

      <section className="bg-[#f5f6f8] py-section-spacing text-slate-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:gap-20">
            <div className="min-w-0">
              {whatParas.length > 0 ? (
                <>
                  <h2 className="mb-8 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:text-4xl lg:text-[48px]">
                    {ns ? p('whatWeDo') : pickLang({ en: 'Overview', uk: 'Огляд' }, L)}
                  </h2>
                  <div className="mb-20 flex flex-col gap-6 text-base leading-relaxed text-slate-600">
                    {whatParas.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </>
              ) : null}

              {cmsProjectTypes.length > 0 ? (
                <>
                  <h2 className="mb-8 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:text-4xl lg:text-[48px]">
                    {projectTypesTitle}
                  </h2>
                  <div className="mb-20 flex flex-col gap-6">
                    {cmsProjectTypes.map((card, i) => {
                      const ct = pickLang(card.title, L).trim()
                      const cd = pickLang(card.description, L).trim()
                      if (!ct && !cd) return null
                      return (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-8"
                        >
                          {ct ? (
                            <h3 className="mb-3 font-manrope text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                              {ct}
                            </h3>
                          ) : null}
                          {cd ? <p className="text-base leading-relaxed text-slate-600">{cd}</p> : null}
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : showLegacyCards ? (
                <>
                  <h2 className="mb-8 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:text-4xl lg:text-[48px]">
                    {projectTypesTitle}
                  </h2>
                  <div className="mb-20 flex flex-col gap-6">
                    {LEGACY_SERVICE_FEATURES[ns].map((f, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-slate-300 md:p-8"
                      >
                        <h3 className="mb-3 font-manrope text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                          {t(f.titleKey)}
                        </h3>
                        <p className="text-base leading-relaxed text-slate-600">{t(f.descKey)}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              <h2 className="mb-10 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:text-4xl lg:text-[48px]">
                {workProcessTitle}
              </h2>
              <div className="mb-20 flex flex-col gap-12">
                {cmsSteps.length > 0
                  ? cmsSteps.map((step, index) => {
                      const st = pickLang(step.title, L).trim()
                      const sd = pickLang(step.description, L).trim()
                      if (!st && !sd) return null
                      return (
                        <div key={index} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                          <div className="flex h-11 min-w-[3.25rem] shrink-0 items-center justify-center rounded-lg bg-sky-100/80 px-3 font-manrope text-sm font-medium tracking-wide text-sky-800">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            {st ? (
                              <h3 className="mb-2 font-manrope text-lg font-semibold text-slate-900 md:text-xl">
                                {st}
                              </h3>
                            ) : null}
                            {sd ? <p className="text-base leading-relaxed text-slate-600">{sd}</p> : null}
                          </div>
                        </div>
                      )
                    })
                  : ns
                    ? legacyProcessKeys(ns).map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                          <div className="flex h-11 min-w-[3.25rem] shrink-0 items-center justify-center rounded-lg bg-sky-100/80 px-3 font-manrope text-sm font-medium tracking-wide text-sky-800">
                            {item.number}
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <h3 className="mb-2 font-manrope text-lg font-semibold text-slate-900 md:text-xl">
                              {t(item.titleKey)}
                            </h3>
                            <p className="text-base leading-relaxed text-slate-600">{t(item.textKey)}</p>
                          </div>
                        </div>
                      ))
                    : null}
              </div>

              {service.resultsMetrics.length > 0 ? (
                <>
                  <h2 className="mb-8 font-manrope text-3xl font-semibold tracking-[-1.5px] text-slate-900 md:text-4xl lg:text-[48px]">
                    {resultsHeading}
                  </h2>
                  <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {service.resultsMetrics.map((m, i) => {
                      const lab = pickLang(m.label, L).trim()
                      if (!lab && !m.value.trim()) return null
                      return (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-200/90 bg-white p-6 text-center shadow-sm md:p-8"
                        >
                          <p className="font-manrope text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                            {m.value.trim() || '—'}
                          </p>
                          {lab ? (
                            <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-slate-500">{lab}</p>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : null}

              {gallery.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gallery.map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-video overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              {pickLang(service.price, L).trim() ? (
                <div className="rounded-xl border border-slate-200/90 bg-white p-8 shadow-sm">
                  <h3 className="mb-2 font-manrope text-lg font-semibold text-slate-900">
                    {pickLang({ en: 'Pricing', uk: 'Вартість' }, L)}
                  </h3>
                  <p className="text-lg font-medium text-slate-800">{pickLang(service.price, L)}</p>
                </div>
              ) : null}
              {techLines.length > 0 ? (
                <div className="rounded-xl border border-slate-200/90 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 font-manrope text-lg font-semibold text-slate-900">{techTitle}</h3>
                  <ul className="flex list-none flex-col gap-3">
                    {techLines.map((tech, index) => (
                      <li
                        key={index}
                        className="relative pl-5 text-base text-slate-600 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500 before:content-['']"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {pricingNote || legacyResultsParagraph ? (
                <div className="rounded-xl border border-slate-200/90 bg-white p-8 shadow-sm">
                  <h3 className="mb-4 font-manrope text-lg font-semibold text-slate-900">{summaryTitle}</h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    {pricingNote || legacyResultsParagraph}
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
