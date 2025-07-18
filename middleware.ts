import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/quotes',
  '/customers',
  '/dashboard/settings',
  '/api/quotes',
  '/api/customers',
  '/api/companies'
];

// Admin-only routes
const adminRoutes = [
  '/admin',
  '/api/admin'
];

// Public routes that don't require auth
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/access-code',
  '/trial-signup',
  '/api/auth',
  '/api/verify-code',
  '/api/test',
  '/api/health'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes and client-side navigation
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // For now, allow all routes since we're using client-side auth
  // This prevents SSR redirect issues
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};