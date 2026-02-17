'use client'

import { useModal } from '@/hooks/useModal'
import { useEffect } from 'react'

export default function Modal() {
  const { isOpen, closeModal } = useModal()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeModal])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.log('Form submitted:', data)
    alert('Дякуємо! Ми зв\'яжемося з вами найближчим часом.')
    e.currentTarget.reset()
    closeModal()
  }

  return (
    <div
      className={`fixed inset-0 bg-[rgba(14,14,17,0.85)] backdrop-blur-[10px] z-[10000] flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal()
        }
      }}
    >
      <div className={`bg-bg-light rounded-3xl max-w-[600px] w-[90%] relative transform transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col ${isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-5'}`}>
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 w-10 h-10 border-none bg-[rgba(14,14,17,0.05)] rounded-xl text-2xl text-text-dark cursor-pointer flex items-center justify-center transition-all duration-500 z-10 hover:bg-[rgba(14,14,17,0.1)] hover:rotate-90"
        >
          ×
        </button>
        <div className="p-12 overflow-visible">
          <h2 className="text-4xl font-semibold text-text-dark mb-2 font-manrope tracking-[-1px]">Get consultation</h2>
          <p className="text-[15px] text-text-dark opacity-70 mb-8 leading-relaxed">
            Заповніть форму, і ми зв'яжемося з вами найближчим часом.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-dark tracking-wide">Ім'я</label>
              <input
                type="text"
                name="name"
                required
                className="px-4 py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)]"
                placeholder="Ваше ім'я"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-dark tracking-wide">Email</label>
              <input
                type="email"
                name="email"
                required
                className="px-4 py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)]"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-dark tracking-wide">Компанія (опціонально)</label>
              <input
                type="text"
                name="company"
                className="px-4 py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)]"
                placeholder="Назва компанії"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-dark tracking-wide">Послуга</label>
              <select
                name="service"
                required
                className="px-4 py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%230E0E11%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_18px_center] pr-12"
              >
                <option value="">Оберіть послугу</option>
                <option value="web">Web development</option>
                <option value="ai">AI automation</option>
                <option value="mvp">MVP for Startup</option>
                <option value="support">Support & Scaling</option>
                <option value="other">Інше</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-dark tracking-wide">Повідомлення</label>
              <textarea
                name="message"
                required
                rows={4}
                className="px-4 py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none resize-none h-[100px] focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)]"
                placeholder="Ваше повідомлення"
              />
            </div>
            <button
              type="submit"
              className="mt-1 w-full px-7 py-3.5 text-[15px] font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
            >
              Відправити
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

