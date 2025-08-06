import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/database/adapter';

// Security configuration
const SECURITY_CONFIG = {
  // Rate limiting
  rateLimiting: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    maxQuotesPerHour: 30,
    maxAuthAttemptsPerHour: 5,
  },
  // Session config
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    refreshAfter: 24 * 60 * 60 * 1000, // Refresh after 1 day
  },
  // Security headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
};

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Session store (in production, use Redis or database)
const sessionStore = new Map<string, { 
  companyId: number;
  accessCode: string;
  createdAt: number;
  lastAccess: number;
  ipAddress: string;
}>();

/**
 * Generate secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash access code for secure comparison
 */
export function hashAccessCode(accessCode: string): string {
  return crypto
    .createHash('sha256')
    .update(accessCode + (process.env.AUTH_SALT || 'default-salt'))
    .digest('hex');
}

/**
 * Validate session token
 */
export async function validateSession(token: string): Promise<{
  valid: boolean;
  companyId?: number;
  accessCode?: string;
}> {
  const session = sessionStore.get(token);
  
  if (!session) {
    return { valid: false };
  }
  
  const now = Date.now();
  
  // Check if session expired
  if (now - session.createdAt > SECURITY_CONFIG.session.maxAge) {
    sessionStore.delete(token);
    return { valid: false };
  }
  
  // Update last access time
  session.lastAccess = now;
  sessionStore.set(token, session);
  
  return {
    valid: true,
    companyId: session.companyId,
    accessCode: session.accessCode
  };
}

/**
 * Create new session
 */
export function createSession(
  companyId: number, 
  accessCode: string, 
  ipAddress: string
): string {
  const token = generateSessionToken();
  const now = Date.now();
  
  sessionStore.set(token, {
    companyId,
    accessCode,
    createdAt: now,
    lastAccess: now,
    ipAddress
  });
  
  return token;
}

/**
 * Check rate limiting
 */
export function checkRateLimit(
  identifier: string, 
  type: 'api' | 'auth' | 'quotes' = 'api'
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `${type}:${identifier}`;
  const limit = rateLimitStore.get(key);
  
  // Clean up old entries
  if (limit && now > limit.resetTime) {
    rateLimitStore.delete(key);
  }
  
  const maxRequests = type === 'auth' 
    ? SECURITY_CONFIG.rateLimiting.maxAuthAttemptsPerHour
    : type === 'quotes'
    ? SECURITY_CONFIG.rateLimiting.maxQuotesPerHour
    : SECURITY_CONFIG.rateLimiting.maxRequests;
    
  const windowMs = type === 'auth' || type === 'quotes'
    ? 60 * 60 * 1000 // 1 hour for auth and quotes
    : SECURITY_CONFIG.rateLimiting.windowMs;
  
  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }
  
  if (limit.count >= maxRequests) {
    return { 
      allowed: false, 
      retryAfter: Math.ceil((limit.resetTime - now) / 1000)
    };
  }
  
  limit.count++;
  rateLimitStore.set(key, limit);
  return { allowed: true };
}

/**
 * Validate and sanitize input
 */
export function sanitizeInput<T extends Record<string, unknown>>(
  input: unknown,
  schema: {
    [K in keyof T]: {
      type: 'string' | 'number' | 'boolean' | 'array' | 'object';
      required?: boolean;
      maxLength?: number;
      min?: number;
      max?: number;
      pattern?: RegExp;
      sanitize?: (value: unknown) => T[K];
    }
  }
): T | null {
  if (!input || typeof input !== 'object') {
    return null;
  }
  
  const sanitized: Partial<T> = {};
  const inputObj = input as Record<string, unknown>;
  
  for (const [key, rules] of Object.entries(schema)) {
    const value = inputObj[key];
    
    // Check required fields
    if (rules.required && (value === undefined || value === null)) {
      return null;
    }
    
    // Skip undefined optional fields
    if (value === undefined) {
      continue;
    }
    
    // Type validation
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== rules.type) {
      return null;
    }
    
    // String validation
    if (rules.type === 'string' && typeof value === 'string') {
      if (rules.maxLength && value.length > rules.maxLength) {
        return null;
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        return null;
      }
      // Sanitize HTML and SQL injection attempts
      const sanitizedStr = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>]/g, '')
        .replace(/'/g, "''");
      (sanitized as Record<string, unknown>)[key] = sanitizedStr;
    }
    
    // Number validation
    else if (rules.type === 'number' && typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        return null;
      }
      if (rules.max !== undefined && value > rules.max) {
        return null;
      }
      (sanitized as Record<string, unknown>)[key] = value;
    }
    
    // Custom sanitization
    else if (rules.sanitize) {
      (sanitized as Record<string, unknown>)[key] = rules.sanitize(value);
    } else {
      (sanitized as Record<string, unknown>)[key] = value;
    }
  }
  
  return sanitized as T;
}

