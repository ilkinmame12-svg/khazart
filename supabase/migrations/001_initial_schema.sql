-- ============================================================
-- KHazar Arts — Complete Database Schema
-- Migration: 001_initial_schema.sql
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('artist', 'curator', 'collector', 'admin');

CREATE TYPE artwork_status AS ENUM (
  'draft',
  'pending',
  'approved',
  'rejected',
  'sold',
  'archived'
);

CREATE TYPE medium_type AS ENUM (
  'oil', 'acrylic', 'watercolor', 'gouache', 'pastel',
  'charcoal', 'ink', 'mixed_media', 'photography', 'digital',
  'sculpture', 'ceramics', 'textile', 'installation', 'print', 'other'
);

CREATE TYPE category_type AS ENUM (
  'painting', 'sculpture', 'photography', 'digital_art',
  'print', 'drawing', 'installation', 'textile', 'ceramics', 'mixed_media'
);

CREATE TYPE order_status AS ENUM (
  'pending', 'paid', 'shipped', 'delivered', 'refunded', 'cancelled'
);

CREATE TYPE moderation_action AS ENUM (
  'submitted', 'approved', 'rejected', 'revision_requested'
);

-- ============================================================
-- PROFILES
-- Extends Supabase auth.users
-- ============================================================

CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT NOT NULL DEFAULT '',
  role            user_role NOT NULL DEFAULT 'collector',
  -- Multilingual bio
  bio             TEXT,           -- English (default)
  bio_az          TEXT,           -- Azerbaijani
  bio_ru          TEXT,           -- Russian
  bio_fr          TEXT,           -- French
  -- Profile info
  avatar_url      TEXT,
  website         TEXT,
  instagram       TEXT,
  location        TEXT,
  nationality     TEXT,
  -- Platform status
  verified        BOOLEAN NOT NULL DEFAULT FALSE,
  featured        BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_account_id TEXT,         -- for artist payouts
  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ARTWORKS
-- Core content entity
-- ============================================================

CREATE TABLE artworks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  -- Multilingual title
  title           TEXT NOT NULL,        -- English
  title_az        TEXT,                 -- Azerbaijani
  title_ru        TEXT,                 -- Russian
  title_fr        TEXT,                 -- French
  -- Multilingual description
  description     TEXT,
  description_az  TEXT,
  description_ru  TEXT,
  description_fr  TEXT,
  -- Artwork details
  medium          medium_type NOT NULL,
  category        category_type NOT NULL,
  year            SMALLINT CHECK (year >= 1800 AND year <= 2100),
  -- Dimensions in cm
  width_cm        DECIMAL(8,1),
  height_cm       DECIMAL(8,1),
  depth_cm        DECIMAL(8,1),
  -- Pricing (stored in USD cents to avoid float issues)
  price_usd       INTEGER NOT NULL CHECK (price_usd > 0),
  -- Edition info
  edition         TEXT,                 -- e.g. "1/10", "AP 3/5"
  is_unique       BOOLEAN NOT NULL DEFAULT TRUE,
  -- Status & curation
  status          artwork_status NOT NULL DEFAULT 'draft',
  featured        BOOLEAN NOT NULL DEFAULT FALSE,
  -- Provenance & authenticity
  provenance      TEXT,
  certificate_url TEXT,
  -- Analytics
  views           INTEGER NOT NULL DEFAULT 0,
  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ARTWORK IMAGES
-- Multiple images per artwork, one primary
-- ============================================================

