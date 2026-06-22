'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

const DEMO = [
  { id:'1', title:'Golden Hour', artist:'Elena Vasquez', verified:true, price:4800, year:2024, w:90, h:120, status:'available', featured:false, img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75' },
  { id:'2', title:'Blue Silence', artist:'Arash Moradiani', verified:true, price:3200, year:2023, w:80, h:100, status:'available', featured:true, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id:'3', title:'Desert Memory', artist:'Karim Al-Rashid', verified:false, price:6500, year:2023, w:100, h:100, status:'available', featured:true, img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75' },
  { id:'4', title:'Soft Geometry', artist:'Nadia Petrov', verified:true, price:1900, year:2024, w:60, h:80, status:'available', featured:false, img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
  { id:'5', title:'Untitled No. 7', artist:'Yuki Tanaka', verified:true, price:2800, year:2024, w:70, h:90, status:'available', featured:false, img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75' },
  { id:'6', title:'Forms in Red', artist:'Marco Bellini', verified:false, price:4200, year:2023, w:110, h:130, status:'available', featured:false, img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75' },
  { id:'7', title:'Coastal Fragment', artist:'Sara Chen', verified:true, price:1550, year:2024, w:80, h:60, status:'sold', featured:false, img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
  { id:'8', title:'Horizon Study', artist:'Pavel Nowak', verified:true, price:3900, year:2023, w:120, h:80, status:'available', featured:false, img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75' },
]

export default function NewWorks({ artworks, locale, title, viewAll }: { artworks: any[], locale: Locale, title: string, viewAll: string }) {
  const t = useTranslations('ui')
  const items = artworks.length > 0 ? artworks : DEMO

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label" style={{ color: 'var(--gold)', marginBottom: 8, fontSize: '0.625rem' }}>{t('just_added')}</p>
            <h2 className="sec-title">{title}</h2>
          </div>
          <Link href="/marketplace" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {viewAll} →
          </Link>
        </div>
        <div className="art-grid">
          {items.map((a: any) => {
            const sold = a.status === 'sold'
            return (
              <article key={a.id} className="art-card">
                <Link href={`/artwork/${a.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="art-card-img">
                    <img src={a.img || a.demoImg} alt={a.title} />
                    <div className="art-card-overlay" />
                    {a.featured && !sold && <span className="badge badge-gold">{t('featured')}</span>}
                    {sold && <span className="badge badge-sold">{t('sold')}</span>}
                  </div>
                  <div className="art-card-body">
                    <p className="art-card-artist">
                      {a.artist || a.full_name}
                      {a.verified && <span style={{ color: 'var(--gold)', marginLeft: 4 }}>✦</span>}
                    </p>
                    <h3 className="art-card-title">{a.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                      {a.year}{a.h ? ` · ${a.h} × ${a.w} cm` : ''}
                    </p>
                    {sold
                      ? <p className="art-card-price-sold">{t('sold')}</p>
                      : <p className="art-card-price">${(a.price_usd ? a.price_usd/100 : a.price).toLocaleString()}</p>
                    }
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
