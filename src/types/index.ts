// src/types/index.ts

export type { Locale } from '@/i18n/routing'

export type UserRole = 'artist' | 'curator' | 'collector' | 'admin'

export type ArtworkStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'sold' | 'archived'

export type MediumType =
  | 'oil'
  | 'acrylic'
  | 'watercolor'
  | 'gouache'
  | 'pastel'
  | 'charcoal'
  | 'ink'
  | 'mixed_media'
  | 'photography'
  | 'digital'
  | 'sculpture'
  | 'ceramics'
  | 'textile'
  | 'installation'
  | 'print'
  | 'other'

export type CategoryType =
  | 'painting'
  | 'sculpture'
  | 'photography'
  | 'digital_art'
  | 'print'
  | 'drawing'
  | 'installation'
  | 'textile'
  | 'ceramics'
  | 'mixed_media'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  bio: string | null
  bio_az: string | null
  bio_ru: string | null
  bio_fr: string | null
  avatar_url: string | null
  website: string | null
  instagram: string | null
  location: string | null
  nationality: string | null
  verified: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

export interface ArtworkImage {
  id: string
  artwork_id: string
  storage_path: string
  public_url: string
  is_primary: boolean
  sort_order: number
  width: number | null
  height: number | null
}

export interface Artwork {
  id: string
  artist_id: string
  title: string
  title_az: string | null
  title_ru: string | null
  title_fr: string | null
  description: string | null
  description_az: string | null
  description_ru: string | null
  description_fr: string | null
  medium: MediumType
  category: CategoryType
  year: number | null
  width_cm: number | null
  height_cm: number | null
  depth_cm: number | null
  price_usd: number
  edition: string | null
  is_unique: boolean
  status: ArtworkStatus
  provenance: string | null
  certificate_url: string | null
  featured: boolean
  views: number
  created_at: string
  updated_at: string
  // Relations
  artist?: Profile
  images?: ArtworkImage[]
}

export interface Collection {
  id: string
  curator_id: string
  title: string
  title_az: string | null
  title_ru: string | null
  title_fr: string | null
  description: string | null
  description_az: string | null
  description_ru: string | null
  description_fr: string | null
  slug: string
  cover_image_url: string | null
  featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  curator?: Profile
  artworks?: Artwork[]
  artwork_count?: number
}

export interface Order {
  id: string
  buyer_id: string
  artwork_id: string
  amount_usd: number
  commission_usd: number
  artist_payout_usd: number
  stripe_payment_intent_id: string | null
  stripe_session_id: string | null
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'refunded' | 'cancelled'
  shipping_address: ShippingAddress | null
  created_at: string
  updated_at: string
  artwork?: Artwork
  buyer?: Profile
}

export interface ShippingAddress {
  full_name: string
  line1: string
  line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  phone?: string
}

export interface ModerationEntry {
  id: string
  artwork_id: string
  curator_id: string | null
  action: 'submitted' | 'approved' | 'rejected' | 'revision_requested'
  note: string | null
  created_at: string
  artwork?: Artwork
  curator?: Profile
}

// i18n helpers
export interface LocalizedField {
  en: string
  az: string
  ru: string
  fr: string
}

// Filter & pagination
export interface ArtworkFilters {
  category?: CategoryType
  medium?: MediumType
  min_price?: number
  max_price?: number
  featured?: boolean
  artist_id?: string
  collection_id?: string
  status?: ArtworkStatus
}

export interface PaginationParams {
  page: number
  per_page: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}
