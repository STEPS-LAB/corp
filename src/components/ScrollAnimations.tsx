'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Skip animations on internal service and case pages
    const isInternalPage = pathname?.startsWith('/services/') || pathname?.startsWith('/cases/')
    if (isInternalPage) {
      return
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          target.style.opacity = '1'
          target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Observe sections and text elements for fade-in effect
    const selectors = [
      '.approach-alt-item',
      '.service-alt-item',
      '.case-alt-item',
      '.why-steps-lab-alt-item',
      '.cases-alt-item',
      '.about-alt-content',
      '.section-title-alt',
      '.section-subtitle',
      '.trust-strip-alt',
      '.final-cta-alt-content',
      '.contact-simple-wrapper',
      '.contact-simple-info',
      '.contact-simple-form'
    ]

    const elements = document.querySelectorAll(selectors.join(', '))
    
    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateY(20px)'
      htmlEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      // Add slight delay for staggered effect
      htmlEl.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`
      observerRef.current?.observe(el)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [pathname])

  return null
}

