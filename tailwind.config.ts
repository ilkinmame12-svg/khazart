import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A09',
        linen: '#F5F2ED',
        bone: '#E8E4DC',
        slate: '#3D3B38',
        'slate-mid': '#6B6965',
        'slate-light': '#9C9A96',
        gold: '#C9AA72',
        'gold-light': '#E0CC9B',
        'gold-dark': '#A08450',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '40': '10rem',
      },
      maxWidth: {
        'site': '1440px',
        'content': '1200px',
        'narrow': '720px',
      },
      transitionTimingFunction: {
        'art': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      aspectRatio: {
        'artwork': '4 / 5',
        'artwork-wide': '3 / 2',
      },
      gridTemplateColumns: {
        'catalog': 'repeat(auto-fill, minmax(280px, 1fr))',
        'catalog-lg': 'repeat(auto-fill, minmax(340px, 1fr))',
      },
    },
  },
  plugins: [],
}

export default config
