'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, Globe, Heart, Menu, X } from 'lucide-react'
import type { Locale } from '@/i18n/routing'

const LANGS = [
  { code: 'en' as Locale, label: 'EN' },
  { code: 'az' as Locale, label: 'AZ' },
  { code: 'ru' as Locale, label: 'RU' },
  { code: 'fr' as Locale, label: 'FR' },
]

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const switchPath = (code: Locale) => {
    const segs = pathname.split('/'); segs[1] = code; return segs.join('/')
  }

  const nav = [
    { href: `/${locale}/marketplace`, label: t('catalog') },
    { href: `/${locale}/collections`, label: t('collections') },
    { href: `/${locale}/artists`, label: t('artists') },
    { href: `/${locale}/about`, label: t('about') },
  ]

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        ...(scrolled ? {
          background: 'rgba(247,246,243,0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(227,223,216,0.8)',
          boxShadow: '0 1px 20px rgba(0,0,0,0.06)',
        } : {
          background: 'transparent',
          borderBottom: '1px solid transparent',
        })
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', height: 68, gap: 0 }}>

          {/* Logo */}
          <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, marginRight: 'auto' }}>
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.12em', color: 'var(--ink)', fontWeight: 400 }}>KHAZAR</span>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'block', flexShrink: 0 }} />
            <span className="font-display" style={{ fontSize: '1.375rem', letterSpacing: '0.12em', color: 'var(--ink)', fontWeight: 400 }}>ARTS</span>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginRight: '1.5rem' }} className="hidden md:flex">
            {nav.map(({ href, label }) => {
              const active = pathname.startsWith(href)
              return (
                <Link key={href} href={href} style={{
                  textDecoration: 'none', padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.01em',
                  color: active ? 'var(--ink)' : 'var(--muted)',
                  background: active ? 'rgba(15,15,14,0.07)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}>
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="hidden md:flex">
            {/* Search pill */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)',
              background: 'rgba(15,15,14,0.05)', border: '1px solid var(--border)',
              cursor: 'pointer', color: 'var(--muted)', fontSize: '0.8125rem',
              fontFamily: 'var(--font-inter)', transition: 'all 0.15s ease',
            }}>
              <Search size={13} strokeWidth={2} />
              Search artworks
            </button>

            {/* Lang */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setLangOpen(!langOpen)} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-full)',
                background: 'none', border: '1px solid var(--border)',
                cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                color: 'var(--muted)', letterSpacing: '0.06em',
                fontFamily: 'var(--font-inter)', transition: 'all 0.15s ease',
              }}>
                <Globe size={12} strokeWidth={2} />
                {locale.toUpperCase()}
              </button>
              {langOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setLangOpen(false)} />
                  <div style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                    background: 'white', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden', zIndex: 20, minWidth: 120,
                    padding: '0.4rem',
                  }}>
                    {LANGS.map(({ code, label }) => (
                      <Link key={code} href={switchPath(code)} onClick={() => setLangOpen(false)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.6rem 0.875rem', borderRadius: 'var(--radius-sm)',
                        textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500,
                        color: code === locale ? 'var(--ink)' : 'var(--muted)',
                        background: code === locale ? 'var(--bg)' : 'transparent',
                        transition: 'background 0.1s ease',
                      }}>
                        {label === 'EN' ? 'English' : label === 'AZ' ? 'Azərbaycan' : label === 'RU' ? 'Русский' : 'Français'}
                        <span style={{ fontSize: '0.7rem', color: 'var(--border2)', fontWeight: 700 }}>{label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button style={{
              width: 38, height: 38, borderRadius: 'var(--radius-full)',
              background: 'none', border: '1px solid var(--border)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', transition: 'all 0.15s ease',
            }}>
              <Heart size={15} strokeWidth={2} />
            </button>

            <Link href={`/${locale}/auth/sign-in`} style={{
              textDecoration: 'none', padding: '0.6rem 1.25rem',
              background: 'var(--ink)', color: 'white',
              borderRadius: 'var(--radius-full)', fontSize: '0.8125rem',
              fontWeight: 500, transition: 'all 0.2s ease',
            }}>
              Sign in
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink)', padding: '0.5rem',
          }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(247,246,243,0.97)',
          backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          paddingTop: 68,
        }}>
          <nav style={{ padding: '2rem 1.5rem', flex: 1 }}>
            {nav.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                display: 'block', textDecoration: 'none',
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '2.5rem', fontWeight: 400, color: 'var(--ink)',
                padding: '0.75rem 0', borderBottom: '1px solid var(--border)',
                letterSpacing: '-0.01em',
              }}>
                {label}
              </Link>
            ))}
          </nav>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              {LANGS.map(({ code, label }) => (
                <Link key={code} href={switchPath(code)} onClick={() => setMobileOpen(false)} style={{
                  padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)',
                  background: code === locale ? 'var(--ink)' : 'white',
                  color: code === locale ? 'white' : 'var(--muted)',
                  border: '1px solid var(--border)', textDecoration: 'none',
                  fontSize: '0.8125rem', fontWeight: 600,
                }}>
                  {label}
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/auth/sign-in`} onClick={() => setMobileOpen(false)} className="btn btn-ink" style={{ width: '100%', padding: '0.9rem' }}>
              Sign in
            </Link>
          </div>
        </div>
      )}

      <div style={{ height: 68 }} />
    </>
  )
}
