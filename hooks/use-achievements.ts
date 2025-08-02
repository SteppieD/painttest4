'use client'

import { useState, useEffect } from 'react'
import { useCompanyAuth } from '@/components/auth-wrapper'

interface AchievementData {
  id: string
  unlockedAt: number
  points: number
}

export function useAchievements() {
  const companyData = useCompanyAuth()
  const [achievements, setAchievements] = useState<AchievementData[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [latestAchievement, setLatestAchievement] = useState<string | null>(null)

  // Load achievements from localStorage
  useEffect(() => {
    if (companyData?.id) {
      const key = `achievements_${companyData.id}`
      const stored = localStorage.getItem(key)
      if (stored) {
        const data = JSON.parse(stored)
        setAchievements(data.achievements || [])
        setTotalPoints(data.totalPoints || 0)
      }
    }
  }, [companyData?.id])

  // Save achievements to localStorage
  const saveAchievements = (newAchievements: AchievementData[], newTotal: number) => {
    if (companyData?.id) {
      const key = `achievements_${companyData.id}`
      localStorage.setItem(key, JSON.stringify({
        achievements: newAchievements,
        totalPoints: newTotal
      }))
    }
  }

  // Unlock an achievement
  const unlockAchievement = (achievementId: string, points: number) => {
    // Check if already unlocked
    if (achievements.some(a => a.id === achievementId)) {
      return false
    }

    const newAchievement: AchievementData = {
      id: achievementId,
      unlockedAt: Date.now(),
      points
    }

    const newAchievements = [...achievements, newAchievement]
    const newTotal = totalPoints + points

    setAchievements(newAchievements)
    setTotalPoints(newTotal)
    setLatestAchievement(achievementId)
    saveAchievements(newAchievements, newTotal)

    // Clear latest achievement after showing
    setTimeout(() => {
      setLatestAchievement(null)
    }, 100)

    return true
  }

  // Check various achievement conditions
  const checkQuoteAchievements = async (quoteData: {
    customLineItems?: Array<{ name: string; cost: number; description?: string }>;
    customerName?: string;
    totalCost?: number;
    projectType?: string;
    [key: string]: unknown;
  }, timeToCreate?: number) => {
    if (!companyData) return

    // First Quote Achievement
    try {
      const response = await fetch('/api/companies/stats', {
        headers: {
          'x-company-data': JSON.stringify({ 
            id: companyData.id,
            access_code: companyData.access_code 
          })
        }
      })
      
      if (response.ok) {
        const stats = await response.json()
        if (stats.totalQuotes === 1) {
          unlockAchievement('first_quote', 100)
        }
      }
    } catch (error) {
      console.error('Error checking quote stats:', error)
    }

    // Speed Demon - under 2 minutes
    if (timeToCreate && timeToCreate < 120000) {
      unlockAchievement('speed_demon', 200)
    }

    // Early Bird - before 9 AM
    const hour = new Date().getHours()
    if (hour < 9) {
      unlockAchievement('early_bird', 150)
    }

    // Detail Master - has custom line items
    if (quoteData.customLineItems && quoteData.customLineItems.length > 0) {
      unlockAchievement('detail_master', 250)
    }
  }

  return {
    achievements,
    totalPoints,
    latestAchievement,
    unlockAchievement,
    checkQuoteAchievements,
    hasAchievement: (id: string) => achievements.some(a => a.id === id)
  }
}