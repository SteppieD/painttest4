# PaintQuote Pro - Development Guide

This guide provides detailed instructions for developers working on PaintQuote Pro, including coding standards, workflows, and best practices.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **PostgreSQL**: Version 15.x or higher (or use Docker)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "mikestead.dotenv"
  ]
}
```

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/SteppieD/painttest3.git
   cd painttest3
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

3. **Database Setup**
   ```bash
   # Using local PostgreSQL
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed

   # Or using Docker
   docker-compose -f docker-compose.simple.yml up -d postgres
   ```

4. **Start Development**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## 💻 Development Workflow

### Branch Strategy

```
main
├── feature/add-email-templates
├── fix/quote-calculation-error
├── chore/update-dependencies
└── docs/improve-readme
```

- **main**: Production-ready code
- **feature/***: New features
- **fix/***: Bug fixes
- **chore/***: Maintenance tasks
- **docs/***: Documentation updates

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add email template system
fix: correct quote calculation for trim
docs: update API documentation
chore: upgrade to Next.js 14.1
style: format code with prettier
refactor: simplify quote validation logic
test: add unit tests for calculator
perf: optimize image loading
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow coding standards
   - Add tests if applicable

3. **Test Locally**
   ```bash
   npm run lint
   npm run typecheck
   npm run test (when implemented)
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature
   ```

5. **Create Pull Request**
   - Use PR template
   - Link related issues
   - Request review
   - Address feedback

## 📝 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Use explicit types
interface QuoteItem {
  id: string
  description: string
  quantity: number
  price: number
}

// ❌ Bad: Avoid 'any'
const processQuote = (data: any) => { }

// ✅ Good: Use type inference when obvious
const items = ['wall', 'ceiling', 'trim'] // string[] inferred

// ✅ Good: Use optional chaining
const companyName = user?.company?.name ?? 'Unknown'

// ✅ Good: Use const assertions for constants
const QUOTE_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  ACCEPTED: 'accepted'
} as const
```

### React Best Practices

```tsx
// ✅ Good: Functional components with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', onClick, children }: ButtonProps) {
  return (
    <button 
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ✅ Good: Custom hooks for logic
function useQuoteForm() {
  const [data, setData] = useState<QuoteFormData>()
  const [errors, setErrors] = useState<ValidationErrors>()
  
  // Hook logic here
  
  return { data, errors, setData }
}

// ❌ Bad: Avoid inline styles
<div style={{ margin: '10px' }}>Content</div>

// ✅ Good: Use Tailwind classes
<div className="m-2.5">Content</div>
```

### API Route Standards

```typescript
// app/api/quotes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// ✅ Good: Define schemas
const CreateQuoteSchema = z.object({
  customerId: z.string().cuid(),
  items: z.array(z.object({
    description: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive()
  }))
})

export async function POST(request: NextRequest) {
  try {
    // ✅ Good: Validate input
    const body = await request.json()
    const data = CreateQuoteSchema.parse(body)
    
    // ✅ Good: Use Prisma transactions
    const quote = await prisma.$transaction(async (tx) => {
      // Create quote
      return await tx.quote.create({ data })
    })
    
    // ✅ Good: Return consistent response
    return NextResponse.json({ 
      success: true, 
      data: quote 
    })
    
  } catch (error) {
    // ✅ Good: Handle errors properly
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Internal error' },
      { status: 500 }
    )
  }
}
```

### Database Patterns

```typescript
// ✅ Good: Use transactions for related operations
const createQuoteWithItems = async (data: QuoteInput) => {
  return await prisma.$transaction(async (tx) => {
    const quote = await tx.quote.create({
      data: {
        customerId: data.customerId,
        status: 'DRAFT',
        items: {
          create: data.items
        }
      },
      include: {
        items: true,
        customer: true
      }
    })
    
    // Update customer lastQuoteDate
    await tx.customer.update({
      where: { id: data.customerId },
      data: { lastQuoteDate: new Date() }
    })
    
    return quote
  })
}

// ✅ Good: Use proper error handling
try {
  const quote = await createQuoteWithItems(data)
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      // Handle unique constraint violation
    }
  }
  throw error
}
```

