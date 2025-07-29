# PaintTest4 Database Architecture

## Database System
- **Primary**: Supabase (PostgreSQL)
- **Alternative**: SQLite (local development)
- **Pattern**: Database Adapter pattern for flexibility

## Core Tables

### companies
- **id**: Serial primary key
- **access_code**: Unique company identifier (VARCHAR(50))
- **company_name**: Company name (VARCHAR(255))
- **name**: Alias for company_name (compatibility)
- **phone**: Contact phone (VARCHAR(50))
- **email**: Contact email (VARCHAR(255))
- **logo_url**: Company logo URL (VARCHAR(500))
- **created_at**: Timestamp
- **updated_at**: Timestamp

### quotes
Primary table for paint quote data:
- **id**: Serial primary key
- **company_id**: Foreign key to companies
- **quote_id**: Unique quote identifier (VARCHAR(50))
- **Customer fields**: name, email, phone, address
- **Project details**: type, rooms, paint_quality, timeline, special_requests
- **Measurements**: walls_sqft, ceilings_sqft, trim_sqft, doors_count, windows_count
- **Rates**: Various pricing rates for different surfaces
- **Costs**: paint costs, materials, labor, profit calculations
- **Financial**: subtotal, tax_rate, tax_amount, final_price
- **Metadata**: status, conversation_summary, created_at, updated_at

### Additional Tables (from migrations)
- **users**: User authentication and profiles
- **magic_link_tokens**: Passwordless authentication tokens
- **sessions**: User session management
- **subscriptions**: Stripe subscription data

## Key Features
- **Indexes**: On access_code, company_id, quote_id for performance
- **Cascading deletes**: Quotes deleted when company is deleted
- **Automatic timestamps**: updated_at triggers
- **Flexible schema**: Supports both SQLite and PostgreSQL

## Database Adapters
The system uses a DatabaseAdapter interface with implementations for:
- **SupabaseAdapter**: Production database
- **SQLiteAdapter**: Local development
- **MemoryAdapter**: Testing and demo mode