CREATE TABLE artwork_images (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id      UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  storage_path    TEXT NOT NULL,    -- Supabase Storage path
  public_url      TEXT NOT NULL,
  is_primary      BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order      SMALLINT NOT NULL DEFAULT 0,
  width           INTEGER,
  height          INTEGER,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one primary image per artwork
CREATE UNIQUE INDEX artwork_images_primary_idx
  ON artwork_images(artwork_id)
  WHERE is_primary = TRUE;

-- ============================================================
-- COLLECTIONS
-- Curated groupings of artworks
-- ============================================================

CREATE TABLE collections (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  curator_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  -- Multilingual
  title           TEXT NOT NULL,
  title_az        TEXT,
  title_ru        TEXT,
  title_fr        TEXT,
  description     TEXT,
  description_az  TEXT,
  description_ru  TEXT,
  description_fr  TEXT,
  -- Routing & display
  slug            TEXT NOT NULL UNIQUE,
  cover_image_url TEXT,
  featured        BOOLEAN NOT NULL DEFAULT FALSE,
  -- Publishing
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Junction table: artworks in collections
CREATE TABLE collection_artworks (
  collection_id   UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  artwork_id      UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  sort_order      SMALLINT NOT NULL DEFAULT 0,
  added_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (collection_id, artwork_id)
);

-- ============================================================
-- ORDERS
-- Purchase transactions
-- ============================================================

CREATE TABLE orders (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id                  UUID NOT NULL REFERENCES profiles(id),
  artwork_id                UUID NOT NULL REFERENCES artworks(id),
  -- Financials (USD cents)
  amount_usd                INTEGER NOT NULL,
  commission_usd            INTEGER NOT NULL,   -- platform 20%
  artist_payout_usd         INTEGER NOT NULL,   -- artist 80%
  -- Stripe
  stripe_payment_intent_id  TEXT UNIQUE,
  stripe_session_id         TEXT UNIQUE,
  -- Fulfillment
  status                    order_status NOT NULL DEFAULT 'pending',
  shipping_address          JSONB,
  tracking_number           TEXT,
  -- Timestamps
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MODERATION LOG
-- Every status change on an artwork is logged
-- ============================================================

CREATE TABLE moderation_log (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id      UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  curator_id      UUID REFERENCES profiles(id),
  action          moderation_action NOT NULL,
  note            TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SAVED ARTWORKS (Wishlist / Collector portfolio)
-- ============================================================

CREATE TABLE saved_artworks (
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  artwork_id      UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  saved_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, artwork_id)
);

-- ============================================================
-- ARTIST APPLICATIONS
-- For invite system — anyone can apply, curators accept
-- ============================================================

CREATE TABLE artist_applications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           TEXT NOT NULL,
  full_name       TEXT NOT NULL,
  bio             TEXT NOT NULL,
  website         TEXT,
  instagram       TEXT,
  portfolio_urls  TEXT[],
  statement       TEXT NOT NULL,   -- Why they want to join
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by     UUID REFERENCES profiles(id),
  review_note     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Artworks: most common queries
CREATE INDEX artworks_status_idx ON artworks(status);
CREATE INDEX artworks_artist_idx ON artworks(artist_id);
CREATE INDEX artworks_category_idx ON artworks(category);
CREATE INDEX artworks_medium_idx ON artworks(medium);
CREATE INDEX artworks_price_idx ON artworks(price_usd);
CREATE INDEX artworks_featured_idx ON artworks(featured) WHERE featured = TRUE;
CREATE INDEX artworks_created_idx ON artworks(created_at DESC);

-- Full-text search on title (English)
CREATE INDEX artworks_title_search_idx ON artworks
  USING gin(to_tsvector('english', coalesce(title, '')));

-- Profiles
CREATE INDEX profiles_role_idx ON profiles(role);
CREATE INDEX profiles_featured_idx ON profiles(featured) WHERE featured = TRUE;

-- Orders
CREATE INDEX orders_buyer_idx ON orders(buyer_id);
CREATE INDEX orders_artwork_idx ON orders(artwork_id);
CREATE INDEX orders_status_idx ON orders(status);

-- Moderation
CREATE INDEX moderation_artwork_idx ON moderation_log(artwork_id);
CREATE INDEX moderation_created_idx ON moderation_log(created_at DESC);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER artworks_updated_at
  BEFORE UPDATE ON artworks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- When artwork is sold, mark it as sold
CREATE OR REPLACE FUNCTION handle_order_paid()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status = 'pending' THEN
    UPDATE artworks SET status = 'sold' WHERE id = NEW.artwork_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_paid_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION handle_order_paid();

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_applications ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Profiles are publicly viewable"
  ON profiles FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ARTWORKS policies
CREATE POLICY "Published artworks are viewable by all"
  ON artworks FOR SELECT
  USING (status = 'approved' OR status = 'sold');

CREATE POLICY "Artists can view own artworks (any status)"
  ON artworks FOR SELECT
  USING (artist_id = auth.uid());

CREATE POLICY "Curators and admins can view all artworks"
  ON artworks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('curator', 'admin')
    )
  );

CREATE POLICY "Artists can insert own artworks"
  ON artworks FOR INSERT
  WITH CHECK (
    artist_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'artist'
    )
  );

