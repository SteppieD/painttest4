import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// For production, we use raw queries to work with the old schema
// This avoids Prisma schema validation issues
export const prisma = global.prisma || new PrismaClient({
  // Disable schema validation warnings
  log: process.env.NODE_ENV === 'production' ? [] : ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Helper to ensure we're using the production database
export async function ensureProductionDB() {
  if (process.env.NODE_ENV === 'production') {
    // Test connection with a simple query
    try {
      await prisma.$queryRaw`SELECT 1`
    } catch (error) {
      console.error('Database connection failed:', error)
      throw error
    }
  }
}