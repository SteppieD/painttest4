import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import '../styles/contractor-theme.css'
import '../styles/modern-design-system.css'
import { Toaster } from '@/components/ui/toaster-fixed'
import { CacheClearer } from '@/components/cache-clearer'
import GoogleTagManager, { GoogleTagManagerNoscript } from '@/components/GoogleTagManager'
import GTMProvider from '@/components/analytics/GTMProvider'
import { ShareLinkTracker } from '@/components/share-link-tracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'),
  title: {
    default: 'Paint Quote Pro - Professional Painting Quotes in Minutes',
    template: '%s | Paint Quote Pro'
  },
  description: 'Create professional painting quotes in 10-15 minutes. Win 40-60% more jobs with AI-powered estimates. Join 500+ contractors using Paint Quote Pro.',
  keywords: [
    'painting quote software',
    'painting estimate app',
    'contractor quoting tool',
    'paint estimating software',
    'painting business software',
    'painting contractor app',
    'quote generator for painters',
    'painting bid software'
  ],
  authors: [{ name: 'Paint Quote Pro' }],
  creator: 'Paint Quote Pro',
  publisher: 'Paint Quote Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Paint Quote Pro',
    title: 'Paint Quote Pro - Professional Painting Quotes in Minutes',
    description: 'Create professional painting quotes in 10-15 minutes. Win 40-60% more jobs with AI-powered estimates. Join 500+ contractors using Paint Quote Pro.',
    // images will be added when available
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paint Quote Pro - Professional Painting Quotes in Minutes',
    description: 'Create professional painting quotes in 10-15 minutes. Win 40-60% more jobs with AI-powered estimates.',
    creator: '@paintquotepro',
    // images will be added when available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  category: 'technology',
  applicationName: 'Paint Quote Pro',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // verification: {
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-site-verification-code',
  // },
  icons: {
    icon: '/Paint Quote App Logo Transparent.png',
    shortcut: '/Paint Quote App Logo Transparent.png',
    apple: '/Paint Quote App Logo Transparent.png',
  },
  other: {
    'msapplication-TileColor': '#3b82f6',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Paint Quote Pro',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" href="https://paintquotepro.com" hrefLang="en-US" />
        <link rel="alternate" href="https://paintquotepro.com" hrefLang="x-default" />
        {/* Preconnect to Google Tag Manager for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Tag Manager - Head */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager - Body (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManagerNoscript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <CacheClearer />
        <Suspense fallback={null}>
          <ShareLinkTracker />
        </Suspense>
        <GTMProvider>
          {children}
        </GTMProvider>
        <Toaster />
      </body>
    </html>
  )
}