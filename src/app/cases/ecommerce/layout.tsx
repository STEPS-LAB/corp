import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Кейс: E-commerce платформа | Веб-розробка сайтів — STEPS LAB',
  description: 'Кейс розробки e-commerce сайту: онлайн-продажі +340%. Інтеграція платежів, AI. Веб-студія STEPS LAB.',
}

export default function EcommerceCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
