'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function SignUpPage() {
  const t = useTranslations('auth')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'collector'|'artist'>('collector')
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ width:'100%', maxWidth:420, position:'relative' }}>
        <div style={{ textAlign:'center', marginBottom:'1.75rem' }}>
          <Link href="/" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:7 }}>
            <span className="display" style={{ fontSize:'1.25rem', letterSpacing:'.12em', color:'var(--ink)' }}>KHAZAR</span>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--gold)', display:'block' }} />
            <span className="display" style={{ fontSize:'1.25rem', letterSpacing:'.12em', color:'var(--ink)' }}>ARTS</span>
          </Link>
        </div>

        <div style={{ background:'rgba(255,255,255,.82)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', borderRadius:'var(--r-xl)', padding:'2.25rem', border:'1px solid rgba(255,255,255,.5)', boxShadow:'var(--sh-xl)' }}>
          <h1 className="display" style={{ fontSize:'1.875rem', textAlign:'center', marginBottom:'.3rem' }}>{t('sign_up')}</h1>
          <p style={{ fontSize:'.875rem', color:'var(--muted)', textAlign:'center', marginBottom:'1.75rem' }}>Join KHazar Arts</p>

          {/* Role selector */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:'1.375rem' }}>
            {(['collector','artist'] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)} style={{ padding:'.8rem', border:`2px solid ${role===r?'var(--ink)':'var(--border)'}`, borderRadius:'var(--r-md)', background: role===r?'var(--ink)':'#fff', color: role===r?'#fff':'var(--muted)', cursor:'pointer', fontFamily:'var(--font-inter)', fontWeight:500, fontSize:'.875rem', transition:'all .15s', textTransform:'capitalize' }}>
                {r === 'collector' ? '🎨 Collector' : '✏️ Artist'}
              </button>
            ))}
          </div>
          {role === 'artist' && (
            <p style={{ fontSize:'.8125rem', color:'#a0742a', background:'#FFF8EC', padding:'.6rem .875rem', borderRadius:'var(--r-md)', marginBottom:'1.125rem', lineHeight:1.5 }}>
              Artist accounts are reviewed by our curatorial team.
            </p>
          )}

          <form onSubmit={e => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1500) }}>
            <div style={{ marginBottom:'.875rem' }}>
              <label className="f-label">{t('full_name')}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="f-input" placeholder="Your name" required />
            </div>
            <div style={{ marginBottom:'.875rem' }}>
              <label className="f-label">{t('email')}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="f-input" placeholder="you@example.com" required />
            </div>
            <div style={{ marginBottom:'1.375rem' }}>
              <label className="f-label">{t('password')}</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="f-input" placeholder="At least 8 characters" minLength={8} required />
            </div>
            <button type="submit" disabled={loading} style={{ width:'100%', padding:'.875rem', background: loading?'var(--muted)':'var(--ink)', color:'#fff', border:'none', borderRadius:'var(--r-md)', fontSize:'.9375rem', fontWeight:500, cursor: loading?'not-allowed':'pointer', fontFamily:'var(--font-inter)', transition:'background .2s' }}>
              {loading ? '...' : t('create_account')}
            </button>
          </form>

          <p style={{ textAlign:'center', fontSize:'.875rem', color:'var(--muted)', marginTop:'1.375rem' }}>
            {t('have_account')}{' '}
            <Link href="/auth/sign-in" style={{ color:'var(--ink)', fontWeight:500, textDecoration:'none' }}>{t('sign_in')} →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
