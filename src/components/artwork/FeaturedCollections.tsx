import Link from 'next/link'
import type { Collection, Locale } from '@/types'

interface FeaturedCollectionsProps {
  collections: Collection[]
  locale: Locale
  title: string
  viewAll: string
}

const DEMO_COLLECTIONS = [
  { id: '1', slug: 'modern-landscapes', title: 'Modern Landscapes', description: 'Contemporary perspectives on nature and terrain from artists across five continents.', artwork_count: 24, cover_image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=70' },
  { id: '2', slug: 'abstract-forms', title: 'Abstract Forms', description: 'Works exploring geometry, colour field, and the boundaries of representation.', artwork_count: 18, cover_image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=70' },
  { id: '3', slug: 'figurative-now', title: 'Figurative Now', description: 'The human form reinterpreted through contemporary painting and sculpture.', artwork_count: 31, cover_image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=70' },
]

export default function FeaturedCollections({ collections, locale, title, viewAll }: FeaturedCollectionsProps) {
  const items = collections.length > 0 ? collections : DEMO_COLLECTIONS as any[]

  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="content-container">
        <div className="section-header">
          <div>
            <p className="text-label mb-1" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem' }}>Curated</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <Link href={`/${locale}/collections`} className="btn-ghost">
            {viewAll} →
          </Link>
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))' }}
        >
          {items.map((col, i) => (
            <Link
              key={col.id}
              href={`/${locale}/collections/${col.slug}`}
              className="no-underline group"
            >
              <article>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    aspectRatio: i === 0 ? '16/10' : '4/3',
                    background: '#E8E5DF',
                    marginBottom: '0.875rem',
                  }}
                >
                  <img
                    src={col.cover_image_url}
                    alt={col.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease',
                    }}
                    className="group-hover:scale-[1.04]"
                  />
                  {/* Gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
                  }} />
                  {/* Count */}
                  <div style={{
                    position: 'absolute', bottom: '0.875rem', left: '0.875rem',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(6px)',
                    color: 'white',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 3,
                  }}>
                    {col.artwork_count} works
                  </div>
                </div>

                <p className="text-label mb-1" style={{ color: 'var(--color-gold)', fontSize: '0.625rem' }}>
                  Collection
                </p>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: '#1A1917',
                    margin: '0 0 0.3rem',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {col.title}
                </h3>
                {col.description && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0 }}
                     className="line-clamp-2">
                    {col.description}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
