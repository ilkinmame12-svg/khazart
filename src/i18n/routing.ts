import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'az', 'ru', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
export const locales = routing.locales
export const defaultLocale = routing.defaultLocale
