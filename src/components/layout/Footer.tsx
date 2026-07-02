import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function Footer({ locale }: { locale?: string }) {
  if (locale) setRequestLocale(locale)
  const t = await getTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)' }}>
      <div className="wrap" style={{ padding:'3.5rem clamp(1.25rem,4vw,3.5rem) 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:'2rem', marginBottom:'2.5rem' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:'.875rem' }}>
              <span className="display" style={{ fontSize:'1.0625rem', letterSpacing:'.12em', color:'var(--ink)' }}>KHAZAR</span>
              <span style={{ width:4, height:4, borderRadius:'50%', background:'var(--gold)', display:'block' }} />
              <span className="display" style={{ fontSize:'1.0625rem', letterSpacing:'.12em', color:'var(--ink)' }}>ARTS</span>
            </div>
            <p style={{ fontSize:'.875rem', color:'var(--muted)', lineHeight:1.65, maxWidth:210 }}>{t('tagline')}</p>
          </div>

          {[
            { head:'Explore', links:[['catalog','/marketplace'],['collections','/collections'],['artists','/artists']] },
            { head:'Artists', links:[['apply','/apply'],['about','/about'],['contact','/contact']] },
            { head:'Legal',   links:[['privacy','/privacy'],['terms','/terms']] },
          ].map(({ head, links }) => (
            <div key={head}>
              <p className="label-xs" style={{ color:'var(--faint)', marginBottom:'.875rem' }}>{head}</p>
              <ul style={{ listStyle:'none' }}>
                {links.map(([key, path]) => (
                  <li key={key} style={{ marginBottom:7 }}>
                    <Link href={path as any} style={{ fontSize:'.875rem', color:'var(--muted)', textDecoration:'none' }}>
                      {t(key as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1.5rem', borderTop:'1px solid var(--border)', flexWrap:'wrap', gap:8 }}>
          <p style={{ fontSize:'.8125rem', color:'var(--faint)' }}>© {year} KHazar Arts. {t('rights')}</p>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:14, height:1, background:'var(--gold)' }} />
            <span className="label-xs" style={{ color:'var(--gold)' }}>KA</span>
            <span style={{ width:14, height:1, background:'var(--gold)' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
