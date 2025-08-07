import { NextRequest } from 'next/server';
import { db } from '@/lib/database/adapter';

export interface CompanyAuth {
  id: number;
  access_code: string;
  name: string;
  email?: string;
}

/**
 * Get company data from request headers with server-side validation
 * Returns null if not found or invalid
 */
export async function getCompanyFromRequest(request: NextRequest): Promise<CompanyAuth | null> {
  const header = request.headers.get('x-company-data');
  
  if (!header) {
    return null;
  }

  try {
    const data = JSON.parse(header);
    // Handle both formats: accessCode and access_code
    const accessCode = data.accessCode || data.access_code;
    
    if (!data.id || !accessCode) {
      console.log('[AUTH] Missing required fields in company header');
      return null;
    }

    // SECURITY FIX: Validate access code against database
    try {
      const companyFromDb = await db.getCompanyByAccessCode(accessCode);
      
      if (!companyFromDb) {
        console.log('[AUTH] Invalid access code provided:', accessCode);
        return null;
      }

      // Verify the company ID matches what's in the database
      if (companyFromDb.id !== data.id) {
        console.log('[AUTH] Company ID mismatch - potential tampering attempt');
        return null;
      }

      // Return validated company data from database, not from header
      return {
        id: companyFromDb.id,
        access_code: companyFromDb.access_code,
        name: companyFromDb.company_name || companyFromDb.name || 'Unknown Company',
        email: companyFromDb.email
      };
      
    } catch (dbError) {
      console.error('[AUTH] Database error during validation:', dbError);
      return null;
    }
    
  } catch (error) {
    console.log('[AUTH] Failed to parse company header:', error);
    return null;
  }
}

/**
 * Validate if a company is authenticated
 */
export function isAuthenticated(company: CompanyAuth | null): boolean {
  return company !== null && company.id > 0 && !!company.access_code;
}

/**
 * Legacy synchronous function - DEPRECATED
 * Use getCompanyFromRequest(request) instead
 * This exists only for backwards compatibility during migration
 */
export function getCompanyFromRequestSync(request: NextRequest): CompanyAuth | null {
  console.warn('[AUTH] getCompanyFromRequestSync is deprecated - use async getCompanyFromRequest instead');
  const header = request.headers.get('x-company-data');
  
  if (header) {
    try {
      const data = JSON.parse(header);
      const accessCode = data.accessCode || data.access_code;
      
      if (data.id && accessCode) {
        return {
          id: data.id,
          access_code: accessCode,
          name: data.name || 'Unknown Company',
          email: data.email
        };
      }
    } catch (error) {
      console.log('[AUTH] Failed to parse company header:', error);
    }
  }
  
  return null;
}

/**
 * Get company data from localStorage (client-side only)
 */
export function getCompanyFromLocalStorage(): CompanyAuth | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('paintquote_company');
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    
    // Check if session is still valid (7 days)
    const loginTime = data.loginTime || 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    
    if (now - loginTime > sevenDays) {
      localStorage.removeItem('paintquote_company');
      return null;
    }
    
    return {
      id: data.id,
      access_code: data.access_code,
      name: data.name,
      email: data.email
    };
  } catch (error) {
    console.error('[AUTH] Failed to parse localStorage:', error);
    return null;
  }
}

/**
 * Set company data in localStorage (client-side only)
 */
export function setCompanyInLocalStorage(company: CompanyAuth): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('paintquote_company', JSON.stringify({
    ...company,
    loginTime: Date.now()
  }));
}

/**
 * Clear authentication (client-side only)
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('paintquote_company');
}