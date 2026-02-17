'use client'

import { useLayoutEffect, useRef } from 'react'

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const preloader = preloaderRef.current
    if (!preloader) return

    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // Перший візит - показуємо preloader
      // Невелика затримка для того, щоб CSS встиг завантажитись
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Форсуємо перезапуск анімації
          const chars = preloader.querySelectorAll('.preloader-char')
          chars.forEach((char) => {
            const htmlChar = char as HTMLElement
            htmlChar.style.animation = 'none'
            void htmlChar.offsetWidth // Force reflow
            htmlChar.style.animation = ''
          })
          
          const subtitle = preloader.querySelector('.preloader-subtitle') as HTMLElement
          if (subtitle) {
            subtitle.style.animation = 'none'
            void subtitle.offsetWidth // Force reflow
            subtitle.style.animation = ''
          }
        })
      })

      const handleLoad = () => {
        setTimeout(() => {
          preloader.classList.add('hidden')
          document.body.classList.add('loaded')
          setTimeout(() => {
            preloader.style.display = 'none'
            sessionStorage.setItem('hasVisited', 'true')
          }, 600)
        }, 2000)
      }

      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => window.removeEventListener('load', handleLoad)
      }
    } else {
      // Не перший візит - одразу ховаємо preloader
      preloader.style.display = 'none'
      document.body.classList.add('loaded')
    }
  }, [])

  return (
    <div 
      ref={preloaderRef}
      className="preloader"
      id="preloader"
    >
      <div className="preloader-content">
        <div className="preloader-text">
          <span className="preloader-char">S</span>
          <span className="preloader-char">T</span>
          <span className="preloader-char">E</span>
          <span className="preloader-char">P</span>
          <span className="preloader-char">S</span>
        </div>
        <div className="preloader-subtitle">LAB</div>
      </div>
    </div>
  )
}

