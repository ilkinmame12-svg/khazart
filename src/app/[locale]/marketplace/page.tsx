'use client'
import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SlidersHorizontal, Search, ChevronDown } from 'lucide-react'

const ALL = [
  { id:'1',  title:'Golden Hour',      artist:'Elena Vasquez',    price:4800,  medium:'oil',        category:'painting',    year:2024, w:90,  h:120, status:'available', featured:false, img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75' },
  { id:'2',  title:'Blue Silence',     artist:'Arash Moradiani',  price:3200,  medium:'acrylic',    category:'painting',    year:2023, w:80,  h:100, status:'available', featured:true,  img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id:'3',  title:'Desert Memory',    artist:'Karim Al-Rashid',  price:6500,  medium:'mixed_media',category:'mixed_media', year:2023, w:100, h:100, status:'available', featured:true,  img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75' },
  { id:'4',  title:'Soft Geometry',    artist:'Nadia Petrov',     price:1900,  medium:'watercolor', category:'painting',    year:2024, w:60,  h:80,  status:'available', featured:false, img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
  { id:'5',  title:'Untitled No. 7',   artist:'Yuki Tanaka',      price:2800,  medium:'oil',        category:'painting',    year:2024, w:70,  h:90,  status:'available', featured:false, img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75' },
  { id:'6',  title:'Forms in Red',     artist:'Marco Bellini',    price:4200,  medium:'acrylic',    category:'painting',    year:2023, w:110, h:130, status:'available', featured:false, img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75' },
  { id:'7',  title:'Coastal Fragment', artist:'Sara Chen',        price:1550,  medium:'photography',category:'photography', year:2024, w:80,  h:60,  status:'sold',      featured:false, img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
  { id:'8',  title:'Horizon Study',    artist:'Pavel Nowak',      price:3900,  medium:'oil',        category:'painting',    year:2023, w:120, h:80,  status:'available', featured:false, img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75' },
  { id:'9',  title:'Bronze Figure I',  artist:'Amara Diallo',     price:8900,  medium:'sculpture',  category:'sculpture',   year:2024, w:30,  h:60,  status:'available', featured:true,  img:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75' },
  { id:'10', title:'Paper Garden',     artist:'Li Wei',           price:1200,  medium:'print',      category:'print',       year:2024, w:50,  h:70,  status:'available', featured:false, img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75' },
  { id:'11', title:'Night Frequency',  artist:'Ines Moreau',      price:5600,  medium:'digital',    category:'digital_art', year:2023, w:100, h:100, status:'available', featured:false, img:'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=75' },
  { id:'12', title:'Valley at Dusk',   artist:'Omar Shaikh',      price:2200,  medium:'watercolor', category:'painting',    year:2024, w:75,  h:55,  status:'available', featured:false, img:'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75' },
]

export default function MarketplacePage() {
  const t  = useTranslations('catalog')
  const tu = useTranslations('ui')
  const [cat,    setCat]    = useState('all')
  const [sort,   setSort]   = useState('newest')
  const [maxP,   setMaxP]   = useState(10000)
  const [sold,   setSold]   = useState(false)
  const [query,  setQuery]  = useState('')
  const [open,   setOpen]   = useState(false)

  const CATS = [
    { v:'all',        l: t('category') === 'Category' ? 'All' : t('category') },
    { v:'painting',   l:'Painting' }, { v:'photography', l:'Photography' },
    { v:'sculpture',  l:'Sculpture' }, { v:'digital_art', l:'Digital art' },
    { v:'print',      l:'Print' },    { v:'mixed_media', l:'Mixed media' },
  ]

  const items = useMemo(() => {
    let r = [...ALL]
    if (!sold) r = r.filter(a => a.status !== 'sold')
    if (cat !== 'all') r = r.filter(a => a.category === cat)
    if (query.trim()) r = r.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.artist.toLowerCase().includes(query.toLowerCase()))
    r = r.filter(a => a.price <= maxP)
    if (sort === 'price_asc')  r.sort((a,b) => a.price - b.price)
    if (sort === 'price_desc') r.sort((a,b) => b.price - a.price)
    if (sort === 'featured')   r.sort((a,b) => (b.featured?1:0)-(a.featured?1:0))
    return r
  }, [cat, sort, maxP, sold, query])

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)', padding:'2.25rem 0 0' }}>
        <div className="wrap">
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'1.375rem', gap:12, flexWrap:'wrap' }}>
            <div>
              <p className="sec-eyebrow" style={{ marginBottom:6 }}>{tu('curated')}</p>
              <h1 className="display" style={{ fontSize:'clamp(1.875rem,4vw,2.75rem)', letterSpacing:'-.02em', margin:0 }}>{t('title')}</h1>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
              {/* Search */}
              <div style={{ position:'relative' }}>
                <Search size={12} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--faint)', pointerEvents:'none' }} />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t('title')}
                  style={{ paddingLeft:30, paddingRight:12, height:36, borderRadius:'var(--r-pill)', border:'1px solid var(--border)', background:'var(--bg)', fontSize:'.8rem', color:'var(--ink)', outline:'none', fontFamily:'var(--font-inter)', width:170 }} />
              </div>
              {/* Sort */}
              <div style={{ position:'relative' }}>
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ height:36, paddingLeft:11, paddingRight:26, borderRadius:'var(--r-pill)', border:'1px solid var(--border)', background:'#fff', fontSize:'.8rem', color:'var(--ink)', cursor:'pointer', appearance:'none', fontFamily:'var(--font-inter)', outline:'none' }}>
                  <option value="newest">{t('sort_newest')}</option>
                  <option value="price_asc">{t('sort_price_asc')}</option>
                  <option value="price_desc">{t('sort_price_desc')}</option>
                  <option value="featured">{t('sort_featured')}</option>
                </select>
                <ChevronDown size={11} style={{ position:'absolute', right:9, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'var(--muted)' }} />
              </div>
              {/* Filter toggle */}
              <button onClick={() => setOpen(!open)} style={{ height:36, display:'flex', alignItems:'center', gap:6, padding:'0 .875rem', borderRadius:'var(--r-pill)', background: open?'var(--ink)':'#fff', color: open?'#fff':'var(--ink)', border:'1px solid var(--border)', cursor:'pointer', fontSize:'.8rem', fontWeight:500, fontFamily:'var(--font-inter)', transition:'all .15s' }}>
                <SlidersHorizontal size={12}/> {t('filters')}
              </button>
              <span style={{ fontSize:'.8125rem', color:'var(--muted)' }}>{items.length} {t('results_count').replace('{count}','').trim() || 'works'}</span>
            </div>
          </div>

          {/* Category pills */}
          <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:'.875rem' }}>
            {CATS.map(c => (
              <button key={c.v} onClick={() => setCat(c.v)} className={`pill ${c.v===cat?'pill-on':'pill-off'}`}>{c.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:'1.75rem', paddingBottom:'5rem' }}>
        <div style={{ display:'flex', gap:'1.75rem', alignItems:'flex-start' }}>
          {/* Sidebar */}
          {open && (
            <aside style={{ width:210, flexShrink:0, background:'#fff', borderRadius:'var(--r-xl)', padding:'1.5rem', border:'1px solid var(--border)', boxShadow:'var(--sh-sm)', position:'sticky', top:80 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.125rem' }}>
                <span style={{ fontSize:'.875rem', fontWeight:600 }}>{t('filters')}</span>
                <button onClick={() => { setCat('all'); setMaxP(10000); setSold(false) }} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'.75rem', color:'var(--muted)' }}>{t('clear_filters')}</button>
              </div>
              <div style={{ marginBottom:'1.375rem' }}>
                <p className="label-xs" style={{ color:'var(--muted)', marginBottom:8 }}>{t('price_range')}: ${maxP.toLocaleString()}</p>
                <input type="range" min={500} max={10000} step={500} value={maxP} onChange={e => setMaxP(+e.target.value)} style={{ width:'100%', accentColor:'var(--ink)' }} />
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                  <span style={{ fontSize:'.72rem', color:'var(--faint)' }}>$500</span>
                  <span style={{ fontSize:'.72rem', color:'var(--faint)' }}>$10k+</span>
                </div>
              </div>
              <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                <input type="checkbox" checked={sold} onChange={e => setSold(e.target.checked)} style={{ accentColor:'var(--ink)', width:14, height:14 }} />
                <span style={{ fontSize:'.875rem', color:'var(--muted)' }}>{t('no_results')}</span>
              </label>
            </aside>
          )}

          {/* Grid */}
          <div style={{ flex:1 }}>
            {items.length === 0 ? (
              <div style={{ textAlign:'center', padding:'5rem 0', color:'var(--muted)' }}>
                <p className="display" style={{ fontSize:'1.75rem', marginBottom:8 }}>{t('no_results')}</p>
                <p style={{ fontSize:'.875rem' }}>{t('no_results_hint')}</p>
              </div>
            ) : (
              <div className="art-grid">
                {items.map(a => {
                  const isSold = a.status === 'sold'
                  return (
                    <article key={a.id} className="card-wrap">
                      <Link href={`/artwork/${a.id}`} style={{ textDecoration:'none', display:'block' }}>
                        <div className="card-img">
                          <img src={a.img} alt={a.title} />
                          <div className="card-overlay" />
                          {a.featured && !isSold && <span className="badge badge-gold">{tu('featured')}</span>}
                          {isSold && <span className="badge badge-dark">{tu('sold')}</span>}
                        </div>
                        <div style={{ paddingTop:'.75rem' }}>
                          <p className="card-artist">{a.artist}</p>
                          <h3 className="card-title">{a.title}</h3>
                          <p className="card-meta">{a.year} · {a.h}×{a.w} cm</p>
                          {isSold ? <p className="card-sold">{tu('sold')}</p> : <p className="card-price">${a.price.toLocaleString()}</p>}
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
