'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import MobileMenu from './MobileMenu'

export default function Header() {
  const pathname = usePathname()
  const { openModal } = useModal()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Головна' },
    { href: '/services', label: 'Послуги' },
    { href: '/approach', label: 'Підхід' },
    { href: '/cases', label: 'Кейси' },
    { href: '/about', label: 'Про нас' },
    { href: '/contact', label: 'Контакти' },
  ]

  const isServiceOrCasePage = pathname?.startsWith('/services/') || pathname?.startsWith('/cases/')
  
  return (
    <>
      <header className={`header ${isScrolled || pathname !== '/' || isServiceOrCasePage ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              STEPS LAB
            </Link>
            <nav className="nav hidden md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={openModal}
              className="btn-consultation hidden md:inline-block px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
            >
              Консультація
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2 z-[1001] w-8 h-8 justify-center items-center relative"
              aria-label="Toggle menu"
            >
              <span className={`absolute w-6 h-0.5 bg-text-light transition-all duration-500 rounded-sm left-1/2 -translate-x-1/2 ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-2'}`} />
              <span className={`absolute w-6 h-0.5 bg-text-light transition-all duration-500 rounded-sm left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute w-6 h-0.5 bg-text-light transition-all duration-500 rounded-sm left-1/2 -translate-x-1/2 ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-2'}`} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}

