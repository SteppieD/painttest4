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

// Default admin credentials (should be changed in production)
const DEFAULT_ADMIN = {
  email: 'admin@paintingapp.com',
  password: 'admin123',
  role: 'super_admin' as const
};

// JWT secret (should be in env vars)
const JWT_SECRET = process.env.JWT_SECRET || 'default-jwt-secret-change-in-production';

// Verify admin credentials
export async function verifyAdminCredentials(email: string, password: string): Promise<AdminUser | null> {
  try {
    // Check default admin first (for development)
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return {
        id: 'admin-default',
        email: DEFAULT_ADMIN.email,
        role: DEFAULT_ADMIN.role
      };
    }
    
    // Check database for admin users
    const user = await db.getUserByEmail(email);
    
    if (user && user.role === 'admin') {
      // In production, passwords should be hashed
      const isValid = await bcrypt.compare(password, user.password_hash);
      
      if (isValid) {
        return {
          id: user.id,
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
        role: decoded.role
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
      company_name: 'Admin'
    });
    
    return {
      id: user.id,
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