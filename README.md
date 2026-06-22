# KHazar Arts

Curated international art marketplace. Built with Next.js 14, Supabase, and next-intl.

**Languages:** English · Azərbaycan · Русский · Français

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| i18n | next-intl |
| Payments | Stripe |
| Deploy | Vercel |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your project URL and anon key
3. Run the migration: `supabase/migrations/001_initial_schema.sql`
4. Create storage buckets:
   - `artwork-images` (public)
   - `artist-avatars` (public)
   - `certificates` (private)

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in your Supabase URL, anon key, and Stripe keys.

### 4. Run locally

```bash
npm run dev
```

## Project structure

```
src/
├── app/
│   ├── [locale]/          # All pages under locale prefix
│   │   ├── page.tsx       # Homepage
│   │   ├── marketplace/   # Catalog
│   │   ├── artwork/[id]/  # Artwork detail
│   │   ├── artist/[id]/   # Artist profile
│   │   ├── collections/   # Collections
│   │   └── auth/          # Sign in / Sign up
│   └── globals.css
├── components/
│   ├── layout/            # Header, Footer, Hero, About
│   ├── artwork/           # ArtworkCard, FeaturedCollections, NewWorks
│   └── artist/            # FeaturedArtists
├── i18n/
│   ├── messages/
│   │   ├── en.json        # English
│   │   ├── az.json        # Azerbaijani
│   │   ├── ru.json        # Russian
│   │   └── fr.json        # French
│   └── request.ts
├── lib/
│   └── supabase/
│       ├── client.ts      # Browser client
│       └── server.ts      # Server client
└── types/
    └── index.ts           # All TypeScript types
```

## URL structure

```
/en             → Homepage (English)
/az             → Homepage (Azerbaijani)
/ru             → Homepage (Russian)
/fr             → Homepage (French)

/en/marketplace → Art catalog
/en/artwork/[id] → Artwork detail
/en/artist/[id]  → Artist profile
/en/collections  → All collections
/en/auth/sign-in → Sign in
/en/submit       → Submit artwork
```

## Commission model

- Platform takes **20%** of each sale
- Artist receives **80%** via Stripe Connect
- Calculated in `orders.commission_usd` and `orders.artist_payout_usd`

## Roles

| Role | Can do |
|---|---|
| `collector` | Browse, purchase, save artworks |
| `artist` | Above + submit artworks, manage profile |
| `curator` | Above + review submissions, build collections |
| `admin` | Full platform access |

## Deploy to Vercel

```bash
npx vercel
```

Set all environment variables in Vercel dashboard.
