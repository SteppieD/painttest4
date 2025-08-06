import { NextRequest, NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const company = cookies().get('company')?.value
    if (!company) {
      return NextResponse.json({ error: 'No company session' }, { status: 401 })
    }

    const companyData = JSON.parse(company)
    const db = getDatabaseAdapter()
    const dbCompany = await db.query(
      'SELECT * FROM companies WHERE id = ?',
      [companyData.id]
    ) as Array<Record<string, unknown>>

    if (!dbCompany || dbCompany.length === 0) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const companyInfo = dbCompany[0]
    
    // Get paint products for this company
    const paintProducts = await db.query(
      'SELECT * FROM paint_products WHERE user_id = ?',
      [companyData.id.toString()]
    ) as Array<Record<string, unknown>>

    return NextResponse.json({
      // Company info
      companyName: companyInfo.company_name,
      email: companyInfo.email || '',
      phone: companyInfo.phone || '',
      address: companyInfo.address || '',
      logoUrl: companyInfo.logo_url || '',
      website: companyInfo.website || '',
      license: companyInfo.license || '',
      
      // Financial settings
      taxRate: parseFloat(String(companyInfo.tax_rate || '0')) || 8.25,
      taxLabel: companyInfo.tax_label || 'Sales Tax',
      taxOnMaterialsOnly: companyInfo.tax_on_materials_only || false,
      overheadPercent: companyInfo.overhead_percent || 15,
      profitMargin: companyInfo.profit_margin || 30,
      
      // Default rates and settings
      defaultPaintCoverage: companyInfo.default_paint_coverage || 350,
      defaultLaborPercentage: companyInfo.default_labor_percentage || 30,
      defaultSundriesPercentage: companyInfo.default_sundries_percentage || 12,
      
      // Charge rates
      chargeRates: {
        // Interior
        walls: parseFloat(String(companyInfo.default_walls_rate || '0')) || 3.50,
        ceilings: parseFloat(String(companyInfo.default_ceilings_rate || '0')) || 4.00,
        baseboards: parseFloat(String(companyInfo.default_baseboard_rate || '0')) || 2.50,
        crownMolding: parseFloat(String(companyInfo.default_crown_rate || '0')) || 5.00,
        doors: parseFloat(String(companyInfo.default_door_rate || '0')) || 125.00,
        windows: parseFloat(String(companyInfo.default_window_rate || '0')) || 75.00,
        // Exterior
        exteriorWalls: parseFloat(String(companyInfo.default_exterior_walls_rate || '0')) || 4.50,
        fascia: parseFloat(String(companyInfo.default_fascia_rate || '0')) || 6.00,
        soffits: parseFloat(String(companyInfo.default_soffits_rate || '0')) || 5.00,
        exteriorDoors: parseFloat(String(companyInfo.default_exterior_door_rate || '0')) || 150.00,
        exteriorWindows: parseFloat(String(companyInfo.default_exterior_window_rate || '0')) || 100.00,
      },
      
      // Labor settings
      laborSettings: {
        hourlyRate: parseFloat(String(companyInfo.default_hourly_rate || '0')) || 45,
        overheadMultiplier: parseFloat(String(companyInfo.default_overhead_multiplier || '0')) || 1.35,
        productivityRates: {
          walls: parseFloat(String(companyInfo.productivity_walls || '0')) || 150,
          ceilings: parseFloat(String(companyInfo.productivity_ceilings || '0')) || 100,
          baseboards: parseFloat(String(companyInfo.productivity_baseboards || '0')) || 60,
          doors: parseFloat(String(companyInfo.productivity_doors || '0')) || 2,
          windows: parseFloat(String(companyInfo.productivity_windows || '0')) || 3,
        }
      },
      
      // Paint products
      paintProducts: paintProducts.map((p: {
        id: string;
        product_name: string;
        manufacturer?: string;
        use_case: string;
        cost_per_gallon: string | number;
        retail_price?: string | number;
        coverage_per_gallon?: string | number;
        is_preferred?: boolean;
      }) => ({
        id: p.id,
        name: p.product_name,
        manufacturer: p.manufacturer || '',
        type: p.use_case || 'wall',
        costPerGallon: parseFloat(String(p.cost_per_gallon || '0')),
        retailPrice: parseFloat(String(p.retail_price || '0')) || parseFloat(String(p.cost_per_gallon || '0')) * 1.5,
        coveragePerGallon: parseFloat(String(p.coverage_per_gallon || '0')) || 350,
        isPreferred: p.is_preferred || false,
      }))
    })
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const company = cookies().get('company')?.value
    if (!company) {
      return NextResponse.json({ error: 'No company session' }, { status: 401 })
    }

    const companyData = JSON.parse(company)
    const data = await request.json()
    const db = getDatabaseAdapter()
    
    // Update company information
    await db.query(`
      UPDATE companies SET 
        company_name = ?,
        email = ?,
        phone = ?,
        address = ?,
        logo_url = ?,
        website = ?,
        license = ?,
        tax_rate = ?,
        tax_label = ?,
        tax_on_materials_only = ?,
        overhead_percent = ?,
        profit_margin = ?,
        default_paint_coverage = ?,
        default_labor_percentage = ?,
        default_sundries_percentage = ?,
        default_walls_rate = ?,
        default_ceilings_rate = ?,
        default_baseboard_rate = ?,
        default_crown_rate = ?,
        default_door_rate = ?,
        default_window_rate = ?,
        default_exterior_walls_rate = ?,
        default_fascia_rate = ?,
        default_soffits_rate = ?,
        default_exterior_door_rate = ?,
        default_exterior_window_rate = ?,
        default_hourly_rate = ?,
        default_overhead_multiplier = ?,
        productivity_walls = ?,
        productivity_ceilings = ?,
        productivity_baseboards = ?,
        productivity_doors = ?,
        productivity_windows = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      data.companyName,
      data.email,
      data.phone,
      data.address,
      data.logoUrl,
      data.website,
      data.license,
      data.taxRate,
      data.taxLabel,
      data.taxOnMaterialsOnly ? 1 : 0,
      data.overheadPercent,
      data.profitMargin,
      data.defaultPaintCoverage,
      data.defaultLaborPercentage,
      data.defaultSundriesPercentage,
      data.chargeRates.walls,
      data.chargeRates.ceilings,
      data.chargeRates.baseboards,
      data.chargeRates.crownMolding,
      data.chargeRates.doors,
      data.chargeRates.windows,
      data.chargeRates.exteriorWalls,
      data.chargeRates.fascia,
      data.chargeRates.soffits,
      data.chargeRates.exteriorDoors,
      data.chargeRates.exteriorWindows,
      data.laborSettings.hourlyRate,
      data.laborSettings.overheadMultiplier,
      data.laborSettings.productivityRates.walls,
      data.laborSettings.productivityRates.ceilings,
      data.laborSettings.productivityRates.baseboards,
      data.laborSettings.productivityRates.doors,
      data.laborSettings.productivityRates.windows,
      companyData.id
    ])
    
    // Handle paint products
    if (data.paintProducts) {
      // Delete existing products
      await db.query(
        'DELETE FROM paint_products WHERE user_id = ?',
        [companyData.id.toString()]
      )
      
      // Insert new products
      for (const product of data.paintProducts) {
        await db.query(`
          INSERT INTO paint_products (
            id, user_id, product_name, manufacturer, use_case, 
            cost_per_gallon, retail_price, coverage_per_gallon, 
            sheen, is_active, is_preferred
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          product.id,
          companyData.id.toString(),
          product.name,
          product.manufacturer || '',
          product.type,
          product.costPerGallon,
          product.retailPrice,
          product.coveragePerGallon,
          product.sheen || '',
          1,
          product.isPreferred ? 1 : 0
        ])
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}