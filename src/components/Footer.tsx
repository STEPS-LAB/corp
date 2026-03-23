'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { localizePath } from '@/lib/locale-path'

export default function Footer() {
  const { t, locale } = useLocale()
  return (
    <footer className="footer-alt">
      <div className="container-custom">
        <div className="footer-alt-content">
          <div className="footer-alt-logo">STEPS LAB</div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href={localizePath('/services', locale)} aria-label="Services for AI-supported development" className="footer-alt-link">{t('nav.services')}</Link>
            <Link href={localizePath('/cases', locale)} aria-label="Cases with Next.js performance results" className="footer-alt-link">{t('nav.cases')}</Link>
            <Link href={localizePath('/blog', locale)} aria-label="Blog about AI-supported development" className="footer-alt-link">{t('nav.blog')}</Link>
            <Link href={localizePath('/contacts', locale)} aria-label="Contact STEPS LAB for Next.js performance projects" className="footer-alt-link">{t('nav.contact')}</Link>
          </div>
          <div className="footer-alt-info">
            <a href="mailto:stepslab.contact@gmail.com" className="footer-alt-link">stepslab.contact@gmail.com</a>
            <div className="footer-alt-social">
              <a href="#" className="footer-alt-link">LinkedIn</a>
              <a href="#" className="footer-alt-link">GitHub</a>
            </div>
          </div>
          <div className="footer-alt-copyright">{t('footer.copyright', { year: new Date().getFullYear() })}</div>
        </div>
      </div>
    </footer>
  )
}

