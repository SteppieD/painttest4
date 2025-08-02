// Simple session management without complex database joins
import crypto from 'crypto';

// In-memory session store for development
interface SessionData {
  companyId: number;
  companyData: unknown;
  createdAt: Date;
  expiresAt: Date;
}

const sessions = new Map<string, SessionData>();

export function createSimpleSession(companyId: number, companyData: unknown): string {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  
  sessions.set(sessionId, {
    companyId,
    companyData,
    createdAt: new Date(),
    expiresAt
  });
  
  return sessionId;
}

export function validateSimpleSession(sessionId: string): unknown {
  const session = sessions.get(sessionId);
  if (!session) return null;
  
  if (new Date() > session.expiresAt) {
    sessions.delete(sessionId);
    return null;
  }
  
  return session;
}

export function deleteSimpleSession(sessionId: string): void {
  sessions.delete(sessionId);
}