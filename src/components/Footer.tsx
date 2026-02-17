import Link from 'next/link'

export default function Footer() {
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
          <div className="footer-alt-copyright">© {new Date().getFullYear()} STEPS LAB</div>
        </div>
      </div>
    </footer>
  )
}

