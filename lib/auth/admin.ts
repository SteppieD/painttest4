import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database/adapter';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export interface AdminSession {
  token: string;
  user: AdminUser;
}

// Admin credentials now handled via proper user creation only

// JWT secret validation helper
function getJWTSecret(): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return JWT_SECRET;
}

// Verify admin credentials
export async function verifyAdminCredentials(email: string, password: string): Promise<AdminUser | null> {
  try {
    // Check database for admin users only - no hardcoded credentials
    const user = await db.getUserByEmail(email);
    
    if (user && user.role === 'admin') {
      // In production, passwords should be hashed
      const isValid = await bcrypt.compare(password, user.password_hash);
      
      if (isValid) {
        return {
          id: user.id?.toString() || '',
          email: user.email,
          role: user.role
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return null;
  }
}

// Create admin session token
export function createAdminToken(user: AdminUser): string {
  const JWT_SECRET = getJWTSecret();
  
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      type: 'admin'
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify admin token
export function verifyAdminToken(token: string): AdminUser | null {
  try {
    const JWT_SECRET = getJWTSecret();
    
    interface JWTPayload {
      id: string;
      email: string;
      role: string;
      type: string;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    if (decoded.type === 'admin') {
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role as 'admin' | 'super_admin'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

// Create admin user (for setup)
export async function createAdminUser(email: string, password: string): Promise<AdminUser | null> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await db.createUser({
      email,
      password_hash: hashedPassword,
      role: 'admin',
      company_id: 0, // Admin users don't belong to a specific company
    });
    
    return {
      id: user.id?.toString() || '',
      email: user.email,
      role: 'admin'
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return null;
  }
}

// Middleware helper to check admin auth
export async function requireAdmin(request: Request): Promise<AdminUser | null> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  return verifyAdminToken(token);
}