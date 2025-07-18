// Stub file to prevent build errors
// This file is not used in the actual application
// All database operations should use the adapter in /lib/database/adapter.ts

export const prisma = {
  // Add placeholder methods to prevent TypeScript errors
  company: {
    findUnique: () => { throw new Error('Use database adapter instead') },
    findMany: () => { throw new Error('Use database adapter instead') },
    create: () => { throw new Error('Use database adapter instead') },
    update: () => { throw new Error('Use database adapter instead') },
    delete: () => { throw new Error('Use database adapter instead') },
  },
  quote: {
    findUnique: () => { throw new Error('Use database adapter instead') },
    findMany: () => { throw new Error('Use database adapter instead') },
    create: () => { throw new Error('Use database adapter instead') },
    update: () => { throw new Error('Use database adapter instead') },
    delete: () => { throw new Error('Use database adapter instead') },
  },
  customer: {
    findUnique: () => { throw new Error('Use database adapter instead') },
    findMany: () => { throw new Error('Use database adapter instead') },
    create: () => { throw new Error('Use database adapter instead') },
    update: () => { throw new Error('Use database adapter instead') },
    delete: () => { throw new Error('Use database adapter instead') },
  },
  product: {
    findUnique: () => { throw new Error('Use database adapter instead') },
    findMany: () => { throw new Error('Use database adapter instead') },
    create: () => { throw new Error('Use database adapter instead') },
    update: () => { throw new Error('Use database adapter instead') },
    delete: () => { throw new Error('Use database adapter instead') },
  },
}