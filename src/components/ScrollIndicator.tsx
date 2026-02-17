'use client'

import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let hasScrolled = false

    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setIsHidden(true)
        hasScrolled = true
      } else if (hasScrolled && window.scrollY <= 100) {
        setIsHidden(false)
        hasScrolled = false
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 opacity-70 transition-opacity duration-500 pointer-events-none ${isHidden ? 'opacity-0 invisible' : ''}`}>
      <div className="w-6 h-10 border-2 border-white/40 rounded-xl relative flex justify-center pt-2">
        <div className="w-1 h-2 bg-white/60 rounded-sm animate-scrollWheel" />
      </div>
      <div className="text-white/50 animate-scrollArrow mt-1">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 4L10 16M10 16L4 10M10 16L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

