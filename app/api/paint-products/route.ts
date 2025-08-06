import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getAuthContext } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';

// Default paint products for new companies
const DEFAULT_PAINT_PRODUCTS = [
  // Sherwin Williams
  { product_name: 'ProClassic Interior', use_case: 'walls', cost_per_gallon: 65, sheen: 'Satin' },
  { product_name: 'SuperPaint Interior', use_case: 'walls', cost_per_gallon: 55, sheen: 'Eggshell' },
  { product_name: 'Duration Home', use_case: 'walls', cost_per_gallon: 50, sheen: 'Matte' },
  { product_name: 'Emerald Interior', use_case: 'trim_doors', cost_per_gallon: 85, sheen: 'Semi-Gloss' },
  { product_name: 'ProClassic Enamel', use_case: 'trim_doors', cost_per_gallon: 75, sheen: 'Semi-Gloss' },
  { product_name: 'Eminence Ceiling', use_case: 'ceilings', cost_per_gallon: 45, sheen: 'Flat' },
  
  // Benjamin Moore
  { product_name: 'Regal Select', use_case: 'walls', cost_per_gallon: 60, sheen: 'Eggshell' },
  { product_name: 'Advance Interior', use_case: 'trim_doors', cost_per_gallon: 80, sheen: 'Semi-Gloss' },
  { product_name: 'Ultra Spec Ceiling', use_case: 'ceilings', cost_per_gallon: 40, sheen: 'Flat' },
  
  // Behr
  { product_name: 'Premium Plus', use_case: 'walls', cost_per_gallon: 35, sheen: 'Satin' },
  { product_name: 'Marquee Interior', use_case: 'walls', cost_per_gallon: 45, sheen: 'Eggshell' },
  { product_name: 'Alkyd Enamel', use_case: 'trim_doors', cost_per_gallon: 50, sheen: 'Semi-Gloss' }
];

// GET - Get paint products
export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const useCase = searchParams.get('use_case');
    const isActive = searchParams.get('is_active');

    // Get paint products for the company using Supabase-compatible method
    let products: { use_case: string; is_active: boolean }[] = [];
    try {
      const extendedDb = db as typeof db & { getPaintProductsByCompanyId?: (companyId: number) => Promise<{ use_case: string; is_active: boolean }[]> };
      if (typeof extendedDb.getPaintProductsByCompanyId === 'function') {
        const allProducts = await extendedDb.getPaintProductsByCompanyId(auth.company!.id);
        
        // Filter based on query params
        products = allProducts.filter((p: { use_case: string; is_active: boolean }) => {
          if (useCase && p.use_case !== useCase) return false;
          if (isActive !== null && p.is_active !== (isActive === 'true')) return false;
          return true;
        });
      } else {
        console.log('[PAINT_PRODUCTS] getPaintProductsByCompanyId not available');
      }
    } catch (err) {
      console.error('[PAINT_PRODUCTS] Error fetching products:', err);
    }

    // If no products found, return defaults
    if (!products || products.length === 0) {
      return NextResponse.json({ products: DEFAULT_PAINT_PRODUCTS });
    }

    return NextResponse.json({ products });

  } catch (error) {
    console.error('Error fetching paint products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paint products' },
      { status: 500 }
    );
  }
}

// POST - Create paint product
export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.product_name || !data.use_case || !data.cost_per_gallon) {
      return NextResponse.json(
        { error: 'Product name, use case, and cost per gallon are required' },
        { status: 400 }
      );
    }

    // Get user for the company
    const company = await db.getCompany(auth.company!.id);
    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const extendedDbUser = db as typeof db & { getUserByCompanyName?: (name: string) => Promise<{ id: string }> };
    const user = await extendedDbUser.getUserByCompanyName?.(company.company_name);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found for company' },
        { status: 404 }
      );
    }

    // Create the product using Supabase adapter method
    const productData = {
      id: crypto.randomUUID(),
      user_id: user.id,
      product_name: data.product_name,
      use_case: data.use_case,
      cost_per_gallon: data.cost_per_gallon,
      sheen: data.sheen || null,
      is_active: data.is_active !== false,
      brand: data.brand || null,
      coverage_rate: data.coverage_rate || 350,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    let product: typeof productData | undefined;
    const extendedDbCreate = db as typeof db & { createPaintProduct?: (data: typeof productData) => Promise<typeof productData> };
    if (typeof extendedDbCreate.createPaintProduct === 'function') {
      product = await extendedDbCreate.createPaintProduct(productData);
    } else {
      return NextResponse.json(
        { error: 'Paint product creation not supported with current adapter' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      product: product
    });

  } catch (error) {
    console.error('Error creating paint product:', error);
    return NextResponse.json(
      { error: 'Failed to create paint product' },
      { status: 500 }
    );
  }
}

// PUT - Update paint product
export async function PUT(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, updates } = await request.json();

    if (!id || !updates) {
      return NextResponse.json(
        { error: 'Product ID and updates are required' },
        { status: 400 }
      );
    }

    // Get user for the company
    const company = await db.getCompany(auth.company!.id);
    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const extendedDbUser = db as typeof db & { getUserByCompanyName?: (name: string) => Promise<{ id: string }> };
    const user = await extendedDbUser.getUserByCompanyName?.(company.company_name);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found for company' },
        { status: 404 }
      );
    }

    // Update the product using Supabase adapter method
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    let product: typeof updateData | undefined;
    const extendedDbUpdate = db as typeof db & { updatePaintProduct?: (id: string, data: typeof updateData) => Promise<typeof updateData> };
    if (typeof extendedDbUpdate.updatePaintProduct === 'function') {
      try {
        product = await extendedDbUpdate.updatePaintProduct(id, updateData);
      } catch (error) {
        return NextResponse.json(
          { error: 'Product not found or unauthorized' },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Paint product update not supported with current adapter' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      product: product
    });

  } catch (error) {
    console.error('Error updating paint product:', error);
    return NextResponse.json(
      { error: 'Failed to update paint product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete paint product
export async function DELETE(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get user for the company
    const company = await db.getCompany(auth.company!.id);
    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const extendedDbUser = db as typeof db & { getUserByCompanyName?: (name: string) => Promise<{ id: string }> };
    const user = await extendedDbUser.getUserByCompanyName?.(company.company_name);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found for company' },
        { status: 404 }
      );
    }

    // Delete the product using Supabase adapter method
    const extendedDbDelete = db as typeof db & { deletePaintProduct?: (id: string, userId: string) => Promise<void> };
    if (typeof extendedDbDelete.deletePaintProduct === 'function') {
      try {
        await extendedDbDelete.deletePaintProduct(id, user.id);
      } catch (error) {
        return NextResponse.json(
          { error: 'Product not found or unauthorized' },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Paint product deletion not supported with current adapter' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting paint product:', error);
    return NextResponse.json(
      { error: 'Failed to delete paint product' },
      { status: 500 }
    );
  }
}