'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { achievements } from '@/lib/gamification/achievements'
import { calculateLevel, getLevelTitle } from '@/lib/gamification/achievements'
import confetti from 'canvas-confetti'
import { X, Trophy, Star, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { achievementService } from '@/lib/gamification/achievement-service'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { SoundEffects } from '@/lib/utils/sound-effects'

interface QueuedAchievement {
  id: string
  timestamp: number
}

export function AchievementPopup() {
  const [currentAchievement, setCurrentAchievement] = useState<string | null>(null)
  const [achievementQueue, setAchievementQueue] = useState<QueuedAchievement[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [levelUp, setLevelUp] = useState<number | null>(null)
  const companyData = useCompanyAuth()

  // Process achievement queue
  useEffect(() => {
    if (!currentAchievement && achievementQueue.length > 0) {
      const next = achievementQueue[0]
      setCurrentAchievement(next.id)
      setAchievementQueue(prev => prev.slice(1))
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setCurrentAchievement(null)
        setLevelUp(null)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [currentAchievement, achievementQueue])

  // Listen for achievement unlocks
  useEffect(() => {
    const handleAchievement = async (event: CustomEvent) => {
      const achievementId = event.detail.achievementId
      
      // Add to queue
      setAchievementQueue(prev => [...prev, { id: achievementId, timestamp: Date.now() }])
      
      // Check for level up
      if (companyData?.id) {
        const progress = await achievementService.getAllAchievements(companyData.id)
        setTotalPoints(progress.totalPoints)
        
        const newLevel = calculateLevel(progress.totalPoints).level
        const oldLevel = calculateLevel(progress.totalPoints - (achievements[achievementId]?.points || 0)).level
        
        if (newLevel > oldLevel) {
          setLevelUp(newLevel)
          // Play level up sound
          SoundEffects.playLevelUpSound()
        }
      }
      
      // Trigger confetti and sound
      triggerCelebration(achievementId)
    }
    
    const eventHandler = (event: Event) => {
      handleAchievement(event as CustomEvent);
    };
    window.addEventListener('achievement-unlocked', eventHandler)
    return () => {
      window.removeEventListener('achievement-unlocked', eventHandler)
    }
  }, [companyData?.id, triggerCelebration])

  const triggerCelebration = useCallback((achievementId: string) => {
    const achievement = achievements[achievementId]
    if (!achievement) return
    
    // Different confetti styles based on achievement rarity
    const isRare = achievement.points >= 500
    const isEpic = achievement.points >= 1000
    
    // Play achievement sound
    SoundEffects.playAchievementSound(isRare, isEpic)
    
    if (isEpic) {
      // Epic achievement - golden shower
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
      
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) return clearInterval(interval)
        
        const particleCount = 50 * (timeLeft / duration)
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        })
      }, 250)
    } else if (isRare) {
      // Rare achievement - fireworks
      const count = 200
      const defaults = { origin: { y: 0.7 } }
      
      confetti({ ...defaults, particleCount: count * 0.25, spread: 26, startVelocity: 55 })
      confetti({ ...defaults, particleCount: count * 0.2, spread: 60 })
      confetti({ ...defaults, particleCount: count * 0.35, spread: 100, decay: 0.91, scalar: 0.8 })
      confetti({ ...defaults, particleCount: count * 0.1, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      confetti({ ...defaults, particleCount: count * 0.1, spread: 120, startVelocity: 45 })
    } else {
      // Normal achievement - standard burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, []);

  const handleClose = useCallback(() => {
    setCurrentAchievement(null)
    setLevelUp(null)
  }, []);

  const achievement = currentAchievement ? achievements[currentAchievement] : null
  const Icon = achievement?.icon

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-auto"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className={cn(
              "absolute inset-0 blur-xl opacity-50 bg-gradient-to-r",
              achievement.color
            )} />
            
            {/* Main card */}
            <div className="relative bg-gray-900/95 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-2xl min-w-[400px]">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Achievement unlocked header */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2 mb-2"
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm uppercase tracking-wider text-yellow-400 font-bold">
                    Achievement Unlocked!
                  </span>
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>
              </div>
              
              {/* Achievement icon and details */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                    achievement.color
                  )}
                >
                  {Icon && <Icon className="h-10 w-10 text-white" />}
                </motion.div>
                
                <div className="flex-1">
                  <motion.h3
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {achievement.name}
                  </motion.h3>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300"
                  >
                    {achievement.description}
                  </motion.p>
                </div>
              </div>
              
              {/* Points earned */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between pt-4 border-t border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-lg font-bold text-yellow-400">
                    +{achievement.points} XP
                  </span>
                </div>
                
                {levelUp && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.8 }}
                    className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  >
                    <Trophy className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">
                      LEVEL {levelUp}!
                    </span>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Level up message */}
              {levelUp && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 text-center"
                >
                  <p className="text-sm text-gray-300">
                    You are now a <span className="font-bold text-white">{getLevelTitle(levelUp)}</span>
                  </p>
                </motion.div>
              )}
              
              {/* Queue indicator */}
              {achievementQueue.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 text-center"
                >
                  <p className="text-xs text-gray-400">
                    +{achievementQueue.length} more achievement{achievementQueue.length > 1 ? 's' : ''} unlocked
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}