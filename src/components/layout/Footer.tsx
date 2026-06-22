import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div className="wrap" style={{ padding: '4rem clamp(1.25rem,4vw,3.5rem) 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '2.5rem', marginBottom: '3rem' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '1rem' }}>
              <span className="font-display" style={{ fontSize: '1.125rem', letterSpacing: '0.12em', color: 'var(--ink)' }}>KHAZAR</span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'block' }} />
              <span className="font-display" style={{ fontSize: '1.125rem', letterSpacing: '0.12em', color: 'var(--ink)' }}>ARTS</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: 220 }}>
              {t('tagline')}
            </p>
          </div>

          {[
            { head: 'Explore', links: [['catalog','Catalog'],['collections','Collections'],['artists','Artists']] },
            { head: 'Artists', links: [['apply','Apply'],['about','About'],['contact','Contact']] },
            { head: 'Legal', links: [['privacy','Privacy'],['terms','Terms']] },
          ].map(({ head, links }) => (
            <div key={head}>
              <p className="label" style={{ color: 'var(--muted)', fontSize: '0.5625rem', marginBottom: '1rem' }}>{head}</p>
              <ul style={{ listStyle: 'none' }}>
                {links.map(([key, label]) => (
                  <li key={key} style={{ marginBottom: 8 }}>
                    <Link href="#" style={{ fontSize: '0.875rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.15s' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>© {year} KHazar Arts. {t('rights')}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 16, height: 1, background: 'var(--gold)' }} />
            <span className="label" style={{ color: 'var(--gold)', fontSize: '0.5625rem' }}>KA</span>
            <span style={{ width: 16, height: 1, background: 'var(--gold)' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
