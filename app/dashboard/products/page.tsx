import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, Palette, Edit, Trash2, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getProducts(companyId: number) {
  const products = await prisma.paintProduct.findMany({
    where: {
      companyId,
    },
    orderBy: { createdAt: 'desc' },
  })

  return products
}

export default async function ProductsPage() {
  const token = cookies().get('auth-token')?.value
  if (!token) return null
  
  const user = jwt.verify(token, JWT_SECRET) as AuthPayload
  const products = await getProducts(user.companyId)

  const totalProducts = products.length
  const averageCost = products.length > 0 
    ? products.reduce((sum, p) => sum + p.costPerGallon.toNumber(), 0) / products.length
    : 0
  const uniqueBrands = [...new Set(products.map(p => p.brand))].length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Paint Products</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your paint inventory and pricing
          </p>
        </div>
        <Link href="/dashboard/settings?tab=paints">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per gallon</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brands</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueBrands}</div>
            <p className="text-xs text-muted-foreground">Different brands</p>
          </CardContent>
        </Card>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>All Paint Products</CardTitle>
          <CardDescription>
            Your paint inventory with costs and coverage rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first paint product to start creating accurate quotes
              </p>
              <Link href="/dashboard/settings?tab=paints">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge variant="secondary">{product.brand}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>Type: {product.type}</span>
                        <span>•</span>
                        <span>Sheen: {product.sheen}</span>
                        {product.color && (
                          <>
                            <span>•</span>
                            <span>Color: {product.color}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-6 mt-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Cost: </span>
                          <span className="font-medium">${product.costPerGallon.toFixed(2)}/gal</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Coverage: </span>
                          <span className="font-medium">{product.coveragePerGallon} sq ft/gal</span>
                        </div>
                        {product.recommendedCoats && (
                          <div>
                            <span className="text-sm text-muted-foreground">Coats: </span>
                            <span className="font-medium">{product.recommendedCoats}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href="/dashboard/settings?tab=paints">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Product Management Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            • Keep your product costs updated to ensure accurate quote calculations
          </p>
          <p className="text-sm text-muted-foreground">
            • Add all paint types you commonly use for faster quote creation
          </p>
          <p className="text-sm text-muted-foreground">
            • Coverage rates affect how much paint is calculated for each job
          </p>
          <p className="text-sm text-muted-foreground">
            • Set recommended coats for each product to save time during quoting
          </p>
        </CardContent>
      </Card>
    </div>
  )
}