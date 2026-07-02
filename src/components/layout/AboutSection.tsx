import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function AboutSection({ artistCount, artworkCount, locale }: { artistCount:number, artworkCount:number, locale:string }) {
  setRequestLocale(locale)
  const t  = await getTranslations('home')
  const tu = await getTranslations('ui')

  const stats = [
    { v: artistCount  || '50+',  l: t('stats_artists') },
    { v: artworkCount || '300+', l: t('stats_works') },
    { v: '28+',  l: t('stats_countries') },
    { v: '200+', l: t('stats_collectors') },
  ]

  return (
    <section style={{ background:'var(--ink)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 80% 50%,rgba(201,169,110,.07) 0%,transparent 60%)', pointerEvents:'none' }} />
      <div className="wrap sec" style={{ position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(3rem,6vw,6rem)', alignItems:'center' }}>
          <div>
            <p className="label-xs" style={{ color:'var(--gold)', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:20, height:1, background:'var(--gold)', display:'inline-block' }} />
              {tu('about_platform')}
            </p>
            <h2 className="display" style={{ fontSize:'clamp(2rem,4vw,3.125rem)', fontWeight:300, color:'#fff', lineHeight:1.05, marginBottom:'1.125rem' }}>
              {t('about_intro_headline')}
            </h2>
            <p style={{ fontSize:'1rem', color:'rgba(255,255,255,.48)', lineHeight:1.8, marginBottom:'2rem' }}>
              {t('about_intro_body')}
            </p>
            <Link href="/apply" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'.72rem 1.5rem', borderRadius:'var(--r-pill)', background:'rgba(255,255,255,.07)', color:'#fff', border:'1px solid rgba(255,255,255,.13)', textDecoration:'none', fontSize:'.8125rem', fontWeight:500, backdropFilter:'blur(8px)' }}>
              {tu('apply_artist')} →
            </Link>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.125rem' }}>
            {stats.map(({ v, l }) => (
              <div key={l} style={{ padding:'1.5rem', background:'rgba(255,255,255,.04)', borderRadius:'var(--r-lg)', border:'1px solid rgba(255,255,255,.07)' }}>
                <p className="display" style={{ fontSize:'clamp(2.25rem,4vw,3.375rem)', fontWeight:300, color:'#fff', lineHeight:1, letterSpacing:'-.025em', marginBottom:'.4rem' }}>
                  {typeof v === 'number' ? v.toLocaleString() : v}
                </p>
                <p className="label-xs" style={{ color:'rgba(255,255,255,.28)' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
