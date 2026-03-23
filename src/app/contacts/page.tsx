'use client'

import { useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function ContactsPage() {
  const { t } = useLocale()
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')
    try {
      const response = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contacts' }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || t('contactPage.errorDefault'))
      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : t('contactPage.errorDefault'))
    }
  }

  return (
    <section className="bg-bg-light min-h-screen py-32">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs
          items={[
            { name: t('nav.home'), path: '/' },
            { name: t('nav.contact'), path: '/contacts' },
          ]}
        />
        <div className="mb-10">
          <p className="text-accent text-sm tracking-wide uppercase mb-4">{t('contactPage.badge')}</p>
          <h1 className="text-4xl md:text-6xl font-manrope font-semibold text-text-dark tracking-tight mb-4">
            {t('contactPage.title1')} {t('contactPage.title2')}
          </h1>
          <p className="text-text-dark/70 text-lg">{t('contactPage.description')}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-10">
          {status === 'success' ? (
            <div className="text-center py-12">
              <h2 className="text-3xl font-manrope font-semibold mb-3 text-text-dark">{t('contactPage.successTitle')}</h2>
              <p className="text-text-dark/70 mb-8">{t('contactPage.successText')}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="btn-consultation px-6 py-3 rounded-xl bg-accent text-text-light"
              >
                {t('contactPage.writeAgain')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && <div className="rounded-xl bg-red-500/10 text-red-600 px-4 py-3 text-sm">{errorMessage}</div>}
              <input
                required
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('contactPage.namePlaceholder')}
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />
              <input
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={t('contactPage.companyPlaceholder')}
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />
              <textarea
                required
                name="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contactPage.messagePlaceholder')}
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />
              <button type="submit" className="btn-consultation w-full px-6 py-3 rounded-xl bg-accent text-text-light">
                {status === 'submitting' ? t('contactPage.submitting') : t('contactPage.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
