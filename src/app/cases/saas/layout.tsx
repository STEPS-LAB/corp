import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Кейс: SaaS MVP | AI-розробка — STEPS LAB',
  description: 'Кейс AI-розробки: SaaS MVP за 8 тижнів. Розробка мінімального продукту, AI-інтеграція. Веб-студія STEPS LAB.',
}

export default function SaaSCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
