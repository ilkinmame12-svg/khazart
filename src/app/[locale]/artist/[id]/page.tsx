import { Link } from '@/i18n/navigation'
import { CheckCircle, Globe, Instagram, MapPin } from 'lucide-react'

const ARTISTS: Record<string, any> = {
  '1': { id: '1', name: 'Elena Vasquez', nationality: 'Spain', location: 'Madrid', verified: true, member: '2023', website: 'elenavasquez.com', instagram: '@elenavasquezart', bio: 'Elena Vasquez (b. 1987, Madrid) works primarily in oil on large-format canvas. Her practice explores the phenomenology of light — how it shapes perception, memory, and presence. She has exhibited internationally, including solo presentations in Madrid, London, and Dubai. Her work is held in private collections across Europe and the Gulf.', bio2: 'Vasquez studied at the Royal Academy of Fine Arts in Madrid before completing a Master\'s degree at the Royal College of Art, London. Her work has been reviewed in Frieze, Art Forum, and El País. She is represented by Galería Elvira González, Madrid.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', cover: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=75', works: [ { id: '1', title: 'Golden Hour', price: 4800, year: 2024, status: 'available', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=70' }, { id: '5', title: 'Untitled No. 7', price: 2800, year: 2024, status: 'available', img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&q=70' }, { id: '8', title: 'Horizon Study', price: 3900, year: 2023, status: 'available', img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500&q=70' }, { id: '4', title: 'Soft Geometry', price: 1900, year: 2024, status: 'sold', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=70' } ] },
  '2': { id: '2', name: 'Arash Moradiani', nationality: 'Iran', location: 'Dubai', verified: true, member: '2023', website: 'arashmoradiani.com', instagram: '@arashmoradiani', bio: 'Arash Moradiani (b. 1982, Tehran) is based between Tehran and Dubai. Working in paint and mixed media, his practice is rooted in Persian visual tradition — geometry, calligraphy, the metaphysics of colour — reimagined through contemporary abstraction.', bio2: 'Moradiani has exhibited across the Middle East and Europe, with solo shows at Leila Heller Gallery, Dubai, and group presentations at Art Dubai, Frieze London, and the Venice Biennale. His works are in the collections of the Sharjah Art Museum and numerous private collectors.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=75', works: [ { id: '2', title: 'Blue Silence', price: 3200, year: 2023, status: 'available', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70' }, { id: '6', title: 'Forms in Red', price: 4200, year: 2023, status: 'available', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=70' }, { id: '11', title: 'Night Frequency', price: 5600, year: 2023, status: 'available', img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&q=70' } ] },
  '3': { id: '3', name: 'Karim Al-Rashid', nationality: 'Lebanon', location: 'Paris', verified: false, member: '2024', website: '', instagram: '@karim_alrashid', bio: 'Karim Al-Rashid (b. 1979, Beirut) works across painting, photography, and installation. His practice engages with memory, landscape, and the politics of the image in the contemporary Arab world.', bio2: 'Al-Rashid has shown in Beirut, Paris, and New York, including exhibitions at the Institut du Monde Arabe and the Arab Museum of Modern Art. He is a recipient of the Fouad Elkoury Prize for Photography.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=75', works: [ { id: '3', title: 'Desert Memory', price: 6500, year: 2023, status: 'available', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=70' }, { id: '7', title: 'Coastal Fragment', price: 1550, year: 2024, status: 'sold', img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&q=70' } ] },
}

export default function ArtistPage({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = params
  const artist = ARTISTS[id] || ARTISTS['1']
  const available = artist.works.filter((w: any) => w.status === 'available').length

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      {/* Cover */}
      <div style={{ height: 280, position: 'relative', overflow: 'hidden', background: '#E8E5DF' }}>
        <img src={artist.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.7)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
      </div>

      {/* Profile header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD6' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -52, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid white', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', background: '#E8E5DF' }}>
              <img src={artist.avatar} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ paddingBottom: 4, flex: 1 }}>
              <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 400, margin: '0 0 4px', letterSpacing: '-0.01em', color: '#1A1917' }}>
                {artist.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                {artist.verified && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-gold-dark)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    <CheckCircle size={13} /> Verified Artist
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem', color: '#A09D99' }}>
                  <MapPin size={13} /> {artist.location}
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#A09D99' }}>Member since {artist.member}</span>
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
              {artist.website && (
                <a href={`https://${artist.website}`} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 0.875rem', background: 'white', border: '1px solid #E2DDD6', borderRadius: 6, fontSize: '0.8125rem', color: '#6B6865', textDecoration: 'none', fontWeight: 500 }}>
                  <Globe size={13} /> Website
                </a>
              )}
              {artist.instagram && (
                <a href={`https://instagram.com/${artist.instagram.replace('@', '')}`} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 0.875rem', background: 'white', border: '1px solid #E2DDD6', borderRadius: 6, fontSize: '0.8125rem', color: '#6B6865', textDecoration: 'none', fontWeight: 500 }}>
                  <Instagram size={13} /> {artist.instagram}
                </a>
              )}
            </div>
          </div>

          {/* Stats tabs */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #F0EDE8', paddingTop: '1rem' }}>
            {[
              { label: 'Works', value: artist.works.length },
              { label: 'Available', value: available },
              { label: 'Collections', value: 2 },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginRight: '2rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1A1917', margin: '0 0 1px', fontFamily: 'var(--font-inter)' }}>{value}</p>
                <p style={{ fontSize: '0.75rem', color: '#A09D99', margin: 0, letterSpacing: '0.04em' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* Works grid */}
          <div>
            <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1.5rem' }}>Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%), 1fr))', gap: '1.25rem' }}>
              {artist.works.map((work: any) => (
                <Link key={work.id} href={`/artwork/${work.id}`} style={{ textDecoration: 'none' }}>
                  <article className="artwork-card">
                    <div className="artwork-card-image">
                      <img src={work.img} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
                      {work.status === 'sold' && <span className="badge-sold">Sold</span>}
                    </div>
                    <div className="artwork-card-body">
                      <h3 className="artwork-card-title">{work.title}</h3>
                      <p className="artwork-card-meta">{work.year}</p>
                      <p className="artwork-card-price" style={work.status === 'sold' ? { textDecoration: 'line-through', color: '#A09D99' } : {}}>
                        {work.status === 'sold' ? 'Sold' : `$${work.price.toLocaleString()}`}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Bio sidebar */}
          <div style={{ position: 'sticky', top: 88 }}>
            <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>Biography</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#6B6865', marginBottom: '1rem' }}>{artist.bio}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#6B6865' }}>{artist.bio2}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
