'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Search, Heart, Menu, X } from 'lucide-react'
import type { Locale } from '@/i18n/routing'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mob, setMob] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const nav = [
    { href:'/marketplace' as const, label:t('catalog') },
    { href:'/collections' as const, label:t('collections') },
    { href:'/artists'     as const, label:t('artists') },
    { href:'/about'       as const, label:t('about') },
  ]

  return (
    <>
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        transition:'all .3s cubic-bezier(.4,0,.2,1)',
        background: scrolled ? 'rgba(249,248,245,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,.06)' : 'none',
      }}>
        <div className="wrap" style={{ display:'flex', alignItems:'center', height:64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:6, marginRight:'auto' }}>
            <span className="display" style={{ fontSize:'1.3125rem', letterSpacing:'.12em', color:'var(--ink)' }}>KHAZAR</span>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--gold)', flexShrink:0 }} />
            <span className="display" style={{ fontSize:'1.3125rem', letterSpacing:'.12em', color:'var(--ink)' }}>ARTS</span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display:'flex', gap:2, marginRight:'1.25rem' }} className="hidden md:flex">
            {nav.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                textDecoration:'none', padding:'.42rem .825rem',
                borderRadius:'var(--r-pill)', fontSize:'.8125rem', fontWeight:500,
                color: pathname === href ? 'var(--ink)' : 'var(--muted)',
                background: pathname === href ? 'rgba(17,17,16,.07)' : 'transparent',
                transition:'all .15s ease',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display:'flex', alignItems:'center', gap:6 }} className="hidden md:flex">
            <button style={{
              display:'flex', alignItems:'center', gap:7,
              padding:'.45rem .9rem', borderRadius:'var(--r-pill)',
              background:'rgba(17,17,16,.05)', border:'1px solid var(--border)',
              cursor:'pointer', color:'var(--muted)', fontSize:'.8rem',
            }}>
              <Search size={12} strokeWidth={2.2} />
              {t('search')}
            </button>

            <LanguageSwitcher locale={locale} />

            <button style={{
              width:36, height:36, borderRadius:'var(--r-pill)',
              background:'none', border:'1px solid var(--border)',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)',
            }}>
              <Heart size={14} strokeWidth={2} />
            </button>

            <Link href="/auth/sign-in" className="btn-base btn-dark" style={{ padding:'.55rem 1.2rem', fontSize:'.8rem' }}>
              {t('sign_in_short')}
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMob(!mob)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--ink)', padding:'.5rem' }}>
            {mob ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </header>

      {mob && (
        <div style={{ position:'fixed', inset:0, zIndex:99, background:'rgba(249,248,245,.97)', backdropFilter:'blur(24px)', display:'flex', flexDirection:'column', paddingTop:64 }}>
          <nav style={{ padding:'1.75rem 1.5rem', flex:1 }}>
            {nav.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMob(false)} style={{
                display:'block', textDecoration:'none',
                fontFamily:'var(--font-cormorant),Georgia,serif',
                fontSize:'2.25rem', fontWeight:400, color:'var(--ink)',
                padding:'.65rem 0', borderBottom:'1px solid var(--border)',
              }}>
                {label}
              </Link>
            ))}
          </nav>
          <div style={{ padding:'1.25rem 1.5rem', display:'flex', flexDirection:'column', gap:10 }}>
            <LanguageSwitcher locale={locale} />
            <Link href="/auth/sign-in" onClick={() => setMob(false)} className="btn-base btn-dark" style={{ width:'100%', padding:'.875rem' }}>
              {t('sign_in_short')}
            </Link>
          </div>
        </div>
      )}

      <div style={{ height:64 }} />
    </>
  )
}
