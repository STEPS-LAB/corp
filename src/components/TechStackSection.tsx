'use client'

import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { DEFAULT_PAGES_CONTENT, pickLang } from '@/lib/cms-types'

const TECH_LOGOS = [
  { src: '/tech/nextjs.svg', alt: 'Next.js logo', name: 'Next.js' },
  { src: '/tech/react.svg', alt: 'React logo', name: 'React' },
  { src: '/tech/nodejs.svg', alt: 'Node.js logo', name: 'Node.js' },
  { src: '/tech/cursor.svg', alt: 'Cursor logo', name: 'Cursor' },
  { src: '/tech/claude.svg', alt: 'Claude logo', name: 'Claude' },
  { src: '/tech/qwen.svg', alt: 'QWEN logo', name: 'QWEN' },
]

export default function TechStackSection() {
  const { locale } = useLocale()
  const { payload } = useSiteContent()
  const title = pickLang(
    payload.pages.homeTechStack?.title ?? DEFAULT_PAGES_CONTENT.homeTechStack.title,
    locale
  )

  return (
    <section className="tech-stack-section" aria-label={title}>
      <div className="container-custom">
        <h2 className="section-title-alt">{title}</h2>
        <div className="tech-stack-grid">
          {TECH_LOGOS.map((item) => (
            <div key={item.name} className="tech-card">
              <Image src={item.src} alt={item.alt} width={120} height={48} className="tech-logo" />
              <p className="tech-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
