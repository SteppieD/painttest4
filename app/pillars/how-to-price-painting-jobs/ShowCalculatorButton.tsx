'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calculator, Zap } from 'lucide-react'

export default function ShowCalculatorButton() {
  const [showCalculator, setShowCalculator] = useState(false)

  return (
    <Button 
      size="lg" 
      className="bg-white text-blue-600 hover:bg-gray-100 animate-pulse"
      onClick={() => setShowCalculator(true)}
    >
      <Calculator className="mr-2 h-5 w-5" />
      Get My Profit Calculator FREE
    </Button>
  )
}