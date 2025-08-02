import { db } from '../database/adapter';
import crypto from 'crypto';

export interface Company {
  id: number;
  access_code: string;
  company_name: string;
  phone?: string;
  email?: string;
  subscription_tier?: string;
  monthly_quote_limit?: number;
  monthly_quote_count?: number;
  onboarding_completed?: boolean | number;
}

export interface Session {
  id: string;
  company_id: number;
  access_code: string;
  created_at: Date;
  expires_at: Date;
}

// Verify access code and return company info
export async function verifyAccessCode(accessCode: string): Promise<Company | null> {
  try {
    const normalizedCode = accessCode.toUpperCase().trim();
    
    // Get company by access code
    const company = await db.getCompanyByAccessCode(normalizedCode);
    
    if (company) {
      return {
        id: company.id,
        access_code: company.access_code,
        company_name: company.company_name,
        phone: company.phone,
        email: company.email,
        subscription_tier: company.subscription_tier,
        monthly_quote_limit: company.monthly_quote_limit,
        monthly_quote_count: company.monthly_quote_count,
        onboarding_completed: !!company.onboarding_completed
      };
    }
    
    // Check if it's a valid pattern for auto-creation
    const validPattern = /^[A-Z]{3,10}\d{2,4}$/;
    if (validPattern.test(normalizedCode)) {
      // Auto-create trial company
      const newCompany = await db.createCompany({
        access_code: normalizedCode,
        company_name: `Company ${normalizedCode}`,
        email: `${normalizedCode.toLowerCase()}@example.com`,
        subscription_tier: 'free',
        monthly_quote_limit: 5,
        monthly_quote_count: 0,
        tax_rate: 0,
        onboarding_completed: false,
        onboarding_step: 0
      });
      
      return {
        id: newCompany.id,
        access_code: newCompany.access_code,
        company_name: newCompany.company_name,
        phone: newCompany.phone,
        email: newCompany.email,
        subscription_tier: 'free',
        monthly_quote_limit: 5,
        monthly_quote_count: 0,
        onboarding_completed: false
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error verifying access code:', error);
    return null;
  }
}

// Create session for company
export async function createSession(companyId: number, accessCode: string): Promise<string> {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry
  
  try {
    // First, ensure access code exists in access_codes table
    const codeResult = await db.query(
      `SELECT id FROM access_codes WHERE code = ?`,
      [accessCode]
    ) as Array<{id: number}>;
    
    let accessCodeId;
    if (!codeResult || codeResult.length === 0) {
      // Create access code entry if it doesn't exist
      const insertResult = await db.query(
        `INSERT INTO access_codes (code, created_at) VALUES (?, datetime('now'))`,
        [accessCode]
      ) as {lastInsertRowid: number};
      accessCodeId = insertResult.lastInsertRowid;
    } else {
      accessCodeId = codeResult[0].id;
    }
    
    // Now create the session
    await db.query(
      `INSERT INTO access_code_sessions (id, access_code_id, session_data, created_at, expires_at) 
       VALUES (?, ?, ?, datetime('now'), ?)`,
      [sessionId, accessCodeId, JSON.stringify({ company_id: companyId }), expiresAt.toISOString()]
    );
    
    return sessionId;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

// Validate session
export async function validateSession(sessionId: string): Promise<Session | null> {
  try {
    const result = await db.query(
      `SELECT s.*, 
              json_extract(s.session_data, '$.company_id') as company_id,
              ac.code as access_code
       FROM access_code_sessions s 
       JOIN access_codes ac ON s.access_code_id = ac.id
       WHERE s.id = ? AND s.expires_at > datetime('now')`,
      [sessionId]
    ) as Array<{id: string; company_id: number; access_code: string; created_at: string; expires_at: string}>;
    
    if (result && result.length > 0) {
      const session = result[0];
      return {
        id: session.id,
        company_id: parseInt(session.company_id),
        access_code: session.access_code,
        created_at: new Date(session.created_at),
        expires_at: new Date(session.expires_at)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

// Check if company needs onboarding
export async function checkNeedsOnboarding(companyId: number): Promise<boolean> {
  try {
    // Check if company has set up their preferences
    const result = await db.query(
      `SELECT COUNT(*) as count FROM cost_settings WHERE user_id IN (SELECT id FROM users WHERE company_name IN (SELECT company_name FROM companies WHERE id = ?))`,
      [companyId]
    ) as Array<{count: number}>;
    
    return result[0].count === 0;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return true; // Default to needing onboarding if error
  }
}