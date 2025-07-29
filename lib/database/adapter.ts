import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MemoryAdapter } from './memory-adapter';

// Database adapter interface
export interface DatabaseAdapter {
  // Company operations
  getCompanyByAccessCode(accessCode: string): Promise<any>;
  getCompany(id: number): Promise<any>;
  getAllCompanies(): Promise<any[]>;
  getCompanies?(): Promise<any[]>; // Alias for getAllCompanies
  createCompany(data: any): Promise<any>;
  updateCompany(id: number, data: any): Promise<any>;
  
  // Quote operations
  createQuote(data: any): Promise<any>;
  getQuote(quoteId: string): Promise<any>;
  getQuotesByCompanyId(companyId: number): Promise<any[]>;
  getQuotesCount(companyId: number, since?: Date): Promise<number>;
  updateQuote(id: number, data: any): Promise<any>;
  
  // User operations
  createUser(data: any): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  getAllUsers(): Promise<any[]>;
  
  // Generic query method
  query(sql: string, params?: any[]): Promise<any>;
  getAll(query: string, params?: any[]): Promise<any[]>;
}



// Supabase adapter for production
export class SupabaseAdapter implements DatabaseAdapter {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async getCompanyByAccessCode(accessCode: string): Promise<any> {
    try {
      const { data, error } = await this.client
        .from('companies')
        .select('*')
        .eq('access_code', accessCode)
        .single();

      if (error) {
        console.error('[SupabaseAdapter] Error fetching company:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('[SupabaseAdapter] getCompanyByAccessCode failed:', error);
      throw error;
    }
  }

  async getCompany(id: number): Promise<any> {
    const { data, error } = await this.client
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  }

  async getAllCompanies(): Promise<any[]> {
    const { data, error } = await this.client
      .from('companies')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async createCompany(data: any): Promise<any> {
    const { data: result, error } = await this.client
      .from('companies')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async updateCompany(id: number, data: any): Promise<any> {
    const { data: result, error } = await this.client
      .from('companies')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async createQuote(data: any): Promise<any> {
    try {
      console.log('[SupabaseAdapter] Creating quote with data:', {
        company_id: data.company_id,
        quote_id: data.quote_id,
        customer_name: data.customer_name
      });
      
      const { data: result, error } = await this.client
        .from('quotes')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('[SupabaseAdapter] Error creating quote:', error);
        console.error('[SupabaseAdapter] Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log('[SupabaseAdapter] Quote created successfully:', result?.id);
      return result;
    } catch (error) {
      console.error('[SupabaseAdapter] createQuote failed:', error);
      throw error;
    }
  }

  async getQuote(quoteId: string): Promise<any> {
    const { data, error } = await this.client
      .from('quotes')
      .select('*')
      .eq('quote_id', quoteId)
      .single();

    if (error) throw error;
    return data;
  }

  async getQuotesByCompanyId(companyId: number): Promise<any[]> {
    const { data, error } = await this.client
      .from('quotes')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getQuotesCount(companyId: number, since?: Date): Promise<number> {
    let query = this.client
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);

    if (since) {
      query = query.gte('created_at', since.toISOString());
    }

    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async updateQuote(id: number, data: any): Promise<any> {
    const { data: result, error } = await this.client
      .from('quotes')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async createUser(data: any): Promise<any> {
    const { data: result, error } = await this.client
      .from('users')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getUserByEmail(email: string): Promise<any> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  }

  async getAllUsers(): Promise<any[]> {
    const { data, error } = await this.client
      .from('users')
      .select('*');

    if (error) throw error;
    return data || [];
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    // For Supabase, we use RPC functions or direct table operations
    // This is a fallback for complex queries
    const { data, error } = await this.client.rpc('execute_sql', {
      query: sql,
      params: params
    });

    if (error) throw error;
    return data;
  }

  async getAll(query: string, params: any[] = []): Promise<any[]> {
    // This method is required by the interface but not typically used with Supabase
    // For Supabase, use the specific table methods instead
    return this.query(query, params);
  }
}

// Factory function to get the appropriate adapter
export function getDatabaseAdapter(): DatabaseAdapter {
  const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // Always prefer Supabase if it's configured
  if (hasSupabase) {
    console.log('Using Supabase database adapter');
    return new SupabaseAdapter();
  }

  // In production or serverless environments, use Memory adapter as fallback
  const isVercel = process.env.VERCEL === '1';
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isVercel || isProduction || typeof window !== 'undefined') {
    console.log('Using Memory database adapter for production/browser environment');
    return new MemoryAdapter();
  }

  // Only attempt SQLite in local development with Node.js
  if (process.env.DATABASE_TYPE === 'sqlite') {
    try {
      console.log('Attempting to use SQLite database adapter');
      // Use dynamic import instead of require to satisfy ESLint
      const sqliteModule = eval('require')('./sqlite-adapter');
      const { SQLiteAdapter } = sqliteModule;
      return new SQLiteAdapter();
    } catch (error) {
      console.warn('SQLite initialization failed, falling back to memory adapter:', error);
      return new MemoryAdapter();
    }
  }

  // Default to memory adapter
  console.log('Using Memory database adapter (default)');
  return new MemoryAdapter();
}

// Create a singleton instance with lazy initialization
let dbInstance: DatabaseAdapter | null = null;

export function getDb(): DatabaseAdapter {
  if (!dbInstance) {
    dbInstance = getDatabaseAdapter();
  }
  return dbInstance;
}

// Export the database instance
export const db = (() => {
  const instance = getDb();
  console.log('[DATABASE] Initialized adapter:', instance.constructor.name);
  return instance;
})();