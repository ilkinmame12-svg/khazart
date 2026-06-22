import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { locales, type Locale } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

interface Props { children: React.ReactNode; params: { locale: string } }

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' })
  return { title: 'KHazar Arts — Curated International Art', description: t('hero_subline') }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // This is the key fix: explicitly set the locale for this request
  setRequestLocale(locale)
  
  // Pass locale explicitly to getMessages
  const messages = await getMessages({ locale })
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header locale={locale as Locale} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
