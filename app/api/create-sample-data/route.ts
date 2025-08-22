import { NextResponse } from 'next/server'
import { getDb, Quote } from '@/lib/database/adapter'

export async function GET() {
  try {
    // Only allow in development environment
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({
        success: false,
        error: 'Sample data creation is disabled in production'
      }, { status: 403 });
    }
    
    const db = getDb()
    
    // Create sample quotes for testing
    const quotes = [
      {
        company_id: 77, // Premium Test Company
        quote_id: `QT-${Date.now()}`,
        customer_name: 'John Smith',
        customer_email: 'john.smith@example.com',
        customer_phone: '(555) 123-4567',
        address: '123 Main St, Test City, TC 12345',
        project_type: 'Interior Painting',
        status: 'accepted',
        surfaces: ['walls', 'ceilings', 'trim'],
        measurements: {
          wallArea: 1500,
          ceilingArea: 500,
          trimLength: 200
        },
        pricing: {
          labor: 2500,
          materials: 1200,
          subtotal: 3700,
          tax: 296,
          total: 3996
        },
        labor_cost: 2500,
        material_cost: 1200,
        total_cost: 3996,
        notes: 'Premium test quote - Living room renovation',
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
        updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
      },
      {
        company_id: 77,
        quote_id: `QT-${Date.now() + 1}`,
        customer_name: 'Jane Doe',
        customer_email: 'jane.doe@example.com',
        customer_phone: '(555) 987-6543',
        address: '456 Oak Ave, Test City, TC 12346',
        project_type: 'Exterior Painting',
        status: 'pending',
        surfaces: ['exterior_walls', 'trim', 'deck'],
        measurements: {
          wallArea: 2000,
          trimLength: 300,
          deckArea: 400
        },
        pricing: {
          labor: 3500,
          materials: 1800,
          subtotal: 5300,
          tax: 424,
          total: 5724
        },
        labor_cost: 3500,
        material_cost: 1800,
        total_cost: 5724,
        notes: 'Full exterior paint job with deck staining',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
        updated_at: new Date().toISOString()
      },
      {
        company_id: 77,
        quote_id: `QT-${Date.now() + 2}`,
        customer_name: 'ABC Corporation',
        customer_email: 'facilities@abccorp.com',
        customer_phone: '(555) 888-9999',
        address: '789 Business Blvd, Commerce City, CC 54321',
        project_type: 'Commercial',
        status: 'accepted',
        surfaces: ['walls', 'ceilings', 'exterior'],
        measurements: {
          wallArea: 5000,
          ceilingArea: 2000,
          exteriorArea: 3000
        },
        pricing: {
          labor: 8500,
          materials: 4200,
          subtotal: 12700,
          tax: 1016,
          total: 13716
        },
        labor_cost: 8500,
        material_cost: 4200,
        total_cost: 13716,
        notes: 'Office building renovation - multiple floors',
        created_at: new Date(Date.now() - 14 * 86400000).toISOString(), // 14 days ago
        updated_at: new Date(Date.now() - 10 * 86400000).toISOString()
      },
      {
        company_id: 77,
        quote_id: `QT-${Date.now() + 3}`,
        customer_name: 'John Smith', // Repeat customer
        customer_email: 'john.smith@example.com',
        customer_phone: '(555) 123-4567',
        address: '123 Main St, Test City, TC 12345',
        project_type: 'Interior Painting',
        status: 'accepted',
        surfaces: ['walls', 'trim'],
        measurements: {
          wallArea: 800,
          trimLength: 150
        },
        pricing: {
          labor: 1200,
          materials: 600,
          subtotal: 1800,
          tax: 144,
          total: 1944
        },
        labor_cost: 1200,
        material_cost: 600,
        total_cost: 1944,
        notes: 'Bedroom painting - repeat customer',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(), // 30 days ago
        updated_at: new Date(Date.now() - 28 * 86400000).toISOString()
      },
      {
        company_id: 77,
        quote_id: `QT-${Date.now() + 4}`,
        customer_name: 'Emily Wilson',
        customer_email: 'emily.w@email.com',
        customer_phone: '(555) 456-7890',
        address: '321 Pine St, Suburb Town, ST 67890',
        project_type: 'Residential',
        status: 'draft',
        surfaces: ['walls', 'ceilings'],
        measurements: {
          wallArea: 1200,
          ceilingArea: 400
        },
        pricing: {
          labor: 1800,
          materials: 900,
          subtotal: 2700,
          tax: 216,
          total: 2916
        },
        labor_cost: 1800,
        material_cost: 900,
        total_cost: 2916,
        notes: 'Waiting for customer approval',
        created_at: new Date().toISOString(), // Today
        updated_at: new Date().toISOString()
      }
    ]
    
    // Create all quotes
    const createdQuotes = []
    for (const quoteData of quotes) {
      try {
        const quote = await db.createQuote(quoteData)
        createdQuotes.push(quote)
      } catch (error) {
        console.error('Error creating quote:', error)
      }
    }
    
    // Calculate summary stats
    const totalQuotes = createdQuotes.length
    const acceptedQuotes = createdQuotes.filter((q: Quote) => q.status === 'accepted').length
    const totalRevenue = createdQuotes
      .filter((q: Quote) => q.status === 'accepted')
      .reduce((sum: number, q: Quote) => sum + ((q.pricing as { total?: number })?.total || q.total_cost || 0), 0)
    
    const uniqueCustomers = new Set(createdQuotes.map((q: Quote) => q.customer_email)).size
    
    return NextResponse.json({
      success: true,
      message: 'Sample data created successfully!',
      summary: {
        quotesCreated: totalQuotes,
        acceptedQuotes,
        acceptanceRate: totalQuotes > 0 ? Math.round((acceptedQuotes / totalQuotes) * 100) : 0,
        totalRevenue: Math.round(totalRevenue),
        uniqueCustomers,
        quotes: createdQuotes.map((q: Quote) => ({
          id: q.quote_id,
          customer: q.customer_name,
          amount: q.pricing?.total || 0,
          status: q.status
        }))
      },
      instructions: [
        'Refresh your dashboard to see the new data',
        'Customer analytics will show customer insights',
        'Performance analytics will show conversion rates',
        'Revenue analytics will show financial metrics'
      ]
    })
  } catch (error) {
    console.error('Error creating sample data:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create sample data'
    }, { status: 500 })
  }
}