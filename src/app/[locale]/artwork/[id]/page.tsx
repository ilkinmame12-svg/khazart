'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Heart, Share2, ZoomIn, Shield, Truck, RotateCcw, CheckCircle, ChevronLeft } from 'lucide-react'

const DB: Record<string,any> = {
  '1': { title:'Golden Hour', artist:'Elena Vasquez', artistId:'1', nationality:'Spain', verified:true, price:4800, medium:'Oil on canvas', category:'Painting', year:2024, w:90, h:120, status:'available', edition:'Unique work', provenance:'Acquired directly from the artist, 2024.', desc:'Golden Hour is a meditation on the transience of light — how it transforms the mundane into the luminous in the space of minutes. Painted during a residency in southern Spain, the work captures the quality of late afternoon sun filtering through ochre walls.', bio:'Elena Vasquez (b. 1987, Madrid) works primarily in oil on large-format canvas. Her practice explores the phenomenology of light. She has exhibited in Madrid, London, and Dubai.', imgs:['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=85','https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=85','https://images.unsplash.com/photo-1549490349-8643362247b5?w=900&q=85'], avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70' },
  '2': { title:'Blue Silence', artist:'Arash Moradiani', artistId:'2', nationality:'Iran', verified:true, price:3200, medium:'Acrylic on canvas', category:'Painting', year:2023, w:80, h:100, status:'available', edition:'Unique work', provenance:'Acquired directly from the artist, 2023.', desc:'Blue Silence draws from the Sufi concept of inner stillness — a silence that is not absence but presence. The deep ultramarine ground is built up over many layers.', bio:'Arash Moradiani (b. 1982, Tehran) is based between Tehran and Dubai. His practice is rooted in Persian visual tradition reimagined through contemporary abstraction.', imgs:['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85','https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=900&q=85'], avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70' },
  '3': { title:'Desert Memory', artist:'Karim Al-Rashid', artistId:'3', nationality:'Lebanon', verified:false, price:6500, medium:'Mixed media on board', category:'Mixed media', year:2023, w:100, h:100, status:'available', edition:'Unique work', provenance:'Private collection, Beirut.', desc:'A layered investigation into landscape and loss. Desert Memory combines photography, pigment, and found material collected from the Lebanese countryside.', bio:'Karim Al-Rashid (b. 1979, Beirut) works across painting, photography, and installation. His practice engages with memory and landscape.', imgs:['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85','https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=900&q=85'], avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=70' },
}
const FALLBACK = DB['1']
const RELATED = [
  { id:'4', title:'Soft Geometry', artist:'Nadia Petrov', price:1900, img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=70' },
  { id:'5', title:'Untitled No. 7', artist:'Yuki Tanaka', price:2800, img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=70' },
  { id:'8', title:'Horizon Study', artist:'Pavel Nowak', price:3900, img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&q=70' },
  { id:'6', title:'Forms in Red', artist:'Marco Bellini', price:4200, img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=70' },
]

export default function ArtworkPage({ params }: { params: { locale: string; id: string } }) {
  const t = useTranslations('artwork')
  const a = DB[params.id] || FALLBACK
  const [img, setImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [zoom, setZoom] = useState(false)
  const isSold = a.status === 'sold'

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
        <div className="wrap" style={{ padding:'.875rem clamp(1.25rem,4vw,3.5rem)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:'.8125rem', color:'var(--faint)' }}>
            <Link href="/" style={{ color:'var(--faint)', textDecoration:'none' }}>Home</Link>
            <span>/</span>
            <Link href="/marketplace" style={{ color:'var(--faint)', textDecoration:'none' }}>Catalog</Link>
            <span>/</span>
            <span style={{ color:'var(--ink)' }}>{a.title}</span>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:'2.25rem', paddingBottom:'5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'55% 1fr', gap:'clamp(2rem,5vw,4.5rem)', alignItems:'start' }}>

          {/* Images */}
          <div>
            <div onClick={() => setZoom(true)} style={{ position:'relative', borderRadius:'var(--r-xl)', overflow:'hidden', aspectRatio:'4/5', background:'var(--bg2)', marginBottom:'.625rem', cursor:'zoom-in', boxShadow:'var(--sh-lg)' }}>
              <img src={a.imgs[img]} alt={a.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'opacity .35s ease' }} />
              <button style={{ position:'absolute', bottom:'.875rem', right:'.875rem', background:'rgba(255,255,255,.88)', border:'none', borderRadius:'var(--r-md)', padding:'.45rem .75rem', cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:'.78rem', fontWeight:500, backdropFilter:'blur(6px)' }}>
                <ZoomIn size={13} /> {t('purchase')}
              </button>
              {a.featured && <span className="badge badge-gold">Featured</span>}
            </div>
            {a.imgs.length > 1 && (
              <div style={{ display:'flex', gap:6 }}>
                {a.imgs.map((src:string, i:number) => (
                  <button key={i} onClick={() => setImg(i)} style={{ width:64, height:78, borderRadius:'var(--r-md)', overflow:'hidden', border:`2px solid ${i===img?'var(--ink)':'transparent'}`, padding:0, cursor:'pointer', opacity: i===img?1:.5, transition:'all .2s', flexShrink:0 }}>
                    <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ position:'sticky', top:80 }}>
            {/* Artist */}
            <Link href={`/artist/${a.artistId}`} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10, marginBottom:'1.125rem' }}>
              <img src={a.avatar} alt={a.artist} style={{ width:38, height:38, borderRadius:'50%', objectFit:'cover' }} />
              <div>
                <p style={{ fontSize:'.875rem', fontWeight:500, color:'var(--ink)', margin:0 }}>
                  {a.artist}{a.verified && <span style={{ color:'var(--gold)', marginLeft:4 }}>✦</span>}
                </p>
                <p style={{ fontSize:'.75rem', color:'var(--muted)', margin:0 }}>{a.nationality}</p>
              </div>
            </Link>

            <h1 className="display" style={{ fontSize:'clamp(1.75rem,3vw,2.375rem)', margin:'0 0 .4rem', letterSpacing:'-.015em', lineHeight:1.1 }}>{a.title}</h1>
            <p style={{ fontSize:'.875rem', color:'var(--muted)', marginBottom:'1.375rem' }}>{a.medium} · {a.h}×{a.w} cm · {a.year}</p>

            {/* Price card */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1.5rem', padding:'1.125rem', background:'#fff', borderRadius:'var(--r-lg)', border:'1px solid var(--border)' }}>
              <div style={{ flex:1 }}>
                <p className="label-xs" style={{ color:'var(--faint)', marginBottom:3 }}>{t('price')}</p>
                <p style={{ fontSize:'1.625rem', fontWeight:700, color:'var(--ink)', margin:0 }}>
                  {isSold ? t('sold') : `$${a.price.toLocaleString()}`}
                </p>
              </div>
              <button onClick={() => setSaved(!saved)} style={{ width:42, height:42, borderRadius:'var(--r-md)', border:'1px solid var(--border)', background: saved?'#FFF5F5':'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
                <Heart size={17} fill={saved?'#E53E3E':'none'} color={saved?'#E53E3E':'var(--faint)'} />
              </button>
              <button style={{ width:42, height:42, borderRadius:'var(--r-md)', border:'1px solid var(--border)', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Share2 size={15} color="var(--faint)" />
              </button>
            </div>

            {!isSold ? (
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:'1.75rem' }}>
                <button style={{ width:'100%', padding:'.875rem', background:'var(--ink)', color:'#fff', border:'none', borderRadius:'var(--r-md)', fontSize:'.9375rem', fontWeight:500, cursor:'pointer', fontFamily:'var(--font-inter)' }}>
                  {t('purchase')}
                </button>
                <button style={{ width:'100%', padding:'.875rem', background:'#fff', color:'var(--ink)', border:'1px solid var(--border)', borderRadius:'var(--r-md)', fontSize:'.9375rem', fontWeight:500, cursor:'pointer', fontFamily:'var(--font-inter)' }}>
                  {t('inquire')}
                </button>
              </div>
            ) : (
              <div style={{ padding:'.875rem', background:'var(--bg)', borderRadius:'var(--r-md)', marginBottom:'1.75rem', textAlign:'center' }}>
                <p style={{ color:'var(--muted)', fontSize:'.875rem', margin:'0 0 6px' }}>{t('sold')}</p>
                <Link href="/marketplace" style={{ fontSize:'.875rem', color:'var(--ink)', fontWeight:500, textDecoration:'none' }}>Browse available works →</Link>
              </div>
            )}

            {/* Trust */}
            <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:'1.75rem' }}>
              {[
                [Shield,   t('certificate')],
                [Truck,    t('shipping_note')],
                [RotateCcw, t('shipping')],
                [CheckCircle, 'Curated and verified by KHazar Arts'],
              ].map(([Icon, text]: any) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <Icon size={14} color="var(--gold)" />
                  <span style={{ fontSize:'.8125rem', color:'var(--muted)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Details table */}
            <div style={{ borderTop:'1px solid var(--border)', paddingTop:'1.25rem' }}>
              <p className="label-xs" style={{ color:'var(--faint)', marginBottom:'.875rem' }}>Details</p>
              {[
                [t('medium'),    a.medium],
                [t('dimensions'), `${a.h} × ${a.w} cm`],
                [t('year'),      a.year],
                [t('category'),  a.category],
                [t('edition'),   a.edition],
              ].map(([label, value]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'.55rem 0', borderBottom:'1px solid #f5f3f0' }}>
                  <span style={{ fontSize:'.8125rem', color:'var(--muted)' }}>{label}</span>
                  <span style={{ fontSize:'.8125rem', color:'var(--ink)', fontWeight:500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description + Bio */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', marginTop:'3.5rem', paddingTop:'3rem', borderTop:'1px solid var(--border)' }}>
          <div>
            <h2 className="display" style={{ fontSize:'1.5rem', marginBottom:'.875rem' }}>{t('about_artist')}</h2>
            <p style={{ fontSize:'.9375rem', lineHeight:1.8, color:'var(--muted)' }}>{a.desc}</p>
          </div>
          <div>
            <h2 className="display" style={{ fontSize:'1.5rem', marginBottom:'.875rem' }}>About the artist</h2>
            <div style={{ display:'flex', gap:12, marginBottom:'.875rem' }}>
              <img src={a.avatar} alt={a.artist} style={{ width:48, height:48, borderRadius:'50%', objectFit:'cover' }} />
              <div>
                <p style={{ fontWeight:500, color:'var(--ink)', margin:0 }}>{a.artist}</p>
                <p style={{ fontSize:'.8125rem', color:'var(--muted)', margin:0 }}>{a.nationality}</p>
              </div>
            </div>
            <p style={{ fontSize:'.9375rem', lineHeight:1.8, color:'var(--muted)', marginBottom:'.875rem' }}>{a.bio}</p>
            <Link href={`/artist/${a.artistId}`} style={{ fontSize:'.875rem', fontWeight:500, color:'var(--ink)', textDecoration:'none' }}>
              View artist profile →
            </Link>
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop:'3.5rem', paddingTop:'3rem', borderTop:'1px solid var(--border)' }}>
          <h2 className="display" style={{ fontSize:'1.625rem', marginBottom:'1.375rem' }}>{t('related_works')}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(195px,100%),1fr))', gap:'1.125rem' }}>
            {RELATED.map(r => (
              <Link key={r.id} href={`/artwork/${r.id}`} style={{ textDecoration:'none' }} className="card-wrap">
                <div className="card-img" style={{ aspectRatio:'4/5' }}>
                  <img src={r.img} alt={r.title} />
                  <div className="card-overlay" />
                </div>
                <div style={{ paddingTop:'.625rem' }}>
                  <p className="card-artist">{r.artist}</p>
                  <p className="card-title">{r.title}</p>
                  <p className="card-price">${r.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoom && (
        <div onClick={() => setZoom(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', cursor:'zoom-out' }}>
          <img src={a.imgs[img]} alt={a.title} style={{ maxWidth:'90vw', maxHeight:'90vh', objectFit:'contain', borderRadius:'var(--r-lg)' }} />
          <button onClick={() => setZoom(false)} style={{ position:'absolute', top:18, right:18, background:'rgba(255,255,255,.12)', border:'none', color:'#fff', width:38, height:38, borderRadius:'50%', cursor:'pointer', fontSize:'1.25rem', backdropFilter:'blur(8px)' }}>×</button>
        </div>
      )}
    </div>
  )
}
