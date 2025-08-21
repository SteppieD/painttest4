'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AchievementDisplay } from '@/components/achievements/achievement-display'
import { useAchievements } from '@/hooks/use-achievements'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { Trophy, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { achievements as achievementDefinitions } from '@/components/achievements/achievement-notification'

export default function AchievementsPage() {
  const [checking, setChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<{ 
    achievements?: { id: string; name: string; description: string; points: number }[]; 
    error?: string;
    message?: string;
    stats?: {
      totalQuotes: number;
      acceptedQuotes: number;
      quotesWithCustomItems: number;
      earlyBirdQuotes: number;
      totalPotentialPoints?: number;
    }
  } | null>(null)
  const { achievements, totalPoints, unlockAchievement } = useAchievements()
  const companyData = useCompanyAuth()

  const checkAchievements = async () => {
    if (!companyData) return
    
    setChecking(true)
    try {
      const response = await fetch('/api/achievements/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyData.id,
            access_code: companyData.access_code 
          })
        }
      })
      
      const data = await response.json()
      setCheckResult(data)
      
      // Automatically unlock achievements that should be unlocked
      if (data.achievements) {
        data.achievements.forEach((achievement: { id: string; name: string; description: string; points: number }) => {
          const achDef = achievementDefinitions[achievement.id]
          if (achDef) {
            unlockAchievement(achievement.id, achievement.points)
          }
        })
      }
    } catch (error) {
      console.error('Error checking achievements:', error)
      setCheckResult({ error: 'Failed to check achievements' })
    } finally {
      setChecking(false)
    }
  }

  const clearAchievements = () => {
    if (companyData?.id && confirm('Are you sure you want to reset all achievements? This cannot be undone.')) {
      const key = `achievements_${companyData.id}`
      localStorage.removeItem(key)
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-400" />
          Achievements & Rewards
        </h1>
        <p className="text-gray-400">
          Track your progress and unlock rewards as you grow your business
        </p>
      </div>

      {/* Main Achievement Display */}
      <div className="mb-8">
        <AchievementDisplay />
      </div>

      {/* Debug/Admin Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Achievement Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={checkAchievements}
              disabled={checking}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {checking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check & Unlock Achievements
                </>
              )}
            </Button>
            
            <Button
              onClick={clearAchievements}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Reset All Achievements
            </Button>
          </div>

          {checkResult && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Check Results:</h3>
              {checkResult.error ? (
                <p className="text-red-400">{checkResult.error}</p>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="text-green-400">{checkResult.message}</p>
                  {checkResult.stats && (
                    <div className="mt-2 space-y-1">
                      <p>Total Quotes: {checkResult.stats.totalQuotes}</p>
                      <p>Accepted Quotes: {checkResult.stats.acceptedQuotes}</p>
                      <p>Quotes with Custom Items: {checkResult.stats.quotesWithCustomItems}</p>
                      <p>Early Bird Quotes: {checkResult.stats.earlyBirdQuotes}</p>
                      <p className="font-semibold text-yellow-400">
                        Potential Points: {checkResult.stats.totalPotentialPoints} XP
                      </p>
                    </div>
                  )}
                  {checkResult.achievements && checkResult.achievements.length > 0 && (
                    <div className="mt-3">
                      <p className="font-semibold mb-1">Achievements Unlocked:</p>
                      <ul className="space-y-1">
                        {checkResult.achievements.map((ach: { id: string; name: string; description: string; points: number }) => (
                          <li key={ach.id} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>{ach.name} (+{ach.points} XP)</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Current Status:</h3>
            <div className="text-sm space-y-1">
              <p>Unlocked Achievements: {achievements.length}</p>
              <p>Total XP: {totalPoints}</p>
              <p>Level: {Math.floor(totalPoints / 500) + 1}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}