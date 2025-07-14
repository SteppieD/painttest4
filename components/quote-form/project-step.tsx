import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '@/lib/validations/quote'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProjectStepProps {
  form: UseFormReturn<QuoteFormData>
}

export function ProjectStep({ form }: ProjectStepProps) {
  const { register, setValue, watch, formState: { errors } } = form
  const projectType = watch('projectType')

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="projectType">Project Type *</Label>
        <Select
          value={projectType}
          onValueChange={(value) => setValue('projectType', value as 'residential' | 'commercial')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Project Description</Label>
        <textarea
          id="description"
          {...register('description')}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe the painting project..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="settings.laborRate">Labor Rate ($/hour) *</Label>
          <Input
            id="settings.laborRate"
            type="number"
            step="0.01"
            {...register('settings.laborRate', { valueAsNumber: true })}
          />
          {errors.settings?.laborRate && (
            <p className="mt-1 text-sm text-destructive">{errors.settings.laborRate.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="settings.taxRate">Tax Rate (%) *</Label>
          <Input
            id="settings.taxRate"
            type="number"
            step="0.01"
            {...register('settings.taxRate', { valueAsNumber: true })}
          />
          {errors.settings?.taxRate && (
            <p className="mt-1 text-sm text-destructive">{errors.settings.taxRate.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="settings.overheadPercent">Overhead (%) *</Label>
          <Input
            id="settings.overheadPercent"
            type="number"
            step="0.01"
            {...register('settings.overheadPercent', { valueAsNumber: true })}
          />
          {errors.settings?.overheadPercent && (
            <p className="mt-1 text-sm text-destructive">{errors.settings.overheadPercent.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="settings.profitMargin">Profit Margin (%) *</Label>
          <Input
            id="settings.profitMargin"
            type="number"
            step="0.01"
            {...register('settings.profitMargin', { valueAsNumber: true })}
          />
          {errors.settings?.profitMargin && (
            <p className="mt-1 text-sm text-destructive">{errors.settings.profitMargin.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

import { Input } from '@/components/ui/input'