import { Link } from '@/i18n/navigation'

const COLLECTIONS: Record<string, any> = {
  'modern-landscapes': {
    slug: 'modern-landscapes',
    title: 'Modern Landscapes',
    date: 'Spring 2024',
    description: 'Contemporary perspectives on nature and terrain from artists across five continents. A meditation on how painters today negotiate the legacy of landscape tradition — between documentation and transformation, between the personal and the planetary.',
    cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1400&q=80',
    works: [
      { id:'1', title:'Golden Hour', artist:'Elena Vasquez', price:4800, year:2024, status:'available', img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75' },
      { id:'4', title:'Soft Geometry', artist:'Nadia Petrov', price:1900, year:2024, status:'available', img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
      { id:'8', title:'Horizon Study', artist:'Pavel Nowak', price:3900, year:2023, status:'available', img:'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75' },
      { id:'12', title:'Valley at Dusk', artist:'Omar Shaikh', price:2200, year:2024, status:'available', img:'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75' },
      { id:'5', title:'Untitled No. 7', artist:'Yuki Tanaka', price:2800, year:2024, status:'available', img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75' },
      { id:'7', title:'Coastal Fragment', artist:'Sara Chen', price:1550, year:2024, status:'sold', img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
    ],
  },
  'abstract-forms': {
    slug: 'abstract-forms',
    title: 'Abstract Forms',
    date: 'Winter 2023',
    description: 'Works exploring geometry, colour field, and the limits of representation. From hard-edge painting to gestural abstraction, this collection traces the many directions that non-figurative art takes in the present moment.',
    cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80',
    works: [
      { id:'2', title:'Blue Silence', artist:'Arash Moradiani', price:3200, year:2023, status:'available', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
      { id:'6', title:'Forms in Red', artist:'Marco Bellini', price:4200, year:2023, status:'available', img:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75' },
      { id:'11', title:'Night Frequency', artist:'Ines Moreau', price:5600, year:2023, status:'available', img:'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=75' },
      { id:'10', title:'Paper Garden', artist:'Li Wei', price:1200, year:2024, status:'available', img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75' },
    ],
  },
  'figurative-now': {
    slug: 'figurative-now',
    title: 'Figurative Now',
    date: 'Summer 2024',
    description: 'The human form reinterpreted through contemporary painting, sculpture, and photography. An expansive survey of how artists engage with the body, identity, and presence in the current moment.',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80',
    works: [
      { id:'3', title:'Desert Memory', artist:'Karim Al-Rashid', price:6500, year:2023, status:'available', img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75' },
      { id:'9', title:'Bronze Figure I', artist:'Amara Diallo', price:8900, year:2024, status:'available', img:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75' },
      { id:'7', title:'Coastal Fragment', artist:'Sara Chen', price:1550, year:2024, status:'sold', img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
    ],
  },
  'works-on-paper': {
    slug: 'works-on-paper',
    title: 'Works on Paper',
    date: 'Autumn 2023',
    description: 'Drawing, print, and watercolour — the intimate scale of paper as a site of invention and immediacy.',
    cover: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1400&q=80',
    works: [
      { id:'4', title:'Soft Geometry', artist:'Nadia Petrov', price:1900, year:2024, status:'available', img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
      { id:'10', title:'Paper Garden', artist:'Li Wei', price:1200, year:2024, status:'available', img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75' },
      { id:'12', title:'Valley at Dusk', artist:'Omar Shaikh', price:2200, year:2024, status:'available', img:'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75' },
    ],
  },
  'gulf-perspectives': {
    slug: 'gulf-perspectives',
    title: 'Gulf Perspectives',
    date: 'Spring 2024',
    description: 'Artists from the Gulf and wider Middle East — a regional lens on global conversations in contemporary art.',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80',
    works: [
      { id:'2', title:'Blue Silence', artist:'Arash Moradiani', price:3200, year:2023, status:'available', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
      { id:'3', title:'Desert Memory', artist:'Karim Al-Rashid', price:6500, year:2023, status:'available', img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75' },
    ],
  },
  'under-5000': {
    slug: 'under-5000',
    title: 'Under $5,000',
    date: 'Ongoing',
    description: 'Exceptional works by emerging and mid-career artists, accessible to new and experienced collectors alike.',
    cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80',
    works: [
      { id:'1', title:'Golden Hour', artist:'Elena Vasquez', price:4800, year:2024, status:'available', img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75' },
      { id:'2', title:'Blue Silence', artist:'Arash Moradiani', price:3200, year:2023, status:'available', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
      { id:'4', title:'Soft Geometry', artist:'Nadia Petrov', price:1900, year:2024, status:'available', img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75' },
      { id:'10', title:'Paper Garden', artist:'Li Wei', price:1200, year:2024, status:'available', img:'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75' },
      { id:'5', title:'Untitled No. 7', artist:'Yuki Tanaka', price:2800, year:2024, status:'available', img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75' },
      { id:'12', title:'Valley at Dusk', artist:'Omar Shaikh', price:2200, year:2024, status:'available', img:'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=600&q=75' },
      { id:'7', title:'Coastal Fragment', artist:'Sara Chen', price:1550, year:2024, status:'sold', img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75' },
    ],
  },
}

export default function CollectionPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params
  const collection = COLLECTIONS[slug] || COLLECTIONS['modern-landscapes']
  const available = collection.works.filter((w: any) => w.status === 'available').length

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden', background: 'var(--ink)' }}>
        <img src={collection.cover} alt={collection.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,14,0.85) 0%, transparent 60%)' }} />

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: '1.5rem', left: 0, right: 0 }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link href="/collections" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Collections</Link>
              <span>/</span>
              <span style={{ color: 'white' }}>{collection.title}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 0 2.5rem' }}>
          <div className="wrap">
            <p className="label" style={{ color: 'var(--gold)', fontSize: '0.625rem', marginBottom: 10 }}>
              Collection · {collection.date} · {available} works available
            </p>
            <h1 className="font-display" style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300,
              color: 'white', letterSpacing: '-0.02em', lineHeight: 0.95, margin: 0,
            }}>
              {collection.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap" style={{ padding: '2rem clamp(1.25rem,4vw,3.5rem)' }}>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 680, margin: 0 }}>
            {collection.description}
          </p>
        </div>
      </div>

      {/* Works */}
      <div className="wrap" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        <div className="art-grid">
          {collection.works.map((work: any) => {
            const sold = work.status === 'sold'
            return (
              <article key={work.id} className="art-card">
                <Link href={`/artwork/${work.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="art-card-img">
                    <img src={work.img} alt={work.title} />
                    <div className="art-card-overlay" />
                    {sold && <span className="badge badge-sold">Sold</span>}
                  </div>
                  <div className="art-card-body">
                    <p className="art-card-artist">{work.artist}</p>
                    <h3 className="art-card-title">{work.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>{work.year}</p>
                    {sold
                      ? <p className="art-card-price-sold">Sold</p>
                      : <p className="art-card-price">${work.price.toLocaleString()}</p>
                    }
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
