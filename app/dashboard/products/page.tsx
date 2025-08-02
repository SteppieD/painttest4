import { db } from '@/lib/database/adapter'
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

async function getProducts(_companyId: number) {
  // Use the new adapter method
  let products = []
  try {
    if (typeof (db as unknown).getPaintProductsByCompanyId === 'function') {
      products = await (db as unknown).getPaintProductsByCompanyId(companyId)
    } else {
      console.log('[DASHBOARD] Paint products method not available')
    }
  } catch (error) {
    console.error('[DASHBOARD] Error fetching paint products:', error)
  }
  return products || []
}

export default async function ProductsPage() {
  const token = cookies().get('auth-token')?.value
  if (!token) return null
  
  const user = jwt.verify(token, JWT_SECRET) as AuthPayload
  const products = await getProducts(user.companyId)

  const totalProducts = products.length
  const averageCost = products.length > 0 
    ? products.reduce((sum: number, p: unknown) => sum + (typeof p.cost_per_gallon === 'number' ? p.cost_per_gallon : Number(p.cost_per_gallon)), 0) / products.length
    : 0
  const uniqueBrands = [...new Set(products.map((p: unknown) => p.brand).filter(Boolean))].length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Paint Products</h1>
          <p className="text-base md:text-base text-gray-200">
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
            <CardTitle className="text-base font-medium">Total Products</CardTitle>
            <Palette className="h-4 w-4 text-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-base text-gray-200">Active products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Average Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageCost.toFixed(2)}</div>
            <p className="text-base text-gray-200">Per gallon</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Brands</CardTitle>
            <Palette className="h-4 w-4 text-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueBrands}</div>
            <p className="text-base text-gray-200">Different brands</p>
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
              <Palette className="h-12 w-12 mx-auto text-gray-200 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products yet</h3>
              <p className="text-gray-200 mb-4">
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
              {products.map((product: unknown) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{product.product_name}</h3>
                        {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-base text-gray-200">
                        <span>Use Case: {product.use_case}</span>
                        {product.sheen && (
                          <>
                            <span>•</span>
                            <span>Sheen: {product.sheen}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-6 mt-2">
                        <div>
                          <span className="text-base text-gray-200">Cost: </span>
                          <span className="font-medium">${(typeof product.cost_per_gallon === 'number' ? product.cost_per_gallon : Number(product.cost_per_gallon)).toFixed(2)}/gal</span>
                        </div>
                        <div>
                          <span className="text-base text-gray-200">Coverage: </span>
                          <span className="font-medium">{product.coverage_rate || 350} sq ft/gal</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href="/dashboard/settings?tab=paints">
                        <Button variant="ghost" size="default">
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
          <p className="text-base text-gray-200">
            • Keep your product costs updated to ensure accurate quote calculations
          </p>
          <p className="text-base text-gray-200">
            • Add all paint types you commonly use for faster quote creation
          </p>
          <p className="text-base text-gray-200">
            • Coverage rates affect how much paint is calculated for each job
          </p>
          <p className="text-base text-gray-200">
            • Set recommended coats for each product to save time during quoting
          </p>
        </CardContent>
      </Card>
    </div>
  )
}