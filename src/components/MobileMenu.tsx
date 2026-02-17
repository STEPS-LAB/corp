'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModal } from '@/hooks/useModal'
import { useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const { openModal } = useModal()

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

  const navLinks = [
    { href: '/', label: 'Головна' },
    { href: '/services', label: 'Послуги' },
    { href: '/approach', label: 'Підхід' },
    { href: '/cases', label: 'Кейси' },
    { href: '/about', label: 'Про нас' },
    { href: '/contact', label: 'Контакти' },
  ]

  const handleLinkClick = () => {
    onClose()
  }

  const handleModalClick = () => {
    openModal()
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
            href={link.href}
            onClick={handleLinkClick}
            className="text-2xl text-text-light no-underline py-4 border-b border-white/10 transition-all duration-500 font-manrope font-medium hover:opacity-80 pl-4"
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleModalClick}
          className="mt-8 w-full px-7 py-4.5 text-base font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
        >
          Отримати консультацію
        </button>
      </nav>
    </div>
  )
}

