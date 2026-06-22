'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Menu, X, Globe, Search, Heart, ShoppingBag } from 'lucide-react'
import type { Locale } from '@/i18n/routing'

interface HeaderProps {
  locale: Locale
}

const LANGUAGES = [
  { code: 'en' as Locale, label: 'English', native: 'EN' },
  { code: 'az' as Locale, label: 'Azərbaycan', native: 'AZ' },
  { code: 'ru' as Locale, label: 'Русский', native: 'RU' },
  { code: 'fr' as Locale, label: 'Français', native: 'FR' },
]

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getLocalePath = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  const navLinks = [
    { href: `/${locale}/marketplace`, label: t('catalog') },
    { href: `/${locale}/collections`, label: t('collections') },
    { href: `/${locale}/artists`, label: t('artists') },
    { href: `/${locale}/about`, label: t('about') },
  ]

  const currentLang = LANGUAGES.find((l) => l.code === locale)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
        style={{
          borderBottom: scrolled ? '1px solid #E2DDD6' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="no-underline flex items-center gap-2"
            >
              <span
                className="font-display"
                style={{
                  fontSize: '1.5rem',
                  letterSpacing: '0.08em',
                  color: '#1A1917',
                  fontWeight: 400,
                }}
              >
                KHAZAR
              </span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  display: 'inline-block',
                  marginBottom: 2,
                  flexShrink: 0,
                }}
              />
              <span
                className="font-display"
                style={{
                  fontSize: '1.5rem',
                  letterSpacing: '0.08em',
                  color: '#1A1917',
                  fontWeight: 400,
                }}
              >
                ARTS
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-label no-underline transition-colors duration-200"
                  style={{
                    color: pathname.startsWith(href) ? '#1A1917' : '#A09D99',
                    fontSize: '0.75rem',
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">

              {/* Search */}
              <button
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full text-xs"
                style={{
                  background: '#F0EDE8',
                  color: '#6B6865',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <Search size={13} />
                <span>Search artworks…</span>
              </button>

              {/* Lang */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#A09D99',
                    letterSpacing: '0.06em',
                    padding: '4px 6px',
                  }}
                >
                  <Globe size={13} />
                  {currentLang?.native}
                </button>

                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                    <div
                      className="absolute right-0 top-full mt-1 z-20 bg-white rounded-lg overflow-hidden"
                      style={{ border: '1px solid #E2DDD6', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 148 }}
                    >
                      {LANGUAGES.map(({ code, label, native }) => (
                        <Link
                          key={code}
                          href={getLocalePath(code)}
                          onClick={() => setLangOpen(false)}
                          className="no-underline flex items-center justify-between px-4 py-2.5 transition-colors duration-150"
                          style={{
                            fontSize: '0.8125rem',
                            color: code === locale ? '#1A1917' : '#6B6865',
                            background: code === locale ? '#F8F7F4' : 'white',
                            fontWeight: code === locale ? 500 : 400,
                          }}
                        >
                          <span>{label}</span>
                          <span style={{ color: '#A09D99', fontSize: '0.7rem', fontWeight: 600 }}>{native}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Saved */}
              <button
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A09D99' }}
                aria-label="Saved artworks"
              >
                <Heart size={17} />
              </button>

              {/* Sign in */}
              <Link
                href={`/${locale}/auth/sign-in`}
                className="hidden md:block no-underline text-xs font-medium px-4 py-2 rounded-full transition-colors duration-150"
                style={{
                  background: '#1A1917',
                  color: 'white',
                  letterSpacing: '0.03em',
                }}
              >
                Sign in
              </Link>

              {/* Mobile toggle */}
              <button
                className="md:hidden p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1917' }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col md:hidden" style={{ paddingTop: 64 }}>
          <nav className="flex flex-col px-6 py-6 gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-display no-underline py-4 border-b"
                style={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: '#1A1917',
                  borderColor: '#F0EDE8',
                  letterSpacing: '-0.01em',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-8 flex flex-col gap-3 mt-auto">
            <div className="flex gap-2 mb-2">
              {LANGUAGES.map(({ code, native }) => (
                <Link
                  key={code}
                  href={getLocalePath(code)}
                  onClick={() => setMobileOpen(false)}
                  className="no-underline px-3 py-2 rounded text-xs font-medium transition-colors"
                  style={{
                    background: code === locale ? '#1A1917' : '#F0EDE8',
                    color: code === locale ? 'white' : '#6B6865',
                    letterSpacing: '0.08em',
                  }}
                >
                  {native}
                </Link>
              ))}
            </div>
            <Link
              href={`/${locale}/auth/sign-in`}
              onClick={() => setMobileOpen(false)}
              className="btn-primary justify-center text-center"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 64 }} />
    </>
  )
}
