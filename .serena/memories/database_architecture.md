# Database Architecture

## Database System
PaintQuote Pro uses Supabase (PostgreSQL) as the primary database with SQLite as a fallback option.

## Main Tables

### Companies Table
```sql
- id: SERIAL PRIMARY KEY
- access_code: VARCHAR(50) UNIQUE NOT NULL
- company_name: VARCHAR(255) NOT NULL
- name: VARCHAR(255) (alias for company_name)
- phone: VARCHAR(50)
- email: VARCHAR(255)
- logo_url: VARCHAR(500)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Quotes Table
```sql
- id: SERIAL PRIMARY KEY
- company_id: INTEGER (FK to companies)
- quote_id: VARCHAR(50) UNIQUE NOT NULL
- customer_name: VARCHAR(255) NOT NULL
- customer_email: VARCHAR(255)
- customer_phone: VARCHAR(50)
- address: TEXT
- project_type: VARCHAR(100)
- rooms: TEXT
- paint_quality: VARCHAR(100)
- prep_work: TEXT
- timeline: VARCHAR(100)
- special_requests: TEXT
- Surface measurements (sqft/counts)
- Rate fields (per sqft/unit)
- Cost calculations
- Status: VARCHAR(50)
- created_at/updated_at: TIMESTAMPTZ
```

### Users Table (Authentication)
- Basic user authentication data
- Linked to companies via company_id

## Key Relationships
- Companies have many Quotes (1:N)
- Companies have many Users (1:N)
- Quotes belong to one Company

## Database Access
- Direct SQL queries (no ORM currently)
- Connection via Supabase client
- Environment variable: DATABASE_URL