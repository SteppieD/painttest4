import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AuthUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_id: number;
  role: string;
  is_paying: boolean;
}

export interface AuthCompany {
  id: number;
  company_name: string;
  email: string;
  phone?: string;
  subscription_tier: string;
  monthly_quote_count: number;
  monthly_quote_limit: number;
}

export class AuthAdapter {
  /**
   * Sign in a user with email and password
   */
  static async signIn(email: string, password: string): Promise<{ user: AuthUser; company: AuthCompany }> {
    // Get user from auth.users
    const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !authUser.user) {
      throw new Error('Invalid email or password');
    }

    // Get company information
    const companyId = authUser.user.user_metadata.company_id;
    if (!companyId) {
      throw new Error('User not associated with a company');
    }

    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (companyError || !company) {
      throw new Error('Company not found');
    }

    const user: AuthUser = {
      id: authUser.user.id,
      email: authUser.user.email!,
      first_name: authUser.user.user_metadata.first_name,
      last_name: authUser.user.user_metadata.last_name,
      company_id: companyId,
      role: authUser.user.user_metadata.role || 'user',
      is_paying: company.subscription_tier !== 'free'
    };

    return { user, company };
  }

  /**
   * Register a new user with a company access code
   */
  static async register(
    email: string, 
    password: string, 
    accessCode: string,
    firstName?: string,
    lastName?: string
  ): Promise<{ user: AuthUser; company: AuthCompany }> {
    // First find the company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('access_code', accessCode)
      .single();

    if (companyError || !company) {
      throw new Error('Invalid company access code');
    }

    // Create the user
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_id: company.id,
          role: 'user',
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (authError || !authUser.user) {
      throw new Error('Failed to create user');
    }

    const user: AuthUser = {
      id: authUser.user.id,
      email: authUser.user.email!,
      first_name: firstName,
      last_name: lastName,
      company_id: company.id,
      role: 'user',
      is_paying: company.subscription_tier !== 'free'
    };

    return { user, company };
  }

  /**
   * Check if a user can create quotes
   */
  static async canCreateQuote(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('can_user_create_quote', { user_id: userId });

    return !error && data === true;
  }

  /**
   * Get user by ID with company info
   */
  static async getUser(userId: string): Promise<{ user: AuthUser; company: AuthCompany } | null> {
    const { data: authUser, error: userError } = await supabase.auth.admin.getUserById(userId);

    if (userError || !authUser.user) {
      return null;
    }

    const companyId = authUser.user.user_metadata.company_id;
    if (!companyId) {
      return null;
    }

    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (companyError || !company) {
      return null;
    }

    const user: AuthUser = {
      id: authUser.user.id,
      email: authUser.user.email!,
      first_name: authUser.user.user_metadata.first_name,
      last_name: authUser.user.user_metadata.last_name,
      company_id: companyId,
      role: authUser.user.user_metadata.role || 'user',
      is_paying: company.subscription_tier !== 'free'
    };

    return { user, company };
  }
}