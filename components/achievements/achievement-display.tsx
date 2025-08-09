'use client'

import { useEffect, useState } from 'react'
import { achievements, calculateLevel, getLevelTitle, getLevelColor } from '@/lib/gamification/achievements'
import { achievementService } from '@/lib/gamification/achievement-service'
import { Progress } from '@/components/ui/progress'
import { Trophy, Lock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCompanyAuth } from '@/components/auth-wrapper'

export function AchievementDisplay() {
  const companyData = useCompanyAuth()
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadAchievements() {
      if (companyData?.id) {
        const progress = await achievementService.getAllAchievements(companyData.id)
        setUnlockedAchievements(progress.achievements)
        setTotalPoints(progress.totalPoints)
        setLoading(false)
      }
    }
    
    loadAchievements()
    
    // Listen for achievement updates
    const handleUpdate = () => loadAchievements()
    window.addEventListener('achievement-unlocked', handleUpdate)
    return () => window.removeEventListener('achievement-unlocked', handleUpdate)
  }, [companyData?.id])
  
  const hasAchievement = (id: string) => unlockedAchievements.includes(id)
  
  const levelInfo = calculateLevel(totalPoints)
  const levelTitle = getLevelTitle(levelInfo.level)
  const levelColor = getLevelColor(levelInfo.level)
  
  if (loading) {
    return (
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Achievements
          </h3>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-base text-gray-200">Level {levelInfo.level}</p>
              <p className={cn("text-lg font-bold bg-gradient-to-r text-transparent bg-clip-text", levelColor)}>
                {levelTitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-base text-gray-200">Total XP</p>
              <p className="text-xl font-bold text-yellow-400">{totalPoints}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Level Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-base text-gray-200 mb-2">
            <span>{levelInfo.pointsInLevel} XP</span>
            <span>{levelInfo.pointsForNextLevel} XP</span>
          </div>
          <Progress 
            value={levelInfo.progress} 
            className="h-2 bg-gray-700"
          />
          <p className="text-base text-gray-200 mt-1 text-center">
            {levelInfo.pointsForNextLevel - levelInfo.pointsInLevel} XP to level {levelInfo.level + 1}
          </p>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.values(achievements).map((achievement) => {
            const isUnlocked = hasAchievement(achievement.id)
            const Icon = achievement.icon
            
            return (
              <div
                key={achievement.id}
                className={cn(
                  "relative p-3 rounded-lg border transition-all",
                  isUnlocked
                    ? "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-gray-600"
                    : "bg-gray-900/30 border-gray-800 opacity-60"
                )}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      isUnlocked
                        ? `bg-gradient-to-br ${achievement.color}`
                        : "bg-gray-800"
                    )}
                  >
                    {isUnlocked ? (
                      <Icon className="h-6 w-6 text-white" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className={cn(
                      "text-base font-medium",
                      isUnlocked ? "text-white" : "text-gray-200"
                    )}>
                      {achievement.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className={cn(
                        "text-base",
                        isUnlocked ? "text-yellow-400" : "text-gray-600"
                      )}>
                        {achievement.points}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hover tooltip */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/80 rounded-lg p-2">
                  <p className="text-base text-gray-100 text-center">
                    {achievement.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-200">
              {unlockedAchievements.length} of {Object.keys(achievements).length} unlocked
            </p>
            <div className="flex items-center gap-2">
              <Progress 
                value={(unlockedAchievements.length / Object.keys(achievements).length) * 100} 
                className="w-20 h-2 bg-gray-700"
              />
              <span className="text-base text-gray-200">
                {Math.round((unlockedAchievements.length / Object.keys(achievements).length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}