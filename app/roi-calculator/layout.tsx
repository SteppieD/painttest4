import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI Calculator for Painting Contractors | See Your Growth | PaintQuote Pro',
  description: 'Calculate your painting business ROI with PaintQuote Pro. See how much time and revenue you can gain. Based on real data from 2,847+ contractors.',
  keywords: 'painting contractor roi calculator, painting business calculator, painting software roi, contractor business growth calculator, painting estimate roi',
  openGraph: {
    title: 'Calculate Your Painting Business ROI - Free Calculator',
    description: 'See exactly how much time and money PaintQuote Pro can save your painting business. Personalized projections based on your metrics.',
    type: 'website',
    images: [{
      url: '/og-roi-calculator.png',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro ROI Calculator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculate Your Painting Business ROI',
    description: 'Free calculator shows your potential growth with PaintQuote Pro',
  },
  alternates: {
    canonical: '/roi-calculator'
  }
}

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}