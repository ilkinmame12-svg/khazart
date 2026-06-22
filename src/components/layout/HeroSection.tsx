'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Locale } from '@/i18n/routing'

const SLIDES = [
  { id: 1, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=85', artist: 'Elena Vasquez', title: 'Golden Hour', medium: 'Oil on canvas · 120 × 90 cm', year: 2024, price: '$4,800' },
  { id: 2, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85', artist: 'Arash Moradiani', title: 'Blue Silence', medium: 'Acrylic · 100 × 80 cm', year: 2023, price: '$3,200' },
  { id: 3, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=85', artist: 'Karim Al-Rashid', title: 'Desert Memory', medium: 'Mixed media · 100 × 100 cm', year: 2023, price: '$6,500' },
  { id: 4, img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1600&q=85', artist: 'Nadia Petrov', title: 'Soft Geometry', medium: 'Watercolor · 80 × 60 cm', year: 2024, price: '$1,900' },
]

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState(1)

  const go = useCallback((next: number) => {
    setDir(next > cur ? 1 : -1)
    setPrev(cur)
    setCur(next)
    setTimeout(() => setPrev(null), 800)
  }, [cur])

  const next = useCallback(() => go((cur + 1) % SLIDES.length), [cur, go])
  const back = useCallback(() => go((cur - 1 + SLIDES.length) % SLIDES.length), [cur, go])

  useEffect(() => {
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next])

  const slide = SLIDES[cur]

  return (
    <section style={{ position: 'relative', height: 'calc(100vh - 68px)', minHeight: 600, overflow: 'hidden', background: '#0F0F0E' }}>

      {/* Background slides */}
      {SLIDES.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute', inset: 0,
          opacity: i === cur ? 1 : i === prev ? 0 : 0,
          transition: 'opacity 1s ease',
          zIndex: i === cur ? 1 : i === prev ? 0 : 0,
        }}>
          <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: i === cur ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 8s ease',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(15,15,14,0.72) 0%, rgba(15,15,14,0.3) 55%, rgba(15,15,14,0.15) 100%)' }} />
        </div>
      ))}

      {/* Content */}
      <div className="wrap" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: 680 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
            <span className="label" style={{ color: 'var(--gold)', fontSize: '0.625rem' }}>{t('hero_eyebrow')}</span>
          </div>

          {/* Artist + Title */}
          <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {slide.artist}
          </p>
          <h1 className="font-display" style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 300,
            color: 'white', letterSpacing: '-0.03em', lineHeight: 0.95,
            marginBottom: '1.25rem',
          }}>
            {slide.title}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem' }}>
            {slide.medium} · {slide.year}
          </p>

          {/* Price + CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="glass-dark" style={{ padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-inter)' }}>{slide.price}</span>
            </div>
            <Link href={`/${locale}/marketplace`} className="btn btn-glass" style={{ padding: '0.75rem 1.5rem' }}>
              View artwork <ArrowRight size={14} />
            </Link>
            <Link href={`/${locale}/marketplace`} style={{
              textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500,
              color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 5,
              transition: 'color 0.2s ease',
            }}>
              {t('hero_cta')}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 'clamp(2.5rem, 5vw, 4rem)', right: 'clamp(1.25rem, 4vw, 3.5rem)', display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Thumbnails */}
          <div style={{ display: 'none', gap: 6 }} className="md:flex">
            {SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => go(i)} style={{
                width: 44, height: 56, borderRadius: 8, overflow: 'hidden',
                border: `2px solid ${i === cur ? 'white' : 'transparent'}`,
                opacity: i === cur ? 1 : 0.45, padding: 0, cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}>
                <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={back} style={{
              width: 40, height: 40, borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)', color: 'white',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} style={{
              width: 40, height: 40, borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)', color: 'white',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Counter */}
          <span className="font-display" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', minWidth: 36 }}>
            {String(cur + 1).padStart(2,'0')}/{String(SLIDES.length).padStart(2,'0')}
          </span>
        </div>

        {/* Dot indicators mobile */}
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }} className="md:hidden">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === cur ? 20 : 6, height: 6,
              borderRadius: 'var(--radius-full)',
              background: i === cur ? 'white' : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
