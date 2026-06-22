'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'

const ALL_ARTWORKS = [
  { id: '1', title: 'Golden Hour', artist: 'Elena Vasquez', nationality: 'Spain', price: 4800, medium: 'oil', category: 'painting', year: 2024, w: 90, h: 120, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75' },
  { id: '2', title: 'Blue Silence', artist: 'Arash Moradiani', nationality: 'Iran', price: 3200, medium: 'acrylic', category: 'painting', year: 2023, w: 80, h: 100, status: 'available', featured: true, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: '3', title: 'Desert Memory', artist: 'Karim Al-Rashid', nationality: 'Lebanon', price: 6500, medium: 'mixed_media', category: 'mixed_media', year: 2023, w: 100, h: 100, status: 'available', featured: true, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75' },
  { id: '4', title: 'Soft Geometry', artist: 'Nadia Petrov', nationality: 'Russia', price: 1900, medium: 'watercolor', category: 'painting', year: 2024, w: 60, h: 80, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
  { id: '5', title: 'Untitled No. 7', artist: 'Yuki Tanaka', nationality: 'Japan', price: 2800, medium: 'oil', category: 'painting', year: 2024, w: 70, h: 90, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75' },
  { id: '6', title: 'Forms in Red', artist: 'Marco Bellini', nationality: 'Italy', price: 4200, medium: 'acrylic', category: 'painting', year: 2023, w: 110, h: 130, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75' },
  { id: '7', title: 'Coastal Fragment', artist: 'Sara Chen', nationality: 'China', price: 1550, medium: 'photography', category: 'photography', year: 2024, w: 80, h: 60, status: 'sold', featured: false, img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
  { id: '8', title: 'Horizon Study', artist: 'Pavel Nowak', nationality: 'Poland', price: 3900, medium: 'oil', category: 'painting', year: 2023, w: 120, h: 80, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75' },
  { id: '9', title: 'Bronze Figure I', artist: 'Amara Diallo', nationality: 'Senegal', price: 8900, medium: 'sculpture', category: 'sculpture', year: 2024, w: 30, h: 60, status: 'available', featured: true, img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75' },
  { id: '10', title: 'Paper Garden', artist: 'Li Wei', nationality: 'China', price: 1200, medium: 'print', category: 'print', year: 2024, w: 50, h: 70, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75' },
  { id: '11', title: 'Night Frequency', artist: 'Ines Moreau', nationality: 'France', price: 5600, medium: 'digital', category: 'digital_art', year: 2023, w: 100, h: 100, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=75' },
  { id: '12', title: 'Valley at Dusk', artist: 'Omar Shaikh', nationality: 'Pakistan', price: 2200, medium: 'watercolor', category: 'painting', year: 2024, w: 75, h: 55, status: 'available', featured: false, img: 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75' },
]

const CATEGORIES = ['All', 'Painting', 'Photography', 'Sculpture', 'Digital art', 'Print', 'Mixed media']
const MEDIUMS = ['All', 'Oil', 'Acrylic', 'Watercolor', 'Photography', 'Mixed media', 'Digital', 'Sculpture', 'Print']
const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'featured', label: 'Featured' },
]

export default function MarketplacePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [category, setCategory] = useState('All')
  const [medium, setMedium] = useState('All')
  const [sort, setSort] = useState('newest')
  const [priceMax, setPriceMax] = useState(10000)
  const [showFilters, setShowFilters] = useState(false)
  const [showSold, setShowSold] = useState(false)

  const filtered = useMemo(() => {
    let items = [...ALL_ARTWORKS]
    if (!showSold) items = items.filter(a => a.status !== 'sold')
    if (category !== 'All') items = items.filter(a => a.category.replace('_', ' ') === category.toLowerCase() || a.category === category.toLowerCase())
    if (medium !== 'All') items = items.filter(a => a.medium === medium.toLowerCase().replace(' ', '_'))
    items = items.filter(a => a.price <= priceMax)
    if (sort === 'price_asc') items.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') items.sort((a, b) => b.price - a.price)
    else if (sort === 'featured') items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    else items.sort((a, b) => b.year - a.year)
    return items
  }, [category, medium, sort, priceMax, showSold])

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD6', padding: '2rem 0 0' }}>
        <div className="content-container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <p className="text-label" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem', marginBottom: 6 }}>Curated collection</p>
              <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>
                Catalog
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.875rem', color: '#A09D99' }}>{filtered.length} works</span>
              {/* Sort */}
              <div style={{ position: 'relative' }}>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{
                    appearance: 'none', background: 'white', border: '1px solid #E2DDD6',
                    borderRadius: 6, padding: '0.5rem 2rem 0.5rem 0.875rem',
                    fontSize: '0.8125rem', color: '#1A1917', cursor: 'pointer',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <ChevronDown size={13} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#A09D99' }} />
              </div>
              {/* Filter toggle mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: showFilters ? '#1A1917' : 'white',
                  color: showFilters ? 'white' : '#1A1917',
                  border: '1px solid #E2DDD6', borderRadius: 6,
                  padding: '0.5rem 0.875rem', fontSize: '0.8125rem',
                  fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-inter)',
                }}
              >
                <SlidersHorizontal size={13} />
                Filters
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 0 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '0.6rem 1.1rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.8125rem', fontWeight: 500,
                  color: category === cat ? '#1A1917' : '#A09D99',
                  borderBottom: category === cat ? '2px solid #1A1917' : '2px solid transparent',
                  transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="content-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

          {/* Sidebar filters */}
          {showFilters && (
            <aside style={{
              width: 220, flexShrink: 0, background: 'white',
              borderRadius: 10, padding: '1.5rem',
              border: '1px solid #E2DDD6', position: 'sticky', top: 80,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1917' }}>Filters</span>
                <button onClick={() => { setCategory('All'); setMedium('All'); setPriceMax(10000) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#A09D99' }}>
                  Clear all
                </button>
              </div>

              {/* Medium */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09D99', marginBottom: 10 }}>Medium</p>
                {MEDIUMS.map(m => (
                  <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer' }}>
                    <input type="radio" name="medium" checked={medium === m} onChange={() => setMedium(m)}
                      style={{ accentColor: '#1A1917' }} />
                    <span style={{ fontSize: '0.875rem', color: medium === m ? '#1A1917' : '#6B6865' }}>{m}</span>
                  </label>
                ))}
              </div>

              {/* Price */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A09D99', marginBottom: 10 }}>
                  Max price: ${priceMax.toLocaleString()}
                </p>
                <input type="range" min={500} max={10000} step={500} value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#1A1917' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: '0.75rem', color: '#A09D99' }}>$500</span>
                  <span style={{ fontSize: '0.75rem', color: '#A09D99' }}>$10k+</span>
                </div>
              </div>

              {/* Show sold */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={showSold} onChange={e => setShowSold(e.target.checked)} style={{ accentColor: '#1A1917' }} />
                <span style={{ fontSize: '0.875rem', color: '#6B6865' }}>Include sold works</span>
              </label>
            </aside>
          )}

          {/* Grid */}
          <div style={{ flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: '#A09D99' }}>
                <p className="font-display" style={{ fontSize: '1.5rem', marginBottom: 8 }}>No works found</p>
                <p style={{ fontSize: '0.875rem' }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
              }}>
                {filtered.map(artwork => (
                  <ArtCard key={artwork.id} artwork={artwork} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ArtCard({ artwork, locale }: { artwork: any; locale: string }) {
  const isSold = artwork.status === 'sold'
  return (
    <article style={{ cursor: 'pointer' }} className="artwork-card">
      <Link href={`/${locale}/artwork/${artwork.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="artwork-card-image">
          <img src={artwork.img} alt={artwork.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
          {isSold && <span className="badge-sold">Sold</span>}
          {artwork.featured && !isSold && <span className="badge-featured">Featured</span>}
        </div>
        <div className="artwork-card-body">
          <p className="artwork-card-artist">{artwork.artist}</p>
          <h3 className="artwork-card-title">{artwork.title}</h3>
          <p className="artwork-card-meta">{artwork.year} · {artwork.h} × {artwork.w} cm</p>
          <p className="artwork-card-price" style={isSold ? { textDecoration: 'line-through', color: '#A09D99' } : {}}>
            {isSold ? 'Sold' : `$${artwork.price.toLocaleString()}`}
          </p>
        </div>
      </Link>
    </article>
  )
}
