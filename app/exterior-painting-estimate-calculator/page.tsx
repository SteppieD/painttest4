import { Metadata } from 'next'
import ExteriorPaintingCalculatorClient from './calculator-client'

export const metadata: Metadata = {
  title: 'Exterior Painting Estimate Calculator | Free Quote Tool | PaintQuote Pro',
  description: 'Calculate exterior painting costs for homes and buildings. Free calculator for siding, trim, doors, windows, and decks. Get accurate estimates instantly.',
  keywords: 'exterior painting calculator, exterior paint cost calculator, house exterior painting estimate, siding painting calculator, exterior paint estimate',
  openGraph: {
    title: 'Exterior Painting Estimate Calculator - Professional Quotes',
    description: 'Free exterior painting calculator for contractors. Estimate siding, trim, and exterior surface costs.',
    type: 'website',
  },
}

export default function ExteriorPaintingEstimateCalculator() {
  return <ExteriorPaintingCalculatorClient />
}