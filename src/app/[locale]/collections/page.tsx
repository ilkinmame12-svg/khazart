import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const COLLECTIONS = [
  { id:'1', slug:'modern-landscapes', title:'Modern Landscapes', date:'Spring 2024', count:24, desc:'Contemporary perspectives on nature from artists across five continents.', cover:'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=75' },
  { id:'2', slug:'abstract-forms',    title:'Abstract Forms',    date:'Winter 2023', count:18, desc:'Geometry, colour field, and the limits of representation.',              cover:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=75' },
  { id:'3', slug:'figurative-now',    title:'Figurative Now',    date:'Summer 2024', count:31, desc:'The human form reinterpreted through contemporary art.',                  cover:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75' },
  { id:'4', slug:'works-on-paper',    title:'Works on Paper',    date:'Autumn 2023', count:15, desc:'Drawing, print, and watercolour — the intimate scale of paper.',           cover:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=900&q=75' },
  { id:'5', slug:'gulf-perspectives', title:'Gulf Perspectives', date:'Spring 2024', count:12, desc:'Artists from the Gulf and wider Middle East.',                            cover:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75' },
  { id:'6', slug:'under-5000',        title:'Under $5,000',      date:'Ongoing',     count:42, desc:'Exceptional works accessible to new and experienced collectors.',          cover:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=75' },
]

export default async function CollectionsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t  = await getTranslations('home')
  const tu = await getTranslations('ui')

  const [featured, ...rest] = COLLECTIONS

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)', padding:'2.25rem 0 2rem' }}>
        <div className="wrap">
          <p className="sec-eyebrow" style={{ marginBottom:6 }}>{tu('curated')}</p>
          <h1 className="display" style={{ fontSize:'clamp(1.875rem,4vw,2.75rem)', letterSpacing:'-.02em', margin:'0 0 .5rem' }}>{t('featured_collections')}</h1>
          <p style={{ fontSize:'.9375rem', color:'var(--muted)', margin:0 }}>Thematic groupings by our curatorial team</p>
        </div>
      </div>

      <div className="wrap sec">
        {/* Featured */}
        <Link href={`/collections/${featured.slug}`} style={{ textDecoration:'none', display:'block', marginBottom:'2.5rem' }} className="group">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', background:'#fff', borderRadius:'var(--r-xl)', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'var(--sh-sm)' }}>
            <div style={{ position:'relative', overflow:'hidden', aspectRatio:'4/3' }}>
              <img src={featured.cover} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .6s ease' }} className="group-hover:scale-[1.04]" />
            </div>
            <div style={{ padding:'2.5rem 2.5rem 2.5rem 2rem' }}>
              <span style={{ display:'inline-block', background:'var(--ink)', color:'#fff', fontSize:'.6rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', padding:'.25rem .625rem', borderRadius:'var(--r-pill)', marginBottom:'1.125rem' }}>
                Featured
              </span>
              <h2 className="display" style={{ fontSize:'clamp(1.625rem,3vw,2.25rem)', marginBottom:'.625rem' }}>{featured.title}</h2>
              <p style={{ fontSize:'.9375rem', color:'var(--muted)', lineHeight:1.7, marginBottom:'1.25rem' }}>{featured.desc}</p>
              <p className="label-xs" style={{ color:'var(--faint)' }}>{featured.count} {tu('works_count')} · {featured.date}</p>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(290px,100%),1fr))', gap:'1.125rem' }}>
          {rest.map(col => (
            <Link key={col.id} href={`/collections/${col.slug}`} style={{ textDecoration:'none' }} className="group">
              <article style={{ background:'#fff', borderRadius:'var(--r-lg)', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'var(--sh-xs)', transition:'box-shadow .25s' }} className="group-hover:shadow-md">
                <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
                  <img src={col.cover} alt={col.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .6s ease' }} className="group-hover:scale-[1.04]" />
                  <div style={{ position:'absolute', bottom:'.75rem', left:'.75rem', background:'rgba(17,17,16,.55)', backdropFilter:'blur(6px)', color:'#fff', fontSize:'.6875rem', fontWeight:500, padding:'.2rem .55rem', borderRadius:'var(--r-sm)' }}>
                    {col.count} {tu('works_count')}
                  </div>
                </div>
                <div style={{ padding:'1.125rem' }}>
                  <p className="label-xs" style={{ color:'var(--gold)', marginBottom:5 }}>{col.date}</p>
                  <h3 className="display" style={{ fontSize:'1.1875rem', marginBottom:'.4rem' }}>{col.title}</h3>
                  <p style={{ fontSize:'.875rem', color:'var(--muted)', lineHeight:1.55 }} className="line-clamp-2">{col.desc}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
