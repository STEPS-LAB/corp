'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'
import { localizePath } from '@/lib/locale-path'
import MobileMenu from './MobileMenu'
import LanguageSelect from './LanguageSelect'

export default function Header() {
  const pathname = usePathname()
  const { openModal } = useModal()
  const { t, locale } = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathWithoutLocale = (pathname || '/').replace(/^\/(en|uk)(?=\/|$)/, '') || '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/cases', label: t('nav.cases') },
    { href: '/concepts', label: t('nav.concepts') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/contacts', label: t('nav.contact') },
  ]

  const isServiceOrCasePage = pathWithoutLocale.startsWith('/services/') || pathWithoutLocale.startsWith('/cases/')
  
  return (
    <>
      <header className={`header ${isScrolled || pathWithoutLocale !== '/' || isServiceOrCasePage ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <Link href={localizePath('/', locale)} className="logo" aria-label="STEPS LAB AI-supported development homepage">
              <img src="/steps-lab_logo-w.webp" alt="STEPS LAB logo" width={112} height={22} className="object-contain" />
            </Link>
            <nav className="nav hidden md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizePath(link.href, locale)}
                  aria-label={`${link.label} - AI-supported development and Next.js performance`}
                  className={`nav-link ${pathWithoutLocale === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-4">
              <LanguageSelect />
              <button
                onClick={openModal}
                className="btn-consultation px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
              >
                {t('header.consultation')}
              </button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelect />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2 z-[1001] w-8 h-8 justify-center items-center relative"
              aria-label="Toggle menu"
            >
              <span className={`absolute w-6 h-0.5 bg-text-light transition-all duration-500 rounded-sm left-1/2 -translate-x-1/2 ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-2'}`} />
              <span className={`absolute w-6 h-0.5 bg-text-light transition-all duration-500 rounded-sm left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute w-6 h-0.5 bg-text-light transition-all duration-500 rounded-sm left-1/2 -translate-x-1/2 ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-2'}`} />
            </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}

