'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const DEMO = [
  { id:'1', full_name:'Elena Vasquez',   nationality:'Spain',   location:'Madrid', verified:true,  avatar_url:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=75' },
  { id:'2', full_name:'Arash Moradiani', nationality:'Iran',    location:'Dubai',  verified:true,  avatar_url:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=75' },
  { id:'3', full_name:'Nadia Petrov',    nationality:'Russia',  location:'Berlin', verified:true,  avatar_url:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=75' },
  { id:'4', full_name:'Karim Al-Rashid', nationality:'Lebanon', location:'Paris',  verified:false, avatar_url:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=75' },
  { id:'5', full_name:'Yuki Tanaka',     nationality:'Japan',   location:'Tokyo',  verified:true,  avatar_url:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=75' },
  { id:'6', full_name:'Marco Bellini',   nationality:'Italy',   location:'Milan',  verified:true,  avatar_url:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=75' },
]

export default function FeaturedArtists({ artists, title, viewAll }: { artists:any[], title:string, viewAll:string }) {
  const t = useTranslations('ui')
  const items = artists.length > 0 ? artists : DEMO

  return (
    <section className="sec" style={{ background:'var(--bg2)' }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow">{t('selected')}</p>
            <h2 className="sec-title">{title}</h2>
          </div>
          <Link href="/artists" className="btn-base btn-ghost" style={{ display:'flex', alignItems:'center', gap:5 }}>
            {viewAll} →
          </Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(155px,100%),1fr))', gap:'1.5rem' }}>
          {items.map((a:any) => (
            <Link key={a.id} href={`/artist/${a.id}`} style={{ textDecoration:'none' }} className="group">
              <article style={{ textAlign:'center' }}>
                <div style={{ width:90, height:90, margin:'0 auto .875rem', borderRadius:'50%', overflow:'hidden', border:'3px solid #fff', boxShadow:'var(--sh-md)', background:'var(--bg2)' }}>
                  <img src={a.avatar_url} alt={a.full_name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s ease' }} className="group-hover:scale-110" />
                </div>
                <h3 className="display" style={{ fontSize:'1.0625rem', color:'var(--ink)', marginBottom:'.2rem' }}>{a.full_name}</h3>
                <p style={{ fontSize:'.75rem', color:'var(--muted)', marginBottom:'.3rem' }}>{a.nationality}{a.location ? ` · ${a.location}` : ''}</p>
                {a.verified && <p className="label-xs" style={{ color:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', gap:3 }}>✦ {t('verified')}</p>}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
