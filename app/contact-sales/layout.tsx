import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Sales | Enterprise Painting Software',
  description: 'Get a custom quote for PaintQuote Pro Business plan. Enterprise features for painting contractors including unlimited team members, API access, and custom integrations.',
  openGraph: {
    title: 'Contact Sales - PaintQuote Pro Business Plan',
    description: 'Get a custom quote for PaintQuote Pro Business plan with enterprise features for painting contractors.',
    type: 'website',
    images: ['/og-contact-sales.png'],
    url: 'https://paintquotepro.com/contact-sales'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Sales - PaintQuote Pro Business Plan',
    description: 'Get a custom quote for PaintQuote Pro Business plan with enterprise features.',
    images: ['/og-contact-sales.png']
  },
  alternates: {
    canonical: '/contact-sales'
  }
}

export default function ContactSalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}