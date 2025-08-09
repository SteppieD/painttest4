import { Trophy, Star, Zap, Target, Clock, TrendingUp, Users, DollarSign, Calendar, Award, Flame, Sparkles, Heart, Shield, Rocket } from 'lucide-react'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ElementType
  points: number
  color: string
  category: 'milestone' | 'speed' | 'quality' | 'engagement' | 'streak'
  requirement?: number // For progressive achievements
}

export const achievements: Record<string, Achievement> = {
  // Onboarding Achievements
  welcome_aboard: {
    id: 'welcome_aboard',
    name: 'Welcome Aboard',
    description: 'Completed your business setup',
    icon: Sparkles,
    points: 100,
    color: 'from-purple-400 to-pink-500',
    category: 'milestone'
  },
  quick_setup: {
    id: 'quick_setup',
    name: 'Quick Start Pro',
    description: 'Completed setup during your first quote',
    icon: Zap,
    points: 150,
    color: 'from-blue-400 to-cyan-500',
    category: 'milestone'
  },
  // Milestone Achievements
  first_quote: {
    id: 'first_quote',
    name: 'First Steps',
    description: 'Created your first professional quote',
    icon: Trophy,
    points: 100,
    color: 'from-yellow-400 to-orange-500',
    category: 'milestone'
  },
  quote_master_10: {
    id: 'quote_master_10',
    name: 'Getting Started',
    description: 'Created 10 quotes',
    icon: Star,
    points: 200,
    color: 'from-blue-400 to-cyan-500',
    category: 'milestone',
    requirement: 10
  },
  quote_master_50: {
    id: 'quote_master_50',
    name: 'Quote Master',
    description: 'Created 50 quotes',
    icon: Award,
    points: 500,
    color: 'from-purple-400 to-pink-500',
    category: 'milestone',
    requirement: 50
  },
  quote_master_100: {
    id: 'quote_master_100',
    name: 'Century Club',
    description: 'Created 100 quotes - You\'re a pro!',
    icon: Rocket,
    points: 1000,
    color: 'from-red-400 to-orange-500',
    category: 'milestone',
    requirement: 100
  },
  
  // Win Achievements
  first_win: {
    id: 'first_win',
    name: 'First Win',
    description: 'Your first quote was accepted!',
    icon: Target,
    points: 500,
    color: 'from-emerald-400 to-green-500',
    category: 'milestone'
  },
  winning_streak_5: {
    id: 'winning_streak_5',
    name: 'On Fire',
    description: '5 quotes accepted in a row',
    icon: Flame,
    points: 750,
    color: 'from-orange-400 to-red-500',
    category: 'streak',
    requirement: 5
  },
  high_value_quote: {
    id: 'high_value_quote',
    name: 'Big Fish',
    description: 'Quote over $10,000 accepted',
    icon: DollarSign,
    points: 1000,
    color: 'from-green-400 to-emerald-500',
    category: 'milestone'
  },
  
  // Speed Achievements
  speed_demon: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Created a quote in under 2 minutes',
    icon: Zap,
    points: 200,
    color: 'from-blue-400 to-purple-500',
    category: 'speed'
  },
  lightning_fast: {
    id: 'lightning_fast',
    name: 'Lightning Fast',
    description: 'Created a quote in under 1 minute',
    icon: Zap,
    points: 400,
    color: 'from-yellow-400 to-red-500',
    category: 'speed'
  },
  
  // Time-based Achievements
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Created a quote before 9 AM',
    icon: Clock,
    points: 150,
    color: 'from-blue-300 to-purple-400',
    category: 'engagement'
  },
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Created a quote after 10 PM',
    icon: Clock,
    points: 150,
    color: 'from-indigo-400 to-purple-500',
    category: 'engagement'
  },
  weekend_warrior: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Created quotes on the weekend',
    icon: Calendar,
    points: 200,
    color: 'from-pink-400 to-purple-500',
    category: 'engagement'
  },
  
  // Streak Achievements
  daily_streak_7: {
    id: 'daily_streak_7',
    name: 'Week Streak',
    description: 'Created quotes 7 days in a row',
    icon: Flame,
    points: 500,
    color: 'from-orange-400 to-red-500',
    category: 'streak',
    requirement: 7
  },
  daily_streak_30: {
    id: 'daily_streak_30',
    name: 'Monthly Streak',
    description: 'Created quotes 30 days in a row',
    icon: Flame,
    points: 2000,
    color: 'from-red-400 to-pink-500',
    category: 'streak',
    requirement: 30
  },
  
  // Quality Achievements
  detail_master: {
    id: 'detail_master',
    name: 'Detail Master',
    description: 'Added custom line items to a quote',
    icon: Star,
    points: 250,
    color: 'from-purple-400 to-pink-500',
    category: 'quality'
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Quote with 10+ rooms/areas',
    icon: Sparkles,
    points: 400,
    color: 'from-cyan-400 to-blue-500',
    category: 'quality'
  },
  customer_champion: {
    id: 'customer_champion',
    name: 'Customer Champion',
    description: '90% acceptance rate (min 10 quotes)',
    icon: Heart,
    points: 1500,
    color: 'from-pink-400 to-red-500',
    category: 'quality'
  },
  
  // Engagement Achievements
  power_user: {
    id: 'power_user',
    name: 'Power User',
    description: 'Used 5 different features in one day',
    icon: Shield,
    points: 300,
    color: 'from-indigo-400 to-purple-500',
    category: 'engagement'
  },
  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Returned after 7+ days away',
    icon: TrendingUp,
    points: 200,
    color: 'from-green-400 to-teal-500',
    category: 'engagement'
  },
  social_butterfly: {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Created quotes for 20 different customers',
    icon: Users,
    points: 400,
    color: 'from-purple-400 to-pink-500',
    category: 'engagement',
    requirement: 20
  }
}

