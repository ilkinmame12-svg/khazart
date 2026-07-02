import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CheckCircle, MapPin, Globe, Instagram } from 'lucide-react'

const DB: Record<string,any> = {
  '1': { name:'Elena Vasquez', nationality:'Spain', location:'Madrid', verified:true, member:'2023', website:'elenavasquez.com', instagram:'@elenavasquezart', bio:'Elena Vasquez (b. 1987, Madrid) works primarily in oil on large-format canvas. Her practice explores the phenomenology of light — how it shapes perception, memory, and presence.', bio2:'Vasquez studied at the Royal Academy of Fine Arts in Madrid before completing a Master\'s at the Royal College of Art, London. Her work is in private collections across Europe and the Gulf.', avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', cover:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=75', works:[{id:'1',title:'Golden Hour',price:4800,year:2024,status:'available',img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=70'},{id:'5',title:'Untitled No. 7',price:2800,year:2024,status:'available',img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&q=70'},{id:'8',title:'Horizon Study',price:3900,year:2023,status:'available',img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500&q=70'},{id:'4',title:'Soft Geometry',price:1900,year:2024,status:'sold',img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=70'}] },
  '2': { name:'Arash Moradiani', nationality:'Iran', location:'Dubai', verified:true, member:'2023', website:'arashmoradiani.com', instagram:'@arashmoradiani', bio:'Arash Moradiani (b. 1982, Tehran) is based between Tehran and Dubai. His practice is rooted in Persian visual tradition — geometry, calligraphy — reimagined through contemporary abstraction.', bio2:'Moradiani has exhibited at Leila Heller Gallery Dubai and Art Dubai. Works in the Sharjah Art Museum collection.', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', cover:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=75', works:[{id:'2',title:'Blue Silence',price:3200,year:2023,status:'available',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70'},{id:'6',title:'Forms in Red',price:4200,year:2023,status:'available',img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=70'}] },
  '3': { name:'Karim Al-Rashid', nationality:'Lebanon', location:'Paris', verified:false, member:'2024', website:'', instagram:'@karim_alrashid', bio:'Karim Al-Rashid (b. 1979, Beirut) works across painting, photography, and installation. His practice engages with memory, landscape, and the politics of the image.', bio2:'Al-Rashid has shown at the Institut du Monde Arabe and the Arab Museum of Modern Art. Recipient of the Fouad Elkoury Prize.', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', cover:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=75', works:[{id:'3',title:'Desert Memory',price:6500,year:2023,status:'available',img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=70'},{id:'7',title:'Coastal Fragment',price:1550,year:2024,status:'sold',img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&q=70'}] },
}

export default async function ArtistPage({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  setRequestLocale(locale)
  const t  = await getTranslations('artist')
  const tu = await getTranslations('ui')
  const a = DB[id] || DB['1']
  const avail = a.works.filter((w:any) => w.status === 'available').length

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* Cover */}
      <div style={{ height:260, position:'relative', overflow:'hidden', background:'var(--ink)' }}>
        <img src={a.cover} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(.6)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(17,17,16,.55) 100%)' }} />
      </div>

      {/* Profile header */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
        <div className="wrap" style={{ paddingTop:0, paddingBottom:'1.375rem' }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:16, marginTop:-46, marginBottom:'1.125rem', flexWrap:'wrap' }}>
            <div style={{ width:92, height:92, borderRadius:'50%', border:'4px solid #fff', overflow:'hidden', flexShrink:0, boxShadow:'var(--sh-md)', background:'var(--bg2)' }}>
              <img src={a.avatar} alt={a.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <div style={{ paddingBottom:4, flex:1 }}>
              <h1 className="display" style={{ fontSize:'clamp(1.625rem,3vw,2.125rem)', margin:'0 0 4px', letterSpacing:'-.015em' }}>{a.name}</h1>
              <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                {a.verified && <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.75rem', fontWeight:500, color:'var(--gold)', letterSpacing:'.05em', textTransform:'uppercase' }}><CheckCircle size={12} /> {tu('verified')}</span>}
                <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.8125rem', color:'var(--muted)' }}><MapPin size={12} /> {a.location}</span>
                <span style={{ fontSize:'.8125rem', color:'var(--faint)' }}>{t('member_since')} {a.member}</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:7, paddingBottom:4 }}>
              {a.website && <a href={`https://${a.website}`} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:5, padding:'.45rem .875rem', background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)', fontSize:'.8125rem', color:'var(--muted)', textDecoration:'none' }}><Globe size={12} /> Website</a>}
              {a.instagram && <a href={`https://instagram.com/${a.instagram.replace('@','')}`} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:5, padding:'.45rem .875rem', background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)', fontSize:'.8125rem', color:'var(--muted)', textDecoration:'none' }}><Instagram size={12} /> {a.instagram}</a>}
            </div>
          </div>

          <div style={{ display:'flex', gap:'2rem' }}>
            {[{l:t('works'),v:a.works.length},{l:t('available'),v:avail},{l:t('collections'),v:2}].map(({l,v}) => (
              <div key={l}>
                <p style={{ fontSize:'1.25rem', fontWeight:600, color:'var(--ink)', margin:'0 0 1px' }}>{v}</p>
                <p style={{ fontSize:'.75rem', color:'var(--faint)', margin:0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="wrap" style={{ paddingTop:'2.25rem', paddingBottom:'5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'3rem', alignItems:'start' }}>
          {/* Works */}
          <div>
            <h2 className="display" style={{ fontSize:'1.5rem', marginBottom:'1.25rem' }}>{t('works')}</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(195px,100%),1fr))', gap:'1.125rem' }}>
              {a.works.map((w:any) => (
                <Link key={w.id} href={`/artwork/${w.id}`} style={{ textDecoration:'none' }} className="card-wrap">
                  <div className="card-img">
                    <img src={w.img} alt={w.title} />
                    <div className="card-overlay" />
                    {w.status==='sold' && <span className="badge badge-dark">{tu('sold')}</span>}
                  </div>
                  <div style={{ paddingTop:'.625rem' }}>
                    <h3 className="card-title">{w.title}</h3>
                    <p className="card-meta">{w.year}</p>
                    {w.status==='sold' ? <p className="card-sold">{tu('sold')}</p> : <p className="card-price">${w.price.toLocaleString()}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div style={{ position:'sticky', top:80 }}>
            <h2 className="display" style={{ fontSize:'1.5rem', marginBottom:'.875rem' }}>Biography</h2>
            <p style={{ fontSize:'.9375rem', lineHeight:1.8, color:'var(--muted)', marginBottom:'.875rem' }}>{a.bio}</p>
            <p style={{ fontSize:'.9375rem', lineHeight:1.8, color:'var(--muted)' }}>{a.bio2}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
