import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData, SurfaceInput } from '@/lib/validations/quote'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'

interface SurfacesStepProps {
  form: UseFormReturn<QuoteFormData>
}

const surfaceTypes = [
  // Interior
  { value: 'wall', label: 'Interior Wall', category: 'interior' },
  { value: 'ceiling', label: 'Ceiling', category: 'interior' },
  { value: 'baseboard', label: 'Baseboard', category: 'interior' },
  { value: 'crown_molding', label: 'Crown Molding', category: 'interior' },
  { value: 'door', label: 'Door & Door Jam', category: 'interior' },
  { value: 'window', label: 'Window', category: 'interior' },
  // Exterior
  { value: 'exterior_wall', label: 'Exterior Wall', category: 'exterior' },
  { value: 'fascia', label: 'Fascia Board', category: 'exterior' },
  { value: 'soffit', label: 'Soffit', category: 'exterior' },
  { value: 'exterior_door', label: 'Exterior Door', category: 'exterior' },
  { value: 'exterior_window', label: 'Exterior Window', category: 'exterior' },
]

const conditions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
]

const prepWorkOptions = [
  { value: 'none', label: 'None' },
  { value: 'patch_nail_holes', label: 'Patch Nail Holes' },
  { value: 'patch_cracks', label: 'Patch Cracks' },
  { value: 'patch_water_stains', label: 'Patch Water Stains' },
  { value: 'light_sanding', label: 'Light Sanding' },
  { value: 'heavy_sanding', label: 'Heavy Sanding' },
  { value: 'prime_patches', label: 'Prime Patches' },
  { value: 'prime_all', label: 'Prime All' },
  { value: 'remove_wallpaper', label: 'Remove Wallpaper' },
  { value: 'repair_drywall', label: 'Repair Drywall' },
]

export function SurfacesStep({ form }: SurfacesStepProps) {
  const { watch, setValue, formState: { errors } } = form
  const surfaces = watch('surfaces') || []

  const addSurface = () => {
    const newSurface: SurfaceInput = {
      id: `surface-${Date.now()}`,
      name: '',
      type: 'wall',
      area: 0,
      linearFeet: 0,
      count: 0,
      coats: 2,
      condition: 'good',
      prepWork: [],
    }
    setValue('surfaces', [...surfaces, newSurface])
  }

  const removeSurface = (index: number) => {
    setValue('surfaces', surfaces.filter((_, i) => i !== index))
  }

  const updateSurface = (index: number, field: keyof SurfaceInput, value: unknown) => {
    const updated = [...surfaces]
    updated[index] = { ...updated[index], [field]: value }
    setValue('surfaces', updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-base text-gray-200">
          Add all surfaces that need to be painted
        </p>
        <Button type="button" variant="outline" size="default" onClick={addSurface}>
          <Plus className="mr-2 h-4 w-4" />
          Add Surface
        </Button>
      </div>

      {surfaces.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-200">No surfaces added yet</p>
            <Button type="button" variant="outline" size="default" className="mt-4" onClick={addSurface}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Surface
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {surfaces.map((surface, index) => (
            <Card key={surface.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Surface {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="default"
                  onClick={() => removeSurface(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Surface Name</Label>
                    <Input
                      value={surface.name}
                      onChange={(e) => updateSurface(index, 'name', e.target.value)}
                      placeholder="e.g., Living Room Walls"
                    />
                  </div>
                  <div>
                    <Label>Surface Type</Label>
                    <Select
                      value={surface.type}
                      onValueChange={(value) => updateSurface(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {surfaceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Measurement Input - Dynamic based on surface type */}
                  {['wall', 'ceiling', 'exterior_wall', 'soffit'].includes(surface.type) && (
                    <div>
                      <Label>Area (sq ft)</Label>
                      <Input
                        type="number"
                        value={surface.area}
                        onChange={(e) => updateSurface(index, 'area', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  )}
                  {['baseboard', 'crown_molding', 'fascia'].includes(surface.type) && (
                    <div>
                      <Label>Linear Feet</Label>
                      <Input
                        type="number"
                        value={surface.linearFeet}
                        onChange={(e) => updateSurface(index, 'linearFeet', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  )}
                  {['door', 'window', 'exterior_door', 'exterior_window'].includes(surface.type) && (
                    <div>
                      <Label>Count</Label>
                      <Input
                        type="number"
                        value={surface.count}
                        onChange={(e) => updateSurface(index, 'count', parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  )}
                  <div>
                    <Label>Number of Coats</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={surface.coats}
                      onChange={(e) => updateSurface(index, 'coats', parseInt(e.target.value) || 2)}
                    />
                  </div>
                  <div>
                    <Label>Condition</Label>
                    <Select
                      value={surface.condition}
                      onValueChange={(value) => updateSurface(index, 'condition', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition.value} value={condition.value}>
                            {condition.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Prep Work Required</Label>
                    <Select
                      value={surface.prepWork[0] || 'none'}
                      onValueChange={(value) => 
                        updateSurface(index, 'prepWork', value === 'none' ? [] : [value])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {prepWorkOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {errors.surfaces && (
        <p className="text-base text-destructive">{errors.surfaces.message}</p>
      )}
    </div>
  )
}