// Get achievement by category
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return Object.values(achievements).filter(a => a.category === category)
}

// Calculate total possible points
export function getTotalPossiblePoints(): number {
  return Object.values(achievements).reduce((sum, a) => sum + a.points, 0)
}

// Get next milestone achievement
export function getNextMilestoneAchievement(currentQuoteCount: number): Achievement | null {
  const milestones = [
    { count: 10, id: 'quote_master_10' },
    { count: 50, id: 'quote_master_50' },
    { count: 100, id: 'quote_master_100' }
  ]
  
  const next = milestones.find(m => m.count > currentQuoteCount)
  return next ? achievements[next.id] : null
}

// Level calculation
export function calculateLevel(totalPoints: number): { level: number; pointsInLevel: number; pointsForNextLevel: number; progress: number } {
  const pointsPerLevel = 500
  const level = Math.floor(totalPoints / pointsPerLevel) + 1
  const pointsInLevel = totalPoints % pointsPerLevel
  const pointsForNextLevel = pointsPerLevel
  const progress = (pointsInLevel / pointsForNextLevel) * 100
  
  return { level, pointsInLevel, pointsForNextLevel, progress }
}

// Get level title based on level number
export function getLevelTitle(level: number): string {
  if (level <= 2) return 'Apprentice Painter'
  if (level <= 5) return 'Journeyman Painter'
  if (level <= 10) return 'Master Painter'
  if (level <= 15) return 'Expert Contractor'
  if (level <= 20) return 'Business Leader'
  if (level <= 30) return 'Industry Expert'
  return 'Painting Legend'
}

// Get level color gradient
export function getLevelColor(level: number): string {
  if (level <= 2) return 'from-gray-400 to-gray-500'
  if (level <= 5) return 'from-blue-400 to-blue-500'
  if (level <= 10) return 'from-purple-400 to-purple-500'
  if (level <= 15) return 'from-yellow-400 to-orange-500'
  if (level <= 20) return 'from-red-400 to-pink-500'
  return 'from-yellow-400 via-orange-500 to-red-500'
}