import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '@/lib/validations/quote'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface CustomerStepProps {
  form: UseFormReturn<QuoteFormData>
}

export function CustomerStep({ form }: CustomerStepProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="customer.name">Customer Name *</Label>
        <Input
          id="customer.name"
          {...register('customer.name')}
          placeholder="John Smith"
        />
        {errors.customer?.name && (
          <p className="mt-1 text-sm text-destructive">{errors.customer.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="customer.email">Email Address *</Label>
        <Input
          id="customer.email"
          type="email"
          {...register('customer.email')}
          placeholder="john@example.com"
        />
        {errors.customer?.email && (
          <p className="mt-1 text-sm text-destructive">{errors.customer.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="customer.phone">Phone Number</Label>
        <Input
          id="customer.phone"
          type="tel"
          {...register('customer.phone')}
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <Label htmlFor="customer.address">Address</Label>
        <Input
          id="customer.address"
          {...register('customer.address')}
          placeholder="123 Main St, Anytown, USA"
        />
      </div>
    </div>
  )
}