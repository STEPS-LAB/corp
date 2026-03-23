'use client'

import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'

const TECH_LOGOS = [
  { src: '/tech/nextjs.svg', alt: 'Next.js logo', name: 'Next.js', color: '#F5F6F8', invertOnDark: true },
  { src: '/tech/react.svg', alt: 'React logo', name: 'React', color: '#61DAFB' },
  { src: '/tech/nodejs.svg', alt: 'Node.js logo', name: 'Node.js', color: '#8CC84B' },
  { src: '/tech/cursor.svg', alt: 'Cursor logo', name: 'Cursor', color: '#F5F6F8', invertOnDark: true },
  { src: '/tech/claude.svg', alt: 'Claude logo', name: 'Claude', color: '#F5F6F8' },
  { src: '/tech/qwen.svg', alt: 'QWEN logo', name: 'QWEN', color: '#F5F6F8' },
]

export default function TechStack({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { locale } = useLocale()
  const isLight = variant === 'light'

  return (
    <section
      className={isLight ? 'bg-slate-50 text-slate-900 py-14 md:py-20' : 'tech-stack-section'}
      aria-label={locale === 'uk' ? 'Наш стек' : 'Technologies We Use'}
    >
      <div className="container-custom">
        <h2 className={isLight ? 'section-title-alt text-slate-900 mb-10' : 'section-title-alt'}>
          {locale === 'uk' ? 'Наш стек' : 'Technologies We Use'}
        </h2>
        <div className={isLight ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6' : 'tech-stack-grid'}>
          {TECH_LOGOS.map((item) => (
            <div
              key={item.name}
              className={
                isLight
                  ? 'rounded-xl border border-slate-800/10 bg-slate-900 p-4 md:p-5 flex flex-col items-center gap-3'
                  : 'tech-item'
              }
              style={{ ['--tech-color' as string]: item.color }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={120}
                height={48}
                className={
                  isLight
                    ? `w-full max-w-[120px] h-auto ${item.invertOnDark ? '[filter:brightness(0)_invert(1)] opacity-95' : 'grayscale opacity-85'}`
                    : `tech-logo ${item.invertOnDark ? 'tech-logo-invert' : ''}`
                }
              />
              <p className={isLight ? 'text-xs md:text-sm text-slate-200/85 font-inter' : 'tech-name'}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
