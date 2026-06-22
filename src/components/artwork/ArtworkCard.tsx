import Link from 'next/link'
import Image from 'next/image'
import type { Artwork, Locale } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
  locale: Locale
  priority?: boolean
}

function getLocalizedTitle(artwork: Artwork, locale: Locale): string {
  if (locale === 'az' && artwork.title_az) return artwork.title_az
  if (locale === 'ru' && artwork.title_ru) return artwork.title_ru
  if (locale === 'fr' && artwork.title_fr) return artwork.title_fr
  return artwork.title
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function formatDimensions(artwork: Artwork): string {
  if (!artwork.width_cm || !artwork.height_cm) return ''
  const parts = [artwork.height_cm, artwork.width_cm]
  if (artwork.depth_cm) parts.push(artwork.depth_cm)
  return parts.join(' × ') + ' cm'
}

export default function ArtworkCard({
  artwork,
  locale,
  priority = false,
}: ArtworkCardProps) {
  const title = getLocalizedTitle(artwork, locale)
  const primaryImage = artwork.images?.find((img) => img.is_primary) ?? artwork.images?.[0]
  const isSold = artwork.status === 'sold'
  const dimensions = formatDimensions(artwork)

  return (
    <article className="artwork-card">
      <Link
        href={`/${locale}/artwork/${artwork.id}`}
        className="no-underline block"
        aria-label={`${title} — ${artwork.artist?.full_name}`}
      >
        {/* Image */}
        <div className="artwork-card-image">
          {primaryImage ? (
            <Image
              src={primaryImage.public_url}
              alt={title}
              fill
              sizes="(min-width: 1200px) 320px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: '#E8E4DC' }}
              aria-hidden="true"
            >
              <span
                className="font-display text-slate-light"
                style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
              >
                NO IMAGE
              </span>
            </div>
          )}

          {/* Status badge */}
          {isSold && (
            <span className="badge-sold" aria-label="Sold">
              Sold
            </span>
          )}
          {artwork.featured && !isSold && (
            <span className="badge-featured" aria-label="Featured">
              Featured
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="artwork-card-body">
          {artwork.artist && (
            <p className="artwork-card-artist">
              {artwork.artist.full_name}
              {artwork.artist.verified && (
                <span
                  className="ml-1.5 text-gold"
                  aria-label="Verified artist"
                  title="Verified artist"
                >
                  ✦
                </span>
              )}
            </p>
          )}

          <h3 className="artwork-card-title">{title}</h3>

          <p className="artwork-card-meta">
            {artwork.year && <span>{artwork.year}</span>}
            {artwork.year && dimensions && <span> · </span>}
            {dimensions && <span>{dimensions}</span>}
          </p>

          <p className={`artwork-card-price ${isSold ? 'text-slate-light line-through' : ''}`}>
            {isSold ? 'Sold' : formatPrice(artwork.price_usd)}
          </p>
        </div>
      </Link>
    </article>
  )
}
