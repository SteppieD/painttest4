import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getQuotes(companyId: number) {
    const quotes = await prisma.quote.findMany({
      where: {
        companyId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
      },
      take: 20,
    })

    return quotes
}

export default async function QuotesPage() {
  const token = cookies().get('auth-token')?.value
  const user = jwt.verify(token!, JWT_SECRET) as AuthPayload
  
  const quotes = await getQuotes(user.companyId)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">
            Manage and track all your painting quotes
          </p>
        </div>
        <Link
          href="/dashboard/quotes/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          New Quote
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Quote #</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Project Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{quote.quoteNumber}</td>
                    <td className="px-4 py-3">{quote.customer.name}</td>
                    <td className="px-4 py-3 capitalize">{quote.projectType}</td>
                    <td className="px-4 py-3">${quote.totalAmount.toString()}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        quote.status === 'accepted' ? "bg-green-100 text-green-700" : undefined,
                        quote.status === 'sent' ? "bg-blue-100 text-blue-700" : undefined,
                        quote.status === 'draft' ? "bg-gray-100 text-gray-700" : undefined,
                        quote.status === 'rejected' ? "bg-red-100 text-red-700" : undefined,
                      )}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/quotes/${quote.id}`}
                        className="text-primary hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}