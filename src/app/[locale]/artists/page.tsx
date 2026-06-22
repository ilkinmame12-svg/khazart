import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const ARTISTS = [
  { id: '1', name: 'Elena Vasquez', nationality: 'Spain', location: 'Madrid', verified: true, works: 4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=75', cover: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=65' },
  { id: '2', name: 'Arash Moradiani', nationality: 'Iran', location: 'Dubai', verified: true, works: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=75', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=65' },
  { id: '3', name: 'Karim Al-Rashid', nationality: 'Lebanon', location: 'Paris', verified: false, works: 2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=75', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=65' },
  { id: '4', name: 'Nadia Petrov', nationality: 'Russia', location: 'Berlin', verified: true, works: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=75', cover: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=65' },
  { id: '5', name: 'Yuki Tanaka', nationality: 'Japan', location: 'Tokyo', verified: true, works: 6, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=75', cover: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=65' },
  { id: '6', name: 'Marco Bellini', nationality: 'Italy', location: 'Milan', verified: true, works: 4, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=75', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=65' },
  { id: '7', name: 'Sara Chen', nationality: 'China', location: 'Shanghai', verified: false, works: 3, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=75', cover: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=65' },
  { id: '8', name: 'Pavel Nowak', nationality: 'Poland', location: 'Warsaw', verified: true, works: 7, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=75', cover: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=65' },
]

export default function ArtistsPage({ params }: { params: { locale: string } }) {
  const { locale } = params

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD6', padding: '2.5rem 0 2rem' }}>
        <div className="content-container">
          <p className="text-label" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem', marginBottom: 8 }}>Selected</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>Artists</h1>
          <p style={{ fontSize: '1rem', color: '#6B6865', margin: 0 }}>Every artist on KHazar Arts is invited and verified by our team</p>
        </div>
      </div>

      <div className="content-container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: '1.5rem' }}>
          {ARTISTS.map(artist => (
            <Link key={artist.id} href={`/${locale}/artist/${artist.id}`} style={{ textDecoration: 'none' }} className="group">
              <article style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2DDD6', transition: 'box-shadow 0.2s ease' }}>
                {/* Cover */}
                <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                  <img src={artist.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', filter: 'brightness(0.8)' }} className="group-hover:scale-[1.04]" />
                </div>
                {/* Info */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', marginTop: -34, flexShrink: 0, background: '#E8E5DF' }}>
                      <img src={artist.avatar} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {artist.verified && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.625rem', fontWeight: 500, color: 'var(--color-gold-dark)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: -20 }}>
                        <CheckCircle size={11} /> Verified
                      </span>
                    )}
                  </div>
                  <h2 className="font-display" style={{ fontSize: '1.1875rem', fontWeight: 400, margin: '0.75rem 0 0.25rem', color: '#1A1917' }}>{artist.name}</h2>
                  <p style={{ fontSize: '0.8125rem', color: '#A09D99', margin: '0 0 0.75rem' }}>{artist.nationality} · {artist.location}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #F0EDE8' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#6B6865' }}>{artist.works} works available</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1A1917' }}>View profile →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
