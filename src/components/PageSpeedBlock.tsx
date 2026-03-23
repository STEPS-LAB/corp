'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '@/context/LocaleContext'

const METRICS = [
  { labelEn: 'Performance', labelUk: 'Продуктивність', score: 95 },
  { labelEn: 'Accessibility', labelUk: 'Доступність', score: 100 },
  { labelEn: 'Best Practices', labelUk: 'Практики', score: 100 },
  { labelEn: 'SEO', labelUk: 'SEO', score: 100 },
]

type MetricCircleProps = {
  score: number
  delayMs: number
  start: boolean
  label: string
}

function MetricCircle({ score, delayMs, start, label }: MetricCircleProps) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame = 0
    let startTime = 0
    const duration = 1800

    const run = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(score * eased))
      if (progress < 1) frame = requestAnimationFrame(run)
    }

    const timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(run)
    }, delayMs)

    return () => {
      window.clearTimeout(timeout)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [delayMs, score, start])

  const dashOffset = useMemo(() => circumference * (1 - value / 100), [circumference, value])

  return (
    <div className="pagespeed-item" style={{ transitionDelay: `${delayMs}ms` }}>
      <div className="pagespeed-circle-wrap">
        <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
          <circle cx="44" cy="44" r={radius} className="pagespeed-circle-bg" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            className="pagespeed-circle-progress"
            style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset }}
          />
        </svg>
        <span className="pagespeed-circle-text">{value}</span>
      </div>
      <p className="pagespeed-label">{label}</p>
    </div>
  )
}

export default function PageSpeedBlock() {
  const { locale } = useLocale()
  const isUk = locale === 'uk'
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`pagespeed-block ${isVisible ? 'is-visible' : ''}`}
      aria-label={isUk ? 'Метрики PageSpeed' : 'PageSpeed metrics'}
    >
      <div className="container-custom">
        <div className="pagespeed-head">
          <h2 className="section-title-alt">PageSpeed Metrics</h2>
          <p className="pagespeed-tagline">
            {isUk ? "Для нас це не 'вау'. Це — база." : "This isn't 'wow' for us. This is the baseline."}
          </p>
        </div>
        <div className="pagespeed-groups">
          <div className="pagespeed-group pagespeed-group-mobile">
            <h3 className="pagespeed-group-title">Mobile</h3>
            <div className="pagespeed-grid">
              {METRICS.map((metric, index) => (
                <MetricCircle
                  key={`m-${metric.labelEn}`}
                  score={metric.score}
                  delayMs={index * 250}
                  start={isVisible}
                  label={isUk ? metric.labelUk : metric.labelEn}
                />
              ))}
            </div>
          </div>
          <div className="pagespeed-group pagespeed-group-desktop">
            <h3 className="pagespeed-group-title">Desktop</h3>
            <div className="pagespeed-grid">
              {METRICS.map((metric, index) => (
                <MetricCircle
                  key={`d-${metric.labelEn}`}
                  score={metric.score}
                  delayMs={1000 + index * 250}
                  start={isVisible}
                  label={isUk ? metric.labelUk : metric.labelEn}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
