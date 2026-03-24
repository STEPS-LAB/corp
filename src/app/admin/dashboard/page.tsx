'use client'

import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_SITE_CONTENT, sanitizeSiteContent, type SiteContent } from '@/lib/content'

type DashboardTab = 'general' | 'services' | 'media' | 'footer'

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100">{title}</h2>
      <p className="mt-1 text-sm text-zinc-400">{description}</p>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('general')
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let isMounted = true
    async function loadContent() {
      try {
        const response = await fetch('/api/content', { cache: 'no-store' })
        const data = await response.json()
        if (isMounted) setContent(sanitizeSiteContent(data))
      } catch {
        if (isMounted) setMessage('Failed to load content.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    void loadContent()
    return () => {
      isMounted = false
    }
  }, [])

  const tabs = useMemo(
    () => [
      { id: 'general' as const, label: 'General' },
      { id: 'services' as const, label: 'Services' },
      { id: 'media' as const, label: 'Media' },
      { id: 'footer' as const, label: 'Footer' },
    ],
    []
  )

  async function saveContent() {
    setIsSaving(true)
    setMessage('')
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!response.ok) throw new Error('Save failed')
      const saved = await response.json()
      setContent(sanitizeSiteContent(saved))
      setMessage('Saved and published.')
    } catch {
      setMessage('Failed to save. Check your session and try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen bg-zinc-950 text-zinc-200 px-6 py-16">Loading dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 md:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-zinc-500">STEPS LAB</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Content Dashboard</h1>
            <p className="mt-2 text-zinc-400">Swiss-style editor for fast, controlled publishing.</p>
          </div>
          <button
            type="button"
            onClick={saveContent}
            disabled={isSaving}
            className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold transition hover:bg-zinc-200 disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                activeTab === tab.id
                  ? 'border-zinc-100 bg-zinc-100 text-zinc-900'
                  : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 md:p-6">
          {activeTab === 'general' ? (
            <>
              <SectionTitle title="Hero + About/Tech" description="Main messaging and workflow description." />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="text-sm text-zinc-300">Hero Title</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.hero.title}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, hero: { ...prev.hero, title: event.target.value } }))
                    }
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="text-sm text-zinc-300">Hero Subtitle</span>
                  <textarea
                    className="mt-2 w-full min-h-24 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.hero.subtitle}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: event.target.value } }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">CTA Text</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.hero.ctaText}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, hero: { ...prev.hero, ctaText: event.target.value } }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">CTA Link</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.hero.ctaLink}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, hero: { ...prev.hero, ctaLink: event.target.value } }))
                    }
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="text-sm text-zinc-300">Workflow Description</span>
                  <textarea
                    className="mt-2 w-full min-h-24 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.aboutTech.workflowDescription}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        aboutTech: { ...prev.aboutTech, workflowDescription: event.target.value },
                      }))
                    }
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="text-sm text-zinc-300">Team Experience</span>
                  <textarea
                    className="mt-2 w-full min-h-24 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.aboutTech.teamExperience}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        aboutTech: { ...prev.aboutTech, teamExperience: event.target.value },
                      }))
                    }
                  />
                </label>
              </div>
            </>
          ) : null}

          {activeTab === 'services' ? (
            <>
              <SectionTitle title="Services" description="Edit title, description, icon, and pricing." />
              <div className="space-y-4">
                {content.services.map((service, index) => (
                  <div key={service.id} className="rounded-xl border border-zinc-800 p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label>
                        <span className="text-sm text-zinc-300">ID</span>
                        <input
                          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                          value={service.id}
                          onChange={(event) =>
                            setContent((prev) => {
                              const next = [...prev.services]
                              next[index] = { ...next[index], id: event.target.value }
                              return { ...prev, services: next }
                            })
                          }
                        />
                      </label>
                      <label>
                        <span className="text-sm text-zinc-300">Icon Name</span>
                        <input
                          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                          value={service.icon_name}
                          onChange={(event) =>
                            setContent((prev) => {
                              const next = [...prev.services]
                              next[index] = { ...next[index], icon_name: event.target.value }
                              return { ...prev, services: next }
                            })
                          }
                        />
                      </label>
                      <label>
                        <span className="text-sm text-zinc-300">Title</span>
                        <input
                          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                          value={service.title}
                          onChange={(event) =>
                            setContent((prev) => {
                              const next = [...prev.services]
                              next[index] = { ...next[index], title: event.target.value }
                              return { ...prev, services: next }
                            })
                          }
                        />
                      </label>
                      <label>
                        <span className="text-sm text-zinc-300">Price</span>
                        <input
                          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                          value={service.price}
                          onChange={(event) =>
                            setContent((prev) => {
                              const next = [...prev.services]
                              next[index] = { ...next[index], price: event.target.value }
                              return { ...prev, services: next }
                            })
                          }
                        />
                      </label>
                      <label className="md:col-span-2">
                        <span className="text-sm text-zinc-300">Description</span>
                        <textarea
                          className="mt-2 w-full min-h-20 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                          value={service.description}
                          onChange={(event) =>
                            setContent((prev) => {
                              const next = [...prev.services]
                              next[index] = { ...next[index], description: event.target.value }
                              return { ...prev, services: next }
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {activeTab === 'media' ? (
            <>
              <SectionTitle
                title="Media"
                description="Use external URLs (CDN, Vercel Blob, Cloudinary) for images."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="text-sm text-zinc-300">Logo URL</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.images.logo}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, images: { ...prev.images, logo: event.target.value } }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">Hero Image URL</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.hero.heroImageUrl}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, heroImageUrl: event.target.value },
                        images: { ...prev.images, hero: event.target.value },
                      }))
                    }
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="text-sm text-zinc-300">Gallery URLs (one per line)</span>
                  <textarea
                    className="mt-2 w-full min-h-32 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.images.gallery.join('\n')}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        images: {
                          ...prev.images,
                          gallery: event.target.value
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        },
                      }))
                    }
                  />
                </label>
              </div>
            </>
          ) : null}

          {activeTab === 'footer' ? (
            <>
              <SectionTitle title="Footer" description="Contact details, social links, and copyright." />
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="text-sm text-zinc-300">Email</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.footer.contactEmail}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, footer: { ...prev.footer, contactEmail: event.target.value } }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">Phone</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.footer.phone}
                    onChange={(event) =>
                      setContent((prev) => ({ ...prev, footer: { ...prev.footer, phone: event.target.value } }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">LinkedIn</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.footer.socialLinks.linkedin}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialLinks: { ...prev.footer.socialLinks, linkedin: event.target.value },
                        },
                      }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">GitHub</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.footer.socialLinks.github}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialLinks: { ...prev.footer.socialLinks, github: event.target.value },
                        },
                      }))
                    }
                  />
                </label>
                <label>
                  <span className="text-sm text-zinc-300">X</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.footer.socialLinks.x}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialLinks: { ...prev.footer.socialLinks, x: event.target.value },
                        },
                      }))
                    }
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="text-sm text-zinc-300">Copyright Text</span>
                  <input
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                    value={content.footer.copyrightText}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        footer: { ...prev.footer, copyrightText: event.target.value },
                      }))
                    }
                  />
                </label>
              </div>
            </>
          ) : null}
        </div>

        {message ? <p className="mt-4 text-sm text-zinc-300">{message}</p> : null}
      </div>
    </div>
  )
}
