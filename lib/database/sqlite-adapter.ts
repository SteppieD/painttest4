// This file is only for local development and should not be imported in production
import Database from 'better-sqlite3';
import { initDatabase } from './init';
import type { DatabaseAdapter, Company, Quote, User, CreateCompanyData, CreateQuoteData, CreateUserData, UpdateCompanyData, UpdateQuoteData } from './adapter';

// SQLite adapter for local development only
export class SQLiteAdapter implements DatabaseAdapter {
  private db: Database.Database;

  constructor() {
    this.db = initDatabase();
  }

  async getCompanyByAccessCode(accessCode: string): Promise<Company | null> {
    const stmt = this.db.prepare('SELECT * FROM companies WHERE access_code = ?');
    const result = stmt.get(accessCode);
    return result ? result as unknown as Company : null;
  }

  async getCompany(id: number): Promise<Company | null> {
    const stmt = this.db.prepare('SELECT * FROM companies WHERE id = ?');
    const result = stmt.get(id);
    return result ? result as unknown as Company : null;
  }

  async getAllCompanies(): Promise<Company[]> {
    const stmt = this.db.prepare('SELECT * FROM companies');
    return stmt.all() as unknown as Company[];
  }

  async createCompany(data: CreateCompanyData): Promise<Company> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const stmt = this.db.prepare(
      `INSERT INTO companies (${keys.join(', ')}) VALUES (${placeholders})`
    );
    const result = stmt.run(...values);
    
    return this.db.prepare('SELECT * FROM companies WHERE id = ?').get(result.lastInsertRowid) as unknown as Company;
  }

  async updateCompany(id: number, data: UpdateCompanyData): Promise<Company> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const stmt = this.db.prepare(
      `UPDATE companies SET ${setClause} WHERE id = ?`
    );
    stmt.run(...values, id);
    
    return this.db.prepare('SELECT * FROM companies WHERE id = ?').get(id) as unknown as Company;
  }

  async createQuote(data: CreateQuoteData): Promise<Quote> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    console.log('[SQLiteAdapter] Creating quote with', keys.length, 'fields');
    
    try {
      const stmt = this.db.prepare(
        `INSERT INTO quotes (${keys.join(', ')}) VALUES (${placeholders})`
      );
      const result = stmt.run(...values);
      
      return this.db.prepare('SELECT * FROM quotes WHERE id = ?').get(result.lastInsertRowid) as unknown as Quote;
    } catch (error) {
      console.error('[SQLiteAdapter] Error creating quote:', error);
      throw error;
    }
  }

  async getQuote(quoteId: string): Promise<Quote | null> {
    const stmt = this.db.prepare('SELECT * FROM quotes WHERE quote_id = ?');
    const result = stmt.get(quoteId);
    return result ? result as unknown as Quote : null;
  }

  async getQuotes(companyId: number): Promise<Quote[]> {
    return this.getQuotesByCompanyId(companyId);
  }

  async getQuotesByCompanyId(companyId: number): Promise<Quote[]> {
    const stmt = this.db.prepare('SELECT * FROM quotes WHERE company_id = ? ORDER BY created_at DESC');
    return stmt.all(companyId) as unknown as Quote[];
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

  async getAll(query: string, params: unknown[] = []): Promise<Record<string, unknown>[]> {
    const stmt = this.db.prepare(query);
    return stmt.all(...params) as Record<string, unknown>[];
  }

  async get(query: string, params: unknown[] = []): Promise<unknown> {
    const stmt = this.db.prepare(query);
    return stmt.get(...params);
  }

  async run(query: string, params: unknown[] = []): Promise<unknown> {
    const stmt = this.db.prepare(query);
    return stmt.run(...params);
  }

  async updateQuote(id: number, data: UpdateQuoteData): Promise<Quote> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const stmt = this.db.prepare(
      `UPDATE quotes SET ${setClause} WHERE id = ?`
    );
    stmt.run(...values, id);
    
    return this.db.prepare('SELECT * FROM quotes WHERE id = ?').get(id) as unknown as Quote;
  }

  async createUser(data: CreateUserData): Promise<User> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const stmt = this.db.prepare(
      `INSERT INTO users (${keys.join(', ')}) VALUES (${placeholders})`
    );
    const result = stmt.run(...values);
    
    return this.db.prepare('SELECT * FROM users WHERE rowid = ?').get(result.lastInsertRowid) as unknown as User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    const result = stmt.get(email);
    return result ? result as unknown as User : null;
  }

  async getAllUsers(): Promise<User[]> {
    const stmt = this.db.prepare('SELECT * FROM users');
    return stmt.all() as unknown as User[];
  }

  async query(sql: string, params: unknown[] = []): Promise<unknown> {
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return this.db.prepare(sql).all(...params);
    } else {
      return this.db.prepare(sql).run(...params);
    }
  }
}