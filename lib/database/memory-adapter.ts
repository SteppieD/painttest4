import { DatabaseAdapter, Company, Quote, User, CreateCompanyData, CreateQuoteData, CreateUserData, UpdateCompanyData, UpdateQuoteData } from './adapter';
// In-memory storage for Vercel/serverless environments
interface CompanyData {
  id: number;
  access_code: string;
  company_name: string;
  [key: string]: unknown;
}

interface QuoteData {
  id: number;
  company_id: number;
  quote_id: string;
  [key: string]: unknown;
}

interface UserData {
  id: string;
  email: string;
  [key: string]: unknown;
}

const memoryStore = {
  companies: new Map<number, CompanyData>(),
  quotes: new Map<number, QuoteData>(),
  users: new Map<string, UserData>(),
  quoteCounter: 1000,
  initialized: false
};

// Initialize with demo data
function initializeMemoryStore() {
  if (memoryStore.initialized) return;
  
  // Add demo company
  memoryStore.companies.set(1, {
    id: 1,
    access_code: 'DEMO2024',
    company_name: 'Demo Painting Company',
    name: 'Demo Painting Company',
    phone: '(555) 123-4567',
    email: 'demo@paintingcompany.com',
    tax_rate: 0,
    onboarding_completed: false,
    onboarding_step: 0,
    subscription_tier: 'free',
    monthly_quote_count: 0,
    monthly_quote_limit: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  
  memoryStore.initialized = true;
  console.log('[MemoryAdapter] Initialized with demo data');
}

// Memory adapter for serverless environments
export class MemoryAdapter implements DatabaseAdapter {
  constructor() {
    initializeMemoryStore();
  }

  async getCompanyByAccessCode(accessCode: string): Promise<Company | null> {
    for (const company of memoryStore.companies.values()) {
      if (company.access_code === accessCode) {
        return company as unknown as unknown as Company;
      }
    }
    return null;
  }

  async getCompany(id: number): Promise<Company | null> {
    const company = memoryStore.companies.get(id);
    return company ? (company as unknown as unknown as Company) : null;
  }

  async getAllCompanies(): Promise<Company[]> {
    return Array.from(memoryStore.companies.values()) as unknown as Company[];
  }

  // Alias for compatibility
  async getCompanies(): Promise<Company[]> {
    return this.getAllCompanies();
  }

  async createCompany(data: CreateCompanyData): Promise<Company> {
    // Use provided ID if it exists, otherwise generate new one
    const id = (data as any).id || Math.max(...Array.from(memoryStore.companies.keys()), 0) + 1;
    const company = {
      ...data,
      id,
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      // Ensure all required fields have defaults
      tax_rate: data.tax_rate || 0,
      onboarding_completed: data.onboarding_completed || false,
      onboarding_step: data.onboarding_step || 0,
      subscription_tier: data.subscription_tier || 'free',
      monthly_quote_count: data.monthly_quote_count || 0,
      monthly_quote_limit: data.monthly_quote_limit || 5
    };
    memoryStore.companies.set(id, company);
    console.log('[MemoryAdapter] Company created:', { id, access_code: company.access_code });
    return company as unknown as Company;
  }

  async updateCompany(id: number, data: UpdateCompanyData): Promise<Company> {
    let existing = memoryStore.companies.get(id);
    
    // If company doesn't exist, create it first (for onboarding flow)
    if (!existing) {
      console.log(`[MemoryAdapter] Company ${id} not found, creating it with provided data`);
      existing = {
        id,
        access_code: `TEMP_${id}`,
        company_name: data.company_name || 'Unknown Company',
        email: data.email || '',
        phone: data.phone || '',
        created_at: new Date().toISOString(),
        onboarding_completed: false,
        onboarding_step: 0,
        tax_rate: 0,
        subscription_tier: 'free',
        monthly_quote_count: 0,
        monthly_quote_limit: 5
      };
      memoryStore.companies.set(id, existing);
    }
    
    const updated = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString()
    };
    memoryStore.companies.set(id, updated);
    return updated as unknown as Company;
  }

  async createQuote(data: CreateQuoteData): Promise<Quote> {
    const id = memoryStore.quotes.size + 1;
    const quote = {
      ...data,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    memoryStore.quotes.set(id, quote);
    console.log('[MemoryAdapter] Quote created:', quote);
    return quote as unknown as Quote;
  }

  async getQuote(quoteId: string): Promise<Quote | null> {
    for (const quote of memoryStore.quotes.values()) {
      if (quote.quote_id === quoteId) {
        return quote as unknown as Quote;
      }
    }
    return null;
  }

  async getQuotes(companyId: number): Promise<Quote[]> {
    return this.getQuotesByCompanyId(companyId);
  }

  async getQuotesByCompanyId(companyId: number): Promise<Quote[]> {
    const quotes = [];
    for (const quote of memoryStore.quotes.values()) {
      if (quote.company_id === companyId) {
        quotes.push(quote);
      }
    }
    return quotes.sort((a, b) => 
      new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime()
    ) as unknown as Quote[];
  }

  async getQuotesCount(companyId: number, since?: Date): Promise<number> {
    let count = 0;
    for (const quote of memoryStore.quotes.values()) {
      if (quote.company_id === companyId) {
        if (!since || new Date(quote.created_at as string) >= since) {
          count++;
        }
      }
    }
    return count;
  }

  async updateQuote(id: number, data: UpdateQuoteData): Promise<Quote> {
    const existing = memoryStore.quotes.get(id);
    if (!existing) throw new Error('Quote not found');
    
    const updated = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString()
    };
    memoryStore.quotes.set(id, updated);
    return updated as unknown as Quote;
  }

  async createUser(data: CreateUserData): Promise<User> {
    const id = (data as any).id || `user_${Date.now()}`;
    const user = {
      ...data,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    memoryStore.users.set(id, user);
    return user as unknown as User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of memoryStore.users.values()) {
      if (user.email === email) {
        return user as unknown as User;
      }
    }
    return null;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(memoryStore.users.values()) as unknown as User[];
  }

  async query(sql: string, params?: unknown[]): Promise<unknown> {
    console.warn('[MemoryAdapter] Raw SQL queries not supported in memory mode');
    return [];
  }

  async getAll(query: string, params?: unknown[]): Promise<unknown[]> {
    console.warn('[MemoryAdapter] Raw SQL queries not supported in memory mode');
    return [];
  }
}