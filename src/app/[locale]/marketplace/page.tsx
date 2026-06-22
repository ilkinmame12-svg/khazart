'use client'

import { useState, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react'

const ALL = [
  { id:'1', title:'Golden Hour', artist:'Elena Vasquez', price:4800, medium:'oil', category:'painting', year:2024, w:90, h:120, status:'available', featured:false, img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75' },
  { id:'2', title:'Blue Silence', artist:'Arash Moradiani', price:3200, medium:'acrylic', category:'painting', year:2023, w:80, h:100, status:'available', featured:true, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id:'3', title:'Desert Memory', artist:'Karim Al-Rashid', price:6500, medium:'mixed_media', category:'mixed_media', year:2023, w:100, h:100, status:'available', featured:true, img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75' },
  { id:'4', title:'Soft Geometry', artist:'Nadia Petrov', price:1900, medium:'watercolor', category:'painting', year:2024, w:60, h:80, status:'available', featured:false, img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
  { id:'5', title:'Untitled No. 7', artist:'Yuki Tanaka', price:2800, medium:'oil', category:'painting', year:2024, w:70, h:90, status:'available', featured:false, img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75' },
  { id:'6', title:'Forms in Red', artist:'Marco Bellini', price:4200, medium:'acrylic', category:'painting', year:2023, w:110, h:130, status:'available', featured:false, img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75' },
  { id:'7', title:'Coastal Fragment', artist:'Sara Chen', price:1550, medium:'photography', category:'photography', year:2024, w:80, h:60, status:'sold', featured:false, img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
  { id:'8', title:'Horizon Study', artist:'Pavel Nowak', price:3900, medium:'oil', category:'painting', year:2023, w:120, h:80, status:'available', featured:false, img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75' },
  { id:'9', title:'Bronze Figure I', artist:'Amara Diallo', price:8900, medium:'sculpture', category:'sculpture', year:2024, w:30, h:60, status:'available', featured:true, img:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75' },
  { id:'10', title:'Paper Garden', artist:'Li Wei', price:1200, medium:'print', category:'print', year:2024, w:50, h:70, status:'available', featured:false, img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75' },
  { id:'11', title:'Night Frequency', artist:'Ines Moreau', price:5600, medium:'digital', category:'digital_art', year:2023, w:100, h:100, status:'available', featured:false, img:'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=75' },
  { id:'12', title:'Valley at Dusk', artist:'Omar Shaikh', price:2200, medium:'watercolor', category:'painting', year:2024, w:75, h:55, status:'available', featured:false, img:'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75' },
]

const CATS = ['All','Painting','Photography','Sculpture','Digital art','Print','Mixed media']
const SORTS = [{ v:'newest', l:'Newest' },{ v:'price_asc', l:'Price ↑' },{ v:'price_desc', l:'Price ↓' },{ v:'featured', l:'Featured' }]

export default function MarketplacePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('newest')
  const [maxPrice, setMaxPrice] = useState(10000)
  const [showSold, setShowSold] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    let r = [...ALL]
    if (!showSold) r = r.filter(a => a.status !== 'sold')
    if (cat !== 'All') r = r.filter(a => a.category.replace('_',' ') === cat.toLowerCase() || a.category === cat.toLowerCase())
    if (query) r = r.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.artist.toLowerCase().includes(query.toLowerCase()))
    r = r.filter(a => a.price <= maxPrice)
    if (sort === 'price_asc') r.sort((a,b) => a.price - b.price)
    else if (sort === 'price_desc') r.sort((a,b) => b.price - a.price)
    else if (sort === 'featured') r.sort((a,b) => (b.featured?1:0)-(a.featured?1:0))
    return r
  }, [cat, sort, maxPrice, showSold, query])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '2.5rem 0 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <p className="label" style={{ color: 'var(--gold)', fontSize: '0.625rem', marginBottom: 8 }}>Curated collection</p>
              <h1 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Catalog</h1>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…"
                  style={{ paddingLeft: 34, paddingRight: 12, height: 38, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '0.8125rem', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-inter)', width: 180 }} />
              </div>

              {/* Sort */}
              <div style={{ position: 'relative' }}>
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ height: 38, paddingLeft: 12, paddingRight: 28, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'white', fontSize: '0.8125rem', color: 'var(--ink)', cursor: 'pointer', appearance: 'none', fontFamily: 'var(--font-inter)', outline: 'none' }}>
                  {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)' }} />
              </div>

              {/* Filters toggle */}
              <button onClick={() => setFiltersOpen(!filtersOpen)} style={{
                height: 38, display: 'flex', alignItems: 'center', gap: 6,
                padding: '0 1rem', borderRadius: 'var(--radius-full)',
                background: filtersOpen ? 'var(--ink)' : 'white',
                color: filtersOpen ? 'white' : 'var(--ink)',
                border: '1px solid var(--border)', cursor: 'pointer',
                fontSize: '0.8125rem', fontWeight: 500, fontFamily: 'var(--font-inter)',
                transition: 'all 0.15s ease',
              }}>
                <SlidersHorizontal size={13} /> Filters
              </button>

              <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{items.length} works</span>
            </div>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: '0.875rem' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`pill ${c === cat ? 'pill-active' : 'pill-inactive'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          {filtersOpen && (
            <aside style={{
              width: 220, flexShrink: 0, background: 'white',
              borderRadius: 'var(--radius-xl)', padding: '1.75rem',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              position: 'sticky', top: 84,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>Filters</span>
                <button onClick={() => { setCat('All'); setMaxPrice(10000); setShowSold(false) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  Reset
                </button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p className="label" style={{ color: 'var(--muted)', marginBottom: 10, fontSize: '0.5625rem' }}>Price max: ${maxPrice.toLocaleString()}</p>
                <input type="range" min={500} max={10000} step={500} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--ink)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>$500</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>$10k+</span>
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={showSold} onChange={e => setShowSold(e.target.checked)} style={{ accentColor: 'var(--ink)', width: 15, height: 15 }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>Show sold</span>
              </label>
            </aside>
          )}

          {/* Grid */}
          <div style={{ flex: 1 }}>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--muted)' }}>
                <p className="font-display" style={{ fontSize: '1.75rem', marginBottom: 8 }}>No works found</p>
                <p style={{ fontSize: '0.875rem' }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="art-grid">
                {items.map(a => {
                  const sold = a.status === 'sold'
                  return (
                    <article key={a.id} className="art-card">
                      <Link href={`/artwork/${a.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div className="art-card-img">
                          <img src={a.img} alt={a.title} />
                          <div className="art-card-overlay" />
                          {a.featured && !sold && <span className="badge badge-gold">Featured</span>}
                          {sold && <span className="badge badge-sold">Sold</span>}
                        </div>
                        <div className="art-card-body">
                          <p className="art-card-artist">{a.artist}</p>
                          <h3 className="art-card-title">{a.title}</h3>
                          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>{a.year} · {a.h} × {a.w} cm</p>
                          {sold ? <p className="art-card-price-sold">Sold</p> : <p className="art-card-price">${a.price.toLocaleString()}</p>}
                        </div>
                      </Link>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
