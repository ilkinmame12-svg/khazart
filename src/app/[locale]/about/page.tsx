import Link from 'next/link'

export default function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#1A1917', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'url(https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=50)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="content-container" style={{ position: 'relative' }}>
          <p className="text-label" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem', marginBottom: 16 }}>About</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.0, margin: '0 0 1.5rem', maxWidth: 700 }}>
            Every work is selected, not listed.
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', maxWidth: 560, lineHeight: 1.75, margin: 0 }}>
            KHazar Arts is a curated platform connecting serious collectors with artists of consequence from around the world.
          </p>
        </div>
      </div>

      <div className="content-container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

        {/* Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <p className="text-label" style={{ color: 'var(--color-gold)', marginBottom: 12, fontSize: '0.6875rem' }}>Our mission</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 400, marginBottom: '1.25rem', lineHeight: 1.1 }}>Art that endures, for collectors who care</h2>
            <p style={{ fontSize: '1rem', color: '#6B6865', lineHeight: 1.8, marginBottom: '1rem' }}>
              KHazar Arts was founded on a simple belief: that the internet had made it easier to sell art, but not easier to discover great art. We exist to change that.
            </p>
            <p style={{ fontSize: '1rem', color: '#6B6865', lineHeight: 1.8 }}>
              Every artwork on our platform has been reviewed by our curatorial team before it is published. We reject more than we accept — and that is the point.
            </p>
          </div>
          <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="Curation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: '5rem' }}>
          <p className="text-label" style={{ color: 'var(--color-gold)', marginBottom: 16, fontSize: '0.6875rem' }}>What we stand for</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px,100%), 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Curation over volume', body: 'We publish fewer works so that every work matters. Quality over quantity is not a slogan — it is the operating principle.' },
              { title: 'Artist-first', body: 'Artists receive 80% of every sale. We believe the platform exists to serve creators, not the other way around.' },
              { title: 'Global by design', body: 'Our team and our artists span more than 28 countries. We actively seek perspectives outside the Western art market mainstream.' },
              { title: 'Transparent provenance', body: 'Every work comes with a certificate of authenticity and a full provenance record. Collectors deserve to know exactly what they are buying.' },
            ].map(({ title, body }) => (
              <div key={title} style={{ background: 'white', borderRadius: 10, padding: '1.75rem', border: '1px solid #E2DDD6' }}>
                <div style={{ width: 28, height: 3, background: 'var(--color-gold)', borderRadius: 2, marginBottom: '1rem' }} />
                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.75rem', color: '#1A1917' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#6B6865', lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1A1917', borderRadius: 14, padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <p className="text-label" style={{ color: 'var(--color-gold)', marginBottom: 12, fontSize: '0.6875rem' }}>Join us</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 400, color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>Ready to start your collection?</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', marginBottom: '2rem' }}>Browse curated works or apply as an artist.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/marketplace`} style={{ padding: '0.875rem 2rem', background: 'white', color: '#1A1917', textDecoration: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.9375rem', fontFamily: 'var(--font-inter)' }}>
              Browse catalog
            </Link>
            <Link href={`/${locale}/apply`} style={{ padding: '0.875rem 2rem', background: 'transparent', color: 'white', textDecoration: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)' }}>
              Apply as artist
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
