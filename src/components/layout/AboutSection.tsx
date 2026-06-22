import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'

export default async function AboutSection({ artistCount, artworkCount, locale }: { artistCount: number, artworkCount: number, locale: Locale }) {
  const t = await getTranslations('home')
  const stats = [
    { v: artistCount || '50+', l: t('stats_artists') },
    { v: artworkCount || '300+', l: t('stats_works') },
    { v: '28+', l: t('stats_countries') },
    { v: '200+', l: t('stats_collectors') },
  ]

  return (
    <section style={{ background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="wrap section" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 7rem)', alignItems: 'center' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
              <span className="label" style={{ color: 'var(--gold)', fontSize: '0.625rem' }}>About the platform</span>
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300,
              color: 'white', marginBottom: '1.25rem', lineHeight: 1.05,
            }}>
              {t('about_intro_headline')}
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {t('about_intro_body')}
            </p>
            <Link href={`/${locale}/apply`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0.75rem 1.75rem', borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500,
              backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
            }}>
              Apply as artist →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {stats.map(({ v, l }) => (
              <div key={l} style={{
                padding: '1.75rem',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}>
                <p className="font-display" style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 300,
                  color: 'white', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.5rem',
                }}>
                  {typeof v === 'number' ? v.toLocaleString() : v}
                </p>
                <p className="label" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.5625rem' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
