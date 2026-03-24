import { createClient } from 'redis'
import { DEFAULT_SITE_CONTENT, sanitizeSiteContent, type SiteContent } from '@/lib/content'

const CONTENT_KEY = 'site:content'

type RedisClient = ReturnType<typeof createClient>

declare global {
  // Reuse one TCP connection per warm Node process (helps on Vercel serverless).
  // eslint-disable-next-line no-var
  var __stepslabRedis: RedisClient | undefined
}

function getRedisUrl(): string {
  const url = process.env.REDIS_URL?.trim()
  if (!url) {
    throw new Error('REDIS_URL is not set. Add your redis://... URL to environment variables.')
  }
  return url
}

async function getRedis(): Promise<RedisClient> {
  const url = getRedisUrl()

  if (!globalThis.__stepslabRedis) {
    const client = createClient({ url })
    client.on('error', (err) => console.error('[redis]', err))
    globalThis.__stepslabRedis = client
  }

  const client = globalThis.__stepslabRedis
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}

export async function getSiteContent(): Promise<SiteContent> {
  const redis = await getRedis()
  const raw = await redis.get(CONTENT_KEY)
  if (!raw) return DEFAULT_SITE_CONTENT
  try {
    return sanitizeSiteContent(JSON.parse(raw) as unknown)
  } catch {
    return DEFAULT_SITE_CONTENT
  }
}

export async function setSiteContent(content: unknown): Promise<SiteContent> {
  const sanitized = sanitizeSiteContent(content)
  const redis = await getRedis()
  await redis.set(CONTENT_KEY, JSON.stringify(sanitized))
  return sanitized
}