## 🧪 Testing Guidelines

### Unit Testing

```typescript
// __tests__/lib/calculator.test.ts
import { QuoteCalculator } from '@/lib/calculator'

describe('QuoteCalculator', () => {
  it('should calculate total with markup', () => {
    const calculator = new QuoteCalculator()
    const result = calculator.calculate({
      items: [
        { quantity: 100, price: 2.5 }, // $250
      ],
      markup: 0.2 // 20%
    })
    
    expect(result.subtotal).toBe(250)
    expect(result.markup).toBe(50)
    expect(result.total).toBe(300)
  })
})
```

### Integration Testing

```typescript
// __tests__/api/quotes.test.ts
import { createMocks } from 'node-mocks-http'
import { POST } from '@/app/api/quotes/route'

describe('/api/quotes', () => {
  it('should create a quote', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        customerId: 'test-customer-id',
        items: [{ description: 'Paint walls', quantity: 1, price: 500 }]
      }
    })
    
    await POST(req as any)
    
    expect(res._getStatusCode()).toBe(200)
    const json = JSON.parse(res._getData())
    expect(json.success).toBe(true)
    expect(json.data).toHaveProperty('id')
  })
})
```

## 🎨 UI/UX Guidelines

### Component Structure

```
components/
├── ui/                    # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   └── dialog.tsx
├── quote/                 # Domain-specific components
│   ├── QuoteForm.tsx
│   ├── QuoteList.tsx
│   └── QuotePreview.tsx
└── layout/               # Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Sidebar.tsx
```

### Tailwind CSS Usage

```tsx
// ✅ Good: Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">Quote #1234</h2>
  <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
    Sent
  </span>
</div>

// ✅ Good: Extract repeated patterns
const cardStyles = "p-4 bg-white rounded-lg shadow-sm"
const badgeStyles = {
  sent: "text-green-800 bg-green-100",
  draft: "text-gray-800 bg-gray-100",
  accepted: "text-blue-800 bg-blue-100"
}

// ✅ Good: Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

<button className={cn(
  "px-4 py-2 rounded-md font-medium",
  variant === 'primary' && "bg-blue-600 text-white",
  variant === 'secondary' && "bg-gray-200 text-gray-900",
  disabled && "opacity-50 cursor-not-allowed"
)} />
```

## 🔧 Debugging Tips

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check PostgreSQL is running
   docker ps | grep postgres
   
   # Check connection string
   echo $DATABASE_URL
   
   # Test connection
   npx prisma db pull
   ```

2. **Type Errors**
   ```bash
   # Run TypeScript compiler
   npx tsc --noEmit
   
   # Check specific file
   npx tsc --noEmit path/to/file.ts
   ```

3. **Build Errors**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   npm run build
   
   # Check for missing dependencies
   npm ls
   ```

### Debugging Tools

```typescript
// Use console.log with labels
console.log('Quote Data:', { id, items, total })

// Use debugger statement
debugger // Breakpoint when DevTools open

// Use React Developer Tools
// Install browser extension

// Use Prisma Studio for database
npx prisma studio
```

## 📚 Learning Resources

### Project-Specific

- [README.md](./README.md) - Project overview and setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design details
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Business context

### External Resources

- [Next.js 14 Docs](https://nextjs.org/docs) - Framework documentation
- [Prisma Docs](https://www.prisma.io/docs) - ORM documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## 🚨 Important Notes

### Security Reminders

- Never commit `.env` files
- Always validate user input
- Use parameterized queries (Prisma does this)
- Implement rate limiting on APIs
- Keep dependencies updated

### Performance Tips

- Use `Image` component for images
- Implement proper loading states
- Use React.memo for expensive components
- Optimize database queries with proper indexes
- Monitor Core Web Vitals

### Before Deploying

- [ ] Run `npm run lint`
- [ ] Run `npm run typecheck`
- [ ] Test all critical paths
- [ ] Check environment variables
- [ ] Review security best practices
- [ ] Update documentation if needed

---

*Development Guide Version: 1.0*  
*Last Updated: July 2025*