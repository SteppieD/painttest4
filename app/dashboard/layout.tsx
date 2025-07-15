import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { MobileNav } from '@/components/mobile-nav'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getUser() {
  const token = cookies().get('auth-token')?.value

  if (!token) {
    return null
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload
    return payload
  } catch {
    return null
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <MobileNav userEmail={user.email} />
              <Link href="/dashboard" className="text-xl font-semibold">
                Paint Quote Pro
              </Link>
              <div className="ml-10 hidden md:flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/chat"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  New Quote Chat
                </Link>
                <Link
                  href="/dashboard/quotes"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Quotes
                </Link>
                <Link
                  href="/dashboard/customers"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Customers
                </Link>
                <Link
                  href="/dashboard/products"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Products
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-20 md:pb-6">
        {children}
      </main>
    </div>
  )
}