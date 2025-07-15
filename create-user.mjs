import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// First, check if company exists
const existingCompany = await prisma.company.findFirst({
  where: { email: 'test@paintquotepro.com' }
})

let company = existingCompany

if (!company) {
  // Create test company
  company = await prisma.company.create({
    data: {
      name: 'Test Painting Company',
      email: 'test@paintquotepro.com',
      phone: '555-0123',
      address: '123 Test Street, Test City, TC 12345',
      plan: 'professional',
      quotesLimit: -1, // unlimited
    }
  })
  console.log('Created company:', company.name)
} else {
  console.log('Using existing company:', company.name)
}

// Check if user exists
const existingUser = await prisma.user.findFirst({
  where: { email: 'test@paintquotepro.com' }
})

if (!existingUser) {
  // Create test user
  const hashedPassword = await bcrypt.hash('test123', 10)
  const user = await prisma.user.create({
    data: {
      companyId: company.id,
      email: 'test@paintquotepro.com',
      name: 'Test User',
      role: 'admin',
      passwordHash: hashedPassword,
    }
  })
  console.log('Created user:', user.email)
} else {
  console.log('User already exists:', existingUser.email)
}

console.log('\nCredentials:')
console.log('Email: test@paintquotepro.com')
console.log('Password: test123')

await prisma.$disconnect()