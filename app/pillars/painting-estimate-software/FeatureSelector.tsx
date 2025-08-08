'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface FeatureSelectorProps {
  onFeatureToggle?: (features: string[]) => void
}

export default function FeatureSelector({ onFeatureToggle }: FeatureSelectorProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature]
    
    setSelectedFeatures(newFeatures)
    onFeatureToggle?.(newFeatures)
  }

  const features = [
    'Mobile App',
    'Quote Generation', 
    'Customer Portal',
    'Analytics',
    'Team Collaboration'
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {features.map(feature => (
        <Badge
          key={feature}
          variant={selectedFeatures.includes(feature) ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => toggleFeature(feature)}
        >
          {feature}
        </Badge>
      ))}
    </div>
  )
}