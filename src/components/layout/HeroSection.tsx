'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Locale } from '@/i18n/routing'

interface HeroSectionProps {
  locale: Locale
}

// Placeholder slides — will be replaced by real artwork images from Supabase
const DEMO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=80',
    artist: 'Elena Vasquez',
    title: 'Morning Composition No. 4',
    year: '2024',
    medium: 'Oil on canvas',
    price: '$4,800',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    artist: 'Arash Moradiani',
    title: 'Towards the Light',
    year: '2023',
    medium: 'Acrylic · 120 × 90 cm',
    price: '$3,200',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1600&q=80',
    artist: 'Nadia Petrov',
    title: 'Still Life with Blue',
    year: '2024',
    medium: 'Watercolor · 60 × 80 cm',
    price: '$1,900',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80',
    artist: 'Karim Al-Rashid',
    title: 'Desert Geometry',
    year: '2023',
    medium: 'Mixed media · 100 × 100 cm',
    price: '$6,500',
  },
]

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home')
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setIsTransitioning(false)
    }, 150)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % DEMO_SLIDES.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + DEMO_SLIDES.length) % DEMO_SLIDES.length)
  }, [current, goTo])

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = DEMO_SLIDES[current]

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#F8F7F4' }}
      aria-label="Featured artworks"
    >
      <div className="content-container">
        <div
          className="grid gap-6 md:gap-10 items-center py-10 md:py-14"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >

          {/* LEFT: text + info */}
          <div className="flex flex-col justify-between h-full order-2 md:order-1">

            {/* Eyebrow */}
            <div>
              <p
                className="text-label mb-6"
                style={{ color: 'var(--color-gold)', fontSize: '0.6875rem' }}
              >
                {t('hero_eyebrow')}
              </p>

              {/* Slide info — animates on change */}
              <div
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                <p
                  className="text-label mb-2"
                  style={{ color: 'var(--color-text-muted)', fontSize: '0.6875rem' }}
                >
                  {slide.artist}
                </p>
                <h1
                  className="font-display mb-3"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1,
                    color: '#1A1917',
                  }}
                >
                  {slide.title}
                </h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                  {slide.medium} · {slide.year}
                </p>
                <p
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: '#1A1917',
                    marginBottom: '1.75rem',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {slide.price}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link href={`/${locale}/marketplace`} className="btn-primary">
                    View artwork →
                  </Link>
                  <Link href={`/${locale}/marketplace`} className="btn-secondary">
                    {t('hero_cta')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom: controls + counter */}
            <div className="flex items-center gap-4 mt-10">
              {/* Prev / Next */}
              <button
                onClick={prev}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150"
                style={{
                  background: 'white',
                  border: '1px solid #E2DDD6',
                  cursor: 'pointer',
                  color: '#1A1917',
                }}
                aria-label="Previous artwork"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150"
                style={{
                  background: '#1A1917',
                  border: '1px solid #1A1917',
                  cursor: 'pointer',
                  color: 'white',
                }}
                aria-label="Next artwork"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5 ml-2">
                {DEMO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      width: i === current ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === current ? '#1A1917' : '#D4D0C9',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <span
                className="ml-auto font-display"
                style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
              >
                {String(current + 1).padStart(2, '0')} / {String(DEMO_SLIDES.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* RIGHT: artwork image */}
          <div className="relative order-1 md:order-2">

            {/* Main image with cross-fade */}
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                aspectRatio: '4/5',
                maxHeight: '70vh',
                background: '#E8E5DF',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              }}
            >
              {DEMO_SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transition: 'opacity 0.9s ease',
                  }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              ))}

              {/* Subtle overlay at bottom for label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
                  borderRadius: '0 0 12px 12px',
                }}
              />

              {/* Featured badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'var(--color-gold)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.625rem',
                  borderRadius: 3,
                }}
              >
                Featured
              </div>
            </div>

            {/* Small thumbnail previews */}
            <div
              className="hidden md:flex gap-2 mt-3 justify-end"
            >
              {DEMO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  style={{
                    width: 48,
                    height: 60,
                    borderRadius: 6,
                    overflow: 'hidden',
                    border: i === current ? '2px solid #1A1917' : '2px solid transparent',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: i === current ? 1 : 0.5,
                    transition: 'opacity 0.3s ease, border-color 0.3s ease',
                    flexShrink: 0,
                  }}
                  aria-label={`Slide ${i + 1}`}
                >
                  <img
                    src={s.image}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
