import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getAuthContext } from '@/lib/auth/middleware';

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

    // Get user ID for the company
    const user = await db.query(
      'SELECT id FROM users WHERE company_name = (SELECT company_name FROM companies WHERE id = ?)',
      [auth.company!.id]
    );

    if (!user || user.length === 0) {
      // Return default products if no user found
      return NextResponse.json({ products: DEFAULT_PAINT_PRODUCTS });
    }

    // Build query
    let query = 'SELECT * FROM paint_products WHERE user_id = ?';
    const params: any[] = [user[0].id];

    if (useCase) {
      query += ' AND use_case = ?';
      params.push(useCase);
    }

    if (isActive !== null) {
      query += ' AND is_active = ?';
      params.push(isActive === 'true');
    }

    query += ' ORDER BY use_case, product_name';

    const products = await db.query(query, params);

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

    // Get user ID for the company
    const user = await db.query(
      'SELECT id FROM users WHERE company_name = (SELECT company_name FROM companies WHERE id = ?)',
      [auth.company!.id]
    );

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: 'User not found for company' },
        { status: 404 }
      );
    }

    // Create the product
    const productId = crypto.randomUUID();
    await db.query(
      `INSERT INTO paint_products (id, user_id, product_name, use_case, cost_per_gallon, sheen, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        productId,
        user[0].id,
        data.product_name,
        data.use_case,
        data.cost_per_gallon,
        data.sheen || null,
        data.is_active !== false
      ]
    );

    const product = await db.query(
      'SELECT * FROM paint_products WHERE id = ?',
      [productId]
    );

    return NextResponse.json({
      success: true,
      product: product[0]
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

    // Get user ID for the company
    const user = await db.query(
      'SELECT id FROM users WHERE company_name = (SELECT company_name FROM companies WHERE id = ?)',
      [auth.company!.id]
    );

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: 'User not found for company' },
        { status: 404 }
      );
    }

    // Verify ownership
    const existing = await db.query(
      'SELECT * FROM paint_products WHERE id = ? AND user_id = ?',
      [id, user[0].id]
    );

    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      );
    }

    // Build update query
    const updateFields = [];
    const values = [];
    
    if (updates.product_name !== undefined) {
      updateFields.push('product_name = ?');
      values.push(updates.product_name);
    }
    if (updates.use_case !== undefined) {
      updateFields.push('use_case = ?');
      values.push(updates.use_case);
    }
    if (updates.cost_per_gallon !== undefined) {
      updateFields.push('cost_per_gallon = ?');
      values.push(updates.cost_per_gallon);
    }
    if (updates.sheen !== undefined) {
      updateFields.push('sheen = ?');
      values.push(updates.sheen);
    }
    if (updates.is_active !== undefined) {
      updateFields.push('is_active = ?');
      values.push(updates.is_active);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await db.query(
      `UPDATE paint_products SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    const product = await db.query(
      'SELECT * FROM paint_products WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      product: product[0]
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

    // Get user ID for the company
    const user = await db.query(
      'SELECT id FROM users WHERE company_name = (SELECT company_name FROM companies WHERE id = ?)',
      [auth.company!.id]
    );

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: 'User not found for company' },
        { status: 404 }
      );
    }

    // Delete the product (only if owned by user)
    const result = await db.query(
      'DELETE FROM paint_products WHERE id = ? AND user_id = ?',
      [id, user[0].id]
    );

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