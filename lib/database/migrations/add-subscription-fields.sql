-- Add subscription and tracking fields to companies table
ALTER TABLE companies ADD COLUMN subscription_tier VARCHAR(50) DEFAULT 'free';
ALTER TABLE companies ADD COLUMN subscription_status VARCHAR(50) DEFAULT 'active';
ALTER TABLE companies ADD COLUMN monthly_quote_count INTEGER DEFAULT 0;
ALTER TABLE companies ADD COLUMN monthly_quote_limit INTEGER DEFAULT 5;
ALTER TABLE companies ADD COLUMN last_quote_reset DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE companies ADD COLUMN subscription_started_at DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE companies ADD COLUMN trial_ends_at DATETIME;
ALTER TABLE companies ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE companies ADD COLUMN stripe_subscription_id VARCHAR(255);

-- Add response time tracking to quotes table
ALTER TABLE quotes ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE quotes ADD COLUMN sent_at DATETIME;
ALTER TABLE quotes ADD COLUMN viewed_at DATETIME;
ALTER TABLE quotes ADD COLUMN accepted_at DATETIME;
ALTER TABLE quotes ADD COLUMN response_time_hours INTEGER;
ALTER TABLE quotes ADD COLUMN follow_up_count INTEGER DEFAULT 0;
ALTER TABLE quotes ADD COLUMN last_follow_up_at DATETIME;