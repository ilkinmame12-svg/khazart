'use client'

import { useParams, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { useState } from 'react'

const LANGS = [
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'az', label: 'Azərbaycan', native: 'AZ' },
  { code: 'ru', label: 'Русский', native: 'RU' },
  { code: 'fr', label: 'Français', native: 'FR' },
]

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() // e.g. /en/marketplace

  const switchTo = (code: string) => {
    // Replace the locale segment in the URL
    const segments = pathname.split('/')
    segments[1] = code
    const newPath = segments.join('/')
    window.location.href = newPath
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-full)',
          background: 'none', border: '1px solid var(--border)',
          cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
          color: 'var(--muted)', letterSpacing: '0.06em',
          fontFamily: 'var(--font-inter)',
        }}
      >
        <Globe size={12} strokeWidth={2} />
        {locale.toUpperCase()}
      </button>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            background: 'white', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden', zIndex: 20, minWidth: 152, padding: '0.4rem',
          }}>
            {LANGS.map(({ code, label, native }) => (
              <button
                key={code}
                onClick={() => { switchTo(code); setOpen(false) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.875rem', borderRadius: 'var(--radius-sm)',
                  border: 'none', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: code === locale ? 600 : 400,
                  fontFamily: 'var(--font-inter)',
                  color: code === locale ? 'var(--ink)' : 'var(--muted)',
                  background: code === locale ? 'var(--bg)' : 'transparent',
                  textAlign: 'left',
                }}
              >
                {label}
                <span style={{ fontSize: '0.7rem', color: 'var(--border2)', fontWeight: 700 }}>{native}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