CREATE POLICY "Artists can update own draft/rejected artworks"
  ON artworks FOR UPDATE
  USING (
    artist_id = auth.uid()
    AND status IN ('draft', 'rejected')
  );

CREATE POLICY "Curators can update artwork status"
  ON artworks FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('curator', 'admin')
    )
  );

-- ARTWORK IMAGES policies
CREATE POLICY "Artwork images follow artwork visibility"
  ON artwork_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM artworks
      WHERE artworks.id = artwork_images.artwork_id
      AND (
        artworks.status IN ('approved', 'sold')
        OR artworks.artist_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.role IN ('curator', 'admin')
        )
      )
    )
  );

CREATE POLICY "Artists can manage own artwork images"
  ON artwork_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM artworks
      WHERE artworks.id = artwork_images.artwork_id
      AND artworks.artist_id = auth.uid()
    )
  );

-- COLLECTIONS policies
CREATE POLICY "Published collections are viewable by all"
  ON collections FOR SELECT
  USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "Curators can manage their collections"
  ON collections FOR ALL
  USING (
    curator_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Collection artworks follow collection visibility"
  ON collection_artworks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM collections
      WHERE collections.id = collection_artworks.collection_id
      AND collections.published_at IS NOT NULL
      AND collections.published_at <= NOW()
    )
  );

-- ORDERS policies
CREATE POLICY "Buyers can see own orders"
  ON orders FOR SELECT
  USING (buyer_id = auth.uid());

CREATE POLICY "Artists can see orders for their artworks"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM artworks
      WHERE artworks.id = orders.artwork_id
      AND artworks.artist_id = auth.uid()
    )
  );

CREATE POLICY "Admins can see all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can create orders"
  ON orders FOR INSERT
  WITH CHECK (buyer_id = auth.uid());

-- SAVED ARTWORKS policies
CREATE POLICY "Users can manage own saved artworks"
  ON saved_artworks FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Users can view own saved artworks"
  ON saved_artworks FOR SELECT
  USING (user_id = auth.uid());

-- MODERATION LOG policies
CREATE POLICY "Curators can view moderation log"
  ON moderation_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('curator', 'admin')
    )
  );

CREATE POLICY "Artists can view moderation log for own artworks"
  ON moderation_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM artworks
      WHERE artworks.id = moderation_log.artwork_id
      AND artworks.artist_id = auth.uid()
    )
  );

CREATE POLICY "Curators can insert moderation entries"
  ON moderation_log FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('curator', 'admin')
    )
  );

-- ARTIST APPLICATIONS policies
CREATE POLICY "Anyone can submit an application"
  ON artist_applications FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Curators can view and update applications"
  ON artist_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('curator', 'admin')
    )
  );

-- ============================================================
-- STORAGE BUCKETS SETUP (run in Supabase dashboard or via API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('artwork-images', 'artwork-images', true);
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('artist-avatars', 'artist-avatars', true);
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('certificates', 'certificates', false);
