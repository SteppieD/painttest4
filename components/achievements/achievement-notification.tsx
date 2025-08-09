'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Star } from 'lucide-react'
import { achievements } from '@/lib/gamification/achievements'

// Re-export achievements for backward compatibility
export { achievements }

interface AchievementNotificationProps {
  achievementId: string | null
  onClose: () => void
}

export function AchievementNotification({ achievementId, onClose }: AchievementNotificationProps) {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    if (achievementId) {
      setShow(true)
      
      // Trigger confetti
      const count = 200
      const defaults = {
        origin: { y: 0.7 }
      }

      function fire(particleRatio: number, opts: { spread?: number; startVelocity?: number; decay?: number; scalar?: number }) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        })
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      })
      fire(0.2, {
        spread: 60,
      })
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      })

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 300)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [achievementId, onClose])

  if (!achievementId || !achievements[achievementId]) return null

  const achievement = achievements[achievementId]
  const Icon = achievement.icon

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed top-20 right-4 z-50 max-w-sm"
        >
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6 border-2 border-white/20">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <motion.h3 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-bold text-white mb-1"
                >
                  Achievement Unlocked!
                </motion.h3>
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-semibold text-white mb-1"
                >
                  {achievement.name}
                </motion.p>
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-base text-gray-100"
                >
                  {achievement.description}
                </motion.p>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="mt-3 inline-flex items-center gap-2 bg-gray-900/70 rounded-full px-3 py-1"
                >
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-base font-medium text-yellow-400">+{achievement.points} XP</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}