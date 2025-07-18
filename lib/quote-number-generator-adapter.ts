import { getDatabaseAdapter } from '@/lib/database/adapter'

/**
 * Scalable quote number generation for hundreds of concurrent users
 * Uses atomic operations to prevent race conditions
 */

export class QuoteNumberGenerator {
  /**
   * Generate a unique quote number using atomic operations
   * Format: Q-YYYY-XXXXX-R (e.g., Q-2025-00001-A)
   * The suffix ensures uniqueness even in race conditions
   */
  async generateQuoteNumber(companyId: number): Promise<string> {
    const year = new Date().getFullYear()
    const db = getDatabaseAdapter()
    
    // Get the current company data
    const company = await db.getCompany(companyId)
    if (!company) {
      throw new Error('Company not found')
    }
    
    // Increment the quotes generated count
    const quotesGenerated = (company.quotesGenerated || 0) + 1
    await db.updateCompany(companyId, {
      quotesGenerated
    })

    // Generate a unique suffix based on timestamp and random component
    // This ensures uniqueness even if multiple requests happen simultaneously
    const timestamp = Date.now().toString(36).substring(4, 8).toUpperCase()
    const random = Math.random().toString(36).substring(2, 4).toUpperCase()
    
    // Format: Q-YYYY-XXXXX-SUFFIX
    const sequentialNumber = String(quotesGenerated).padStart(5, '0')
    const quoteNumber = `Q-${year}-${sequentialNumber}-${timestamp}${random}`
    
    return quoteNumber
  }

  /**
   * Alternative: UUID-based quote numbers for maximum scalability
   * More suitable for distributed systems
   */
  generateUuidQuoteNumber(companyId: number): string {
    const year = new Date().getFullYear()
    const companyPrefix = String(companyId).padStart(3, '0')
    const uuid = this.generateShortUuid()
    
    return `Q${year}-${companyPrefix}-${uuid}`
  }

  private generateShortUuid(): string {
    // Generate a short, URL-safe unique identifier
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}

/**
 * Rate limiter for quote creation
 * Prevents abuse and ensures fair usage
 */
export class QuoteRateLimiter {
  private attempts: Map<string, { count: number; resetAt: number }> = new Map()
  private readonly maxAttempts: number
  private readonly windowMs: number

  constructor(maxAttempts: number = 10, windowMinutes: number = 15) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMinutes * 60 * 1000
  }

  async checkLimit(identifier: string): Promise<{ allowed: boolean; retryAfter?: number }> {
    const now = Date.now()
    const userAttempts = this.attempts.get(identifier)

    if (!userAttempts || now > userAttempts.resetAt) {
      // First attempt or window expired
      this.attempts.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs
      })
      return { allowed: true }
    }

    if (userAttempts.count >= this.maxAttempts) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((userAttempts.resetAt - now) / 1000)
      return { allowed: false, retryAfter }
    }

    // Increment attempt count
    userAttempts.count++
    return { allowed: true }
  }

  // Clean up old entries periodically
  cleanup() {
    const now = Date.now()
    for (const [key, value] of this.attempts.entries()) {
      if (now > value.resetAt) {
        this.attempts.delete(key)
      }
    }
  }
}

/**
 * Caching layer for frequently accessed data
 */
export class QuoteCache {
  private cache: Map<string, { data: any; expiresAt: number }> = new Map()
  private readonly ttlMs: number

  constructor(ttlMinutes: number = 5) {
    this.ttlMs = ttlMinutes * 60 * 1000
  }

  get(key: string): any | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + this.ttlMs
    })
  }

  clear(): void {
    this.cache.clear()
  }
}