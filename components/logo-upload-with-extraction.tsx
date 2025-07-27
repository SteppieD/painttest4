'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Upload, Building2, Palette, Check } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface ExtractedColors {
  primary: string
  secondary: string
  accent: string
  dark: string
  light: string
}

interface LogoUploadProps {
  currentLogoUrl?: string
  onLogoChange: (logoUrl: string, colors?: ExtractedColors) => void
  companyName: string
}

export function LogoUploadWithExtraction({ 
  currentLogoUrl, 
  onLogoChange,
  companyName 
}: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [extractedColors, setExtractedColors] = useState<ExtractedColors | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>('default')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const extractColors = async (imageUrl: string): Promise<ExtractedColors> => {
    // In production, this would use a library like Vibrant.js or Color Thief
    // For now, we'll simulate color extraction
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Simple color extraction - in production use proper algorithm
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        
        // Sample colors from different regions
        const colors: number[][] = []
        const sampleSize = Math.floor(pixels.length / 4 / 100) // Sample 1% of pixels
        
        for (let i = 0; i < pixels.length; i += 4 * sampleSize) {
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]
          const a = pixels[i + 3]
          
          if (a > 200) { // Only consider opaque pixels
            colors.push([r, g, b])
          }
        }

        // Sort by brightness and pick strategic colors
        colors.sort((a, b) => {
          const brightnessA = (a[0] + a[1] + a[2]) / 3
          const brightnessB = (b[0] + b[1] + b[2]) / 3
          return brightnessB - brightnessA
        })

        const extractedColors: ExtractedColors = {
          primary: rgbToHex(colors[Math.floor(colors.length * 0.3)] || [59, 130, 246]),
          secondary: rgbToHex(colors[Math.floor(colors.length * 0.5)] || [139, 92, 246]),
          accent: rgbToHex(colors[Math.floor(colors.length * 0.7)] || [16, 185, 129]),
          dark: rgbToHex(colors[Math.floor(colors.length * 0.9)] || [30, 41, 59]),
          light: rgbToHex(colors[Math.floor(colors.length * 0.1)] || [241, 245, 249])
        }

        resolve(extractedColors)
      }

      img.src = imageUrl
    })
  }

  const rgbToHex = (rgb: number[]): string => {
    return '#' + rgb.map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (PNG, JPG, etc.)',
        variant: 'destructive'
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive'
      })
      return
    }

    setIsUploading(true)

    try {
      // Convert to base64 for preview and color extraction
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64 = reader.result as string
        
        // Extract colors
        const colors = await extractColors(base64)
        setExtractedColors(colors)
        
        // In production, upload to cloud storage here
        // For now, we'll use the base64 URL
        onLogoChange(base64, colors)
        
        toast({
          title: 'Logo uploaded successfully!',
          description: 'We\'ve extracted your brand colors from the logo.',
        })
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload logo. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsUploading(false)
    }
  }

  const themes = extractedColors ? [
    {
      name: 'Professional',
      preview: {
        header: extractedColors.primary,
        accent: extractedColors.secondary,
        text: extractedColors.dark,
        background: '#ffffff'
      }
    },
    {
      name: 'Modern',
      preview: {
        header: '#ffffff',
        accent: extractedColors.primary,
        text: extractedColors.dark,
        background: extractedColors.light
      }
    },
    {
      name: 'Bold',
      preview: {
        header: extractedColors.accent,
        accent: extractedColors.primary,
        text: '#ffffff',
        background: extractedColors.dark
      }
    }
  ] : []

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <div>
        <Label>Company Logo</Label>
        <div className="mt-2 flex items-center gap-4">
          {currentLogoUrl ? (
            <img 
              src={currentLogoUrl} 
              alt="Company logo" 
              className="h-20 w-20 rounded-lg object-contain bg-white p-2" 
            />
          ) : (
            <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Logo'}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Colors */}
      {extractedColors && (
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4" />
            Extracted Brand Colors
          </Label>
          <div className="flex gap-2">
            {Object.entries(extractedColors).map(([name, color]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-12 h-12 rounded-lg border shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs mt-1 capitalize">{name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Theme Previews */}
      {themes.length > 0 && (
        <div>
          <Label className="mb-3">Quote Theme Options</Label>
          <div className="grid gap-3">
            {themes.map((theme) => (
              <Card 
                key={theme.name}
                className={`p-3 cursor-pointer transition-all ${
                  selectedTheme === theme.name 
                    ? 'ring-2 ring-primary' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTheme(theme.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{theme.name}</span>
                  {selectedTheme === theme.name && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                
                {/* Mini Quote Preview */}
                <div className="rounded border overflow-hidden text-xs">
                  <div 
                    className="p-2 font-medium"
                    style={{ 
                      backgroundColor: theme.preview.header,
                      color: theme.preview.header === '#ffffff' ? theme.preview.text : '#ffffff'
                    }}
                  >
                    {companyName || 'Your Company'}
                  </div>
                  <div 
                    className="p-2"
                    style={{ backgroundColor: theme.preview.background }}
                  >
                    <div 
                      className="h-1 w-16 rounded mb-1"
                      style={{ backgroundColor: theme.preview.accent }}
                    />
                    <div 
                      className="h-1 w-24 rounded"
                      style={{ backgroundColor: theme.preview.text, opacity: 0.3 }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}