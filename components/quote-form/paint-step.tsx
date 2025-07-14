import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '@/lib/validations/quote'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PaintStepProps {
  form: UseFormReturn<QuoteFormData>
}

interface PaintProduct {
  id: string
  name: string
  manufacturer: string
  productCode: string
  productType: string
  costPerGallon: number
  coveragePerGallon: number
  finish?: string
}

// Mock paint products - in real app, these would come from API
const mockPaintProducts: PaintProduct[] = [
  {
    id: '1',
    name: 'Premium Interior Wall Paint',
    manufacturer: 'Benjamin Moore',
    productCode: 'BM-REGAL-001',
    productType: 'wall',
    costPerGallon: 35.00,
    coveragePerGallon: 400,
    finish: 'eggshell',
  },
  {
    id: '2',
    name: 'Contractor Grade Wall Paint',
    manufacturer: 'Sherwin Williams',
    productCode: 'SW-PROMAR-200',
    productType: 'wall',
    costPerGallon: 25.00,
    coveragePerGallon: 350,
    finish: 'flat',
  },
  {
    id: '3',
    name: 'Ceiling Paint Ultra Flat',
    manufacturer: 'Benjamin Moore',
    productCode: 'BM-CEILING-508',
    productType: 'ceiling',
    costPerGallon: 28.00,
    coveragePerGallon: 400,
    finish: 'flat',
  },
  {
    id: '4',
    name: 'Advance Interior Trim Paint',
    manufacturer: 'Benjamin Moore',
    productCode: 'BM-ADVANCE-794',
    productType: 'trim',
    costPerGallon: 45.00,
    coveragePerGallon: 450,
    finish: 'semi-gloss',
  },
  {
    id: '5',
    name: 'High-Hide Primer',
    manufacturer: 'Kilz',
    productCode: 'KILZ-PREMIUM-2',
    productType: 'primer',
    costPerGallon: 22.00,
    coveragePerGallon: 300,
    finish: 'flat',
  },
]

export function PaintStep({ form }: PaintStepProps) {
  const { watch, setValue } = form
  const surfaces = watch('surfaces') || []
  const paintProducts = watch('paintProducts') || {}
  
  // Determine which paint types are needed based on surfaces
  const neededPaintTypes = new Set<string>()
  surfaces.forEach((surface) => {
    if (surface.type === 'wall' || surface.type === 'exterior_wall') {
      neededPaintTypes.add('wall')
    } else if (surface.type === 'ceiling' || surface.type === 'soffit') {
      neededPaintTypes.add('ceiling')
    } else if (surface.type === 'baseboard' || surface.type === 'crown_molding' || surface.type === 'door' || surface.type === 'window' || surface.type === 'fascia' || surface.type === 'exterior_door' || surface.type === 'exterior_window') {
      neededPaintTypes.add('trim')
    }
    
    // Check if primer is needed
    if (surface.prepWork.includes('prime_patches') || surface.prepWork.includes('prime_all')) {
      neededPaintTypes.add('primer')
    }
  })

  const getProductsForType = (type: string) => {
    return mockPaintProducts.filter(p => p.productType === type)
  }

  const handleProductChange = (type: string, productCode: string) => {
    setValue('paintProducts', {
      ...paintProducts,
      [type]: productCode,
    })
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select paint products for each surface type in your project
      </p>

      {neededPaintTypes.size === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No surfaces added yet. Please add surfaces in the previous step.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Array.from(neededPaintTypes).map((type) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="text-base capitalize">{type} Paint</CardTitle>
                <CardDescription>
                  Select the paint product for {type} surfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={paintProducts[type as keyof typeof paintProducts] || ''}
                  onValueChange={(value) => handleProductChange(type, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a paint product" />
                  </SelectTrigger>
                  <SelectContent>
                    {getProductsForType(type).map((product) => (
                      <SelectItem key={product.id} value={product.productCode}>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.manufacturer} • ${product.costPerGallon.toFixed(2)}/gal • {product.coveragePerGallon} sq ft/gal
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}