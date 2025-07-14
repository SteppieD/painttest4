import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import WebVitalsMonitor from '@/components/WebVitalsMonitor'
import './globals.css'

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
      <body className={inter.className}>
        {children}
        <Toaster />
        <WebVitalsMonitor config={{ debug: process.env.NODE_ENV === 'development' }} />
      </body>
    </html>
  )
}