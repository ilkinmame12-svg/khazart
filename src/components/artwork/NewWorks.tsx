import Link from 'next/link'
import ArtworkCard from './ArtworkCard'
import type { Artwork, Locale } from '@/types'

interface NewWorksProps {
  artworks: Artwork[]
  locale: Locale
  title: string
  viewAll: string
}

// Demo artworks for when DB is empty
const DEMO_ARTWORKS = [
  { id: '1', title: 'Golden Hour', artist: { full_name: 'Elena Vasquez', verified: true }, price_usd: 480000, medium: 'oil', year: 2024, width_cm: 90, height_cm: 120, status: 'approved', featured: false, demoImg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=70' },
  { id: '2', title: 'Blue Silence', artist: { full_name: 'Arash Moradiani', verified: true }, price_usd: 320000, medium: 'acrylic', year: 2023, width_cm: 80, height_cm: 100, status: 'approved', featured: true, demoImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70' },
  { id: '3', title: 'Desert Memory', artist: { full_name: 'Karim Al-Rashid', verified: false }, price_usd: 650000, medium: 'mixed_media', year: 2023, width_cm: 100, height_cm: 100, status: 'approved', featured: true, demoImg: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=70' },
  { id: '4', title: 'Soft Geometry', artist: { full_name: 'Nadia Petrov', verified: true }, price_usd: 190000, medium: 'watercolor', year: 2024, width_cm: 60, height_cm: 80, status: 'approved', featured: false, demoImg: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=70' },
  { id: '5', title: 'Untitled No. 7', artist: { full_name: 'Yuki Tanaka', verified: true }, price_usd: 280000, medium: 'oil', year: 2024, width_cm: 70, height_cm: 90, status: 'approved', featured: false, demoImg: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=70' },
  { id: '6', title: 'Forms in Red', artist: { full_name: 'Marco Bellini', verified: false }, price_usd: 420000, medium: 'acrylic', year: 2023, width_cm: 110, height_cm: 130, status: 'approved', featured: false, demoImg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=70' },
  { id: '7', title: 'Coastal Fragment', artist: { full_name: 'Sara Chen', verified: true }, price_usd: 155000, medium: 'photography', year: 2024, width_cm: 80, height_cm: 60, status: 'sold', featured: false, demoImg: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=70' },
  { id: '8', title: 'Horizon Study', artist: { full_name: 'Pavel Nowak', verified: true }, price_usd: 390000, medium: 'oil', year: 2023, width_cm: 120, height_cm: 80, status: 'approved', featured: false, demoImg: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=70' },
]

export default function NewWorks({ artworks, locale, title, viewAll }: NewWorksProps) {
  const items = artworks.length > 0 ? artworks : DEMO_ARTWORKS as any[]

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="content-container">
        <div className="section-header">
          <div>
            <p className="text-label mb-1" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem' }}>
              Just added
            </p>
            <h2 className="section-title">{title}</h2>
          </div>
          <Link href={`/${locale}/marketplace`} className="btn-ghost">
            {viewAll} →
          </Link>
        </div>

        <div className="artwork-grid">
          {items.map((artwork, i) => (
            <DemoArtworkCard key={artwork.id} artwork={artwork} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(cents / 100)
}

function DemoArtworkCard({ artwork, locale }: { artwork: any, locale: string }) {
  const isSold = artwork.status === 'sold'
  return (
    <article className="artwork-card">
      <Link href={`/${locale}/artwork/${artwork.id}`} className="no-underline block">
        <div className="artwork-card-image">
          <img
            src={artwork.demoImg || artwork.images?.[0]?.public_url}
            alt={artwork.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
          />
          {isSold && <span className="badge-sold">Sold</span>}
          {artwork.featured && !isSold && <span className="badge-featured">Featured</span>}
        </div>
        <div className="artwork-card-body">
          <p className="artwork-card-artist">
            {artwork.artist?.full_name}
            {artwork.artist?.verified && <span style={{ color: 'var(--color-gold)', marginLeft: 4 }}>✦</span>}
          </p>
          <h3 className="artwork-card-title">{artwork.title}</h3>
          <p className="artwork-card-meta">
            {artwork.year}{artwork.width_cm ? ` · ${artwork.height_cm} × ${artwork.width_cm} cm` : ''}
          </p>
          <p className={`artwork-card-price ${isSold ? 'line-through' : ''}`} style={isSold ? { color: 'var(--color-text-muted)' } : {}}>
            {isSold ? 'Sold' : formatPrice(artwork.price_usd)}
          </p>
        </div>
      </Link>
    </article>
  )
}