/**
 * Security middleware for API routes
 */
export async function withSecurity(
  request: NextRequest,
  handler: (req: NextRequest, context: {
    companyId: number;
    accessCode: string;
  }) => Promise<NextResponse>
): Promise<NextResponse> {
  // Add security headers
  const headers = new Headers();
  Object.entries(SECURITY_CONFIG.headers).forEach(([key, value]) => {
    headers.set(key, value);
  });
  
  // Get IP address for rate limiting
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Check rate limiting
  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Too many requests', 
        retryAfter: rateLimitResult.retryAfter 
      }),
      { 
        status: 429,
        headers: {
          ...Object.fromEntries(headers),
          'Retry-After': String(rateLimitResult.retryAfter || 60)
        }
      }
    );
  }
  
  // Get session token from cookie or authorization header
  const authHeader = request.headers.get('authorization');
  const sessionToken = authHeader?.replace('Bearer ', '') || 
                      request.cookies.get('session')?.value;
  
  if (!sessionToken) {
    // Try to get company data from x-company-data header (backward compatibility)
    const companyHeader = request.headers.get('x-company-data');
    if (companyHeader) {
      try {
        const companyData = JSON.parse(companyHeader);
        if (companyData.id && companyData.access_code) {
          // Validate access code exists in database
          const company = await db.query(
            'SELECT id FROM companies WHERE id = ? AND access_code = ?',
            [companyData.id, companyData.access_code]
          );
          
          if (Array.isArray(company) && company.length > 0) {
            // Create session for backward compatibility
            const token = createSession(
              companyData.id,
              companyData.access_code,
              ip
            );
            
            // Call handler with context
            const response = await handler(request, {
              companyId: companyData.id,
              accessCode: companyData.access_code
            });
            
            // Add session cookie
            response.headers.set('Set-Cookie', 
              `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SECURITY_CONFIG.session.maxAge / 1000}`
            );
            
            return response;
          }
        }
      } catch (error) {
        console.error('[SECURITY] Invalid company header:', error);
      }
    }
    
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers }
    );
  }
  
  // Validate session
  const session = await validateSession(sessionToken);
  if (!session.valid || !session.companyId || !session.accessCode) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid or expired session' }),
      { status: 401, headers }
    );
  }
  
  // Call handler with validated context
  const response = await handler(request, {
    companyId: session.companyId,
    accessCode: session.accessCode
  });
  
  // Add security headers to response
  Object.entries(SECURITY_CONFIG.headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * CSRF token generation and validation
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  // In production, store CSRF tokens with sessions
  // For now, we'll use a simple validation
  return token.length === 64 && /^[a-f0-9]+$/.test(token);
}

/**
 * SQL injection prevention helper
 */
export function escapeSQLString(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\');
}

/**
 * XSS prevention helper
 */
export function escapeHTML(str: string): string {
  if (typeof str !== 'string') return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return str.replace(/[&<>"'/]/g, (s) => map[s]);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Clean up expired sessions and rate limits periodically
 */
export function startCleanupInterval(): void {
  setInterval(() => {
    const now = Date.now();
    
    // Clean expired sessions
    for (const [token, session] of sessionStore.entries()) {
      if (now - session.createdAt > SECURITY_CONFIG.session.maxAge) {
        sessionStore.delete(token);
      }
    }
    
    // Clean expired rate limits
    for (const [key, limit] of rateLimitStore.entries()) {
      if (now > limit.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 60 * 60 * 1000); // Run every hour
}

// Start cleanup interval when module loads
if (typeof window === 'undefined') {
  startCleanupInterval();
}