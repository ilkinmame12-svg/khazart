'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Share2, ChevronLeft, ZoomIn, Shield, Truck, RotateCcw, CheckCircle } from 'lucide-react'

const ARTWORKS: Record<string, any> = {
  '1': { id: '1', title: 'Golden Hour', artist: 'Elena Vasquez', artistId: '1', nationality: 'Spain', verified: true, price: 4800, medium: 'Oil on canvas', category: 'Painting', year: 2024, w: 90, h: 120, status: 'available', featured: false, edition: 'Unique work', provenance: 'Acquired directly from the artist, 2024. Certificate of authenticity included.', description: 'Golden Hour is a meditation on the transience of light — how it transforms the mundane into the luminous in the space of minutes. Painted during a residency in southern Spain, the work captures the quality of late afternoon sun filtering through ochre walls. The palette moves from deep amber to pale gold, with impasto layers that catch physical light as the viewer moves through the space.', bio: 'Elena Vasquez (b. 1987, Madrid) works primarily in oil on large-format canvas. Her practice explores the phenomenology of light — how it shapes perception, memory, and presence. She has exhibited internationally, including solo presentations in Madrid, London, and Dubai. Her work is held in private collections across Europe and the Gulf.', imgs: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=85', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=85', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=900&q=85', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=85'], avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70' },
  '2': { id: '2', title: 'Blue Silence', artist: 'Arash Moradiani', artistId: '2', nationality: 'Iran', verified: true, price: 3200, medium: 'Acrylic on canvas', category: 'Painting', year: 2023, w: 80, h: 100, status: 'available', featured: true, edition: 'Unique work', provenance: 'Acquired directly from the artist, 2023.', description: 'Blue Silence draws from the Sufi concept of inner stillness — a silence that is not absence but presence. The deep ultramarine ground is built up over many layers, creating a surface that appears to vibrate with interior light. Small, almost invisible marks emerge at close proximity, suggesting text or calligraphy dissolved into pure colour.', bio: 'Arash Moradiani (b. 1982, Tehran) is based between Tehran and Dubai. Working in paint and mixed media, his practice is rooted in Persian visual tradition — geometry, calligraphy, the metaphysics of colour — reimagined through contemporary abstraction.', imgs: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85', 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=900&q=85', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85'], avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70' },
  '3': { id: '3', title: 'Desert Memory', artist: 'Karim Al-Rashid', artistId: '3', nationality: 'Lebanon', verified: false, price: 6500, medium: 'Mixed media on board', category: 'Mixed media', year: 2023, w: 100, h: 100, status: 'available', featured: true, edition: 'Unique work', provenance: 'Private collection, Beirut. Acquired 2023.', description: 'A layered investigation into landscape and loss, Desert Memory combines photography, pigment, and found material collected from the Lebanese countryside. The work resists singular reading — it is at once documentary and elegiac, specific and universal.', bio: 'Karim Al-Rashid (b. 1979, Beirut) works across painting, photography, and installation. His practice engages with memory, landscape, and the politics of the image in the contemporary Arab world. He has shown in Beirut, Paris, and New York.', imgs: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85', 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=900&q=85', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&q=85'], avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=70' },
}

