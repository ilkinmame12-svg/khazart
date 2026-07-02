import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const DB: Record<string,any> = {
  'modern-landscapes': { title:'Modern Landscapes', date:'Spring 2024', desc:'Contemporary perspectives on nature and terrain from artists across five continents.', cover:'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1400&q=80', works:[{id:'1',title:'Golden Hour',artist:'Elena Vasquez',price:4800,year:2024,status:'available',img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75'},{id:'4',title:'Soft Geometry',artist:'Nadia Petrov',price:1900,year:2024,status:'available',img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75'},{id:'8',title:'Horizon Study',artist:'Pavel Nowak',price:3900,year:2023,status:'available',img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75'},{id:'12',title:'Valley at Dusk',artist:'Omar Shaikh',price:2200,year:2024,status:'available',img:'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75'},{id:'5',title:'Untitled No. 7',artist:'Yuki Tanaka',price:2800,year:2024,status:'available',img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75'},{id:'7',title:'Coastal Fragment',artist:'Sara Chen',price:1550,year:2024,status:'sold',img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75'}] },
  'abstract-forms':    { title:'Abstract Forms',    date:'Winter 2023', desc:'Works exploring geometry, colour field, and the limits of representation.',              cover:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80', works:[{id:'2',title:'Blue Silence',artist:'Arash Moradiani',price:3200,year:2023,status:'available',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'},{id:'6',title:'Forms in Red',artist:'Marco Bellini',price:4200,year:2023,status:'available',img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75'},{id:'11',title:'Night Frequency',artist:'Ines Moreau',price:5600,year:2023,status:'available',img:'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=75'},{id:'10',title:'Paper Garden',artist:'Li Wei',price:1200,year:2024,status:'available',img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75'}] },
  'figurative-now':    { title:'Figurative Now',    date:'Summer 2024', desc:'The human form reinterpreted through contemporary painting, sculpture, and photography.', cover:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80', works:[{id:'3',title:'Desert Memory',artist:'Karim Al-Rashid',price:6500,year:2023,status:'available',img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75'},{id:'9',title:'Bronze Figure I',artist:'Amara Diallo',price:8900,year:2024,status:'available',img:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75'}] },
  'works-on-paper':    { title:'Works on Paper',    date:'Autumn 2023', desc:'Drawing, print, and watercolour — the intimate scale of paper as site of invention.', cover:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1400&q=80', works:[{id:'4',title:'Soft Geometry',artist:'Nadia Petrov',price:1900,year:2024,status:'available',img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75'},{id:'10',title:'Paper Garden',artist:'Li Wei',price:1200,year:2024,status:'available',img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75'}] },
  'gulf-perspectives': { title:'Gulf Perspectives', date:'Spring 2024', desc:'Artists from the Gulf and wider Middle East.',                                            cover:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80', works:[{id:'2',title:'Blue Silence',artist:'Arash Moradiani',price:3200,year:2023,status:'available',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'},{id:'3',title:'Desert Memory',artist:'Karim Al-Rashid',price:6500,year:2023,status:'available',img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75'}] },
  'under-5000':        { title:'Under $5,000',      date:'Ongoing',     desc:'Exceptional works accessible to new and experienced collectors.',                          cover:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80', works:[{id:'1',title:'Golden Hour',artist:'Elena Vasquez',price:4800,year:2024,status:'available',img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75'},{id:'2',title:'Blue Silence',artist:'Arash Moradiani',price:3200,year:2023,status:'available',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'},{id:'4',title:'Soft Geometry',artist:'Nadia Petrov',price:1900,year:2024,status:'available',img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75'},{id:'10',title:'Paper Garden',artist:'Li Wei',price:1200,year:2024,status:'available',img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75'}] },
}

export default async function CollectionPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale)
  const tu = await getTranslations('ui')
  const c = DB[slug] || DB['modern-landscapes']
  const avail = c.works.filter((w:any) => w.status === 'available').length

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:380, overflow:'hidden', background:'var(--ink)' }}>
        <img src={c.cover} alt={c.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(.5)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(17,17,16,.88) 0%,transparent 55%)' }} />
        <div style={{ position:'absolute', top:'1.375rem', left:0, right:0 }}>
          <div className="wrap">
            <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:'.8125rem', color:'rgba(255,255,255,.45)' }}>
              <Link href="/" style={{ color:'rgba(255,255,255,.45)', textDecoration:'none' }}>Home</Link>
              <span>/</span>
              <Link href="/collections" style={{ color:'rgba(255,255,255,.45)', textDecoration:'none' }}>Collections</Link>
              <span>/</span>
              <span style={{ color:'#fff' }}>{c.title}</span>
            </div>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 0 2.25rem' }}>
          <div className="wrap">
            <p className="label-xs" style={{ color:'var(--gold)', marginBottom:9 }}>{tu('collection_label')} · {c.date} · {avail} {tu('works_count')} {tu('available')}</p>
            <h1 className="display" style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:300, color:'#fff', letterSpacing:'-.025em', lineHeight:.95, margin:0 }}>{c.title}</h1>
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
        <div className="wrap" style={{ padding:'1.75rem clamp(1.25rem,4vw,3.5rem)' }}>
          <p style={{ fontSize:'1rem', color:'var(--muted)', lineHeight:1.8, maxWidth:640, margin:0 }}>{c.desc}</p>
        </div>
      </div>

      {/* Works */}
      <div className="wrap" style={{ paddingTop:'2.25rem', paddingBottom:'5rem' }}>
        <div className="art-grid">
          {c.works.map((w:any) => {
            const sold = w.status === 'sold'
            return (
              <article key={w.id} className="card-wrap">
                <Link href={`/artwork/${w.id}`} style={{ textDecoration:'none', display:'block' }}>
                  <div className="card-img">
                    <img src={w.img} alt={w.title} />
                    <div className="card-overlay" />
                    {sold && <span className="badge badge-dark">{tu('sold')}</span>}
                  </div>
                  <div style={{ paddingTop:'.75rem' }}>
                    <p className="card-artist">{w.artist}</p>
                    <h3 className="card-title">{w.title}</h3>
                    <p className="card-meta">{w.year}</p>
                    {sold ? <p className="card-sold">{tu('sold')}</p> : <p className="card-price">${w.price.toLocaleString()}</p>}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
