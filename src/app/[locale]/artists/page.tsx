import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const ARTISTS = [
  { id:'1', name:'Elena Vasquez',   nationality:'Spain',   location:'Madrid',   verified:true,  works:4, avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=75', cover:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=65' },
  { id:'2', name:'Arash Moradiani', nationality:'Iran',    location:'Dubai',    verified:true,  works:3, avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=75', cover:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=65' },
  { id:'3', name:'Karim Al-Rashid', nationality:'Lebanon', location:'Paris',    verified:false, works:2, avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=75', cover:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=65' },
  { id:'4', name:'Nadia Petrov',    nationality:'Russia',  location:'Berlin',   verified:true,  works:5, avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=75', cover:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=65' },
  { id:'5', name:'Yuki Tanaka',     nationality:'Japan',   location:'Tokyo',    verified:true,  works:6, avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=75', cover:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=65' },
  { id:'6', name:'Marco Bellini',   nationality:'Italy',   location:'Milan',    verified:true,  works:4, avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=75', cover:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=65' },
  { id:'7', name:'Sara Chen',       nationality:'China',   location:'Shanghai', verified:false, works:3, avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=75', cover:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=65' },
  { id:'8', name:'Pavel Nowak',     nationality:'Poland',  location:'Warsaw',   verified:true,  works:7, avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=75', cover:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=65' },
]

export default async function ArtistsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t  = await getTranslations('artist')
  const tu = await getTranslations('ui')

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)', padding:'2.25rem 0 2rem' }}>
        <div className="wrap">
          <p className="sec-eyebrow" style={{ marginBottom:6 }}>{tu('selected')}</p>
          <h1 className="display" style={{ fontSize:'clamp(1.875rem,4vw,2.75rem)', letterSpacing:'-.02em', margin:'0 0 .5rem' }}>{t('works')}</h1>
          <p style={{ fontSize:'.9375rem', color:'var(--muted)', margin:0 }}>Every artist on KHazar Arts is invited and verified by our team</p>
        </div>
      </div>

      <div className="wrap sec">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(270px,100%),1fr))', gap:'1.25rem' }}>
          {ARTISTS.map(a => (
            <Link key={a.id} href={`/artist/${a.id}`} style={{ textDecoration:'none' }} className="group">
              <article style={{ background:'#fff', borderRadius:'var(--r-xl)', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'var(--sh-xs)', transition:'box-shadow .25s ease' }} className="group-hover:shadow-md">
                <div style={{ height:130, overflow:'hidden', position:'relative' }}>
                  <img src={a.cover} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(.78)', transition:'transform .5s ease' }} className="group-hover:scale-[1.04]" />
                </div>
                <div style={{ padding:'1.125rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:48, height:48, borderRadius:'50%', overflow:'hidden', border:'3px solid #fff', boxShadow:'var(--sh-sm)', marginTop:-30, flexShrink:0, background:'var(--bg2)' }}>
                      <img src={a.avatar} alt={a.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                    {a.verified && (
                      <span className="label-xs" style={{ color:'var(--gold)', marginTop:-18, display:'flex', alignItems:'center', gap:3 }}>✦ {tu('verified')}</span>
                    )}
                  </div>
                  <h2 className="display" style={{ fontSize:'1.1875rem', margin:'.625rem 0 .25rem' }}>{a.name}</h2>
                  <p style={{ fontSize:'.8125rem', color:'var(--muted)', margin:'0 0 .75rem' }}>{a.nationality} · {a.location}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'.75rem', borderTop:'1px solid var(--border)' }}>
                    <span style={{ fontSize:'.8125rem', color:'var(--muted)' }}>{a.works} {t('works')}</span>
                    <span style={{ fontSize:'.8125rem', fontWeight:500, color:'var(--ink)' }}>View profile →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
