# Development Guide

This document contains detailed technical implementation information for PaintQuote Pro.

## Project Structure

```
paintquotepro-web/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── chat/quote/    # AI chat endpoint
│   │   ├── quotes/        # Quote CRUD operations
│   │   └── settings/      # Settings management
│   ├── auth/              # Auth pages
│   └── dashboard/         # Protected dashboard pages
├── components/            # React components
│   ├── quote-form/        # Multi-step quote form
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and helpers
│   └── validations/       # Zod schemas
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## Key Implementation Details

### 1. Charge Rate Calculator (calculator-v2.ts)

```typescript
export class QuoteCalculatorV2 {
  private static readonly LABOR_PERCENTAGE = 0.30; // 30% of charge is labor

  static calculate(input: QuoteInputV2): Result<QuoteOutputV2, any> {
    // For each surface:
    // 1. Determine measurement type (sq ft, linear ft, or unit)
    // 2. Calculate total charge = measurement * charge rate
    // 3. Labor = total charge * 0.30
    // 4. Materials = total charge * 0.70 (implicit)
  }
}
```

### 2. Database Schema

Key models:
- **Company**: Stores charge rates in settings JSON field
- **User**: Authentication and role management
- **Customer**: Quote recipients
- **Quote**: Complete quote data with calculations
- **PaintProduct**: Product catalog (may be deprecated with charge rates)

### 3. AI Integration Pattern

The chat interface follows this flow:
1. User sends message to `/api/chat/quote`
2. API maintains conversation history
3. Claude Sonnet extracts structured data
4. When ready, API returns `quoteData` object
5. Frontend creates quote via `/api/quotes`

### 4. Authentication Flow

```typescript
// Sign in process:
1. Validate credentials against database
2. Generate JWT token with user info
3. Set HTTP-only cookie with token
4. Redirect to dashboard

// Protected routes:
1. Middleware checks for valid JWT
2. Attaches user to request
3. Route handlers can access user data
```

### 5. Form Validation

All forms use Zod schemas for runtime validation:

```typescript
const quoteFormSchema = z.object({
  customer: customerSchema,
  surfaces: z.array(surfaceSchema),
  settings: settingsSchema,
  // ...
});
```

## Critical Implementation Notes

### bcryptjs Version Lock
**IMPORTANT**: Must use bcryptjs@2.4.3. Version 3.x causes authentication failures.

```json
{
  "dependencies": {
    "bcryptjs": "2.4.3"
  }
}
```

### Hydration Issues
Server/client timestamp mismatches cause hydration errors. Solution:

```typescript
// components/client-timestamp.tsx
export function ClientTimestamp({ timestamp }: Props) {
  const [timeString, setTimeString] = useState<string>('')
  
  useEffect(() => {
    setTimeString(timestamp.toLocaleTimeString())
  }, [timestamp])
  
  if (!timeString) return null
  return <span>{timeString}</span>
}
```

### Decimal Precision
All financial calculations use Prisma.Decimal:

```typescript
import { Prisma } from '@prisma/client'

// In seed files and calculations:
costPerGallon: new Prisma.Decimal(35.00)
```

### Environment Variables

Required for operation:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Random secure string for JWT signing
- `ANTHROPIC_API_KEY`: Claude API access

## Testing and Debugging

### Local Development
```bash
# Start database
docker-compose up -d

# Watch for changes
npm run dev

# View database
npx prisma studio
```

### Common Issues

1. **"Internal server error" on login**
   - Check bcryptjs version (must be 2.4.3)
   - Verify JWT_SECRET is set
   - Check database connection

2. **Module not found errors**
   - Ensure all UI components exist
   - Check import paths (use @/ alias)
   - Run `npm install` if needed

3. **Type errors during build**
   - Install missing @types packages
   - Ensure calculator package exports match imports
   - Check for unescaped apostrophes in JSX

## API Endpoints

### Authentication
- `POST /api/auth/signin`: User login
- `POST /api/auth/signup`: User registration

### Quotes
- `GET /api/quotes`: List quotes
- `POST /api/quotes`: Create new quote
- `GET /api/quotes/:id`: Get single quote
- `PUT /api/quotes/:id`: Update quote

### AI Chat
- `POST /api/chat/quote`: Send message to AI

### Settings
- `GET /api/settings`: Get company settings
- `PUT /api/settings`: Update charge rates

## State Management

The application uses:
- React hooks for local state
- Form state via React Hook Form
- Server state with SWR/fetch
- No global state management (kept simple)

## Performance Considerations

1. **Database Queries**: Use Prisma's include/select to minimize queries
2. **AI Responses**: Stream responses when possible
3. **Form Validation**: Client-side validation to reduce API calls
4. **Image Optimization**: Use Next.js Image component

## Security Best Practices

1. **Authentication**: JWT in HTTP-only cookies
2. **Input Validation**: Zod schemas on all inputs
3. **SQL Injection**: Prisma parameterized queries
4. **XSS Prevention**: React's built-in escaping
5. **CORS**: Configured in next.config.js

## Deployment Checklist

1. [ ] Set all production environment variables
2. [ ] Run database migrations
3. [ ] Build and test locally: `npm run build`
4. [ ] Configure SSL/TLS certificates
5. [ ] Set up monitoring and logging
6. [ ] Configure backup strategy
7. [ ] Test with production data volume