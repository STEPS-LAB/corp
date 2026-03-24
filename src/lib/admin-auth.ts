import { SignJWT, jwtVerify } from 'jose'

const ADMIN_SESSION_COOKIE = 'stepslab_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12

/** .env on Windows can include `\r`; copy-paste can add spaces — normalize before compare. */
function readAdminPasswordFromEnv(): string | undefined {
  const raw = process.env.ADMIN_PASSWORD
  if (raw == null || raw === '') return undefined
  let s = String(raw).replace(/\r/g, '').trim()
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim()
  }
  return s.length > 0 ? s : undefined
}

function getJwtSecret(): Uint8Array {
  const secret =
    (process.env.ADMIN_JWT_SECRET?.replace(/\r/g, '').trim() || '') ||
    readAdminPasswordFromEnv() ||
    ''
  return new TextEncoder().encode(secret)
}

export function getAdminCookieName(): string {
  return ADMIN_SESSION_COOKIE
}

export function getAdminSessionMaxAge(): number {
  return SESSION_MAX_AGE_SECONDS
}

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecret())
}

export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(token, getJwtSecret())
    return true
  } catch {
    return false
  }
}

export function isAdminPasswordConfigured(): boolean {
  return readAdminPasswordFromEnv() !== undefined
}

export function verifyAdminPassword(password: string): boolean {
  const configured = readAdminPasswordFromEnv()
  if (!configured) return false
  const input = String(password).replace(/\r/g, '').trim()
  return input === configured
}
