'use client'

import { useLocale } from '@/context/LocaleContext'

export default function Footer() {
  const { t } = useLocale()
  return (
    <footer className="footer-alt">
      <div className="container-custom">
        <div className="footer-alt-content">
          <div className="footer-alt-logo">STEPS LAB</div>
          <div className="footer-alt-info">
            <a href="mailto:hello@stepslab.com" className="footer-alt-link">hello@stepslab.com</a>
            <div className="footer-alt-social">
              <a href="#" className="footer-alt-link">LinkedIn</a>
              <a href="#" className="footer-alt-link">GitHub</a>
            </div>
          </div>
          <div className="footer-alt-copyright">{t('footer.copyright', { year: new Date().getFullYear() })}</div>
        </div>
      </div>
    </footer>
  )
}

