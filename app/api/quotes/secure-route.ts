import { NextRequest } from 'next/server';
import { db } from '@/lib/database/adapter';
import { generateQuoteNumber } from '@/lib/quote-number-generator-adapter';
import { SubscriptionService } from '@/lib/services/subscription';
import {
  createSecureRoute,
  validateQuoteData,
  checkPermission,
  logSecurityEvent,
  createSecureResponse,
  createErrorResponse
} from '@/lib/auth/secure-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/quotes - Get all quotes for company (secured)
 */
export const GET = createSecureRoute(async ({ companyId, accessCode, request }) => {
  try {
    // Check permission
    if (!await checkPermission(companyId, 'view_quote')) {
      logSecurityEvent('permission_denied', {
        companyId,
        action: 'view_quote'
      });
      return createErrorResponse('Permission denied', 403);
    }
    
    // Get quotes from database
    const quotes = await db.getQuotesByCompanyId(companyId);
    
    // Log successful access
    logSecurityEvent('auth_success', {
      companyId,
      action: 'view_quotes'
    });
    
    return createSecureResponse({ quotes });
  } catch (error) {
    console.error('[QUOTES] Error fetching quotes:', error);
    return createErrorResponse('Failed to fetch quotes', 500);
  }
});

/**
 * POST /api/quotes - Create new quote (secured)
 */
export const POST = createSecureRoute(async ({ companyId, accessCode, request }) => {
  try {
    // Check permission
    if (!await checkPermission(companyId, 'create_quote')) {
      logSecurityEvent('permission_denied', {
        companyId,
        action: 'create_quote'
      });
      return createErrorResponse('Quote limit exceeded', 403);
    }
    
    // Get and validate request body
    const body = await request.json();
    const validation = validateQuoteData(body.quoteData);
    
    if (!validation.valid || !validation.sanitized) {
      logSecurityEvent('invalid_input', {
        companyId,
        action: 'create_quote',
        reason: validation.errors?.join(', ')
      });
      return createErrorResponse(
        'Invalid quote data',
        400,
        validation.errors
      );
    }
    
    // Check subscription limits
    const quoteLimitCheck = await SubscriptionService.checkQuoteLimit(companyId);
    
    if (!quoteLimitCheck.allowed) {
      return createErrorResponse(
        'Quote limit reached. Please upgrade your subscription.',
        402
      );
    }
    
    // Get company data
    const companyData = await db.getCompany(companyId);
    if (!companyData) {
      return createErrorResponse('Company not found', 404);
    }
    
    // Generate quote number
    const quoteNumber = await generateQuoteNumber(companyId);
    
    // Prepare quote data with sanitized input
    const quoteData = {
      company_id: companyId,
      quote_id: quoteNumber,
      customer_name: validation.sanitized.customerName,
      customer_email: validation.sanitized.customerEmail,
      customer_phone: validation.sanitized.customerPhone,
      address: validation.sanitized.address,
      project_type: validation.sanitized.projectType || 'interior',
      surfaces: [],
      measurements: {},
      labor_cost: 0,
      material_cost: 0,
      total_cost: validation.sanitized.totalCost || 0,
      status: 'pending' as const,
      
      // Capture current rates for historical accuracy
      pricing: {
        rates_snapshot: {
          tax_rate: companyData.tax_rate || 0,
          tax_on_materials_only: false,
          hourly_rate: companyData.default_hourly_rate || 60,
          labor_percentage: companyData.default_labor_percentage || 40,
          overhead_percent: 15,
          profit_margin: 30,
          walls_rate: 3,
          ceilings_rate: 2,
          trim_rate: 1.92,
          door_rate: 100,
          window_rate: 25,
          walls_paint_cost: 26,
          ceilings_paint_cost: 25,
          trim_paint_cost: 35,
          paint_coverage: 350,
          sundries_percentage: 12,
          productivity_walls: 150,
          productivity_ceilings: 100,
          productivity_baseboards: 60,
          productivity_doors: 2,
          productivity_windows: 3,
          captured_at: new Date().toISOString()
        }
      }
    };
    
    // Create quote
    const newQuote = await db.createQuote(quoteData);
    
    // Track usage
    await SubscriptionService.incrementQuoteCount(companyId);
    
    // Log successful creation
    logSecurityEvent('auth_success', {
      companyId,
      action: 'create_quote'
    });
    
    return createSecureResponse(
      {
        success: true,
        quote: newQuote,
        quoteId: quoteNumber
      },
      201
    );
  } catch (error) {
    console.error('[QUOTES] Error creating quote:', error);
    return createErrorResponse('Failed to create quote', 500);
  }
});

/**
 * Example of how to update existing routes to use security
 * 
 * Before:
 * export async function POST(request: NextRequest) {
 *   const company = getCompanyFromRequest(request);
 *   // ... rest of logic
 * }
 * 
 * After:
 * export const POST = createSecureRoute(async ({ companyId, accessCode, request }) => {
 *   // All authentication and rate limiting is handled automatically
 *   // You have validated companyId and accessCode
 *   // ... rest of logic with proper validation
 * });
 */