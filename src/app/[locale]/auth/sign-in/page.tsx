'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignInPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.1em', color: '#1A1917' }}>KHAZAR</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.1em', color: '#1A1917' }}>ARTS</span>
          </Link>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: '2.5rem', border: '1px solid #E2DDD6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h1 className="font-display" style={{ fontSize: '1.875rem', fontWeight: 400, textAlign: 'center', marginBottom: '0.375rem' }}>Welcome back</h1>
          <p style={{ fontSize: '0.9rem', color: '#A09D99', textAlign: 'center', marginBottom: '2rem' }}>Sign in to your account</p>

          {/* Google */}
          <button
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '0.8rem', background: 'white', border: '1px solid #E2DDD6', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer', marginBottom: '1.25rem', color: '#1A1917', fontFamily: 'var(--font-inter)', transition: 'border-color 0.2s ease' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 1, background: '#E2DDD6' }} />
            <span style={{ fontSize: '0.8125rem', color: '#A09D99' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#E2DDD6' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="you@example.com" required />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <Link href={`/${locale}/auth/forgot-password`} style={{ fontSize: '0.8125rem', color: '#6B6865', textDecoration: 'none' }}>Forgot?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.9rem', background: loading ? '#6B6865' : '#1A1917', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-inter)', transition: 'background 0.2s ease' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B6865', marginTop: '1.5rem' }}>
            Don&apos;t have an account?{' '}
            <Link href={`/${locale}/auth/sign-up`} style={{ color: '#1A1917', fontWeight: 500, textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#A09D99', marginTop: '1.5rem' }}>
          By signing in you agree to our{' '}
          <Link href={`/${locale}/terms`} style={{ color: '#6B6865', textDecoration: 'none' }}>Terms</Link> and{' '}
          <Link href={`/${locale}/privacy`} style={{ color: '#6B6865', textDecoration: 'none' }}>Privacy policy</Link>
        </p>
      </div>
    </div>
  )
}
