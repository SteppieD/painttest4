-- Add subscription and pricing fields to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS monthly_quote_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS monthly_quote_limit INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS last_quote_reset TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS subscription_started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255);

-- Add response time tracking to quotes table
ALTER TABLE quotes
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS viewed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS response_time_hours INTEGER,
ADD COLUMN IF NOT EXISTS follow_up_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_follow_up_at TIMESTAMPTZ;

-- Create subscription_events table for tracking changes
CREATE TABLE IF NOT EXISTS subscription_events (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  event_type VARCHAR(50) NOT NULL,
  from_tier VARCHAR(50),
  to_tier VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create quote_analytics table for tracking performance
CREATE TABLE IF NOT EXISTS quote_analytics (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  month DATE NOT NULL,
  quotes_created INTEGER DEFAULT 0,
  quotes_sent INTEGER DEFAULT 0,
  quotes_viewed INTEGER DEFAULT 0,
  quotes_accepted INTEGER DEFAULT 0,
  avg_response_time_hours NUMERIC(10,2),
  total_value NUMERIC(10,2) DEFAULT 0,
  won_value NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, month)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_companies_subscription_tier ON companies(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_companies_monthly_quote_count ON companies(monthly_quote_count);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_company_status ON quotes(company_id, status);
CREATE INDEX IF NOT EXISTS idx_quote_analytics_company_month ON quote_analytics(company_id, month);