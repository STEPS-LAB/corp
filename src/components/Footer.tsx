'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { localizePath } from '@/lib/locale-path'

export default function Footer() {
  const { t, locale } = useLocale()
  const { content } = useSiteContent()
  const footerLinksFallback = useMemo(
    () => [
      { href: '/', label: t('nav.home') },
      { href: '/services', label: t('nav.services') },
      { href: '/approach', label: t('nav.approach') },
      { href: '/cases', label: t('nav.cases') },
      { href: '/concepts', label: t('nav.concepts') },
      { href: '/news', label: t('nav.news') },
      { href: '/about', label: t('nav.about') },
      { href: '/contacts', label: t('nav.contact') },
    ],
    [t]
  )

  const hasColumns = content.footerColumns.length > 0

  return (
    <footer className="footer-alt">
      <div className="container-custom">
        <div className={`footer-alt-content ${hasColumns ? 'footer-alt-content--cols' : ''}`}>
          <Link href={localizePath('/', locale)} className="footer-alt-logo" aria-label="STEPS LAB homepage">
            <img src={content.images.logo || '/steps-lab_logo-w.webp'} alt="STEPS LAB logo" width={120} height={24} className="object-contain" />
          </Link>
          {hasColumns ? (
            <div className="footer-alt-columns">
              {content.footerColumns.map((col, ci) => (
                <div key={ci} className="footer-alt-col">
                  <div className="footer-alt-col-title">{col.title}</div>
                  <div className="footer-alt-col-links">
                    {col.links.map((link) => (
                      <Link
                        key={`${ci}-${link.href}-${link.label}`}
                        href={localizePath(link.href, locale)}
                        className="footer-alt-link"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {footerLinksFallback.map((link) => (
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
          )}
          <div className="footer-alt-info">
            <a href={`mailto:${content.footer.contactEmail}`} className="footer-alt-link">{content.footer.contactEmail}</a>
            <a href={`tel:${content.footer.phone}`} className="footer-alt-link">{content.footer.phone}</a>
            <div className="footer-alt-social">
              <a href={content.footer.socialLinks.linkedin} className="footer-alt-link">LinkedIn</a>
              <a href={content.footer.socialLinks.github} className="footer-alt-link">GitHub</a>
              <a href={content.footer.socialLinks.x} className="footer-alt-link">X</a>
            </div>
          </div>
          <div className="footer-alt-copyright">
            {content.footer.copyrightText || t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </div>
    </footer>
  )
}

