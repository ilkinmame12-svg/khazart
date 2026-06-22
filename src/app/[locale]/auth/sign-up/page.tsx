'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'

export default function SignUpPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'collector' | 'artist'>('collector')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.1em', color: '#1A1917' }}>KHAZAR</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.1em', color: '#1A1917' }}>ARTS</span>
          </Link>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: '2.5rem', border: '1px solid #E2DDD6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h1 className="font-display" style={{ fontSize: '1.875rem', fontWeight: 400, textAlign: 'center', marginBottom: '0.375rem' }}>Create account</h1>
          <p style={{ fontSize: '0.9rem', color: '#A09D99', textAlign: 'center', marginBottom: '1.75rem' }}>Join the KHazar Arts community</p>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
            {(['collector', 'artist'] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                style={{
                  padding: '0.875rem', border: `2px solid ${role === r ? '#1A1917' : '#E2DDD6'}`,
                  borderRadius: 8, background: role === r ? '#1A1917' : 'white',
                  color: role === r ? 'white' : '#6B6865', cursor: 'pointer',
                  fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '0.875rem',
                  transition: 'all 0.15s ease', textTransform: 'capitalize',
                }}>
                {r === 'collector' ? '🎨 Collector' : '✏️ Artist'}
              </button>
            ))}
          </div>
          {role === 'artist' && (
            <p style={{ fontSize: '0.8125rem', color: '#C9AA72', background: '#FFF9EE', padding: '0.625rem 0.875rem', borderRadius: 6, marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Artist accounts are subject to curatorial review. You will be able to submit works after verification.
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" placeholder="Your name" required />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="you@example.com" required />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" placeholder="At least 8 characters" minLength={8} required />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.9rem', background: loading ? '#6B6865' : '#1A1917', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-inter)', transition: 'background 0.2s ease' }}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B6865', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link href={`/auth/sign-in`} style={{ color: '#1A1917', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
