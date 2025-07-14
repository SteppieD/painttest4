import { z } from 'zod'

// Surface schema
export const surfaceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Surface name is required'),
  type: z.enum([
    'wall', 'ceiling', 'baseboard', 'crown_molding', 'door', 'window',
    'exterior_wall', 'fascia', 'soffit', 'exterior_door', 'exterior_window'
  ]),
  area: z.number().optional(), // For walls, ceilings, soffits
  linearFeet: z.number().optional(), // For baseboards, crown molding, fascia
  count: z.number().optional(), // For doors, windows
  height: z.number().optional(),
  coats: z.number().min(1).max(5).default(2),
  condition: z.enum(['excellent', 'good', 'fair', 'poor']),
  prepWork: z.array(z.enum([
    'none',
    'patch_nail_holes',
    'patch_cracks',
    'patch_water_stains',
    'light_sanding',
    'heavy_sanding',
    'prime_patches',
    'prime_all',
    'remove_wallpaper',
    'repair_drywall',
  ])).default([]),
}).refine((data) => {
  // Validate that the correct measurement field is provided
  const areaTypes = ['wall', 'ceiling', 'exterior_wall', 'soffit'];
  const linearTypes = ['baseboard', 'crown_molding', 'fascia'];
  const countTypes = ['door', 'window', 'exterior_door', 'exterior_window'];
  
  if (areaTypes.includes(data.type)) {
    return data.area && data.area > 0;
  } else if (linearTypes.includes(data.type)) {
    return data.linearFeet && data.linearFeet > 0;
  } else if (countTypes.includes(data.type)) {
    return data.count && data.count > 0;
  }
  return true;
}, {
  message: "Please provide the appropriate measurement for this surface type"
})

// Paint products schema
export const paintProductsSchema = z.object({
  wall: z.string().optional(),
  ceiling: z.string().optional(),
  trim: z.string().optional(),
  door: z.string().optional(),
  primer: z.string().optional(),
})

// Customer schema
export const customerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Customer name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
})

// Quote settings schema
export const quoteSettingsSchema = z.object({
  taxRate: z.number().min(0).max(25).default(8.25),
  overheadPercent: z.number().min(0).max(50).default(15),
  profitMargin: z.number().min(0).max(100).default(30),
  laborRate: z.number().min(20).max(200).default(45),
})

// Complete quote form schema
export const quoteFormSchema = z.object({
  // Customer info
  customer: customerSchema,
  
  // Project details
  projectType: z.enum(['residential', 'commercial']),
  description: z.string().optional(),
  
  // Surfaces
  surfaces: z.array(surfaceSchema).min(1, 'At least one surface is required'),
  
  // Paint products
  paintProducts: paintProductsSchema,
  
  // Settings
  settings: quoteSettingsSchema,
  
  // Additional fields
  notes: z.string().optional(),
  terms: z.string().optional(),
})

export type SurfaceInput = z.infer<typeof surfaceSchema>
export type PaintProductsInput = z.infer<typeof paintProductsSchema>
export type CustomerInput = z.infer<typeof customerSchema>
export type QuoteSettingsInput = z.infer<typeof quoteSettingsSchema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>