import { SignJWT, jwtVerify } from 'jose'

const ADMIN_SESSION_COOKIE = 'stepslab_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || ''
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

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD
  if (!configured) return false
  return password === configured
}
