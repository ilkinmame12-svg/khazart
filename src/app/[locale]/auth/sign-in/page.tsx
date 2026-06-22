'use client'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'

export default function SignInPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      {/* Background blur shapes */}
      <div style={{ position: 'fixed', top: '20%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '20%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,15,14,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.12em', color: 'var(--ink)' }}>KHAZAR</span>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'block' }} />
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.12em', color: 'var(--ink)' }}>ARTS</span>
          </Link>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-xl)' }}>
          <h1 className="font-display" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.375rem' }}>Welcome back</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '2rem' }}>Sign in to your account</p>

          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '0.8rem', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', marginBottom: '1.5rem', color: 'var(--ink)', fontFamily: 'var(--font-inter)', boxShadow: 'var(--shadow-sm)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <form onSubmit={e => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1500) }}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="field-input" placeholder="you@example.com" required />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="field-label" style={{ margin: 0 }}>Password</label>
                <Link href="#" style={{ fontSize: '0.8125rem', color: 'var(--muted)', textDecoration: 'none' }}>Forgot?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="field-input" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', background: loading ? 'var(--muted)' : 'var(--ink)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-inter)', transition: 'background 0.2s' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
            No account?{' '}
            <Link href={`/auth/sign-up`} style={{ color: 'var(--ink)', fontWeight: 500, textDecoration: 'none' }}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
