import jwt from 'jsonwebtoken';
import { db } from '@/lib/database/adapter';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MAGIC_LINK_EXPIRY = 15 * 60 * 1000; // 15 minutes

interface MagicLinkPayload {
  email: string;
  companyId?: number;
  type: 'signup' | 'login';
  timestamp: number;
}

export async function generateMagicLink(email: string, type: 'signup' | 'login', companyId?: number): Promise<string> {
  const payload: MagicLinkPayload = {
    email,
    type,
    companyId,
    timestamp: Date.now()
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m'
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  return `${baseUrl}/auth/verify?token=${token}`;
}

export async function verifyMagicLink(token: string): Promise<{
  valid: boolean;
  email?: string;
  companyId?: number;
  type?: 'signup' | 'login';
  error?: string;
}> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as MagicLinkPayload;
    
    // Check if token is expired based on timestamp
    if (Date.now() - decoded.timestamp > MAGIC_LINK_EXPIRY) {
      return { valid: false, error: 'Magic link has expired' };
    }

    return {
      valid: true,
      email: decoded.email,
      companyId: decoded.companyId,
      type: decoded.type
    };
  } catch (error) {
    return { valid: false, error: 'Invalid magic link' };
  }
}

export async function createOrUpdateMagicLinkToken(email: string, token: string): Promise<void> {
  // Store the token in database for additional security (optional)
  // This allows us to invalidate tokens if needed
  try {
    await db.query(
      `INSERT INTO magic_link_tokens (email, token, created_at, expires_at) 
       VALUES (?, ?, datetime('now'), datetime('now', '+15 minutes'))
       ON CONFLICT(email) DO UPDATE SET 
       token = excluded.token,
       created_at = excluded.created_at,
       expires_at = excluded.expires_at`,
      [email, token]
    );
  } catch (error) {
    // If table doesn't exist, continue without storing
    console.log('Magic link tokens table not available');
  }
}

export async function invalidateMagicLink(token: string): Promise<void> {
  try {
    await db.query(
      'DELETE FROM magic_link_tokens WHERE token = ?',
      [token]
    );
  } catch (error) {
    // Silent fail if table doesn't exist
  }
}