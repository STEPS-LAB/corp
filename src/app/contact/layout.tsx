import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакти | STEPS LAB — веб-студія розробки сайтів',
  description: 'Зв\'яжіться з веб-студією STEPS LAB. Обговоріть проєкт розробки сайту або веб-додатку. Консультація безкоштовно.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
