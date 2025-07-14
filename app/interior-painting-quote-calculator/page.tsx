import { Metadata } from 'next'
import InteriorPaintingCalculatorClient from './calculator-client'

export const metadata: Metadata = {
  title: 'Interior Painting Quote Calculator | Free Estimate Tool | PaintQuote Pro',
  description: 'Calculate interior painting costs instantly. Free calculator for walls, ceilings, trim, doors, and windows. Get accurate quotes for any room.',
  keywords: 'interior painting calculator, interior painting cost calculator, room painting calculator, interior paint estimate, wall painting calculator',
  openGraph: {
    title: 'Interior Painting Quote Calculator - Get Instant Estimates',
    description: 'Free interior painting calculator for contractors. Calculate costs for walls, ceilings, and trim instantly.',
    type: 'website',
  },
}

export default function InteriorPaintingQuoteCalculator() {
  return <InteriorPaintingCalculatorClient />
}