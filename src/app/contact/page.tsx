'use client'

import { useState } from 'react'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroBackground from '@/components/HeroBackground'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.')
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <section className="min-h-screen bg-bg-dark text-text-light flex items-center pt-20 pb-[120px] relative overflow-hidden">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="text-sm tracking-wide text-accent mb-10 opacity-70 px-3 py-1.5 rounded-lg inline-block bg-accent/10">
              Contact
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">Зв'яжіться</span>
              <span className="hero-alt-title-line">з нами</span>
            </h1>
            <p className="hero-alt-description">
              Готові обговорити ваш проєкт та знайти найкраще рішення.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="bg-bg-light py-section-spacing">
        <div className="container-custom">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-[64px] font-semibold mb-6 text-text-dark tracking-[-2px] font-manrope">Get in touch</h2>
            
            <div className="flex flex-col gap-12 mt-20">
              <div className="flex flex-col gap-16 bg-[rgba(14,14,17,0.02)] p-12 rounded-[20px] border border-[rgba(14,14,17,0.05)]">
                <div className="flex flex-col gap-4">
                  <div className="text-sm tracking-wide uppercase text-text-dark opacity-50 font-semibold font-inter">Email</div>
                  <a href="mailto:hello@stepslab.com" className="text-2xl text-accent no-underline transition-all duration-500 inline-block font-manrope hover:opacity-80 hover:translate-x-1">
                    hello@stepslab.com
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-sm tracking-wide uppercase text-text-dark opacity-50 font-semibold font-inter">Social</div>
                  <div className="flex items-center gap-3 flex-wrap justify-center">
                    <a href="#" className="text-2xl text-accent no-underline transition-all duration-500 inline-block font-manrope hover:opacity-80 hover:translate-x-1">LinkedIn</a>
                    <span className="text-text-dark opacity-30 text-xl">•</span>
                    <a href="#" className="text-2xl text-accent no-underline transition-all duration-500 inline-block font-manrope hover:opacity-80 hover:translate-x-1">GitHub</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center relative my-6">
                <div className="absolute top-1/2 left-0 w-[calc(50%-40px)] h-px bg-[rgba(14,14,17,0.1)]" />
                <div className="absolute top-1/2 right-0 w-[calc(50%-40px)] h-px bg-[rgba(14,14,17,0.1)]" />
                <span className="text-sm tracking-wide uppercase text-text-dark opacity-40 font-semibold font-inter bg-bg-light px-4 relative z-10">
                  OR
                </span>
              </div>
              
              <div className="bg-[rgba(14,14,17,0.02)] p-12 rounded-[20px] border border-[rgba(14,14,17,0.05)]">
                <h3 className="text-2xl font-semibold text-text-dark font-manrope mb-8 tracking-[-0.5px]">Fill out form</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ім'я"
                      className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Компанія (опціонально)"
                      className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Повідомлення"
                      className="px-5 py-4 border border-[rgba(14,14,17,0.1)] rounded-xl text-base font-inter text-text-dark bg-bg-light transition-all duration-500 outline-none resize-none min-h-[160px] w-full focus:border-accent focus:shadow-[0_0_0_3px_rgba(58,91,255,0.1)] focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full px-9 py-5 text-base font-medium rounded-xl transition-all duration-500 font-inter border-none cursor-pointer bg-accent text-text-light shadow-[0_4px_16px_rgba(58,91,255,0.3)] hover:bg-[#2d4ae6] hover:shadow-[0_6px_24px_rgba(58,91,255,0.4)] hover:-translate-y-0.5"
                  >
                    Відправити
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

