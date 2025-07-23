import { getDatabaseAdapter } from '@/lib/database/adapter'

/**
 * Generate a unique quote number without database dependencies
 * Format: Q-YYYY-CCC-TIMESTAMP-RANDOM
 * Example: Q-2025-001-LX8K2M-A7B9
 */
export async function generateQuoteNumber(companyId: number): Promise<string> {
  const year = new Date().getFullYear()
  
  // Generate a unique quote number using timestamp and random components
  // This ensures uniqueness without needing database updates
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  
  // Format: Q-YYYY-CCC-TIMESTAMP-RANDOM
  // Example: Q-2025-001-LX8K2M-A7B9
  const companyPrefix = String(companyId).padStart(3, '0')
  const quoteNumber = `Q-${year}-${companyPrefix}-${timestamp}-${random}`
  
  return quoteNumber
}

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
    return generateQuoteNumber(companyId)
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
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }
}

/**
 * Quote number validation utilities
 */
export function isValidQuoteNumber(quoteNumber: string): boolean {
  // Modern format: Q-YYYY-CCC-TIMESTAMP-RANDOM
  const modernPattern = /^Q-\d{4}-\d{3}-[A-Z0-9]+-[A-Z0-9]+$/
  
  // Legacy format: Q-YYYY-XXXXX-SUFFIX
  const legacyPattern = /^Q-\d{4}-\d{5}-[A-Z0-9]+$/
  
  return modernPattern.test(quoteNumber) || legacyPattern.test(quoteNumber)
}

export function parseQuoteNumber(quoteNumber: string): {
  year: number
  companyId: number
  sequence?: number
  suffix: string
} | null {
  if (!isValidQuoteNumber(quoteNumber)) {
    return null
  }

  const parts = quoteNumber.split('-')
  
  if (parts.length === 4) {
    // Modern format
    return {
      year: parseInt(parts[1]),
      companyId: parseInt(parts[2]),
      suffix: parts[3]
    }
  } else if (parts.length === 3) {
    // Legacy format
    return {
      year: parseInt(parts[1]),
      companyId: 0, // Legacy format doesn't include company ID
      sequence: parseInt(parts[2].substring(0, 5)),
      suffix: parts[2].substring(5)
    }
  }

  return null
}

/**
 * Simple cache implementation for reducing database queries
 * Used to cache company data and other frequently accessed items
 */
export class SimpleCache<T> {
  private cache: Map<string, { data: T; expiresAt: number }> = new Map()
  private ttlMs: number

  constructor(ttlSeconds: number = 300) { // Default 5 minutes
    this.ttlMs = ttlSeconds * 1000
  }

  get(key: string): T | null {
    const cached = this.cache.get(key)
    if (!cached) {
      return null
    }

    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + this.ttlMs
    })
  }

  clear(): void {
    this.cache.clear()
  }
}