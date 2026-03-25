'use client'

import type { Locale } from '@/lib/i18n'
import type { PagesContent } from '@/lib/cms-types'
import ImageUploader from '@/components/admin/ImageUploader'
import { AdminField, AdminSection, adminInputClass } from '@/components/admin/admin-ui'

type P = {
  pages: PagesContent
  setPages: (p: PagesContent) => void
  L: Locale
}

export function HomePagesEditor({ pages, setPages, L }: P) {
  const h = pages.hero
  const setStat = (i: number, patch: Partial<(typeof h.stats)[0]>) => {
    const stats = h.stats.map((row, j) => (j === i ? { ...row, ...patch, label: patch.label ? { ...row.label, ...patch.label } : row.label } : row))
    setPages({ ...pages, hero: { ...h, stats } })
  }

  return (
    <div className="space-y-6">
      <AdminSection title="Hero">
        <AdminField label={`Title (${L})`} className="md:col-span-2">
          <input
            className={adminInputClass}
            value={h.title[L]}
            onChange={(e) => setPages({ ...pages, hero: { ...h, title: { ...h.title, [L]: e.target.value } } })}
          />
        </AdminField>
        <AdminField label={`Subtitle (${L})`} className="md:col-span-2">
          <textarea
            className={adminInputClass + ' min-h-24'}
            value={h.subtitle[L]}
            onChange={(e) => setPages({ ...pages, hero: { ...h, subtitle: { ...h.subtitle, [L]: e.target.value } } })}
          />
        </AdminField>
        <AdminField label={`Primary CTA (${L})`}>
          <input
            className={adminInputClass}
            value={h.ctaText[L]}
            onChange={(e) => setPages({ ...pages, hero: { ...h, ctaText: { ...h.ctaText, [L]: e.target.value } } })}
          />
        </AdminField>
        <AdminField label="CTA link (path)">
          <input
            className={adminInputClass}
            value={h.ctaLink}
            onChange={(e) => setPages({ ...pages, hero: { ...h, ctaLink: e.target.value } })}
          />
        </AdminField>
        <AdminField label={`Secondary link — view cases (${L})`}>
          <input
            className={adminInputClass}
            value={h.viewCasesLabel[L]}
            onChange={(e) =>
              setPages({ ...pages, hero: { ...h, viewCasesLabel: { ...h.viewCasesLabel, [L]: e.target.value } } })
            }
          />
        </AdminField>
        <AdminField label="Hero section image URL" className="md:col-span-2">
          <input
            className={adminInputClass}
            value={h.heroImageUrl}
            onChange={(e) => setPages({ ...pages, hero: { ...h, heroImageUrl: e.target.value } })}
          />
        </AdminField>
      </AdminSection>

      <AdminSection title="Hero stats (3 rows)">
        {h.stats.map((row, i) => (
          <div key={i} className="contents">
            <AdminField label={`Stat ${i + 1} value`}>
              <input className={adminInputClass} value={row.value} onChange={(e) => setStat(i, { value: e.target.value })} />
            </AdminField>
            <AdminField label={`Stat ${i + 1} label (${L})`}>
              <input
                className={adminInputClass}
                value={row.label[L]}
                onChange={(e) => setStat(i, { label: { ...row.label, [L]: e.target.value } })}
              />
            </AdminField>
          </div>
        ))}
      </AdminSection>

      <AdminSection title="Home — About strip (workflow & team)">
        <AdminField label={`Workflow (${L})`} className="md:col-span-2">
          <textarea
            className={adminInputClass + ' min-h-20'}
            value={pages.aboutTech.workflowDescription[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                aboutTech: {
                  ...pages.aboutTech,
                  workflowDescription: { ...pages.aboutTech.workflowDescription, [L]: e.target.value },
                },
              })
            }
          />
        </AdminField>
        <AdminField label={`Team (${L})`} className="md:col-span-2">
          <textarea
            className={adminInputClass + ' min-h-20'}
            value={pages.aboutTech.teamExperience[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                aboutTech: {
                  ...pages.aboutTech,
                  teamExperience: { ...pages.aboutTech.teamExperience, [L]: e.target.value },
                },
              })
            }
          />
        </AdminField>
      </AdminSection>

      <AdminSection title="Section headings (home)">
        <AdminField label={`Services block title (${L})`}>
          <input
            className={adminInputClass}
            value={pages.labels.servicesSectionTitle[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: {
                  ...pages.labels,
                  servicesSectionTitle: { ...pages.labels.servicesSectionTitle, [L]: e.target.value },
                },
              })
            }
          />
        </AdminField>
        <AdminField label={`About block title (${L})`}>
          <input
            className={adminInputClass}
            value={pages.labels.aboutSectionTitle[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: { ...pages.labels, aboutSectionTitle: { ...pages.labels.aboutSectionTitle, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
        <AdminField label={`Cases block title (${L})`}>
          <input
            className={adminInputClass}
            value={pages.labels.casesSectionTitle[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: {
                  ...pages.labels,
                  casesSectionTitle: { ...pages.labels.casesSectionTitle, [L]: e.target.value },
                },
              })
            }
          />
        </AdminField>
        <AdminField label={`Concepts heading (${L})`}>
          <input
            className={adminInputClass}
            value={pages.labels.conceptsHeading[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: { ...pages.labels, conceptsHeading: { ...pages.labels.conceptsHeading, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
        <AdminField label={`View all concepts (${L})`}>
          <input
            className={adminInputClass}
            value={pages.labels.conceptsViewAll[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: { ...pages.labels, conceptsViewAll: { ...pages.labels.conceptsViewAll, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
        <AdminField label={`View case label (${L})`}>
          <input
            className={adminInputClass}
            value={pages.labels.casesViewCase[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                labels: { ...pages.labels, casesViewCase: { ...pages.labels.casesViewCase, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
      </AdminSection>

      <AdminSection title="Why STEPS LAB">
        <AdminField label={`Section title (${L})`} className="md:col-span-2">
          <input
            className={adminInputClass}
            value={pages.homeWhy.title[L]}
            onChange={(e) =>
              setPages({ ...pages, homeWhy: { ...pages.homeWhy, title: { ...pages.homeWhy.title, [L]: e.target.value } } })
            }
          />
        </AdminField>
        {pages.homeWhy.bullets.map((bt, idx) => (
          <AdminField key={idx} label={`Bullet ${idx + 1} (${L})`} className="md:col-span-2">
            <textarea
              className={adminInputClass + ' min-h-16'}
              value={bt[L]}
              onChange={(e) => {
                const bullets = pages.homeWhy.bullets.map((b, j) =>
                  j === idx ? { ...b, [L]: e.target.value } : b
                )
                setPages({ ...pages, homeWhy: { ...pages.homeWhy, bullets } })
              }}
            />
          </AdminField>
        ))}
        <AdminField label={`Quote (${L})`} className="md:col-span-2">
          <textarea
            className={adminInputClass + ' min-h-24'}
            value={pages.homeWhy.quote[L]}
            onChange={(e) =>
              setPages({ ...pages, homeWhy: { ...pages.homeWhy, quote: { ...pages.homeWhy.quote, [L]: e.target.value } } })
            }
          />
        </AdminField>
      </AdminSection>

      <AdminSection title="Tech stack strip">
        <AdminField label={`Title (${L})`} className="md:col-span-2">
          <input
            className={adminInputClass}
            value={pages.homeTechStack.title[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                homeTechStack: { ...pages.homeTechStack, title: { ...pages.homeTechStack.title, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
      </AdminSection>

      <AdminSection title="Final CTA band">
        <AdminField label={`Title (${L})`} className="md:col-span-2">
          <input
            className={adminInputClass}
            value={pages.homeFinalCta.title[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                homeFinalCta: { ...pages.homeFinalCta, title: { ...pages.homeFinalCta.title, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
        <AdminField label={`Button (${L})`} className="md:col-span-2">
          <input
            className={adminInputClass}
            value={pages.homeFinalCta.buttonLabel[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                homeFinalCta: {
                  ...pages.homeFinalCta,
                  buttonLabel: { ...pages.homeFinalCta.buttonLabel, [L]: e.target.value },
                },
              })
            }
          />
        </AdminField>
      </AdminSection>
    </div>
  )
}

export function AboutPagesEditor({ pages, setPages, L }: P) {
  const ap = pages.aboutPageContent
  const setK = (key: keyof typeof ap, v: string) =>
    setPages({
      ...pages,
      aboutPageContent: { ...ap, [key]: { ...ap[key], [L]: v } },
    })

  return (
    <div className="space-y-6">
      <AdminSection title="About page (/about)">
        {(
          [
            ['heroBadge', ap.heroBadge],
            ['heroTitle', ap.heroTitle],
            ['heroSubtitle', ap.heroSubtitle],
            ['philosophyTitle', ap.philosophyTitle],
            ['philosophyText', ap.philosophyText],
            ['customFocusTitle', ap.customFocusTitle],
            ['customFocusText', ap.customFocusText],
            ['conceptsTitle', ap.conceptsTitle],
            ['conceptsCta', ap.conceptsCta],
          ] as const
        ).map(([key, bt]) => (
          <AdminField
            key={key}
            label={`${key} (${L})`}
            className={key.includes('Subtitle') || key.includes('Text') ? 'md:col-span-2' : ''}
          >
            {key.includes('Subtitle') || key.includes('Text') ? (
              <textarea
                className={adminInputClass + ' min-h-20'}
                value={bt[L]}
                onChange={(e) => setK(key, e.target.value)}
              />
            ) : (
              <input className={adminInputClass} value={bt[L]} onChange={(e) => setK(key, e.target.value)} />
            )}
          </AdminField>
        ))}
      </AdminSection>
    </div>
  )
}

export function ContactsPagesEditor({ pages, setPages, L }: P) {
  const cp = pages.contactPageContent
  const setK = (key: keyof typeof cp, v: string) =>
    setPages({
      ...pages,
      contactPageContent: { ...cp, [key]: { ...cp[key], [L]: v } },
    })

  const fields: (keyof typeof cp)[] = [
    'badge',
    'title1',
    'title2',
    'description',
    'writeUs',
    'or',
    'leaveRequest',
    'namePlaceholder',
    'companyPlaceholder',
    'messagePlaceholder',
    'submit',
    'submitting',
    'successTitle',
    'successText',
    'writeAgain',
    'errorDefault',
  ]

  return (
    <div className="space-y-6">
      <AdminSection title="Contact page (/contacts)">
        {fields.map((key) => {
          const bt = cp[key]
          const long = key === 'description' || key === 'successText'
          return (
            <AdminField key={key} label={`${key} (${L})`} className={long ? 'md:col-span-2' : ''}>
              {long ? (
                <textarea
                  className={adminInputClass + ' min-h-16'}
                  value={bt[L]}
                  onChange={(e) => setK(key, e.target.value)}
                />
              ) : (
                <input className={adminInputClass} value={bt[L]} onChange={(e) => setK(key, e.target.value)} />
              )}
            </AdminField>
          )
        })}
      </AdminSection>
    </div>
  )
}

export function FooterTemplateEditor({ pages, setPages, L }: P) {
  return (
    <div className="space-y-6">
      <AdminSection title="Footer">
        <AdminField label="Email">
          <input
            className={adminInputClass}
            value={pages.footer.contactEmail}
            onChange={(e) => setPages({ ...pages, footer: { ...pages.footer, contactEmail: e.target.value } })}
          />
        </AdminField>
        <AdminField label="Phone">
          <input
            className={adminInputClass}
            value={pages.footer.phone}
            onChange={(e) => setPages({ ...pages, footer: { ...pages.footer, phone: e.target.value } })}
          />
        </AdminField>
        <AdminField label={`Copyright (${L})`} className="md:col-span-2">
          <input
            className={adminInputClass}
            value={pages.footer.copyrightText[L]}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: { ...pages.footer, copyrightText: { ...pages.footer.copyrightText, [L]: e.target.value } },
              })
            }
          />
        </AdminField>
        <AdminField label="LinkedIn URL">
          <input
            className={adminInputClass}
            value={pages.footer.socialLinks.linkedin}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: {
                  ...pages.footer,
                  socialLinks: { ...pages.footer.socialLinks, linkedin: e.target.value },
                },
              })
            }
          />
        </AdminField>
        <AdminField label="GitHub URL">
          <input
            className={adminInputClass}
            value={pages.footer.socialLinks.github}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: { ...pages.footer, socialLinks: { ...pages.footer.socialLinks, github: e.target.value } },
              })
            }
          />
        </AdminField>
        <AdminField label="X URL">
          <input
            className={adminInputClass}
            value={pages.footer.socialLinks.x}
            onChange={(e) =>
              setPages({
                ...pages,
                footer: { ...pages.footer, socialLinks: { ...pages.footer.socialLinks, x: e.target.value } },
              })
            }
          />
        </AdminField>
      </AdminSection>

      <AdminSection title="Case study pages — shared headings">
        {(
          [
            ['aboutProject', pages.casePageLabels.aboutProject],
            ['whatWeDid', pages.casePageLabels.whatWeDid],
            ['results', pages.casePageLabels.results],
            ['client', pages.casePageLabels.client],
            ['timeline', pages.casePageLabels.timeline],
            ['technologies', pages.casePageLabels.technologies],
          ] as const
        ).map(([key, bt]) => (
          <AdminField key={key} label={`${key} (${L})`}>
            <input
              className={adminInputClass}
              value={bt[L]}
              onChange={(e) =>
                setPages({
                  ...pages,
                  casePageLabels: {
                    ...pages.casePageLabels,
                    [key]: { ...bt, [L]: e.target.value },
                  },
                })
              }
            />
          </AdminField>
        ))}
      </AdminSection>
    </div>
  )
}

export function MediaPagesEditor({ pages, setPages }: Omit<P, 'L'>) {
  return (
    <div className="space-y-6">
      <AdminSection title="Media library">
        <ImageUploader label="Logo" value={pages.images.logo} onUrlChange={(url) => setPages({ ...pages, images: { ...pages.images, logo: url } })} />
        <ImageUploader label="Hero image URL" value={pages.images.hero} onUrlChange={(url) => setPages({ ...pages, images: { ...pages.images, hero: url } })} />
        <ImageUploader
          label="Hero (section) image"
          value={pages.hero.heroImageUrl}
          onUrlChange={(url) => setPages({ ...pages, hero: { ...pages.hero, heroImageUrl: url } })}
        />
        <AdminField label="Gallery URLs (one per line)" className="md:col-span-2">
          <textarea
            className={adminInputClass + ' min-h-32'}
            value={pages.images.gallery.join('\n')}
            onChange={(e) =>
              setPages({
                ...pages,
                images: {
                  ...pages.images,
                  gallery: e.target.value
                    .split('\n')
                    .map((x) => x.trim())
                    .filter(Boolean),
                },
              })
            }
          />
        </AdminField>
      </AdminSection>
    </div>
  )
}
