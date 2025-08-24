# PaintQuote Pro - Design Patterns & Guidelines

## Architectural Design Patterns

### Adapter Pattern (Database Layer)
**Location**: `lib/database/adapter.ts`
**Purpose**: Abstract database operations to support multiple database types
**Implementation**: 
- Interface defines standard database operations
- Specific adapters (SQLite, Supabase) implement the interface
- Allows switching between databases without changing business logic

### Factory Pattern (Quote Calculators)
**Location**: `lib/calculators/`
**Purpose**: Create different types of quote calculators based on requirements
**Implementation**:
- Enhanced Quote Calculator for complex pricing
- Simple Quote Calculator for basic estimates
- Calculator selection based on company settings

### Service Layer Pattern
**Location**: `lib/services/`, `lib/email/`, `lib/stripe/`
**Purpose**: Encapsulate business logic in dedicated service classes
**Examples**:
- `EmailAutomationService`: Handles email sequence logic
- `SubscriptionService`: Manages Stripe subscription operations
- `SettingsIntegrationService`: Company settings management

### Repository Pattern (Implicit)
**Implementation**: Through Prisma ORM and database adapters
**Purpose**: Abstract data access layer
**Benefits**: Type-safe database operations, migration management

## React Component Patterns

### Compound Components
**Usage**: Complex UI components with multiple related parts
**Example**: Quote form steps, settings panels
**Pattern**: Parent component manages state, child components handle specific UI

### Custom Hooks Pattern
**Location**: `hooks/` directory
**Purpose**: Reusable stateful logic
**Examples**: Authentication hooks, form validation hooks, API data fetching

### Higher-Order Components (HOCs)
**Usage**: Authentication wrappers, error boundaries
**Example**: `AuthWrapper` component for protecting routes
**Pattern**: Wrap components to add common functionality

### Render Props Pattern
**Usage**: Sharing code between components
**Implementation**: Components that accept function as children
**Use Cases**: Data fetching, state management sharing

## API Design Patterns

### RESTful Resource Design
**Structure**: 
- `/api/quotes` - Quote management
- `/api/companies` - Company operations  
- `/api/auth` - Authentication endpoints
- `/api/analytics` - Reporting and analytics

### Middleware Pattern
**Location**: `middleware.ts`, `lib/auth/middleware.ts`
**Purpose**: Request/response processing pipeline
**Implementation**: Authentication, logging, error handling

### Error Handling Pattern
**Standard Response Format**:
```typescript
{
  error: string,
  message: string,
  statusCode: number,
  details?: any
}
```

### Validation Pattern
**Tool**: Zod schemas
**Location**: `lib/validations/`, `lib/validation/schemas.ts`
**Pattern**: Runtime type validation for API inputs and outputs

## State Management Patterns

### Local State (React Hooks)
**Usage**: Component-specific state
**Tools**: `useState`, `useReducer`
**Guidelines**: Keep state as local as possible

### Context Pattern
**Usage**: Shared state across component tree
**Implementation**: Authentication context, theme context
**Guidelines**: Avoid overuse, prefer props drilling for simple cases

### Server State
**Tool**: API routes with proper caching
**Pattern**: Fetch data on server when possible
**Caching**: Leverage Next.js built-in caching mechanisms

## Security Patterns

### JWT Authentication
**Implementation**: HTTP-only cookies for token storage
**Validation**: Middleware-based route protection
**Refresh Strategy**: Access code system for simplicity

### Input Sanitization
**Tool**: Zod validation schemas
**Pattern**: Validate all user inputs at API boundaries
**XSS Protection**: Proper entity escaping in JSX

### API Key Management
**Pattern**: Environment variables for all secrets
**Storage**: Never commit secrets to version control
**Validation**: Runtime checks for required environment variables

## Performance Patterns

### Code Splitting
**Implementation**: Dynamic imports for large components
**Pattern**: Route-based and component-based splitting
**Tool**: Next.js automatic code splitting

### Lazy Loading
**Usage**: Non-critical components and routes
**Implementation**: React.lazy() and Suspense
**Guidelines**: Load above-the-fold content first

### Caching Strategy
**Database**: Connection pooling and query optimization
**API**: Response caching for expensive operations
**Static Assets**: Next.js automatic optimization

### Bundle Optimization
**Tool**: Webpack Bundle Analyzer
**Pattern**: Tree shaking, dead code elimination
**Monitoring**: Regular bundle size audits

## Error Handling Patterns

### Error Boundaries
**Location**: `components/error-boundary.tsx`
**Purpose**: Catch and handle React component errors
**Pattern**: Fallback UI for graceful degradation

### API Error Handling
**Pattern**: Consistent error response format
**Logging**: Structured error logging
**User Feedback**: User-friendly error messages

### Database Error Handling
**Pattern**: Connection retry logic
**Graceful Degradation**: Fallback to cached data when possible
**Monitoring**: Database performance tracking

## Testing Patterns

### Unit Testing
**Tool**: Playwright for E2E testing
**Pattern**: Test individual functions and components
**Coverage**: Focus on business logic and critical paths

### Integration Testing
**Scope**: API endpoints and database operations
**Pattern**: Test complete user workflows
**Environment**: Isolated test database

### End-to-End Testing
**Tool**: Playwright
**Pattern**: Test complete user journeys
**Coverage**: Critical business flows (quote creation, payment)

## Data Flow Patterns

### Unidirectional Data Flow
**Pattern**: Props down, events up
**Implementation**: React standard patterns
**State Updates**: Through proper event handlers

### API Data Flow
**Pattern**: Request → Validation → Business Logic → Database → Response
**Error Handling**: At each step with proper error propagation
**Type Safety**: End-to-end TypeScript types

### Email Automation Flow
**Pattern**: Trigger → Schedule → Template → Send → Track
**Implementation**: Event-driven email sequences
**Monitoring**: Delivery and engagement tracking

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (`QuoteForm.tsx`)
- **Utilities**: kebab-case (`quote-calculator.ts`)
- **Pages**: Next.js convention (`page.tsx`, `layout.tsx`)
- **API Routes**: RESTful naming (`route.ts`)

### Variables and Functions
- **Variables**: camelCase (`quoteData`, `userSettings`)
- **Functions**: camelCase with verb (`calculateQuote`, `sendEmail`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`QuoteData`, `CompanySettings`)

### Database
- **Tables**: snake_case (`company_settings`, `quote_data`)
- **Columns**: snake_case (`created_at`, `user_id`)
- **Indexes**: Descriptive names (`idx_company_quotes`)

## Documentation Patterns

### Code Documentation
**Tool**: JSDoc for complex functions
**Pattern**: Document public APIs and business logic
**Guidelines**: Explain "why" not "what"

### API Documentation
**Format**: OpenAPI/Swagger style documentation
**Content**: Request/response schemas, examples
**Maintenance**: Keep in sync with implementation

### Architecture Documentation
**Format**: Markdown files in repository
**Content**: High-level design decisions
**Audience**: Developers and stakeholders