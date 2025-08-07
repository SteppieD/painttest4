import { NextRequest, NextResponse } from 'next/server';
import { hasMinimumTier, SubscriptionTier, getUserTier } from '@/lib/auth/tier-utils';
import { db } from '@/lib/database/adapter';

interface RouteConfig {
  path: string;
  minimumTier: SubscriptionTier;
  redirectTo?: string;
}

/**
 * Routes that require specific tiers
 */
const PROTECTED_ROUTES: RouteConfig[] = [
  {
    path: '/dashboard/analytics',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: '/dashboard?upgrade=analytics'
  },
  {
    path: '/dashboard/analytics/performance',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: '/dashboard?upgrade=analytics'
  },
  {
    path: '/dashboard/analytics/revenue',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: '/dashboard?upgrade=analytics'
  },
  {
    path: '/dashboard/analytics/customers',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: '/dashboard?upgrade=analytics'
  },
  {
    path: '/dashboard/analytics/projects',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: '/dashboard?upgrade=analytics'
  },
  {
    path: '/dashboard/team',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: '/dashboard?upgrade=team'
  },
  {
    path: '/api/chat',
    minimumTier: SubscriptionTier.PROFESSIONAL,
    redirectTo: undefined // API routes should return 403
  },
  {
    path: '/api/integrations',
    minimumTier: SubscriptionTier.BUSINESS,
    redirectTo: undefined
  },
  {
    path: '/api/advanced-analytics',
    minimumTier: SubscriptionTier.BUSINESS,
    redirectTo: undefined
  }
];

/**
 * Extract company data from request headers or cookies
 */
async function getCompanyFromRequest(request: NextRequest): Promise<{ id: number; tier: SubscriptionTier } | null> {
  try {
    // Check for company data in headers (for API routes)
    const companyHeader = request.headers.get('x-company-data');
    if (companyHeader) {
      const companyData = JSON.parse(companyHeader);
      const company = await db.getCompany(companyData.id);
      if (company) {
        return {
          id: company.id,
          tier: (company.subscription_tier as SubscriptionTier) || SubscriptionTier.FREE
        };
      }
    }

    // For web routes, we'll need to check session/cookies
    // This is a simplified version - in production you might use JWT or session tokens
    const sessionCookie = request.cookies.get('paintquote_session');
    if (sessionCookie) {
      // Parse session and get company info
      // For now, we'll return null and let client-side handle it
      return null;
    }

    return null;
  } catch (error) {
    console.error('Error extracting company from request:', error);
    return null;
  }
}

/**
 * Middleware to check tier access for protected routes
 */
export async function tierGuardMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  
  // Find matching route configuration
  const routeConfig = PROTECTED_ROUTES.find(route => 
    pathname === route.path || pathname.startsWith(route.path + '/')
  );
  
  if (!routeConfig) {
    // Route is not protected
    return null;
  }

  // Get company tier from request
  const companyData = await getCompanyFromRequest(request);
  
  if (!companyData) {
    // No valid company data - redirect to access code page for web routes
    if (pathname.startsWith('/api/')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const url = request.nextUrl.clone();
    url.pathname = '/access-code';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Check if user has required tier
  const hasAccess = await hasMinimumTier(routeConfig.minimumTier, companyData.id);
  
  if (!hasAccess) {
    // User doesn't have required tier
    if (pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({
          error: 'Insufficient tier',
          required: routeConfig.minimumTier,
          current: companyData.tier,
          upgradeUrl: `/dashboard/settings/billing?upgrade=${routeConfig.minimumTier}`
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Redirect web routes to upgrade page or custom redirect
    if (routeConfig.redirectTo) {
      const url = request.nextUrl.clone();
      url.pathname = routeConfig.redirectTo.split('?')[0];
      // Add query params from redirectTo
      const redirectParams = new URLSearchParams(routeConfig.redirectTo.split('?')[1] || '');
      redirectParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      url.searchParams.set('required_tier', routeConfig.minimumTier);
      url.searchParams.set('current_tier', companyData.tier);
      return NextResponse.redirect(url);
    }
  }

  // User has access or route is not protected
  return null;
}

/**
 * Check if API request has tier access
 */
export async function requireTier(
  request: NextRequest, 
  requiredTier: SubscriptionTier
): Promise<{ success: true; companyId: number } | { success: false; response: NextResponse }> {
  const companyData = await getCompanyFromRequest(request);
  
  if (!companyData) {
    return {
      success: false,
      response: new NextResponse('Unauthorized', { status: 401 })
    };
  }

  const hasAccess = await hasMinimumTier(requiredTier, companyData.id);
  
  if (!hasAccess) {
    return {
      success: false,
      response: new NextResponse(
        JSON.stringify({
          error: 'Insufficient tier',
          required: requiredTier,
          current: companyData.tier,
          upgradeUrl: `/dashboard/settings/billing?upgrade=${requiredTier}`
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    };
  }

  return { success: true, companyId: companyData.id };
}

/**
 * Decorator for API routes to require specific tier
 */
export function withTierAccess(requiredTier: SubscriptionTier) {
  return function<T extends (...args: any[]) => any>(target: T): T {
    return (async (request: NextRequest, ...args: any[]) => {
      const tierCheck = await requireTier(request, requiredTier);
      
      if (!tierCheck.success) {
        return tierCheck.response;
      }
      
      // Add companyId to request for convenience
      (request as any).companyId = tierCheck.companyId;
      
      return target(request, ...args);
    }) as T;
  };
}