import { z } from 'zod';

// Base validation schemas
export const CompanyIdSchema = z.coerce.number().int().positive({
  message: 'Company ID must be a positive integer'
});

export const QuoteIdSchema = z.string().min(1, 'Quote ID is required').max(50, 'Quote ID too long');

export const EmailSchema = z.string().email('Invalid email format').max(254, 'Email too long');

export const PhoneSchema = z.string()
  .regex(/^[+]?[1-9]?[0-9]{7,15}$/, 'Invalid phone number format')
  .optional()
  .or(z.literal(''));

export const NameSchema = z.string()
  .min(1, 'Name is required')
  .max(100, 'Name too long')
  .regex(/^[a-zA-Z\s\-\.]+$/, 'Name contains invalid characters');

export const CompanyNameSchema = z.string()
  .min(1, 'Company name is required')
  .max(200, 'Company name too long')
  .regex(/^[a-zA-Z0-9\s\-\.,&()]+$/, 'Company name contains invalid characters');

// Contact Sales Form Schema
export const ContactSalesSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  phone: PhoneSchema,
  company: CompanyNameSchema,
  employees: z.enum(['1-5', '6-10', '11-25', '26-50', '50+'], {
    errorMap: () => ({ message: 'Invalid team size selection' })
  }),
  monthlyQuotes: z.enum(['50-100', '100-200', '200-500', '500+'], {
    errorMap: () => ({ message: 'Invalid monthly quotes selection' })
  }).optional(),
  currentSoftware: z.string().max(200, 'Current software description too long').optional(),
  message: z.string().max(1000, 'Message too long').optional()
});

// Quote Creation Schema
export const CreateQuoteSchema = z.object({
  companyId: CompanyIdSchema,
  quoteData: z.object({
    customerName: z.string().min(1, 'Customer name is required').max(100, 'Customer name too long'),
    customerEmail: EmailSchema.optional(),
    customerPhone: PhoneSchema,
    address: z.string().max(500, 'Address too long').optional(),
    projectType: z.enum(['interior', 'exterior', 'commercial', 'residential'], {
      errorMap: () => ({ message: 'Invalid project type' })
    }),
    surfaces: z.array(z.string().max(50)).max(20, 'Too many surfaces').optional(),
    sqft: z.number().min(0).max(100000, 'Square footage too large').optional(),
    ceilings_sqft: z.number().min(0).max(100000, 'Ceiling square footage too large').optional(),
    trim_sqft: z.number().min(0).max(100000, 'Trim square footage too large').optional(),
    rooms: z.array(z.object({
      name: z.string().max(100, 'Room name too long'),
      length: z.number().min(0).max(1000, 'Room length too large').optional(),
      width: z.number().min(0).max(1000, 'Room width too large').optional()
    })).max(50, 'Too many rooms').optional(),
    breakdown: z.object({
      materials: z.number().min(0).max(1000000, 'Materials cost too large').optional(),
      labor: z.number().min(0).max(1000000, 'Labor cost too large').optional(),
      markup: z.number().min(0).max(100, 'Markup percentage too large').optional()
    }).optional(),
    finalPrice: z.number().min(0).max(1000000, 'Final price too large').optional(),
    totalCost: z.number().min(0).max(1000000, 'Total cost too large').optional(),
    timeEstimate: z.string().max(200, 'Time estimate too long').optional(),
    timeline: z.string().max(200, 'Timeline too long').optional(),
    specialRequests: z.union([
      z.string().max(1000, 'Special requests too long'),
      z.array(z.string().max(200)).max(10, 'Too many special requests')
    ]).optional()
  }),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().max(5000, 'Conversation content too long')
  })).max(50, 'Conversation history too long').optional()
});

// Company Update Schema
export const UpdateCompanySchema = z.object({
  company_name: CompanyNameSchema.optional(),
  email: EmailSchema.optional(),
  phone: PhoneSchema.optional(),
  address: z.string().max(500, 'Address too long').optional(),
  tax_rate: z.number().min(0).max(50, 'Tax rate must be between 0 and 50').optional(),
  subscription_tier: z.enum(['free', 'professional', 'business']).optional(),
  monthly_quote_count: z.number().int().min(0).max(10000).optional(),
  monthly_quote_limit: z.number().int().min(0).max(10000).optional(),
  default_hourly_rate: z.number().min(0).max(1000, 'Hourly rate too high').optional(),
  default_labor_percentage: z.number().min(0).max(100, 'Labor percentage must be between 0 and 100').optional()
});

// Analytics Query Schema
export const AnalyticsQuerySchema = z.object({
  companyId: CompanyIdSchema,
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(1000).optional()
});

// Utility functions for validation
export function validateCompanyId(id: unknown): number {
  const result = CompanyIdSchema.safeParse(id);
  if (!result.success) {
    throw new Error(`Invalid company ID: ${result.error.errors[0].message}`);
  }
  return result.data;
}

export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  
  // Remove potential XSS vectors
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 1000); // Limit length
}

export function validateAndSanitizeContactForm(data: unknown) {
  const result = ContactSalesSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid contact form data: ${result.error.errors.map(e => e.message).join(', ')}`);
  }
  
  // Additional sanitization for sensitive fields
  const sanitized = {
    ...result.data,
    name: sanitizeString(result.data.name),
    company: sanitizeString(result.data.company),
    currentSoftware: result.data.currentSoftware ? sanitizeString(result.data.currentSoftware) : undefined,
    message: result.data.message ? sanitizeString(result.data.message) : undefined
  };
  
  return sanitized;
}

// Database query parameter validation
export function validateDatabaseParams(params: Record<string, unknown>): Record<string, unknown> {
  const validated: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      // Prevent SQL injection in string parameters
      validated[key] = value
        .replace(/[';"\\]/g, '') // Remove dangerous characters
        .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND|WHERE|FROM)\b/gi, '') // Remove SQL keywords
        .slice(0, 500); // Limit length
    } else if (typeof value === 'number') {
      // Validate numeric parameters
      if (isNaN(value) || !isFinite(value)) {
        throw new Error(`Invalid numeric parameter: ${key}`);
      }
      validated[key] = Math.floor(Math.abs(value)); // Ensure positive integers
    } else {
      validated[key] = value;
    }
  }
  
  return validated;
}
