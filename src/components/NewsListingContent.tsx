'use client'

import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { useSiteContent } from '@/context/SiteContentContext'
import LocalizedLink from '@/components/LocalizedLink'
import HeroBackground from '@/components/HeroBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import { pickLang, isCmsPublished, type NewsCMS } from '@/lib/cms-types'
import { useLoadMoreList } from '@/hooks/useLoadMoreList'

function sortNews(items: NewsCMS[]): NewsCMS[] {
  return [...items].sort((a, b) => {
    const da = new Date(a.publishedAt).getTime()
    const db = new Date(b.publishedAt).getTime()
    if (db !== da) return db - da
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

export default function NewsListingContent() {
  const { locale, t } = useLocale()
  const { payload } = useSiteContent()
  const land = payload.newsIndex
  const published = sortNews(payload.news.filter((n) => isCmsPublished(n.status)))

  const featured =
    land.featuredIds?.length > 0
      ? land.featuredIds
          .map((id) => published.find((n) => n.id === id))
          .filter((n): n is NewsCMS => Boolean(n))
      : []

  const list = featured.length > 0 ? featured : published
  const { visible, hasMore, loadMore } = useLoadMoreList(list)

  return (
    <>
      <section className="site-hero relative flex min-h-screen items-center overflow-hidden bg-bg-dark pb-[120px] pt-20 text-text-light">
        <HeroBackground />
        <div className="container-custom">
          <div className="max-w-[1200px]">
            <div className="mb-10 inline-block rounded-lg bg-accent/10 px-3 py-1.5 text-sm tracking-wide text-accent opacity-80">
              {pickLang(land.badge, locale)}
            </div>
            <h1 className="hero-alt-title">
              <span className="hero-alt-title-line">{pickLang(land.heroTitleLine1, locale)}</span>
              <span className="hero-alt-title-line">{pickLang(land.heroTitleLine2, locale)}</span>
            </h1>
            <p className="hero-alt-description mt-6 max-w-3xl">{pickLang(land.heroDescription, locale)}</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="about-alt">
        <div className="container-custom">
          <h2 className="section-title-alt mb-10">{pickLang(land.sectionTitle, locale)}</h2>
          {list.length === 0 ? (
            <p className="about-alt-text max-w-2xl">
              {locale === 'uk' ? 'Ще немає опублікованих матеріалів.' : 'No published articles yet.'}
            </p>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((post) => (
                  <LocalizedLink
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40 hover:bg-white/[0.06]"
                  >
                    {post.coverImageUrl ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10">
                        <Image
                          src={post.coverImageUrl}
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width:768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] w-full bg-gradient-to-br from-accent/20 to-transparent" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <time className="text-xs uppercase tracking-wider text-accent/90" dateTime={post.publishedAt}>
                        {post.publishedAt}
                      </time>
                      <h3 className="mt-3 font-manrope text-xl font-semibold text-white group-hover:text-accent">
                        {pickLang(post.title, locale)}
                      </h3>
                    </div>
                  </LocalizedLink>
                ))}
              </div>
              {hasMore ? (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-text-light transition hover:border-accent/50 hover:text-accent"
                  >
                    {t('common.loadMore')}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  )
}
