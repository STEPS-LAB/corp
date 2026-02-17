'use client'

import { useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'

export default function ContactPage() {
  const { t } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact' }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || t('contactPage.errorDefault'))
      }

      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : t('contactPage.errorDefault'))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-20 md:pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              {t('contactPage.badge')}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{t('contactPage.title1')}</span>
              <span className="hero-alt-title-line">{t('contactPage.title2')}</span>
            </h1>
            <p className="hero-alt-description">
              {t('contactPage.description')}
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-bg-light py-section-spacing">
        <div className="container-custom">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-[64px] font-semibold mb-6 text-text-dark tracking-[-2px] font-manrope">{t('contactPage.writeUs')}</h2>
            
            <div className="flex flex-col gap-12 mt-12 md:mt-20">
              <div className="flex flex-col gap-16 bg-[rgba(14,14,17,0.02)] p-6 sm:p-8 md:p-12 rounded-[20px] border border-[rgba(14,14,17,0.05)]">
                <div className="flex flex-col gap-4">
                  <div className="text-sm tracking-wide uppercase text-text-dark opacity-50 font-semibold font-inter">Email</div>
                  <a href="mailto:hello@stepslab.com" className="text-xl sm:text-2xl text-accent no-underline transition-all duration-500 inline-block font-manrope hover:opacity-80 hover:translate-x-1 break-all">
                    hello@stepslab.com
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-sm tracking-wide uppercase text-text-dark opacity-50 font-semibold font-inter">Social</div>
                  <div className="flex items-center gap-3 flex-wrap justify-center">
                    <a href="#" className="text-xl sm:text-2xl text-accent no-underline transition-all duration-500 inline-block font-manrope hover:opacity-80 hover:translate-x-1">LinkedIn</a>
                    <span className="text-text-dark opacity-30 text-xl">•</span>
                    <a href="#" className="text-xl sm:text-2xl text-accent no-underline transition-all duration-500 inline-block font-manrope hover:opacity-80 hover:translate-x-1">GitHub</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center relative my-6">
                <div className="absolute top-1/2 left-0 w-[calc(50%-40px)] h-px bg-[rgba(14,14,17,0.1)]" />
                <div className="absolute top-1/2 right-0 w-[calc(50%-40px)] h-px bg-[rgba(14,14,17,0.1)]" />
                <span className="text-sm tracking-wide uppercase text-text-dark opacity-40 font-semibold font-inter bg-bg-light px-4 relative z-10">
                  {t('contactPage.or')}
                </span>
              </div>
              
              <div className="bg-[rgba(14,14,17,0.02)] p-6 sm:p-8 md:p-12 rounded-[20px] border border-[rgba(14,14,17,0.05)]">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-text-dark mb-3 font-manrope tracking-[-0.5px]">
                      {t('contactPage.successTitle')}
                    </h3>
                    <p className="text-base text-text-dark opacity-70 max-w-[400px] leading-relaxed">
                      {t('contactPage.successText')}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 px-9 py-5 text-base font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
                    >
                      {t('contactPage.writeAgain')}
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-text-dark font-manrope mb-8 tracking-[-0.5px]">{t('contactPage.leaveRequest')}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {status === 'error' && (
                        <div className="px-5 py-4 rounded-xl bg-red-500/10 text-red-600 text-sm">
                          {errorMessage}
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={status === 'submitting'}
                          placeholder={t('contactPage.namePlaceholder')}
                          className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={status === 'submitting'}
                          placeholder="Email"
                          className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          disabled={status === 'submitting'}
                          placeholder={t('contactPage.companyPlaceholder')}
                          className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          disabled={status === 'submitting'}
                          placeholder={t('contactPage.messagePlaceholder')}
                          className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none resize-none min-h-[160px] w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="mt-2 w-full px-9 py-5 text-base font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {status === 'submitting' ? t('contactPage.submitting') : t('contactPage.submit')}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

