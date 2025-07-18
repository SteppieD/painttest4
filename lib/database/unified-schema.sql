-- Unified SQL Schema for Paint Quote Platform
-- Combines the best features from painttest2's backend
-- Designed for SQLite development and Supabase production

-- Enable foreign key constraints (SQLite)
PRAGMA foreign_keys = ON;

-- =====================================================
-- CORE TABLES FROM PAINTTEST2 (Our Backend)
-- =====================================================

-- Companies table (from painttest2 - multi-tenant core)
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  access_code VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  logo_url VARCHAR(500),
  -- Default rates for quoting
  default_painting_rate DECIMAL(10,2) DEFAULT 2.50,
  default_priming_rate DECIMAL(10,2) DEFAULT 0.40,
  default_trim_rate DECIMAL(10,2) DEFAULT 1.92,
  default_door_rate DECIMAL(10,2) DEFAULT 100.00,
  default_window_rate DECIMAL(10,2) DEFAULT 25.00,
  -- Legacy rate columns (for backward compatibility)
  default_walls_rate DECIMAL(10,2) DEFAULT 2.50,
  default_ceilings_rate DECIMAL(10,2) DEFAULT 2.50,
  default_walls_paint_cost DECIMAL(10,2) DEFAULT 26.00,
  default_ceilings_paint_cost DECIMAL(10,2) DEFAULT 25.00,
  default_trim_paint_cost DECIMAL(10,2) DEFAULT 35.00,
  default_labor_percentage INTEGER DEFAULT 30,
  default_paint_coverage INTEGER DEFAULT 350,
  default_sundries_percentage INTEGER DEFAULT 12,
  tax_rate DECIMAL(10,2) DEFAULT 0,
  tax_on_materials_only BOOLEAN DEFAULT FALSE,
  tax_label VARCHAR(50) DEFAULT 'Tax',
  quote_limit INTEGER DEFAULT NULL,
  is_trial BOOLEAN DEFAULT FALSE,
  -- Additional settings columns
  address TEXT,
  website TEXT,
  license TEXT,
  overhead_percent DECIMAL(10,2) DEFAULT 15,
  profit_margin DECIMAL(10,2) DEFAULT 30,
  default_baseboard_rate DECIMAL(10,2) DEFAULT 2.50,
  default_crown_rate DECIMAL(10,2) DEFAULT 5.00,
  default_exterior_walls_rate DECIMAL(10,2) DEFAULT 4.50,
  default_fascia_rate DECIMAL(10,2) DEFAULT 6.00,
  default_soffits_rate DECIMAL(10,2) DEFAULT 5.00,
  default_exterior_door_rate DECIMAL(10,2) DEFAULT 150.00,
  default_exterior_window_rate DECIMAL(10,2) DEFAULT 100.00,
  default_hourly_rate DECIMAL(10,2) DEFAULT 45.00,
  default_overhead_multiplier DECIMAL(10,2) DEFAULT 1.35,
  productivity_walls DECIMAL(10,2) DEFAULT 150,
  productivity_ceilings DECIMAL(10,2) DEFAULT 100,
  productivity_baseboards DECIMAL(10,2) DEFAULT 60,
  productivity_doors DECIMAL(10,2) DEFAULT 2,
  productivity_windows DECIMAL(10,2) DEFAULT 3,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users table (simplified from painttest2)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Access codes table for multi-tenant access control
CREATE TABLE IF NOT EXISTS access_codes (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  code TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  uses_count INTEGER DEFAULT 0,
  max_uses INTEGER,
  expires_at DATETIME,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME,
  notes TEXT
);

