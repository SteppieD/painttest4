import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create test company
  const company = await prisma.company.create({
    data: {
      name: 'Test Painting Company',
      email: 'test@paintquotepro.com',
      phone: '555-0123',
      address: '123 Test Street, Test City, TC 12345',
      plan: 'professional',
      quotesLimit: -1, // unlimited
    }
  })

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

  console.log('Created test company and user:')
  console.log('Email:', user.email)
  console.log('Password: test123')
  console.log('Company:', company.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })