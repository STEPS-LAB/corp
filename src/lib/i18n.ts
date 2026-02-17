export type Locale = 'en' | 'uk'

export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const DEFAULT_LOCALE: Locale = 'en'
export const SUPPORTED_LOCALES: Locale[] = ['en', 'uk']

export function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : undefined
}

export function replaceParams(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`))
}
