import { NextRequest, NextResponse } from 'next/server';
import { 
  withSecurity, 
  sanitizeInput,
  checkRateLimit,
  isValidEmail,
  isValidPhone,
  escapeHTML
} from './security-middleware';

export interface SecureContext {
  companyId: number;
  accessCode: string;
  request: NextRequest;
}

export type SecureHandler = (
  context: SecureContext
) => Promise<NextResponse> | NextResponse;

/**
 * Create a secure API route handler
 */
export function createSecureRoute(handler: SecureHandler) {
  return async (request: NextRequest) => {
    return withSecurity(request, async (req, auth) => {
      return handler({
        companyId: auth.companyId,
        accessCode: auth.accessCode,
        request: req
      });
    });
  };
}

/**
 * Validate quote data with security checks
 */
export function validateQuoteData(data: unknown): {
  valid: boolean;
  sanitized?: {
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    address?: string;
    projectType?: string;
    totalCost?: number;
    sqft?: number;
  };
  errors?: string[];
} {
  const errors: string[] = [];
  
  const sanitized = sanitizeInput(data, {
    customerName: {
      type: 'string',
      required: true,
      maxLength: 255,
      sanitize: (v) => escapeHTML(String(v).trim())
    },
    customerEmail: {
      type: 'string',
      required: false,
      maxLength: 255,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      sanitize: (v) => String(v).toLowerCase().trim()
    },
    customerPhone: {
      type: 'string',
      required: false,
      maxLength: 20,
      pattern: /^[\d\s\-\(\)\+]+$/,
      sanitize: (v) => String(v).replace(/[^\d\s\-\(\)\+]/g, '')
    },
    address: {
      type: 'string',
      required: false,
      maxLength: 500,
      sanitize: (v) => escapeHTML(String(v).trim())
    },
    projectType: {
      type: 'string',
      required: false,
      maxLength: 100,
      pattern: /^(interior|exterior|commercial|residential)$/i,
      sanitize: (v) => String(v).toLowerCase()
    },
    totalCost: {
      type: 'number',
      required: false,
      min: 0,
      max: 1000000
    },
    sqft: {
      type: 'number',
      required: false,
      min: 0,
      max: 100000
    }
  });
  
  if (!sanitized) {
    errors.push('Invalid quote data format');
    return { valid: false, errors };
  }
  
  // Additional validation
  if (sanitized.customerEmail && !isValidEmail(sanitized.customerEmail)) {
    errors.push('Invalid email format');
  }
  
  if (sanitized.customerPhone && !isValidPhone(sanitized.customerPhone)) {
    errors.push('Invalid phone number format');
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return { valid: true, sanitized };
}

/**
 * Check if user has permission for specific action
 */
export async function checkPermission(
  companyId: number,
  action: 'create_quote' | 'view_quote' | 'edit_quote' | 'delete_quote' | 'view_analytics',
  resourceId?: number | string
): Promise<boolean> {
  // Check rate limits for sensitive actions
  if (action === 'create_quote') {
    const rateLimit = checkRateLimit(`company:${companyId}`, 'quotes');
    if (!rateLimit.allowed) {
      return false;
    }
  }
  
  // In production, check actual permissions from database
  // For now, company can access their own resources
  if (resourceId && action.includes('quote')) {
    // Verify quote belongs to company
    // This would be a database check in production
    return true;
  }
  
  return true;
}

/**
 * Log security events
 */
export function logSecurityEvent(
  type: 'auth_success' | 'auth_failure' | 'rate_limit' | 'invalid_input' | 'permission_denied',
  details: {
    companyId?: number;
    ip?: string;
    action?: string;
    reason?: string;
  }
): void {
  const event = {
    type,
    timestamp: new Date().toISOString(),
    ...details
  };
  
  // In production, send to logging service
  console.log('[SECURITY_EVENT]', JSON.stringify(event));
  
  // Track suspicious activity
  if (type === 'auth_failure' || type === 'permission_denied') {
    // In production, implement account lockout after multiple failures
  }
}

/**
 * Encrypt sensitive data
 */
export function encryptData(data: string): string {
  // In production, use proper encryption with crypto module
  // This is a placeholder for demonstration
  return Buffer.from(data).toString('base64');
}

/**
 * Decrypt sensitive data
 */
export function decryptData(encrypted: string): string {
  // In production, use proper decryption with crypto module
  // This is a placeholder for demonstration
  return Buffer.from(encrypted, 'base64').toString('utf-8');
}

/**
 * Generate secure random ID
 */
export function generateSecureId(): string {
  return crypto.randomUUID();
}

/**
 * Validate API key format
 */
export function isValidApiKey(key: string): boolean {
  // API keys should be 32+ characters, alphanumeric with hyphens
  return /^[a-zA-Z0-9\-]{32,}$/.test(key);
}

/**
 * Validate access code format
 */
export function isValidAccessCode(code: string): boolean {
  // Access codes should be 8-20 characters, uppercase alphanumeric
  return /^[A-Z0-9]{8,20}$/.test(code);
}

/**
 * Create secure response with proper headers
 */
export function createSecureResponse(
  data: unknown,
  status: number = 200
): NextResponse {
  const response = NextResponse.json(data, { status });
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  
  return response;
}

/**
 * Create error response with security headers
 */
export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: unknown
): NextResponse {
  const response = NextResponse.json(
    {
      error: message,
      ...(process.env.NODE_ENV === 'development' && details ? { details } : {})
    },
    { status }
  );
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}