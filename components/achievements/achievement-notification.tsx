'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, Target, Clock } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ElementType
  points: number
  color: string
}

export const achievements: Record<string, Achievement> = {
  first_quote: {
    id: 'first_quote',
    name: 'First Quote',
    description: 'Created your first professional quote',
    icon: Trophy,
    points: 100,
    color: 'from-yellow-400 to-orange-500'
  },
  speed_demon: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Created a quote in under 2 minutes',
    icon: Zap,
    points: 200,
    color: 'from-blue-400 to-purple-500'
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Created a quote before 9 AM',
    icon: Clock,
    points: 150,
    color: 'from-green-400 to-teal-500'
  },
  detail_master: {
    id: 'detail_master',
    name: 'Detail Master',
    description: 'Added custom line items to a quote',
    icon: Star,
    points: 250,
    color: 'from-purple-400 to-pink-500'
  },
  first_win: {
    id: 'first_win',
    name: 'First Win',
    description: 'Your first quote was accepted!',
    icon: Target,
    points: 500,
    color: 'from-emerald-400 to-green-500'
  }
}

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

      function fire(particleRatio: number, opts: any) {
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