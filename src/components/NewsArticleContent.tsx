'use client'

import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { NewsCMS } from '@/lib/cms-types'
import { pickLang } from '@/lib/cms-types'
import { useLocale } from '@/context/LocaleContext'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import { localizePath } from '@/lib/locale-path'

type Props = { post: NewsCMS }

export default function NewsArticleContent({ post }: Props) {
  const { locale } = useLocale()
  const md = pickLang(post.content, locale)
  const title = pickLang(post.title, locale)

  return (
    <>
      <article>
        <section className="site-hero relative flex min-h-[70vh] items-end overflow-hidden bg-bg-dark pb-16 pt-28 text-text-light md:pb-24 md:pt-32">
          <HeroBackground />
          <div className="container-custom relative z-[1]">
            <Link
              href={localizePath('/news', locale)}
              className="mb-8 inline-block text-sm tracking-wide text-accent opacity-80 hover:opacity-100"
            >
              ← {locale === 'uk' ? 'Усі новини' : 'All news'}
            </Link>
            <time className="block text-xs uppercase tracking-[0.2em] text-accent/90" dateTime={post.publishedAt}>
              {post.publishedAt}
            </time>
            <h1 className="mt-4 max-w-4xl font-manrope text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {post.coverImageUrl ? (
              <div className="relative mx-auto mt-12 aspect-[21/9] max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src={post.coverImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1200px) 100vw, 1024px"
                  priority
                />
              </div>
            ) : null}
          </div>
          <ScrollIndicator />
        </section>

        <section className="bg-bg-dark py-section-spacing text-text-light">
          <div className="container-custom">
            <div className="max-w-3xl">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4 text-base leading-relaxed text-slate-300">{children}</p>,
                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-10 font-manrope text-2xl font-semibold text-white">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-8 font-manrope text-xl font-semibold text-white">{children}</h3>
                  ),
                  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-slate-300">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-slate-300">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-accent underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                  code: ({ children }) => (
                    <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-sm text-slate-200">
                      {children}
                    </code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="mb-4 border-l-2 border-accent/60 pl-4 text-slate-400">{children}</blockquote>
                  ),
                }}
              >
                {md || ''}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
