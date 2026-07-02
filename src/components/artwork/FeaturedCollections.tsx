'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const DEMO = [
  { id:'1', slug:'modern-landscapes', title:'Modern Landscapes', description:'Contemporary perspectives on nature from artists across five continents.', artwork_count:24, cover_image_url:'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=75' },
  { id:'2', slug:'abstract-forms', title:'Abstract Forms', description:'Geometry, colour field, and the boundaries of representation.', artwork_count:18, cover_image_url:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=75' },
  { id:'3', slug:'figurative-now', title:'Figurative Now', description:'The human form reinterpreted through contemporary art.', artwork_count:31, cover_image_url:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75' },
]

export default function FeaturedCollections({ collections, title, viewAll }: { collections:any[], title:string, viewAll:string }) {
  const t = useTranslations('ui')
  const items = collections.length > 0 ? collections : DEMO

  return (
    <section className="sec" style={{ background:'var(--bg)' }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow">{t('curated')}</p>
            <h2 className="sec-title">{title}</h2>
          </div>
          <Link href="/collections" className="btn-base btn-ghost" style={{ display:'flex', alignItems:'center', gap:5 }}>
            {viewAll} →
          </Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.125rem' }} className="md:grid-cols-3 grid-cols-1">
          {items.map((col:any, i:number) => (
            <Link key={col.id} href={`/collections/${col.slug}`} style={{ textDecoration:'none' }} className="group">
              <article style={{
                borderRadius:'var(--r-xl)', overflow:'hidden',
                position:'relative', aspectRatio: i===0 ? '3/4' : '4/5',
                background:'var(--bg2)', boxShadow:'var(--sh-sm)',
              }}>
                <img src={col.cover_image_url} alt={col.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .7s cubic-bezier(.4,0,.2,1)' }} className="group-hover:scale-[1.06]" />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(17,17,16,.75) 0%,transparent 55%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.25rem' }}>
                  <p className="label-xs" style={{ color:'var(--gold2)', marginBottom:5 }}>{t('collection_label')} · {col.artwork_count} {t('works_count')}</p>
                  <h3 className="display" style={{ fontSize:'1.25rem', color:'#fff', lineHeight:1.15 }}>{col.title}</h3>
                  <p style={{ fontSize:'.8125rem', color:'rgba(255,255,255,.55)', marginTop:5, lineHeight:1.5 }} className="line-clamp-2">{col.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
