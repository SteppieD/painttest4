// This file is only for local development and should not be imported in production
import Database from 'better-sqlite3';
import { initDatabase } from './init';
import type { DatabaseAdapter } from './adapter';

// SQLite adapter for local development only
export class SQLiteAdapter implements DatabaseAdapter {
  private db: Database.Database;

  constructor() {
    this.db = initDatabase();
  }

  async getCompanyByAccessCode(accessCode: string): Promise<any> {
    const stmt = this.db.prepare('SELECT * FROM companies WHERE access_code = ?');
    return stmt.get(accessCode);
  }

  async getCompany(id: number): Promise<any> {
    const stmt = this.db.prepare('SELECT * FROM companies WHERE id = ?');
    return stmt.get(id);
  }

  async getAllCompanies(): Promise<any[]> {
    const stmt = this.db.prepare('SELECT * FROM companies');
    return stmt.all();
  }

  async createCompany(data: any): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const stmt = this.db.prepare(
      `INSERT INTO companies (${keys.join(', ')}) VALUES (${placeholders})`
    );
    const result = stmt.run(...values);
    
    return this.db.prepare('SELECT * FROM companies WHERE id = ?').get(result.lastInsertRowid);
  }

  async updateCompany(id: number, data: any): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const stmt = this.db.prepare(
      `UPDATE companies SET ${setClause} WHERE id = ?`
    );
    stmt.run(...values, id);
    
    return this.db.prepare('SELECT * FROM companies WHERE id = ?').get(id);
  }

  async createQuote(data: any): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    console.log('[SQLiteAdapter] Creating quote with', keys.length, 'fields');
    
    try {
      const stmt = this.db.prepare(
        `INSERT INTO quotes (${keys.join(', ')}) VALUES (${placeholders})`
      );
      const result = stmt.run(...values);
      
      return this.db.prepare('SELECT * FROM quotes WHERE id = ?').get(result.lastInsertRowid);
    } catch (error) {
      console.error('[SQLiteAdapter] Error creating quote:', error);
      throw error;
    }
  }

  async getQuote(quoteId: string): Promise<any> {
    const stmt = this.db.prepare('SELECT * FROM quotes WHERE quote_id = ?');
    return stmt.get(quoteId);
  }

  async getQuotesByCompanyId(companyId: number): Promise<any[]> {
    const stmt = this.db.prepare('SELECT * FROM quotes WHERE company_id = ? ORDER BY created_at DESC');
    return stmt.all(companyId);
  }

  async getQuotesCount(companyId: number, since?: Date): Promise<number> {
    if (since) {
      const stmt = this.db.prepare('SELECT COUNT(*) as count FROM quotes WHERE company_id = ? AND created_at >= ?');
      const result = stmt.get(companyId, since.toISOString()) as { count: number };
      return result.count;
    } else {
      const stmt = this.db.prepare('SELECT COUNT(*) as count FROM quotes WHERE company_id = ?');
      const result = stmt.get(companyId) as { count: number };
      return result.count;
    }
  }

  async getAll(query: string, params: any[] = []): Promise<any[]> {
    const stmt = this.db.prepare(query);
    return stmt.all(...params);
  }

  async get(query: string, params: any[] = []): Promise<any> {
    const stmt = this.db.prepare(query);
    return stmt.get(...params);
  }

  async run(query: string, params: any[] = []): Promise<any> {
    const stmt = this.db.prepare(query);
    return stmt.run(...params);
  }

  async updateQuote(id: number, data: any): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const stmt = this.db.prepare(
      `UPDATE quotes SET ${setClause} WHERE id = ?`
    );
    stmt.run(...values, id);
    
    return this.db.prepare('SELECT * FROM quotes WHERE id = ?').get(id);
  }

  async createUser(data: any): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const stmt = this.db.prepare(
      `INSERT INTO users (${keys.join(', ')}) VALUES (${placeholders})`
    );
    const result = stmt.run(...values);
    
    return this.db.prepare('SELECT * FROM users WHERE rowid = ?').get(result.lastInsertRowid);
  }

  async getUserByEmail(email: string): Promise<any> {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  async getAllUsers(): Promise<any[]> {
    const stmt = this.db.prepare('SELECT * FROM users');
    return stmt.all();
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return this.db.prepare(sql).all(...params);
    } else {
      return this.db.prepare(sql).run(...params);
    }
  }
}