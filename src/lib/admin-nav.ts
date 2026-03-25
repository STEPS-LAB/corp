export type AdminView =
  | { kind: 'dashboard' }
  | { kind: 'pages'; page: 'home' | 'about' | 'contacts' | 'footer' }
  | { kind: 'services' }
  | { kind: 'portfolio' }
  | { kind: 'lab' }
  | { kind: 'media' }

/** Old tab URLs → new sidebar paths (use from a Server Component with `redirect()`). */
export const ADMIN_LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  general: '/admin/pages/home',
  cases: '/admin/portfolio',
  concepts: '/admin/lab',
}

export function adminViewFromSlug(slug: string[] | undefined): AdminView {
  const s = slug ?? []
  if (s.length === 0) return { kind: 'dashboard' }
  const [a, b] = s
  if (a === 'pages' && b === 'home') return { kind: 'pages', page: 'home' }
  if (a === 'pages' && b === 'about') return { kind: 'pages', page: 'about' }
  if (a === 'pages' && b === 'contacts') return { kind: 'pages', page: 'contacts' }
  if (a === 'pages' && b === 'footer') return { kind: 'pages', page: 'footer' }
  if (a === 'services') return { kind: 'services' }
  if (a === 'portfolio') return { kind: 'portfolio' }
  if (a === 'lab') return { kind: 'lab' }
  if (a === 'media') return { kind: 'media' }
  return { kind: 'dashboard' }
}

export function pathForAdminView(v: AdminView): string {
  switch (v.kind) {
    case 'dashboard':
      return '/admin'
    case 'pages':
      return `/admin/pages/${v.page}`
    case 'services':
      return '/admin/services'
    case 'portfolio':
      return '/admin/portfolio'
    case 'lab':
      return '/admin/lab'
    case 'media':
      return '/admin/media'
    default:
      return '/admin'
  }
}
