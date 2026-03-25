'use client'

import Link from 'next/link'
import { useModal } from '@/hooks/useModal'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import { useEffect, useMemo } from 'react'
import { localizePath } from '@/lib/locale-path'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openModal } = useModal()
  const { t, locale } = useLocale()
  const { content } = useSiteContent()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const fallbackNav = useMemo(
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

  const navLinks =
    content.headerNav.length > 0
      ? content.headerNav.map((l) => ({ href: l.href, label: l.label }))
      : fallbackNav

  const ctaLabel = content.headerCtaText?.trim() || t('hero.cta')
  const ctaPath =
    (content.headerCtaHref || '/contacts').replace(/^\/(en|uk)(?=\/|$)/, '') || '/contacts'
  const openConsultationModal = ctaPath === '/contacts' || ctaPath === '/contact'

  const handleLinkClick = () => {
    onClose()
  }

  const handleCtaClick = () => {
    if (openConsultationModal) openModal()
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 bg-bg-dark z-[999] transform transition-transform duration-500 ease-in-out overflow-y-auto pt-20 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <nav className="flex flex-col gap-2 px-gutter py-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={localizePath(link.href, locale)}
            onClick={handleLinkClick}
            aria-label={`${link.label} - AI-supported development and Next.js performance`}
            className="text-2xl text-text-light no-underline py-4 border-b border-white/10 transition-transform duration-150 font-manrope font-medium active:scale-[0.98] [@media(hover:hover)]:hover:opacity-80 pl-4"
          >
            {link.label}
          </Link>
        ))}
        {openConsultationModal ? (
          <button
            type="button"
            onClick={handleCtaClick}
            className="btn-consultation mt-10 w-full px-8 py-5 text-lg font-medium rounded-2xl transition-transform duration-150 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] active:scale-[0.98] [@media(hover:hover)]:hover:bg-[#2d4ae6] [@media(hover:hover)]:hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] [@media(hover:hover)]:hover:-translate-y-0.5"
          >
            {ctaLabel}
          </button>
        ) : (
          <Link
            href={localizePath(ctaPath.startsWith('/') ? ctaPath : `/${ctaPath}`, locale)}
            onClick={handleLinkClick}
            className="btn-consultation mt-10 flex w-full items-center justify-center px-8 py-5 text-lg font-medium rounded-2xl transition-transform duration-150 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] active:scale-[0.98] [@media(hover:hover)]:hover:bg-[#2d4ae6] [@media(hover:hover)]:hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] [@media(hover:hover)]:hover:-translate-y-0.5 no-underline"
          >
            {ctaLabel}
          </Link>
        )}
      </nav>
    </div>
  )
}

