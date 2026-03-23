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

export default function TechStack() {
  const { locale } = useLocale()

  return (
    <section className="tech-stack-section" aria-label={locale === 'uk' ? 'Наш стек' : 'Technologies We Use'}>
      <div className="container-custom">
        <h2 className="section-title-alt">{locale === 'uk' ? 'Наш стек' : 'Technologies We Use'}</h2>
        <div className="tech-stack-grid">
          {TECH_LOGOS.map((item) => (
            <div key={item.name} className="tech-item" style={{ ['--tech-color' as string]: item.color }}>
              <Image
                src={item.src}
                alt={item.alt}
                width={120}
                height={48}
                className={`tech-logo ${item.invertOnDark ? 'tech-logo-invert' : ''}`}
              />
              <p className="tech-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
