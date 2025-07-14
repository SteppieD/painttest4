import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '@/lib/validations/quote'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface ReviewStepProps {
  form: UseFormReturn<QuoteFormData>
}


export function ReviewStep({ form }: ReviewStepProps) {
  const { watch, register } = form
  const formData = watch()

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{formData.customer?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{formData.customer?.email}</span>
          </div>
          {formData.customer?.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{formData.customer.phone}</span>
            </div>
          )}
          {formData.customer?.address && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address:</span>
              <span className="font-medium">{formData.customer.address}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project Type:</span>
            <span className="font-medium capitalize">{formData.projectType}</span>
          </div>
          {formData.description && (
            <div>
              <span className="text-muted-foreground">Description:</span>
              <p className="mt-1">{formData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Surfaces Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Surfaces ({formData.surfaces?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {formData.surfaces?.map((surface) => (
              <div key={surface.id} className="flex justify-between text-sm">
                <span>{surface.name}</span>
                <span className="text-muted-foreground">
                  {surface.area && `${surface.area} sq ft`}
                  {surface.linearFeet && `${surface.linearFeet} linear ft`}
                  {surface.count && `${surface.count} units`}
                  {' • '}{surface.coats} coats
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quote Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Settings</CardTitle>
          <CardDescription>Tax and pricing configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax Rate:</span>
            <span className="font-medium">{formData.settings?.taxRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Overhead:</span>
            <span className="font-medium">{formData.settings?.overheadPercent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Profit Margin:</span>
            <span className="font-medium">{formData.settings?.profitMargin}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Additional Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Optional notes and terms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">Internal Notes</Label>
            <textarea
              id="notes"
              {...register('notes')}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Any internal notes about this quote..."
            />
          </div>
          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <textarea
              id="terms"
              {...register('terms')}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Payment terms, warranty information, etc..."
              defaultValue="Payment due within 30 days. 50% deposit required to start work."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}