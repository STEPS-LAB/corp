'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { localizePath } from '@/lib/locale-path'

export default function Footer() {
  const { t, locale } = useLocale()
  const footerLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/approach', label: t('nav.approach') },
    { href: '/cases', label: t('nav.cases') },
    { href: '/concepts', label: t('nav.concepts') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/contacts', label: t('nav.contact') },
  ]

  return (
    <footer className="footer-alt">
      <div className="container-custom">
        <div className="footer-alt-content">
          <div className="footer-alt-logo">STEPS LAB</div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={localizePath(link.href, locale)}
                aria-label={`${link.label} - AI-supported development and Next.js performance`}
                className="footer-alt-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="footer-alt-info">
            <a href="mailto:stepslab.contact@gmail.com" className="footer-alt-link">stepslab.contact@gmail.com</a>
            <div className="footer-alt-social">
              <a href="https://linkedin.com/company/stepslab" className="footer-alt-link">LinkedIn</a>
              <a href="#" className="footer-alt-link">GitHub</a>
            </div>
          </div>
          <div className="footer-alt-copyright">{t('footer.copyright', { year: new Date().getFullYear() })}</div>
        </div>
      </div>
    </footer>
  )
}

