'use client'

import { useEffect } from 'react'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { achievementService } from '@/lib/gamification/achievement-service'

export function useFeatureTracking(featureName: string) {
  const companyData = useCompanyAuth()
  
  useEffect(() => {
    if (companyData?.id && featureName) {
      // Track feature usage for achievements
      achievementService.trackFeatureUsage(companyData.id, featureName)
    }
  }, [companyData?.id, featureName])
}

// Helper hook to track multiple features
export function usePageFeatureTracking(pageName: string) {
  useFeatureTracking(`page_${pageName}`)
}