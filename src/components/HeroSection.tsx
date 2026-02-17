'use client'

import { useModal } from '@/hooks/useModal'
import Link from 'next/link'
import ScrollIndicator from './ScrollIndicator'

export default function HeroSection() {
  const { openModal } = useModal()

  return (
    <section className="hero-alt">
      <div className="hero-alt-bg">
        <div className="hero-alt-line hero-alt-line-1"></div>
        <div className="hero-alt-line hero-alt-line-2"></div>
        <div className="hero-alt-line hero-alt-line-3"></div>
        <div className="hero-alt-gradient hero-alt-gradient-1"></div>
        <div className="hero-alt-gradient hero-alt-gradient-2"></div>
        <div className="hero-alt-circle hero-alt-circle-1"></div>
        <div className="hero-alt-circle hero-alt-circle-2"></div>
        <div className="hero-alt-circle hero-alt-circle-3"></div>
        <div className="hero-alt-dot hero-alt-dot-1"></div>
        <div className="hero-alt-dot hero-alt-dot-2"></div>
        <div className="hero-alt-dot hero-alt-dot-3"></div>
        <div className="hero-alt-dot hero-alt-dot-4"></div>
        <div className="hero-alt-grid-pattern"></div>
      </div>
      <div className="container-custom">
        <div className="hero-alt-content">
          <h1 className="hero-alt-title">
            <span className="hero-alt-title-line">AI-прискорена</span>
            <span className="hero-alt-title-line">веб-розробка</span>
            <span className="hero-alt-title-line">для бізнесу</span>
          </h1>
          <p className="hero-alt-description">
            Логіка, швидкість, результат.
          </p>
          <div className="hero-alt-cta">
            <button
              onClick={openModal}
              className="btn btn-primary btn-large"
            >
              Get consultation
            </button>
            <Link href="#cases" className="btn-link">
              View cases →
            </Link>
          </div>
        </div>
        <div className="hero-alt-stats">
          <div className="stat-item">
            <div className="stat-number">2x</div>
            <div className="stat-label">Faster</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">AI</div>
            <div className="stat-label">Powered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  )
}
