'use client'

import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useEffect } from 'react'

const SERVICE_LABELS: Record<string, string> = {
  web: 'Веб-розробка',
  ai: 'AI-розробка та автоматизація',
  mvp: 'MVP для стартапу',
  support: 'Підтримка та масштабування',
  other: 'Інше',
}

export default function Modal() {
  const { isOpen, closeModal } = useModal()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
        setStatus('idle')
        setErrorMessage('')
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeModal])

  const handleClose = () => {
    closeModal()
    setStatus('idle')
    setErrorMessage('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const serviceValue = formData.get('service') as string
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      service: serviceValue ? SERVICE_LABELS[serviceValue] || serviceValue : '',
      message: formData.get('message'),
      source: 'consultation',
    }

    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Помилка відправки')
      }

      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Щось пішло не так. Спробуйте ще раз.')
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-[rgba(14,14,17,0.85)] backdrop-blur-[10px] z-[10000] flex items-center justify-center p-2 sm:p-4 transition-all duration-500 overflow-y-auto ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div className={`bg-bg-light rounded-3xl max-w-[600px] w-[90%] max-h-[90vh] relative transform transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col ${isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-5'}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 md:w-10 md:h-10 border-none bg-[rgba(14,14,17,0.05)] rounded-xl text-xl md:text-2xl text-text-dark cursor-pointer flex items-center justify-center transition-all duration-500 z-10 hover:bg-[rgba(14,14,17,0.1)] hover:rotate-90"
        >
          ×
        </button>
        <div className="p-4 sm:p-6 md:p-12 overflow-y-auto max-h-[90vh]">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-dark mb-3 font-manrope tracking-[-1px]">
                Дякуємо!
              </h2>
              <p className="text-[15px] sm:text-base text-text-dark opacity-70 max-w-[400px] leading-relaxed">
                Ми отримали вашу заявку та зв'яжемося з вами найближчим часом.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 px-7 py-3.5 text-[15px] font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
              >
                Закрити
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-dark mb-1 md:mb-2 font-manrope tracking-[-1px]">Отримати консультацію</h2>
              <p className="text-[14px] sm:text-[15px] text-text-dark opacity-70 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                Заповніть форму, і ми зв'яжемося з вами найближчим часом.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                {status === 'error' && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark tracking-wide">Ім'я</label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={status === 'submitting'}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark tracking-wide">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={status === 'submitting'}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark tracking-wide">Компанія (опціонально)</label>
                  <input
                    type="text"
                    name="company"
                    disabled={status === 'submitting'}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Назва компанії"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark tracking-wide">Послуга</label>
                  <select
                    name="service"
                    required
                    disabled={status === 'submitting'}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%230E0E11%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_18px_center] pr-12 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">Оберіть послугу</option>
                    <option value="web">Веб-розробка</option>
                    <option value="ai">AI-розробка та автоматизація</option>
                    <option value="mvp">MVP для стартапу</option>
                    <option value="support">Підтримка та масштабування</option>
                    <option value="other">Інше</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark tracking-wide">Повідомлення</label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    disabled={status === 'submitting'}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 border border-[rgba(14,14,17,0.1)] rounded-xl text-[15px] font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none resize-none min-h-[70px] max-h-[100px] sm:h-[100px] focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Ваше повідомлення"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-0 sm:mt-1 w-full px-5 py-3 sm:px-7 sm:py-3.5 text-[15px] font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'submitting' ? 'Відправка...' : 'Відправити'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
