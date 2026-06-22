import Link from 'next/link'
import type { Profile, Locale } from '@/types'

interface FeaturedArtistsProps {
  artists: Profile[]
  locale: Locale
  title: string
  viewAll: string
}

const DEMO_ARTISTS = [
  { id: '1', full_name: 'Elena Vasquez', nationality: 'Spain', location: 'Madrid', verified: true, avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70' },
  { id: '2', full_name: 'Arash Moradiani', nationality: 'Iran', location: 'Dubai', verified: true, avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70' },
  { id: '3', full_name: 'Nadia Petrov', nationality: 'Russia', location: 'Berlin', verified: true, avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=70' },
  { id: '4', full_name: 'Karim Al-Rashid', nationality: 'Lebanon', location: 'Paris', verified: false, avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=70' },
  { id: '5', full_name: 'Yuki Tanaka', nationality: 'Japan', location: 'Tokyo', verified: true, avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=70' },
  { id: '6', full_name: 'Marco Bellini', nationality: 'Italy', location: 'Milan', verified: true, avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=70' },
]

export default function FeaturedArtists({ artists, locale, title, viewAll }: FeaturedArtistsProps) {
  const items = artists.length > 0 ? artists : DEMO_ARTISTS as any[]

  return (
    <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="content-container">
        <div className="section-header">
          <div>
            <p className="text-label mb-1" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem' }}>
              Selected
            </p>
            <h2 className="section-title">{title}</h2>
          </div>
          <Link href={`/${locale}/artists`} className="btn-ghost">
            {viewAll} →
          </Link>
        </div>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))' }}
        >
          {items.map((artist) => {
            const initials = artist.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
            return (
              <Link
                key={artist.id}
                href={`/${locale}/artist/${artist.id}`}
                className="no-underline group"
              >
                <article style={{ textAlign: 'center' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto 0.875rem',
                      background: '#E8E5DF',
                      border: '3px solid white',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                      transition: 'box-shadow 0.2s ease',
                    }}
                    className="group-hover:shadow-lg"
                  >
                    {artist.avatar_url ? (
                      <img
                        src={artist.avatar_url}
                        alt={artist.full_name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        className="group-hover:scale-105"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="font-display" style={{ fontSize: '1.25rem', color: '#A09D99' }}>{initials}</span>
                      </div>
                    )}
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 400,
                      color: '#1A1917',
                      margin: '0 0 0.2rem',
                      transition: 'color 0.2s',
                    }}
                  >
                    {artist.full_name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 0.35rem', letterSpacing: '0.04em' }}>
                    {artist.nationality}{artist.location ? ` · ${artist.location}` : ''}
                  </p>
                  {artist.verified && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                      fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: 'var(--color-gold-dark)',
                    }}>
                      ✦ Verified
                    </span>
                  )}
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
