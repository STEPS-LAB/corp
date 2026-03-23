import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'optional',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-manrope',
  display: 'optional',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-inter antialiased" style={{ backgroundColor: '#0E0E11' }}>
        {children}
      </body>
    </html>
  )
}
