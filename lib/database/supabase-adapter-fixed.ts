import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseAdapter, Company, Quote, User, CreateCompanyData, CreateQuoteData, CreateUserData, UpdateCompanyData, UpdateQuoteData } from './adapter';

/**
 * Fixed Supabase adapter that doesn't rely on execute_sql RPC function
 * Uses Supabase's native query builder for all operations
 */
export class SupabaseAdapterFixed implements DatabaseAdapter {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  // Company operations
  async getCompanyByAccessCode(accessCode: string): Promise<Company | null> {
    try {
      const { data, error } = await this.client
        .from('companies')
        .select('*')
        .eq('access_code', accessCode)
        .single();

      if (error) {
        console.error('[SupabaseAdapterFixed] Error fetching company:', error);
        return null;
      }
      return data as Company;
    } catch (error) {
      console.error('[SupabaseAdapterFixed] getCompanyByAccessCode failed:', error);
      return null;
    }
  }

  async getCompany(id: number): Promise<Company | null> {
    const { data, error } = await this.client
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data as Company | null;
  }

  async getAllCompanies(): Promise<Company[]> {
    const { data, error } = await this.client
      .from('companies')
      .select('*')
      .order('company_name');

    if (error) throw error;
    return (data as Company[]) || [];
  }

  // Alias for getAllCompanies
  async getCompanies(): Promise<Company[]> {
    return this.getAllCompanies();
  }

  async createCompany(data: CreateCompanyData): Promise<Company> {
    const { data: result, error } = await this.client
      .from('companies')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as Company;
  }

  async updateCompany(id: number, data: UpdateCompanyData): Promise<Company> {
    const { data: result, error } = await this.client
      .from('companies')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result as Company;
  }

  // Quote operations
  async createQuote(data: CreateQuoteData): Promise<Quote> {
    try {
      console.log('[SupabaseAdapterFixed] Creating quote with data:', {
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
        console.error('[SupabaseAdapterFixed] Error creating quote:', error);
        throw error;
      }
      
      console.log('[SupabaseAdapterFixed] Quote created successfully:', result?.id);
      return result as Quote;
    } catch (error) {
      console.error('[SupabaseAdapterFixed] createQuote failed:', error);
      throw error;
    }
  }

  async getQuote(quoteId: string): Promise<Quote | null> {
    const { data, error } = await this.client
      .from('quotes')
      .select('*')
      .eq('quote_id', quoteId)
      .single();

    if (error) throw error;
    return data as Quote | null;
  }

  async getQuotes(companyId: number): Promise<Quote[]> {
    return this.getQuotesByCompanyId(companyId);
  }

  async getQuotesByCompanyId(companyId: number): Promise<Quote[]> {
    const { data, error } = await this.client
      .from('quotes')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as Quote[]) || [];
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

  async updateQuote(id: number, data: UpdateQuoteData): Promise<Quote> {
    const { data: result, error } = await this.client
      .from('quotes')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result as Quote;
  }

  // User operations
  async createUser(data: CreateUserData): Promise<User> {
    const { data: result, error } = await this.client
      .from('users')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data as User | null;
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await this.client
      .from('users')
      .select('*');

    if (error) throw error;
    return (data as User[]) || [];
  }

  // Paint products operations (new methods to avoid raw SQL)
  async getPaintProductsByUserId(userId: string): Promise<Record<string, unknown>[]> {
    const { data, error } = await this.client
      .from('paint_products')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('use_case')
      .order('product_name');

    if (error) {
      console.error('[SupabaseAdapterFixed] Error fetching paint products:', error);
      // Return empty array instead of throwing to prevent chat flow from breaking
      return [];
    }
    return data || [];
  }

  async getPaintProductsByCompanyId(companyId: number): Promise<Record<string, unknown>[]> {
    try {
      // Use the RPC function we created in the migration
      const { data, error } = await this.client
        .rpc('get_company_paint_products', { p_company_id: companyId });

      if (error) {
        console.error('[SupabaseAdapterFixed] Error fetching company paint products:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('[SupabaseAdapterFixed] getPaintProductsByCompanyId failed:', error);
      return [];
    }
  }

  async getUserByCompanyName(companyName: string): Promise<User | null> {
    try {
      // Use the RPC function we created in the migration
      const { data, error } = await this.client
        .rpc('get_user_by_company_name', { p_company_name: companyName });

      if (error) {
        console.error('[SupabaseAdapterFixed] Error fetching user by company name:', error);
        return null;
      }
      return (data?.[0] as User) || null;
    } catch (error) {
      console.error('[SupabaseAdapterFixed] getUserByCompanyName failed:', error);
      return null;
    }
  }

  async createPaintProduct(data: Record<string, unknown>): Promise<unknown> {
    const { data: result, error } = await this.client
      .from('paint_products')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async updatePaintProduct(id: string, data: Record<string, unknown>): Promise<unknown> {
    const { data: result, error } = await this.client
      .from('paint_products')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async deletePaintProduct(id: string, userId: string): Promise<unknown> {
    const { error } = await this.client
      .from('paint_products')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  }

  // Subscription operations
  async getCompanySubscription(companyId: number): Promise<unknown> {
    const { data, error } = await this.client
      .from('company_subscriptions')
      .select('*, subscription_plans(*)')
      .eq('company_id', companyId)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createQuoteUsage(companyId: number, quoteId: string): Promise<unknown> {
    const { data, error } = await this.client
      .from('quote_usage')
      .insert({ company_id: companyId, quote_id: quoteId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getQuoteUsageCount(companyId: number, since: Date): Promise<number> {
    const { count, error } = await this.client
      .from('quote_usage')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId)
      .gte('created_at', since.toISOString());

    if (error) throw error;
    return count || 0;
  }

  // These methods throw errors to force migration to Supabase-specific methods
  async query(sql: string, params?: unknown[]): Promise<unknown> {
    console.error('[SupabaseAdapterFixed] Raw SQL query attempted:', sql);
    throw new Error(
      'Raw SQL queries are not supported with Supabase. ' +
      'Please use Supabase-specific methods or create an RPC function. ' +
      `Query attempted: ${sql}`
    );
  }

  async getAll(query: string, params?: unknown[]): Promise<Record<string, unknown>[]> {
    console.error('[SupabaseAdapterFixed] Raw SQL query attempted:', query);
    throw new Error(
      'Raw SQL queries are not supported with Supabase. ' +
      'Please use Supabase-specific methods or create an RPC function. ' +
      `Query attempted: ${query}`
    );
  }
}