import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test company
  const company = await prisma.company.create({
    data: {
      name: 'Acme Painting Co.',
      email: 'info@acmepainting.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA 12345',
      plan: 'professional',
      quotesLimit: -1, // unlimited
      settings: {
        companyLogo: null,
        defaultTaxRate: 8.25,
        defaultOverheadPercent: 15,
        defaultProfitMargin: 30,
        laborRates: {
          residential: 45,
          commercial: 55,
        },
        defaultTerms: 'Payment due within 30 days. 50% deposit required to start work.',
      },
    },
  });

  console.log(`✅ Created company: ${company.name}`);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      companyId: company.id,
      email: 'admin@acmepainting.com',
      name: 'John Admin',
      role: 'admin',
      passwordHash: await bcrypt.hash('admin123', 10),
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create regular user
  const regularUser = await prisma.user.create({
    data: {
      companyId: company.id,
      email: 'painter@acmepainting.com',
      name: 'Jane Painter',
      role: 'user',
      passwordHash: await bcrypt.hash('user123', 10),
    },
  });

  console.log(`✅ Created regular user: ${regularUser.email}`);

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        companyId: company.id,
        name: 'Robert Johnson',
        email: 'rjohnson@email.com',
        phone: '(555) 234-5678',
        address: '456 Oak Ave, Anytown, USA 12345',
        notes: 'Prefers email communication',
      },
    }),
    prisma.customer.create({
      data: {
        companyId: company.id,
        name: 'Sarah Williams',
        email: 'swilliams@email.com',
        phone: '(555) 345-6789',
        address: '789 Elm St, Anytown, USA 12345',
        notes: 'Repeat customer - give 5% discount',
      },
    }),
    prisma.customer.create({
      data: {
        companyId: company.id,
        name: 'Commercial Properties LLC',
        email: 'info@commercialprops.com',
        phone: '(555) 456-7890',
        address: '321 Business Blvd, Anytown, USA 12345',
        notes: 'Large commercial client',
      },
    }),
  ]);

  console.log(`✅ Created ${customers.length} customers`);

  // Create paint products
  const paintProducts = await Promise.all([
    // Wall paints
    prisma.paintProduct.create({
      data: {
        companyId: company.id,
        name: 'Premium Interior Wall Paint',
        manufacturer: 'Benjamin Moore',
        productCode: 'BM-REGAL-001',
        productType: 'wall',
        costPerGallon: new Prisma.Decimal(35.00),
        retailPrice: new Prisma.Decimal(55.00),
        coveragePerGallon: 400,
        finish: 'eggshell',
      },
    }),
    prisma.paintProduct.create({
      data: {
        companyId: company.id,
        name: 'Contractor Grade Wall Paint',
        manufacturer: 'Sherwin Williams',
        productCode: 'SW-PROMAR-200',
        productType: 'wall',
        costPerGallon: new Prisma.Decimal(25.00),
        retailPrice: new Prisma.Decimal(40.00),
        coveragePerGallon: 350,
        finish: 'flat',
      },
    }),
    // Ceiling paint
    prisma.paintProduct.create({
      data: {
        companyId: company.id,
        name: 'Ceiling Paint Ultra Flat',
        manufacturer: 'Benjamin Moore',
        productCode: 'BM-CEILING-508',
        productType: 'ceiling',
        costPerGallon: new Prisma.Decimal(28.00),
        retailPrice: new Prisma.Decimal(45.00),
        coveragePerGallon: 400,
        finish: 'flat',
      },
    }),
    // Trim paint
    prisma.paintProduct.create({
      data: {
        companyId: company.id,
        name: 'Advance Interior Trim Paint',
        manufacturer: 'Benjamin Moore',
        productCode: 'BM-ADVANCE-794',
        productType: 'trim',
        costPerGallon: new Prisma.Decimal(45.00),
        retailPrice: new Prisma.Decimal(70.00),
        coveragePerGallon: 450,
        finish: 'semi-gloss',
      },
    }),
    // Primer
    prisma.paintProduct.create({
      data: {
        companyId: company.id,
        name: 'High-Hide Primer',
        manufacturer: 'Kilz',
        productCode: 'KILZ-PREMIUM-2',
        productType: 'primer',
        costPerGallon: new Prisma.Decimal(22.00),
        retailPrice: new Prisma.Decimal(35.00),
        coveragePerGallon: 300,
        finish: 'flat',
      },
    }),
  ]);

  console.log(`✅ Created ${paintProducts.length} paint products`);

  // Create quote templates
  const templates = await Promise.all([
    prisma.quoteTemplate.create({
      data: {
        companyId: company.id,
        name: 'Standard Interior - 3 Bedroom House',
        description: 'Template for typical 3 bedroom residential interior',
        projectType: 'residential',
        surfaces: [
          {
            name: 'Living Room Walls',
            type: 'wall',
            area: 450,
            coats: 2,
            condition: 'good',
            prepWork: ['patch_nail_holes', 'light_sanding'],
          },
          {
            name: 'Living Room Ceiling',
            type: 'ceiling',
            area: 200,
            coats: 1,
            condition: 'good',
            prepWork: [],
          },
          {
            name: 'Master Bedroom Walls',
            type: 'wall',
            area: 320,
            coats: 2,
            condition: 'good',
            prepWork: ['patch_nail_holes'],
          },
          {
            name: 'Master Bedroom Ceiling',
            type: 'ceiling',
            area: 144,
            coats: 1,
            condition: 'good',
            prepWork: [],
          },
        ],
        paintProducts: {
          wall: 'BM-REGAL-001',
          ceiling: 'BM-CEILING-508',
          trim: 'BM-ADVANCE-794',
          primer: 'KILZ-PREMIUM-2',
        },
        settings: {
          taxRate: 8.25,
          overheadPercent: 15,
          profitMargin: 30,
          laborRate: 45,
        },
      },
    }),
    prisma.quoteTemplate.create({
      data: {
        companyId: company.id,
        name: 'Commercial Office Suite',
        description: 'Template for commercial office painting',
        projectType: 'commercial',
        surfaces: [
          {
            name: 'Office Walls',
            type: 'wall',
            area: 2000,
            coats: 2,
            condition: 'good',
            prepWork: ['patch_nail_holes', 'prime_patches'],
          },
          {
            name: 'Office Ceilings',
            type: 'ceiling',
            area: 800,
            coats: 1,
            condition: 'fair',
            prepWork: ['patch_water_stains'],
          },
        ],
        paintProducts: {
          wall: 'SW-PROMAR-200',
          ceiling: 'BM-CEILING-508',
          primer: 'KILZ-PREMIUM-2',
        },
        settings: {
          taxRate: 8.25,
          overheadPercent: 20,
          profitMargin: 35,
          laborRate: 55,
        },
      },
    }),
  ]);

  console.log(`✅ Created ${templates.length} quote templates`);

  // Create sample quotes
  const sampleQuote = await prisma.quote.create({
    data: {
      companyId: company.id,
      customerId: customers[0].id,
      quoteNumber: 'Q-2024-00001',
      projectType: 'residential',
      status: 'sent',
      surfaces: [
        {
          name: 'Living Room Walls',
          type: 'wall',
          area: 480,
          coats: 2,
          condition: 'good',
          prepWork: ['patch_nail_holes', 'light_sanding'],
        },
        {
          name: 'Living Room Ceiling',
          type: 'ceiling',
          area: 200,
          coats: 1,
          condition: 'good',
          prepWork: [],
        },
      ],
      paintProducts: {
        wall: 'BM-REGAL-001',
        ceiling: 'BM-CEILING-508',
      },
      settings: {
        taxRate: 8.25,
        overheadPercent: 15,
        profitMargin: 30,
        laborRate: 45,
      },
      materials: {
        surfaces: [
          {
            name: 'Living Room Walls',
            paintCost: new Prisma.Decimal(70.00),
            primerCost: new Prisma.Decimal(0),
            totalCost: new Prisma.Decimal(70.00),
          },
          {
            name: 'Living Room Ceiling',
            paintCost: new Prisma.Decimal(14.00),
            primerCost: new Prisma.Decimal(0),
            totalCost: new Prisma.Decimal(14.00),
          },
        ],
        totalPaintCost: new Prisma.Decimal(84.00),
        totalPrimerCost: new Prisma.Decimal(0),
        totalMaterialsCost: new Prisma.Decimal(84.00),
      },
      labor: {
        totalHours: new Prisma.Decimal(8.5),
        hourlyRate: new Prisma.Decimal(45),
        totalLaborCost: new Prisma.Decimal(382.50),
      },
      subtotal: new Prisma.Decimal(466.50),
      overhead: new Prisma.Decimal(69.98),
      profit: new Prisma.Decimal(160.94),
      tax: new Prisma.Decimal(57.54),
      totalAmount: new Prisma.Decimal(754.96),
      description: 'Interior painting for living room',
      createdById: adminUser.id,
      statusHistory: {
        create: [
          {
            toStatus: 'draft',
            createdBy: adminUser.id,
          },
          {
            fromStatus: 'draft',
            toStatus: 'sent',
            createdBy: adminUser.id,
          },
        ],
      },
    },
  });

  console.log(`✅ Created sample quote: ${sampleQuote.quoteNumber}`);

  console.log('\n🎉 Database seed completed!');
  console.log('\n📝 Test credentials:');
  console.log('   Admin: admin@acmepainting.com / admin123');
  console.log('   User: painter@acmepainting.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });