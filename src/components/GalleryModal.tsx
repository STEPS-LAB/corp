'use client'

import { useState, useEffect } from 'react'

interface GalleryImage {
  class: string
  caption: string
}

interface GalleryModalProps {
  gallery?: string
  index?: number
  onClose: () => void
}

const galleryData: Record<string, GalleryImage[]> = {
  ecommerce: [
    { class: 'case-screen-1', caption: 'Головна сторінка з каталогом товарів' },
    { class: 'case-screen-2', caption: 'Сторінка товару з деталями' },
    { class: 'case-screen-3', caption: 'Кошик та оформлення замовлення' },
    { class: 'case-screen-4', caption: 'Особистий кабінет користувача' },
    { class: 'case-fullscreen-1', caption: 'Панель адміністратора з управлінням замовленнями' },
    { class: 'case-hero-image-main', caption: 'Головне зображення проєкту' },
  ],
  saas: [
    { class: 'case-screen-saas-1', caption: 'Головна панель з дашбордом' },
    { class: 'case-screen-saas-2', caption: 'Автоматизація процесів' },
    { class: 'case-screen-saas-3', caption: 'AI-аналітика та звіти' },
    { class: 'case-screen-saas-4', caption: 'Налаштування та інтеграції' },
    { class: 'case-fullscreen-saas', caption: 'Мобільна версія продукту' },
    { class: 'case-hero-image-saas', caption: 'Головне зображення проєкту' },
  ],
  corporate: [
    { class: 'case-screen-corporate-1', caption: 'Головна сторінка' },
    { class: 'case-screen-corporate-2', caption: 'Сторінка послуг' },
    { class: 'case-screen-corporate-3', caption: 'Форма зворотного зв\'язку' },
    { class: 'case-screen-corporate-4', caption: 'Блог та новини' },
    { class: 'case-fullscreen-corporate', caption: 'Адаптивний дизайн для мобільних пристроїв' },
    { class: 'case-hero-image-corporate', caption: 'Головне зображення проєкту' },
  ],
}

export default function GalleryModal({ gallery, index = 0, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(index)
  const [images, setImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    if (gallery && galleryData[gallery]) {
      setImages(galleryData[gallery])
      setCurrentIndex(index)
    }
  }, [gallery, index])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      if (e.key === 'ArrowLeft') {
        prevImage()
      }
      if (e.key === 'ArrowRight') {
        nextImage()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [currentIndex, images.length])

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (!gallery || images.length === 0) return null

  return (
    <div
      className="fixed inset-0 bg-[rgba(14,14,17,0.98)] z-[10000] flex opacity-100 transition-opacity duration-300 ease-in-out overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 border-none rounded-xl text-text-light text-[28px] cursor-pointer z-[10001] transition-all duration-500 flex items-center justify-center leading-none hover:bg-white/20 hover:rotate-90"
      >
        ×
      </button>
      <div className="grid grid-cols-[200px_1fr] gap-8 w-full h-full p-8 overflow-hidden">
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-full aspect-[4/3] bg-gradient-to-br from-accent/10 to-bg-dark/30 rounded-lg cursor-pointer transition-all duration-500 border-2 overflow-hidden relative ${
                idx === currentIndex
                  ? 'border-accent shadow-[0_0_0_2px_rgba(58,91,255,0.2)]'
                  : 'border-transparent hover:border-accent/50 hover:scale-105'
              }`}
            />
          ))}
        </div>
        <div className="relative flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-h-[calc(100vh-120px)] bg-gradient-to-br from-accent/10 to-bg-dark/30 rounded-xl relative overflow-hidden transition-all duration-300" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-[10002]">
            <button
              onClick={prevImage}
              disabled={currentIndex === 0}
              className="w-14 h-14 bg-white/10 border-none rounded-xl text-text-light text-2xl cursor-pointer transition-all duration-500 flex items-center justify-center backdrop-blur-[10px] hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              disabled={currentIndex === images.length - 1}
              className="w-14 h-14 bg-white/10 border-none rounded-xl text-text-light text-2xl cursor-pointer transition-all duration-500 flex items-center justify-center backdrop-blur-[10px] hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

