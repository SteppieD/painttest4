import { NextRequest } from 'next/server';

export interface CompanyAuth {
  id: number;
  access_code: string;
  name: string;
  email?: string;
}

/**
 * Get company data from request headers
 * Falls back to demo company if not found
 */
export function getCompanyFromRequest(request: NextRequest): CompanyAuth {
  const header = request.headers.get('x-company-data');
  
  if (header) {
    try {
      const data = JSON.parse(header);
      // Handle both formats: accessCode and access_code
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
  
  // Return demo company as fallback
  return {
    id: 1,
    access_code: 'DEMO2024',
    name: 'Demo Painting Company',
    email: 'demo@paintquote.com'
  };
}

/**
 * Validate if a company is authenticated
 */
export function isAuthenticated(company: CompanyAuth | null): boolean {
  return company !== null && company.id > 0 && !!company.access_code;
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