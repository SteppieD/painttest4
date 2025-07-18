import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster-fixed'
import { CacheClearer } from '@/components/cache-clearer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paint Quote Pro',
  description: 'Professional painting quotes in minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="next-build-id" content={`build-${Date.now()}`} />
      </head>
      <body className={inter.className}>
        <CacheClearer />
        {children}
        <Toaster />
      </body>
    </html>
  )
}