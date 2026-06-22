import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import type { Locale } from '@/i18n/routing'

interface AboutSectionProps {
  artistCount: number
  artworkCount: number
  locale: Locale
}

export default async function AboutSection({ artistCount, artworkCount, locale }: AboutSectionProps) {
  const t = await getTranslations('home')

  const stats = [
    { value: artistCount || '50+', label: t('stats_artists') },
    { value: artworkCount || '300+', label: t('stats_works') },
    { value: '28+', label: t('stats_countries') },
    { value: '200+', label: t('stats_collectors') },
  ]

  return (
    <section
      className="section"
      style={{ background: '#1A1917' }}
    >
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text */}
          <div>
            <p className="text-label mb-4" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem' }}>
              About the platform
            </p>
            <h2
              className="font-display mb-5"
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                fontWeight: 400,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {t('about_intro_headline')}
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '2rem' }}>
              {t('about_intro_body')}
            </p>
            <Link
              href={`/${locale}/apply`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.5rem',
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 4,
                fontSize: '0.8125rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'border-color 0.2s ease',
                letterSpacing: '0.04em',
              }}
            >
              Apply as artist →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '1.25rem',
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                    fontWeight: 300,
                    color: 'white',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.4rem',
                  }}
                >
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
                <p className="text-label" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.625rem' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
