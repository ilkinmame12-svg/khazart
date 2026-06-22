import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — KHazar Arts',
    default: 'KHazar Arts — Curated International Art',
  },
  description:
    'A curated platform for collectors and artists of consequence. Every work is selected, not listed.',
  metadataBase: new URL('https://khazar.art'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  )
}