-- Access code sessions for tracking user sessions
CREATE TABLE IF NOT EXISTS access_code_sessions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  access_code_id TEXT,
  user_id TEXT,
  session_data TEXT DEFAULT '{}', -- JSON stored as TEXT in SQLite
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME DEFAULT (datetime('now', '+7 days')),
  FOREIGN KEY (access_code_id) REFERENCES access_codes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User profiles with business information
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  company_name TEXT,
  phone TEXT,
  business_info TEXT DEFAULT '{}', -- JSON stored as TEXT
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cost settings per user/contractor
CREATE TABLE IF NOT EXISTS cost_settings (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL UNIQUE,
  labor_cost_per_hour DECIMAL DEFAULT 25,
  paint_costs TEXT DEFAULT '{"best": 50, "good": 25, "better": 35}', -- JSON
  supplies_base_cost DECIMAL DEFAULT 100,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  company_name TEXT,
  contact_name TEXT,
  default_labor_percentage DECIMAL DEFAULT 30,
  default_spread_rate DECIMAL DEFAULT 350,
  door_trim_pricing TEXT DEFAULT '{"door_unit_price": 100, "trim_linear_foot_price": 3}', -- JSON
  baseboard_pricing TEXT DEFAULT '{"charge_method": "linear_foot", "price_per_linear_foot": 2.5}', -- JSON
  default_rates TEXT DEFAULT '{"walls": 3.00, "ceilings": 2.00, "trim_doors": 5.00}', -- JSON
  default_paint_costs TEXT DEFAULT '{"walls": 26, "ceilings": 25, "trim_doors": 35}', -- JSON
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Projects - central hub for client work
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  property_address TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  client_email TEXT,
  client_phone TEXT,
  preferred_contact TEXT DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'either')),
  client_notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chat messages linked to projects
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  project_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata TEXT, -- JSON stored as TEXT
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Main quotes table (enhanced from painttest2)
CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  quote_id VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  address TEXT,
  project_type VARCHAR(100),
  rooms TEXT,
  paint_quality VARCHAR(100),
  prep_work TEXT,
  timeline VARCHAR(100),
  special_requests TEXT,
  walls_sqft INTEGER DEFAULT 0,
  ceilings_sqft INTEGER DEFAULT 0,
  trim_sqft INTEGER DEFAULT 0,
  doors_count INTEGER DEFAULT 0,
  windows_count INTEGER DEFAULT 0,
  priming_sqft INTEGER DEFAULT 0,
  painting_rate DECIMAL(10,2) DEFAULT 2.50,
  priming_rate DECIMAL(10,2) DEFAULT 0.40,
  trim_rate DECIMAL(10,2) DEFAULT 1.92,
  door_rate DECIMAL(10,2) DEFAULT 100.00,
  window_rate DECIMAL(10,2) DEFAULT 25.00,
  -- Legacy rate columns (for backward compatibility)
  walls_rate DECIMAL(10,2) DEFAULT 2.50,
  ceilings_rate DECIMAL(10,2) DEFAULT 2.50,
  walls_paint_cost DECIMAL(10,2) DEFAULT 26.00,
  ceilings_paint_cost DECIMAL(10,2) DEFAULT 25.00,
  trim_paint_cost DECIMAL(10,2) DEFAULT 35.00,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  total_materials DECIMAL(12,2) DEFAULT 0,
  paint_cost DECIMAL(12,2) DEFAULT 0,
  sundries_cost DECIMAL(12,2) DEFAULT 0,
  sundries_percentage INTEGER DEFAULT 12,
  projected_labor DECIMAL(12,2) DEFAULT 0,
  labor_percentage INTEGER DEFAULT 30,
  projected_profit DECIMAL(12,2) DEFAULT 0,
  paint_coverage INTEGER DEFAULT 350,
  tax_rate DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  subtotal DECIMAL(12,2) DEFAULT 0,
  base_cost DECIMAL(12,2),
  markup_percentage DECIMAL(10,2),
  final_price DECIMAL(12,2),
  room_data TEXT,
  room_count INTEGER,
  confirmed_rates TEXT, -- JSON storing rate confirmation details
  status VARCHAR(50) DEFAULT 'pending',
  conversation_summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Quote versioning for tracking changes
CREATE TABLE IF NOT EXISTS quote_versions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  quote_id TEXT,
  version INTEGER NOT NULL,
  base_costs TEXT, -- JSON
  markup_percentage INTEGER,
  final_price DECIMAL,
  details TEXT, -- JSON
  changes TEXT, -- JSON describing what changed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Paint products catalog
CREATE TABLE IF NOT EXISTS paint_products (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  use_case TEXT NOT NULL,
  cost_per_gallon DECIMAL NOT NULL,
  coverage_rate DECIMAL DEFAULT 350,
  sheen TEXT,
  is_preferred BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Company branding for professional quotes
CREATE TABLE IF NOT EXISTS company_branding (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  company_id TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3182ce',
  secondary_color TEXT DEFAULT '#2d3748',
  accent_color TEXT DEFAULT '#38a169',
  company_name TEXT NOT NULL,
  company_tagline TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SUBSCRIPTION & PAYMENT TABLES (from painttest2)
-- =====================================================

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  interval TEXT NOT NULL CHECK (interval IN ('monthly', 'yearly')),
  features TEXT, -- JSON array of features
  quote_limit INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  stripe_price_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Company subscriptions
CREATE TABLE IF NOT EXISTS company_subscriptions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  company_id INTEGER NOT NULL,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start DATETIME,
  current_period_end DATETIME,
  trial_end DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

-- Quote usage tracking
CREATE TABLE IF NOT EXISTS quote_usage (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  company_id INTEGER NOT NULL,
  quote_id VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_companies_access_code ON companies(access_code);
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_quotes_company_id ON quotes(company_id);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON quotes(quote_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_project_id ON chat_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_paint_products_user_id ON paint_products(user_id);
CREATE INDEX IF NOT EXISTS idx_company_subscriptions_company_id ON company_subscriptions(company_id);
CREATE INDEX IF NOT EXISTS idx_quote_usage_company_id ON quote_usage(company_id);

-- =====================================================
-- DEMO DATA
-- =====================================================

-- Insert demo companies
INSERT INTO companies (access_code, company_name, phone, email) VALUES
  ('DEMO2024', 'Demo Painting Company', '(555) 123-4567', 'demo@paintingcompany.com'),
  ('PAINTER001', 'Smith Painting LLC', '(555) 987-6543', 'info@smithpainting.com'),
  ('CONTRACTOR123', 'Elite Contractors', '(555) 456-7890', 'quotes@elitecontractors.com')
ON CONFLICT (access_code) DO NOTHING;

-- Insert subscription plans
INSERT INTO subscription_plans (id, name, price, interval, features, quote_limit) VALUES
  ('plan_free', 'Free Trial', 0, 'monthly', '["1 quote per month", "Basic features"]', 1),
  ('plan_professional', 'Professional', 79, 'monthly', '["Unlimited quotes", "AI assistance", "Email support"]', NULL),
  ('plan_business', 'Business', 149, 'monthly', '["Everything in Professional", "Priority support", "Custom branding"]', NULL)
ON CONFLICT (id) DO NOTHING;