'use client'

import Link, { type LinkProps } from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { localizePath } from '@/lib/locale-path'

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: LinkProps['href']
}

export default function LocalizedLink({ href, ...props }: Props) {
  const { locale } = useLocale()

  if (typeof href !== 'string') {
    return <Link href={href} {...props} />
  }

  return <Link href={localizePath(href, locale)} {...props} />
}
