import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Кейс: Корпоративний сайт | Розробка сайтів — STEPS LAB',
  description: 'Кейс веб-розробки корпоративного сайту з CRM-інтеграцією. Website development, конверсія +250%, SEO. Веб-студія STEPS LAB.',
}

export default function CorporateCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
