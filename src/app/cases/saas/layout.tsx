import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Кейс: SaaS MVP | AI development — STEPS LAB',
  description: 'Кейс AI development: SaaS MVP за 8 тижнів. Розробка мінімального продукту, AI-інтеграція. Веб-студія STEPS LAB.',
}

export default function SaaSCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
