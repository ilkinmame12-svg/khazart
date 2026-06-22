import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#F0EDE8',
        borderTop: '1px solid #E2DDD6',
        marginTop: 'auto',
      }}
    >
      <div className="content-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display" style={{ fontSize: '1.125rem', letterSpacing: '0.08em', color: '#1A1917' }}>
                KHAZAR
              </span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />
              <span className="font-display" style={{ fontSize: '1.125rem', letterSpacing: '0.08em', color: '#1A1917' }}>
                ARTS
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6B6865', lineHeight: 1.6, maxWidth: 200 }}>
              {t('tagline')}
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-label mb-4" style={{ color: '#A09D99', fontSize: '0.625rem' }}>Explore</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['catalog', 'collections', 'artists'] as const).map(key => (
                <li key={key}>
                  <Link
                    href={`#`}
                    className="no-underline"
                    style={{ fontSize: '0.875rem', color: '#6B6865', transition: 'color 0.15s' }}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artists */}
          <div>
            <p className="text-label mb-4" style={{ color: '#A09D99', fontSize: '0.625rem' }}>Artists</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['apply', 'about', 'contact'] as const).map(key => (
                <li key={key}>
                  <Link
                    href={`#`}
                    className="no-underline"
                    style={{ fontSize: '0.875rem', color: '#6B6865' }}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-label mb-4" style={{ color: '#A09D99', fontSize: '0.625rem' }}>Legal</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['privacy', 'terms'] as const).map(key => (
                <li key={key}>
                  <Link
                    href={`#`}
                    className="no-underline"
                    style={{ fontSize: '0.875rem', color: '#6B6865' }}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid #E2DDD6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: '#A09D99', margin: 0 }}>
            © {year} KHazar Arts. {t('rights')}
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ width: 16, height: 1, background: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-gold)', fontWeight: 600, letterSpacing: '0.12em' }}>KA</span>
            <span style={{ width: 16, height: 1, background: 'var(--color-gold)' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
