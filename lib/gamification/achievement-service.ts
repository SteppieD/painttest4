import { achievements } from './achievements'
import { getDatabase } from '@/lib/database/adapter'

interface AchievementProgress {
  companyId: number
  achievements: string[]
  totalPoints: number
  streakData: {
    currentDailyStreak: number
    lastQuoteDate: string | null
    weekendQuotes: number
    acceptedInRow: number
  }
  statistics: {
    totalQuotes: number
    acceptedQuotes: number
    totalCustomers: number
    averageCreationTime: number
    featuresUsedToday: string[]
    lastActiveDate: string
  }
}

class AchievementService {
  private static instance: AchievementService
  
  private constructor() {}
  
  static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService()
    }
    return AchievementService.instance
  }

  // Get or create achievement progress for a company
  async getProgress(companyId: number): Promise<AchievementProgress> {
    const key = `achievement_progress_${companyId}`
    const stored = localStorage.getItem(key)
    
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize new progress
    const progress: AchievementProgress = {
      companyId,
      achievements: [],
      totalPoints: 0,
      streakData: {
        currentDailyStreak: 0,
        lastQuoteDate: null,
        weekendQuotes: 0,
        acceptedInRow: 0
      },
      statistics: {
        totalQuotes: 0,
        acceptedQuotes: 0,
        totalCustomers: 0,
        averageCreationTime: 0,
        featuresUsedToday: [],
        lastActiveDate: new Date().toISOString()
      }
    }
    
    this.saveProgress(progress)
    return progress
  }

  // Save progress to localStorage
  private saveProgress(progress: AchievementProgress): void {
    const key = `achievement_progress_${progress.companyId}`
    localStorage.setItem(key, JSON.stringify(progress))
  }

  // Check and award achievements when a quote is created
  async checkQuoteCreationAchievements(
    companyId: number,
    quoteData: {
      customLineItems?: any[]
      rooms?: any[]
      totalCost?: number
      customerName?: string
    },
    creationTimeMs?: number
  ): Promise<string[]> {
    const progress = await this.getProgress(companyId)
    const newAchievements: string[] = []
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.getDay()
    
    // Update statistics
    progress.statistics.totalQuotes++
    
    // Track unique customers
    const db = await getDatabase()
    const quotes = await db.getQuotes(companyId)
    const uniqueCustomers = new Set(quotes.map(q => q.customer_name?.toLowerCase())).size
    progress.statistics.totalCustomers = uniqueCustomers
    
    // Update average creation time
    if (creationTimeMs) {
      const totalTime = progress.statistics.averageCreationTime * (progress.statistics.totalQuotes - 1) + creationTimeMs
      progress.statistics.averageCreationTime = totalTime / progress.statistics.totalQuotes
    }
    
    // Check daily streak
    const lastQuoteDate = progress.streakData.lastQuoteDate ? new Date(progress.streakData.lastQuoteDate) : null
    const daysSinceLastQuote = lastQuoteDate ? Math.floor((now.getTime() - lastQuoteDate.getTime()) / (1000 * 60 * 60 * 24)) : null
    
    if (daysSinceLastQuote === 1) {
      // Consecutive day
      progress.streakData.currentDailyStreak++
    } else if (daysSinceLastQuote === 0) {
      // Same day, don't break streak
    } else {
      // Streak broken or first quote
      progress.streakData.currentDailyStreak = 1
    }
    progress.streakData.lastQuoteDate = now.toISOString()
    
    // Weekend tracking
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      progress.streakData.weekendQuotes++
    }
    
    // === CHECK ACHIEVEMENTS ===
    
    // First Quote
    if (progress.statistics.totalQuotes === 1 && !progress.achievements.includes('first_quote')) {
      progress.achievements.push('first_quote')
      progress.totalPoints += achievements.first_quote.points
      newAchievements.push('first_quote')
    }
    
    // Quote milestones
    if (progress.statistics.totalQuotes === 10 && !progress.achievements.includes('quote_master_10')) {
      progress.achievements.push('quote_master_10')
      progress.totalPoints += achievements.quote_master_10.points
      newAchievements.push('quote_master_10')
    }
    
    if (progress.statistics.totalQuotes === 50 && !progress.achievements.includes('quote_master_50')) {
      progress.achievements.push('quote_master_50')
      progress.totalPoints += achievements.quote_master_50.points
      newAchievements.push('quote_master_50')
    }
    
    if (progress.statistics.totalQuotes === 100 && !progress.achievements.includes('quote_master_100')) {
      progress.achievements.push('quote_master_100')
      progress.totalPoints += achievements.quote_master_100.points
      newAchievements.push('quote_master_100')
    }
    
    // Speed achievements
    if (creationTimeMs) {
      if (creationTimeMs < 60000 && !progress.achievements.includes('lightning_fast')) {
        progress.achievements.push('lightning_fast')
        progress.totalPoints += achievements.lightning_fast.points
        newAchievements.push('lightning_fast')
      } else if (creationTimeMs < 120000 && !progress.achievements.includes('speed_demon')) {
        progress.achievements.push('speed_demon')
        progress.totalPoints += achievements.speed_demon.points
        newAchievements.push('speed_demon')
      }
    }
    
    // Time-based achievements
    if (hour < 9 && !progress.achievements.includes('early_bird')) {
      progress.achievements.push('early_bird')
      progress.totalPoints += achievements.early_bird.points
      newAchievements.push('early_bird')
    }
    
    if (hour >= 22 && !progress.achievements.includes('night_owl')) {
      progress.achievements.push('night_owl')
      progress.totalPoints += achievements.night_owl.points
      newAchievements.push('night_owl')
    }
    
    if (progress.streakData.weekendQuotes >= 5 && !progress.achievements.includes('weekend_warrior')) {
      progress.achievements.push('weekend_warrior')
      progress.totalPoints += achievements.weekend_warrior.points
      newAchievements.push('weekend_warrior')
    }
    
    // Streak achievements
    if (progress.streakData.currentDailyStreak === 7 && !progress.achievements.includes('daily_streak_7')) {
      progress.achievements.push('daily_streak_7')
      progress.totalPoints += achievements.daily_streak_7.points
      newAchievements.push('daily_streak_7')
    }
    
    if (progress.streakData.currentDailyStreak === 30 && !progress.achievements.includes('daily_streak_30')) {
      progress.achievements.push('daily_streak_30')
      progress.totalPoints += achievements.daily_streak_30.points
      newAchievements.push('daily_streak_30')
    }
    
    // Quality achievements
    if (quoteData.customLineItems && quoteData.customLineItems.length > 0 && !progress.achievements.includes('detail_master')) {
      progress.achievements.push('detail_master')
      progress.totalPoints += achievements.detail_master.points
      newAchievements.push('detail_master')
    }
    
    if (quoteData.rooms && quoteData.rooms.length >= 10 && !progress.achievements.includes('perfectionist')) {
      progress.achievements.push('perfectionist')
      progress.totalPoints += achievements.perfectionist.points
      newAchievements.push('perfectionist')
    }
    
    // Social achievements
    if (progress.statistics.totalCustomers >= 20 && !progress.achievements.includes('social_butterfly')) {
      progress.achievements.push('social_butterfly')
      progress.totalPoints += achievements.social_butterfly.points
      newAchievements.push('social_butterfly')
    }
    
    // Comeback achievement
    const lastActiveDate = new Date(progress.statistics.lastActiveDate)
    const daysAway = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24))
    if (daysAway >= 7 && !progress.achievements.includes('comeback_kid')) {
      progress.achievements.push('comeback_kid')
      progress.totalPoints += achievements.comeback_kid.points
      newAchievements.push('comeback_kid')
    }
    
    // Update last active date
    progress.statistics.lastActiveDate = now.toISOString()
    
    // Save progress
    this.saveProgress(progress)
    
    // Trigger notifications for new achievements
    if (newAchievements.length > 0) {
      this.triggerAchievementNotifications(newAchievements)
    }
    
    return newAchievements
  }

  // Check achievements when a quote is accepted
  async checkQuoteAcceptedAchievements(companyId: number, quoteValue?: number): Promise<string[]> {
    const progress = await this.getProgress(companyId)
    const newAchievements: string[] = []
    
    progress.statistics.acceptedQuotes++
    progress.streakData.acceptedInRow++
    
    // First win
    if (progress.statistics.acceptedQuotes === 1 && !progress.achievements.includes('first_win')) {
      progress.achievements.push('first_win')
      progress.totalPoints += achievements.first_win.points
      newAchievements.push('first_win')
    }
    
    // Winning streak
    if (progress.streakData.acceptedInRow === 5 && !progress.achievements.includes('winning_streak_5')) {
      progress.achievements.push('winning_streak_5')
      progress.totalPoints += achievements.winning_streak_5.points
      newAchievements.push('winning_streak_5')
    }
    
    // High value quote
    if (quoteValue && quoteValue >= 10000 && !progress.achievements.includes('high_value_quote')) {
      progress.achievements.push('high_value_quote')
      progress.totalPoints += achievements.high_value_quote.points
      newAchievements.push('high_value_quote')
    }
    
    // Customer champion (90% acceptance rate)
    if (progress.statistics.totalQuotes >= 10) {
      const acceptanceRate = progress.statistics.acceptedQuotes / progress.statistics.totalQuotes
      if (acceptanceRate >= 0.9 && !progress.achievements.includes('customer_champion')) {
        progress.achievements.push('customer_champion')
        progress.totalPoints += achievements.customer_champion.points
        newAchievements.push('customer_champion')
      }
    }
    
    this.saveProgress(progress)
    
    if (newAchievements.length > 0) {
      this.triggerAchievementNotifications(newAchievements)
    }
    
    return newAchievements
  }

  // Track feature usage for power user achievement
  async trackFeatureUsage(companyId: number, feature: string): Promise<string[]> {
    const progress = await this.getProgress(companyId)
    const today = new Date().toDateString()
    const lastActiveDate = new Date(progress.statistics.lastActiveDate).toDateString()
    
    // Reset features if it's a new day
    if (today !== lastActiveDate) {
      progress.statistics.featuresUsedToday = []
    }
    
    if (!progress.statistics.featuresUsedToday.includes(feature)) {
      progress.statistics.featuresUsedToday.push(feature)
    }
    
    const newAchievements: string[] = []
    
    // Power user achievement
    if (progress.statistics.featuresUsedToday.length >= 5 && !progress.achievements.includes('power_user')) {
      progress.achievements.push('power_user')
      progress.totalPoints += achievements.power_user.points
      newAchievements.push('power_user')
    }
    
    this.saveProgress(progress)
    
    if (newAchievements.length > 0) {
      this.triggerAchievementNotifications(newAchievements)
    }
    
    return newAchievements
  }

  // Reset streak if quote was rejected
  async handleQuoteRejected(companyId: number): Promise<void> {
    const progress = await this.getProgress(companyId)
    progress.streakData.acceptedInRow = 0
    this.saveProgress(progress)
  }

  // Trigger achievement notifications
  private triggerAchievementNotifications(achievementIds: string[]): void {
    // Dispatch custom events for each achievement
    achievementIds.forEach(id => {
      const event = new CustomEvent('achievement-unlocked', {
        detail: { achievementId: id }
      })
      window.dispatchEvent(event)
    })
  }

  // Get all achievements for a company
  async getAllAchievements(companyId: number): Promise<AchievementProgress> {
    return this.getProgress(companyId)
  }

  // Check if a specific achievement is unlocked
  async hasAchievement(companyId: number, achievementId: string): Promise<boolean> {
    const progress = await this.getProgress(companyId)
    return progress.achievements.includes(achievementId)
  }
}

export const achievementService = AchievementService.getInstance()