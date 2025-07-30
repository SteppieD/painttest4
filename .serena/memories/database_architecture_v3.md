# PaintQuote Pro Database Architecture

## Database Strategy
- **Development**: SQLite (better-sqlite3)
- **Production**: Supabase (PostgreSQL)
- **Adapter Pattern**: Unified interface for both databases

## Core Tables

### Multi-Tenant Foundation
1. **companies** - Master tenant table
   - Access codes for authentication
   - Default rates and pricing settings
   - Subscription tracking
   - Tax configuration
   - Productivity metrics
   - Onboarding status

2. **users** - User accounts
   - Email-based authentication
   - UUID primary keys
   - Company association

3. **access_codes** - Multi-tenant access control
   - Unique codes per company
   - Usage tracking and limits
   - Expiration support

4. **access_code_sessions** - Session management
   - JWT session tracking
   - 7-day default expiration

### Quote Management
1. **quotes** - Main quotes table
   - Comprehensive pricing fields
   - Room and measurement data
   - Status tracking (pending, sent, viewed, accepted)
   - Response time analytics
   - Tax calculations
   - Legacy rate columns for backward compatibility

2. **quote_versions** - Quote change tracking
   - Version history
   - Change descriptions
   - Pricing evolution

3. **quote_usage** - Usage tracking
   - Monthly quota enforcement
   - Analytics data

### Customer & Project Management
1. **projects** - Client project hub
   - Customer information
   - Property addresses
   - Contact preferences

2. **chat_messages** - AI chat history
   - Project-linked conversations
   - Role-based messages (user/assistant)
   - Metadata support

### Configuration & Settings
1. **profiles** - User business profiles
   - Company information
   - Business metadata (JSON)

2. **cost_settings** - Contractor pricing
   - Labor rates
   - Paint costs (JSON)
   - Default spreads and markups

3. **paint_products** - Product catalog
   - Cost per gallon
   - Coverage rates
   - Preferred products

4. **company_branding** - White-label support
   - Logo URLs
   - Brand colors
   - Custom taglines

### Subscription & Billing
1. **subscription_plans** - Available plans
   - Pricing tiers
   - Feature sets (JSON)
   - Quote limits
   - Stripe integration

2. **company_subscriptions** - Active subscriptions
   - Status tracking
   - Billing periods
   - Trial support

## Key Features
- Foreign key constraints enabled
- Comprehensive indexes for performance
- JSON data stored as TEXT for SQLite compatibility
- UUID generation for cross-database compatibility
- Timestamp tracking on all tables
- Demo data included for testing

## Index Strategy
- Access codes for authentication lookup
- Company IDs for multi-tenant queries
- Quote IDs for quick access
- Status fields for filtering
- Created dates for sorting
- User IDs for ownership queries