const RELATED = [
  { id: '4', title: 'Soft Geometry', artist: 'Nadia Petrov', price: 1900, img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=70' },
  { id: '5', title: 'Untitled No. 7', artist: 'Yuki Tanaka', price: 2800, img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=70' },
  { id: '8', title: 'Horizon Study', artist: 'Pavel Nowak', price: 3900, img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&q=70' },
  { id: '6', title: 'Forms in Red', artist: 'Marco Bellini', price: 4200, img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=70' },
]

export default function ArtworkPage({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = params
  const artwork = ARTWORKS[id] || ARTWORKS['1']
  const [activeImg, setActiveImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [zoom, setZoom] = useState(false)
  const isSold = artwork.status === 'sold'

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD6' }}>
        <div className="content-container" style={{ padding: '0.875rem clamp(1.25rem, 4vw, 3.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: '#A09D99' }}>
            <Link href={`/${locale}`} style={{ color: '#A09D99', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href={`/${locale}/marketplace`} style={{ color: '#A09D99', textDecoration: 'none' }}>Catalog</Link>
            <span>/</span>
            <span style={{ color: '#1A1917' }}>{artwork.title}</span>
          </div>
        </div>
      </div>

      <div className="content-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'start' }} className="md:grid-cols-2 grid-cols-1">

          {/* LEFT: Images */}
          <div>
            {/* Main image */}
            <div
              style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#E8E5DF', marginBottom: '0.75rem', cursor: 'zoom-in', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}
              onClick={() => setZoom(true)}
            >
              <img
                src={artwork.imgs[activeImg]}
                alt={artwork.title}
                style={{ width: '100%', display: 'block', aspectRatio: '4/5', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
              />
              <button style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 8, padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 500, color: '#1A1917' }}>
                <ZoomIn size={14} /> Zoom
              </button>
              {artwork.featured && <span className="badge-featured">Featured</span>}
            </div>

            {/* Thumbnails */}
            {artwork.imgs.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {artwork.imgs.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ width: 68, height: 80, borderRadius: 6, overflow: 'hidden', border: `2px solid ${i === activeImg ? '#1A1917' : 'transparent'}`, padding: 0, cursor: 'pointer', opacity: i === activeImg ? 1 : 0.55, transition: 'all 0.2s ease', flexShrink: 0 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div style={{ position: 'sticky', top: 88 }}>
            {/* Artist */}
            <Link href={`/${locale}/artist/${artwork.artistId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <img src={artwork.avatarUrl} alt={artwork.artist} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1917', margin: 0 }}>
                  {artwork.artist}
                  {artwork.verified && <span style={{ color: 'var(--color-gold)', marginLeft: 4 }}>✦</span>}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#A09D99', margin: 0 }}>{artwork.nationality}</p>
              </div>
            </Link>

            {/* Title */}
            <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              {artwork.title}
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#6B6865', marginBottom: '1.5rem' }}>
              {artwork.medium} · {artwork.h} × {artwork.w} cm · {artwork.year}
            </p>

            {/* Price + actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem', padding: '1.25rem', background: 'white', borderRadius: 10, border: '1px solid #E2DDD6' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', color: '#A09D99', margin: '0 0 2px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>Price</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1A1917', margin: 0, fontFamily: 'var(--font-inter)' }}>
                  {isSold ? 'Sold' : `$${artwork.price.toLocaleString()}`}
                </p>
              </div>
              <button onClick={() => setSaved(!saved)}
                style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid #E2DDD6', background: saved ? '#FFF5F5' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}>
                <Heart size={18} fill={saved ? '#E53E3E' : 'none'} color={saved ? '#E53E3E' : '#A09D99'} />
              </button>
              <button style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid #E2DDD6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Share2 size={16} color="#A09D99" />
              </button>
            </div>

            {/* CTA */}
            {!isSold ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '2rem' }}>
                <button style={{ width: '100%', padding: '0.9rem', background: '#1A1917', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-inter)', letterSpacing: '0.02em', transition: 'background 0.2s ease' }}>
                  Purchase this work
                </button>
                <button style={{ width: '100%', padding: '0.9rem', background: 'white', color: '#1A1917', border: '1px solid #E2DDD6', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-inter)', transition: 'border-color 0.2s ease' }}>
                  Make an inquiry
                </button>
              </div>
            ) : (
              <div style={{ padding: '1rem', background: '#F8F7F4', borderRadius: 8, marginBottom: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#6B6865', fontSize: '0.875rem', margin: 0 }}>This work has been sold.</p>
                <Link href={`/${locale}/marketplace`} style={{ fontSize: '0.875rem', color: '#1A1917', fontWeight: 500 }}>Browse available works →</Link>
              </div>
            )}

            {/* Trust signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '2rem' }}>
              {[
                { icon: Shield, text: 'Certificate of authenticity included' },
                { icon: Truck, text: 'Ships within 5–10 business days, fully insured' },
                { icon: RotateCcw, text: '14-day return policy' },
                { icon: CheckCircle, text: 'Curated and verified by KHazar Arts' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={15} color="var(--color-gold-dark)" />
                  <span style={{ fontSize: '0.8125rem', color: '#6B6865' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Artwork details */}
            <div style={{ borderTop: '1px solid #E2DDD6', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09D99', marginBottom: '1rem' }}>Details</h3>
              {[
                ['Medium', artwork.medium],
                ['Dimensions', `${artwork.h} × ${artwork.w} cm`],
                ['Year', artwork.year],
                ['Category', artwork.category],
                ['Edition', artwork.edition],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #F0EDE8' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#A09D99' }}>{label}</span>
                  <span style={{ fontSize: '0.8125rem', color: '#1A1917', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description + provenance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #E2DDD6' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>About this work</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#6B6865' }}>{artwork.description}</p>
          </div>
          <div>
            <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>About the artist</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <img src={artwork.avatarUrl} alt={artwork.artist} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <p style={{ fontWeight: 500, color: '#1A1917', margin: 0 }}>{artwork.artist}</p>
                <p style={{ fontSize: '0.8125rem', color: '#A09D99', margin: 0 }}>{artwork.nationality}</p>
              </div>
            </div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#6B6865', marginBottom: '1rem' }}>{artwork.bio}</p>
            <Link href={`/${locale}/artist/${artwork.artistId}`} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A1917', textDecoration: 'none' }}>
              View artist profile →
            </Link>
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #E2DDD6' }}>
          <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 400, marginBottom: '1.5rem' }}>You may also like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%), 1fr))', gap: '1.25rem' }}>
            {RELATED.map(r => (
              <Link key={r.id} href={`/${locale}/artwork/${r.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '4/5', background: '#E8E5DF', marginBottom: '0.75rem' }}>
                  <img src={r.img} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: '#A09D99', margin: '0 0 2px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>{r.artist}</p>
                <p className="font-display" style={{ fontSize: '1rem', color: '#1A1917', margin: '0 0 3px' }}>{r.title}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1917', margin: 0 }}>${r.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoom && (
        <div onClick={() => setZoom(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <img src={artwork.imgs[activeImg]} alt={artwork.title} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }} />
          <button onClick={() => setZoom(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
        </div>
      )}
    </div>
  )
}
