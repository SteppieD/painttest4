# Database Architecture

## Database System
- **Supabase**: PostgreSQL-based backend-as-a-service
- **No ORM**: Direct Supabase client usage (no Prisma)
- **Authentication**: Supabase Auth integrated

## Migration Files
Located in `supabase/migrations/`:
- `000_cleanup.sql`: Initial cleanup
- `001_create_tables.sql`: Core table creation
- `002_safe_migration.sql`: Safe migration procedures
- `003_step_by_step.sql`: Step-by-step migrations

## Key Tables (inferred from code)
- **companies**: Multi-tenant company data
- **users**: User accounts and authentication
- **quotes**: Quote documents and metadata
- **customers**: Customer information
- **settings**: User and company preferences

## Database Access Pattern
- Uses Supabase JavaScript client (`@supabase/supabase-js`)
- Real-time subscriptions available
- Row-level security (RLS) policies
- Connection via environment variable NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

## Important Notes
- This project does NOT use Prisma ORM
- Database schema managed through SQL migration files
- Supabase provides built-in authentication
- All database operations go through Supabase client