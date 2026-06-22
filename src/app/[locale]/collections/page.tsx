import { Link } from '@/i18n/navigation'

const COLLECTIONS = [
  { id: '1', slug: 'modern-landscapes', title: 'Modern Landscapes', curator: 'KHazar Arts Editorial', date: 'Spring 2024', count: 24, description: 'Contemporary perspectives on nature and terrain from artists across five continents. A meditation on how painters today negotiate the legacy of landscape tradition.', cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=75', works: ['https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=200', 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=200', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=200'] },
  { id: '2', slug: 'abstract-forms', title: 'Abstract Forms', curator: 'KHazar Arts Editorial', date: 'Winter 2023', count: 18, description: 'Works exploring geometry, colour field, and the limits of representation. From hard-edge painting to gestural abstraction.', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=75', works: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200'] },
  { id: '3', slug: 'figurative-now', title: 'Figurative Now', curator: 'KHazar Arts Editorial', date: 'Summer 2024', count: 31, description: 'The human form reinterpreted through contemporary painting, sculpture, and photography. An expansive survey of how artists engage with the body today.', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75', works: ['https://images.unsplash.com/photo-1579583902614-a3fb3927b6a5?w=200', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=200'] },
  { id: '4', slug: 'works-on-paper', title: 'Works on Paper', curator: 'KHazar Arts Editorial', date: 'Autumn 2023', count: 15, description: 'Drawing, print, and watercolour — the intimate scale of paper as a site of invention.', cover: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=900&q=75', works: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=200', 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=200', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200'] },
  { id: '5', slug: 'gulf-perspectives', title: 'Gulf Perspectives', curator: 'KHazar Arts Editorial', date: 'Spring 2024', count: 12, description: 'Artists from the Gulf and wider Middle East — a regional lens on global conversations in contemporary art.', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75', works: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200'] },
  { id: '6', slug: 'under-5000', title: 'Under $5,000', curator: 'KHazar Arts Editorial', date: 'Ongoing', count: 42, description: 'Exceptional works by emerging and mid-career artists, accessible to new and experienced collectors alike.', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=75', works: ['https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=200', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200'] },
]

export default function CollectionsPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [featured, ...rest] = COLLECTIONS

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD6', padding: '2.5rem 0 2rem' }}>
        <div className="content-container">
          <p className="text-label" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem', marginBottom: 8 }}>Curated</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>Collections</h1>
          <p style={{ fontSize: '1rem', color: '#6B6865', margin: 0 }}>Thematic groupings selected by our curatorial team</p>
        </div>
      </div>

      <div className="content-container section">

        {/* Hero collection */}
        <Link href={`/collections/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '3rem' }} className="group">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center', background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid #E2DDD6' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={featured.cover} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} className="group-hover:scale-[1.03]" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1))' }} />
            </div>
            <div style={{ padding: '2.5rem 2.5rem 2.5rem 0' }}>
              <span style={{ display: 'inline-block', background: '#1A1917', color: 'white', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.625rem', borderRadius: 3, marginBottom: '1rem' }}>
                Featured collection
              </span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, margin: '0 0 0.75rem', letterSpacing: '-0.01em' }}>{featured.title}</h2>
              <p style={{ fontSize: '0.9375rem', color: '#6B6865', lineHeight: 1.7, marginBottom: '1.25rem' }}>{featured.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex' }}>
                  {featured.works.map((w, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '2px solid white', marginLeft: i ? -8 : 0 }}>
                      <img src={w} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', color: '#6B6865' }}>{featured.count} works · {featured.date}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
          {rest.map(col => (
            <Link key={col.id} href={`/collections/${col.slug}`} style={{ textDecoration: 'none' }} className="group">
              <article style={{ background: 'white', borderRadius: 10, overflow: 'hidden', border: '1px solid #E2DDD6', transition: 'box-shadow 0.2s ease' }} className="group-hover:shadow-md">
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={col.cover} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} className="group-hover:scale-[1.04]" />
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '0.6875rem', fontWeight: 500, padding: '0.2rem 0.5rem', borderRadius: 3, letterSpacing: '0.06em' }}>
                    {col.count} works
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <p className="text-label" style={{ color: 'var(--color-gold)', fontSize: '0.625rem', marginBottom: 4 }}>{col.date}</p>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.5rem', color: '#1A1917' }}>{col.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6B6865', lineHeight: 1.55, margin: 0 }} className="line-clamp-2">{col.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
