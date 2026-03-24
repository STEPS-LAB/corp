import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  createAdminToken,
  getAdminCookieName,
  getAdminSessionMaxAge,
  isAdminPasswordConfigured,
  verifyAdminPassword,
} from '@/lib/admin-auth'

type LoginSearchParams = Promise<{ error?: string; next?: string }>

async function loginAction(formData: FormData) {
  'use server'

  const password = String(formData.get('password') ?? '')
  const nextPath = String(formData.get('next') ?? '/admin/dashboard')

  if (!verifyAdminPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(nextPath)}`)
  }

  const token = await createAdminToken()
  cookies().set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: getAdminSessionMaxAge(),
  })
  redirect(nextPath)
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams
}) {
  const params = await searchParams
  const hasError = params.error === '1'
  const nextPath = params.next || '/admin/dashboard'
  const passwordConfigured = isAdminPasswordConfigured()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-zinc-800 bg-black/40 backdrop-blur rounded-2xl p-8">
        <p className="text-xs tracking-[0.22em] uppercase text-zinc-500">STEPS LAB</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-400">Secure access to your content dashboard.</p>

        {!passwordConfigured ? (
          <p className="mt-4 text-sm text-amber-400 leading-relaxed">
            <strong className="font-medium">ADMIN_PASSWORD</strong> is not set on this server. Local{' '}
            <code className="text-amber-200/90">.env.local</code> is not used on Vercel — add{' '}
            <strong className="font-medium">ADMIN_PASSWORD</strong> (and{' '}
            <strong className="font-medium">ADMIN_JWT_SECRET</strong>) under Project → Settings → Environment
            Variables, then redeploy.
          </p>
        ) : null}

        <form action={loginAction} className="mt-8 space-y-4">
          <input type="hidden" name="next" value={nextPath} />
          <label className="block">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500"
              placeholder="Enter admin password"
            />
          </label>

          {hasError && passwordConfigured ? (
            <p className="text-sm text-red-400">
              Invalid password. On production, use the value from Vercel env vars, not only{' '}
              <code className="text-red-300/90">.env.local</code>.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-white text-black py-3 font-medium transition hover:bg-zinc-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
