import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/layout/HeroSection'
import FeaturedCollections from '@/components/artwork/FeaturedCollections'
import NewWorks from '@/components/artwork/NewWorks'
import FeaturedArtists from '@/components/artist/FeaturedArtists'
import AboutSection from '@/components/layout/AboutSection'
import type { Locale } from '@/i18n/routing'

interface HomePageProps {
  params: { locale: Locale }
}

async function getHomeData() {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = createClient()

    const [
      { data: collections },
      { data: newArtworks },
      { data: featuredArtists },
      { count: artistCount },
      { count: artworkCount },
    ] = await Promise.all([
      supabase
        .from('collections')
        .select('*, collection_artworks(artwork:artworks(id, title, status, images:artwork_images(public_url, is_primary)))')
        .eq('featured', true)
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .limit(3),

      supabase
        .from('artworks')
        .select('*, artist:profiles(id, full_name, verified, avatar_url, nationality), images:artwork_images(public_url, is_primary, sort_order)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(8),

      supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artist')
        .eq('featured', true)
        .eq('verified', true)
        .limit(6),

      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'artist'),

      supabase
        .from('artworks')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved'),
    ])

    return {
      collections: collections ?? [],
      newArtworks: newArtworks ?? [],
      featuredArtists: featuredArtists ?? [],
      artistCount: artistCount ?? 0,
      artworkCount: artworkCount ?? 0,
    }
  } catch {
    return {
      collections: [],
      newArtworks: [],
      featuredArtists: [],
      artistCount: 0,
      artworkCount: 0,
    }
  }
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations('home')
  const data = await getHomeData()

  return (
    <>
      <HeroSection locale={locale} />

      <FeaturedCollections
        collections={data.collections}
        locale={locale}
        title={t('featured_collections')}
        viewAll={t('view_all')}
      />

      <NewWorks
        artworks={data.newArtworks}
        locale={locale}
        title={t('new_works')}
        viewAll={t('view_all')}
      />

      <FeaturedArtists
        artists={data.featuredArtists}
        locale={locale}
        title={t('featured_artists')}
        viewAll={t('view_all')}
      />

      <AboutSection
        artistCount={data.artistCount}
        artworkCount={data.artworkCount}
        locale={locale}
      />
    </>
  )
}
