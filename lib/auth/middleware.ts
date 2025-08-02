import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from './access-code';
import { verifyAdminToken } from './admin';

export interface AuthContext {
  type: 'company' | 'admin';
  company?: {
    id: number;
    access_code: string;
  };
  admin?: {
    id: string;
    email: string;
    role: string;
  };
}

// Get auth context from request
export async function getAuthContext(request: NextRequest): Promise<AuthContext | null> {
  // Check for admin token first
  const adminToken = request.cookies.get('pq_admin_token')?.value || 
                     request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (adminToken) {
    const admin = verifyAdminToken(adminToken);
    if (admin) {
      return {
        type: 'admin',
        admin
      };
    }
  }
  
  // Check for company session
  const sessionId = request.cookies.get('pq_session')?.value;
  
  if (sessionId) {
    const session = await validateSession(sessionId);
    if (session) {
      return {
        type: 'company',
        company: {
          id: session.company_id,
          access_code: session.access_code
        }
      };
    }
  }
  
  // Check localStorage data passed in header (for client-side)
  const companyHeader = request.headers.get('x-company-data');
  console.log('Auth middleware - company header:', companyHeader);
  
  if (companyHeader) {
    try {
      const companyData = JSON.parse(companyHeader);
      console.log('Auth middleware - parsed company data:', companyData);
      
      if (companyData.id && companyData.access_code) {
        return {
          type: 'company',
          company: {
            id: companyData.id,
            access_code: companyData.access_code
          }
        };
      }
    } catch (error) {
      console.error('Error parsing company header:', error);
    }
  }
  
  return null;
}

// Require company authentication
export async function requireCompanyAuth(request: NextRequest): Promise<AuthContext | NextResponse> {
  const auth = await getAuthContext(request);
  
  if (!auth || auth.type !== 'company') {
    return NextResponse.json(
      { error: 'Unauthorized - Company authentication required' },
      { status: 401 }
    );
  }
  
  return auth;
}

// Require admin authentication
export async function requireAdminAuth(request: NextRequest): Promise<AuthContext | NextResponse> {
  const auth = await getAuthContext(request);
  
  if (!auth || auth.type !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized - Admin authentication required' },
      { status: 401 }
    );
  }
  
  return auth;
}

// Client-side helper to get company data
interface ClientCompanyData {
  id?: number;
  access_code?: string;
  name?: string;
  email?: string;
  loginTime?: number;
  [key: string]: unknown;
}

export function getClientCompanyData(): ClientCompanyData | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('paintquote_company');
  if (!stored) return null;
  
  try {
    const data = JSON.parse(stored);
    
    // Check if session is still valid (7 days)
    const loginTime = data.loginTime || 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    
    if (now - loginTime > sevenDays) {
      localStorage.removeItem('paintquote_company');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error parsing company data:', error);
    return null;
  }
}

// Client-side helper to set company data
export function setClientCompanyData(data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('paintquote_company', JSON.stringify({
    ...data,
    loginTime: Date.now()
  }));
}