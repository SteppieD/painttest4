-- N8N Integration Database Setup
-- Run this in your Supabase SQL editor

-- 1. Create table for N8N workflow logs
CREATE TABLE IF NOT EXISTS n8n_workflow_logs (
  id SERIAL PRIMARY KEY,
  workflow_type VARCHAR(100) NOT NULL,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  payload JSONB,
  status VARCHAR(50) DEFAULT 'triggered',
  error_message TEXT,
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX idx_n8n_logs_company_id ON n8n_workflow_logs(company_id);
CREATE INDEX idx_n8n_logs_workflow_type ON n8n_workflow_logs(workflow_type);
CREATE INDEX idx_n8n_logs_status ON n8n_workflow_logs(status);
CREATE INDEX idx_n8n_logs_triggered_at ON n8n_workflow_logs(triggered_at DESC);

-- 3. Create email event tracking table
CREATE TABLE IF NOT EXISTS email_events (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  triggered_by VARCHAR(50),
  stripe_event_id VARCHAR(255),
  invoice_id VARCHAR(255),
  quote_id INTEGER REFERENCES quotes(id),
  n8n_workflow_id INTEGER REFERENCES n8n_workflow_logs(id),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  bounced_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create indexes for email events
CREATE INDEX idx_email_events_company_id ON email_events(company_id);
CREATE INDEX idx_email_events_email_type ON email_events(email_type);
CREATE INDEX idx_email_events_recipient ON email_events(recipient_email);
CREATE INDEX idx_email_events_status ON email_events(status);
CREATE INDEX idx_email_events_sent_at ON email_events(sent_at DESC);

-- 5. Create email preferences table
CREATE TABLE IF NOT EXISTS email_preferences (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_notifications BOOLEAN DEFAULT TRUE,
  payment_reminders BOOLEAN DEFAULT TRUE,
  billing_alerts BOOLEAN DEFAULT TRUE,
  subscription_updates BOOLEAN DEFAULT TRUE,
  quote_notifications BOOLEAN DEFAULT TRUE,
  marketing_emails BOOLEAN DEFAULT TRUE,
  weekly_reports BOOLEAN DEFAULT FALSE,
  monthly_reports BOOLEAN DEFAULT TRUE,
  usage_alerts BOOLEAN DEFAULT TRUE,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create subscription event history table
CREATE TABLE IF NOT EXISTS subscription_events (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255),
  stripe_event_id VARCHAR(255) UNIQUE,
  event_type VARCHAR(50) NOT NULL,
  previous_status VARCHAR(50),
  new_status VARCHAR(50),
  previous_plan VARCHAR(50),
  new_plan VARCHAR(50),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create indexes for subscription events
CREATE INDEX idx_subscription_events_company_id ON subscription_events(company_id);
CREATE INDEX idx_subscription_events_stripe_id ON subscription_events(stripe_subscription_id);
CREATE INDEX idx_subscription_events_type ON subscription_events(event_type);
CREATE INDEX idx_subscription_events_created_at ON subscription_events(created_at DESC);

-- 8. Create webhook deduplication table
CREATE TABLE IF NOT EXISTS webhook_events (
  id SERIAL PRIMARY KEY,
  stripe_event_id VARCHAR(255) UNIQUE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  raw_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Create index for webhook deduplication
CREATE INDEX idx_webhook_events_stripe_id ON webhook_events(stripe_event_id);
CREATE INDEX idx_webhook_events_processed_at ON webhook_events(processed_at DESC);

-- 10. Add N8N related columns to companies table if they don't exist
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS n8n_customer_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS email_preferences_id INTEGER REFERENCES email_preferences(id),
ADD COLUMN IF NOT EXISTS last_n8n_sync TIMESTAMPTZ;

-- 11. Create function to auto-create email preferences for new companies
CREATE OR REPLACE FUNCTION create_default_email_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO email_preferences (company_id)
  VALUES (NEW.id)
  ON CONFLICT (company_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create trigger for new companies
DROP TRIGGER IF EXISTS create_email_preferences_trigger ON companies;
CREATE TRIGGER create_email_preferences_trigger
AFTER INSERT ON companies
FOR EACH ROW
EXECUTE FUNCTION create_default_email_preferences();

-- 13. Create email preferences for existing companies
INSERT INTO email_preferences (company_id)
SELECT id FROM companies
ON CONFLICT (company_id) DO NOTHING;

-- 14. Create function to check webhook deduplication
CREATE OR REPLACE FUNCTION is_duplicate_webhook(event_id VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  exists_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO exists_count
  FROM webhook_events
  WHERE stripe_event_id = event_id;
  
  RETURN exists_count > 0;
END;
$$ LANGUAGE plpgsql;

-- 15. Create function to record webhook event
CREATE OR REPLACE FUNCTION record_webhook_event(
  event_id VARCHAR,
  event_type VARCHAR,
  payload JSONB
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO webhook_events (stripe_event_id, event_type, raw_payload)
  VALUES (event_id, event_type, payload)
  ON CONFLICT (stripe_event_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 16. Grant necessary permissions
GRANT ALL ON n8n_workflow_logs TO authenticated;
GRANT ALL ON email_events TO authenticated;
GRANT ALL ON email_preferences TO authenticated;
GRANT ALL ON subscription_events TO authenticated;
GRANT ALL ON webhook_events TO authenticated;

GRANT USAGE ON SEQUENCE n8n_workflow_logs_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE email_events_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE email_preferences_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE subscription_events_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE webhook_events_id_seq TO authenticated;

-- 17. Create view for email analytics
CREATE OR REPLACE VIEW email_analytics AS
SELECT 
  c.company_name,
  ee.email_type,
  COUNT(*) as total_sent,
  COUNT(ee.opened_at) as total_opened,
  COUNT(ee.clicked_at) as total_clicked,
  COUNT(ee.bounced_at) as total_bounced,
  COUNT(ee.unsubscribed_at) as total_unsubscribed,
  ROUND(COUNT(ee.opened_at)::NUMERIC / NULLIF(COUNT(*), 0) * 100, 2) as open_rate,
  ROUND(COUNT(ee.clicked_at)::NUMERIC / NULLIF(COUNT(ee.opened_at), 0) * 100, 2) as click_through_rate,
  DATE_TRUNC('month', ee.sent_at) as month
FROM email_events ee
JOIN companies c ON c.id = ee.company_id
WHERE ee.status = 'sent'
GROUP BY c.company_name, ee.email_type, DATE_TRUNC('month', ee.sent_at)
ORDER BY month DESC, c.company_name;

-- 18. Create view for subscription health
CREATE OR REPLACE VIEW subscription_health AS
SELECT 
  c.company_name,
  c.subscription_tier,
  COUNT(DISTINCT se.id) as total_events,
  MAX(se.created_at) as last_event,
  COUNT(CASE WHEN se.event_type = 'payment_failed' THEN 1 END) as failed_payments,
  COUNT(CASE WHEN se.event_type = 'payment_succeeded' THEN 1 END) as successful_payments,
  CASE 
    WHEN COUNT(CASE WHEN se.event_type = 'payment_failed' THEN 1 END) > 2 THEN 'At Risk'
    WHEN c.subscription_tier = 'free' THEN 'Free Tier'
    ELSE 'Healthy'
  END as health_status
FROM companies c
LEFT JOIN subscription_events se ON se.company_id = c.id
GROUP BY c.id, c.company_name, c.subscription_tier;

-- Success message
SELECT 'N8N Integration database setup completed successfully!' as status;