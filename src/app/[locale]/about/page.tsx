import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t  = await getTranslations('home')
  const tu = await getTranslations('ui')

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{ background:'var(--ink)', padding:'5rem 0 4rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1579763902614-a3fb3927b6a5?w=1400&q=40)', backgroundSize:'cover', backgroundPosition:'center', opacity:.06, pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 70% 50%,rgba(201,169,110,.08) 0%,transparent 60%)', pointerEvents:'none' }} />
        <div className="wrap" style={{ position:'relative' }}>
          <p className="label-xs" style={{ color:'var(--gold)', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ width:20, height:1, background:'var(--gold)', display:'inline-block' }} />
            About
          </p>
          <h1 className="display" style={{ fontSize:'clamp(2.5rem,6vw,5rem)', fontWeight:300, color:'#fff', letterSpacing:'-.025em', lineHeight:.95, margin:'0 0 1.25rem', maxWidth:680 }}>
            {t('about_intro_headline')}
          </h1>
          <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,.5)', maxWidth:520, lineHeight:1.75 }}>
            {t('about_intro_body')}
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:'4rem', paddingBottom:'5rem' }}>
        {/* Values */}
        <div style={{ marginBottom:'4rem' }}>
          <p className="sec-eyebrow" style={{ marginBottom:'.875rem' }}>What we stand for</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(230px,100%),1fr))', gap:'1.125rem' }}>
            {[
              { icon:'◆', title:'Curation over volume', body:'We publish fewer works so every work matters. Quality is not a slogan — it is the operating principle.' },
              { icon:'◈', title:'Artist-first', body:'Artists receive 80% of every sale. The platform exists to serve creators.' },
              { icon:'◉', title:'Global by design', body:'Our artists span more than 28 countries. We seek perspectives outside the Western mainstream.' },
              { icon:'◎', title:'Transparent provenance', body:'Every work comes with a certificate of authenticity and full provenance.' },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background:'#fff', borderRadius:'var(--r-lg)', padding:'1.5rem', border:'1px solid var(--border)' }}>
                <p style={{ fontSize:'1.125rem', color:'var(--gold)', marginBottom:'.75rem' }}>{icon}</p>
                <h3 className="display" style={{ fontSize:'1.1875rem', marginBottom:'.625rem' }}>{title}</h3>
                <p style={{ fontSize:'.875rem', color:'var(--muted)', lineHeight:1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:'var(--ink)', borderRadius:'var(--r-xl)', padding:'clamp(2.5rem,5vw,4rem)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 50% 100%,rgba(201,169,110,.1) 0%,transparent 60%)', pointerEvents:'none' }} />
          <p className="label-xs" style={{ color:'var(--gold)', marginBottom:'1rem' }}>Join us</p>
          <h2 className="display" style={{ fontSize:'clamp(1.75rem,4vw,2.875rem)', color:'#fff', marginBottom:'.875rem', lineHeight:1.05 }}>
            Ready to start your collection?
          </h2>
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:'.9375rem', marginBottom:'2rem' }}>
            Browse curated works or apply as an artist.
          </p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/marketplace" style={{ padding:'.8rem 1.75rem', background:'#fff', color:'var(--ink)', textDecoration:'none', borderRadius:'var(--r-pill)', fontWeight:500, fontSize:'.9rem' }}>
              {tu('browse_catalog')}
            </Link>
            <Link href="/apply" style={{ padding:'.8rem 1.75rem', background:'transparent', color:'rgba(255,255,255,.8)', textDecoration:'none', borderRadius:'var(--r-pill)', fontWeight:500, fontSize:'.9rem', border:'1px solid rgba(255,255,255,.2)' }}>
              {tu('apply_artist')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
