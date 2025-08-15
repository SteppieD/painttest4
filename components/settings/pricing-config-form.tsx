'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import { DollarSign, MapPin, Calendar, Palette, Settings, TrendingUp } from 'lucide-react';
import type { CompanyPricingConfig } from '@/lib/config/pricing-config';

interface PricingConfigFormProps {
  companyId: number;
  initialConfig?: CompanyPricingConfig;
  onSave?: (config: CompanyPricingConfig) => void;
}

export function PricingConfigForm({ companyId, initialConfig, onSave }: PricingConfigFormProps) {
  const [config, setConfig] = useState<CompanyPricingConfig>(
    initialConfig || {
      companyId,
      baseRates: {
        wallsPerSqft: 1.50,
        ceilingsPerSqft: 1.25,
        doorsPerUnit: 150,
        windowsPerUnit: 100,
        primerPerSqft: 0.45,
        trimPerLinearFt: 2.50
      },
      seasonalPricing: {
        spring: 1.05,
        summer: 1.15,
        fall: 1.05,
        winter: 0.95
      },
      locationPricing: {
        urban: 1.2,
        suburban: 1.0,
        rural: 0.85
      },
      paintSuppliers: {
        preferredSuppliers: ['Sherwin-Williams', 'Benjamin Moore'],
        products: {
          primer: {
            economy: { name: 'Basic Primer', multiplier: 0.8, spreadRate: 200, costPerGallon: 20 },
            standard: { name: 'Standard Primer', multiplier: 1.0, spreadRate: 250, costPerGallon: 25 },
            premium: { name: 'Premium Primer', multiplier: 1.3, spreadRate: 300, costPerGallon: 35 },
            luxury: { name: 'Luxury Primer', multiplier: 1.6, spreadRate: 350, costPerGallon: 45 }
          },
          wallPaint: {
            economy: { name: 'Budget Paint', multiplier: 0.8, spreadRate: 300, costPerGallon: 25 },
            standard: { name: 'Standard Paint', multiplier: 1.0, spreadRate: 350, costPerGallon: 35 },
            premium: { name: 'Premium Paint', multiplier: 1.3, spreadRate: 400, costPerGallon: 50 },
            luxury: { name: 'Designer Paint', multiplier: 1.6, spreadRate: 450, costPerGallon: 75 }
          },
          ceilingPaint: {
            economy: { name: 'Ceiling White', multiplier: 0.8, spreadRate: 350, costPerGallon: 20 },
            standard: { name: 'Ceiling Paint', multiplier: 1.0, spreadRate: 350, costPerGallon: 30 },
            premium: { name: 'Premium Ceiling', multiplier: 1.3, spreadRate: 400, costPerGallon: 40 },
            luxury: { name: 'Luxury Ceiling', multiplier: 1.6, spreadRate: 450, costPerGallon: 55 }
          },
          trimPaint: {
            economy: { name: 'Basic Trim', multiplier: 0.8, spreadRate: 150, costPerGallon: 30 },
            standard: { name: 'Trim Paint', multiplier: 1.0, spreadRate: 175, costPerGallon: 40 },
            premium: { name: 'Premium Trim', multiplier: 1.3, spreadRate: 200, costPerGallon: 55 },
            luxury: { name: 'Luxury Trim', multiplier: 1.6, spreadRate: 225, costPerGallon: 70 }
          }
        }
      },
      overheadPercent: 15,
      profitMargin: 30,
      minimumJobPrice: 500,
      rushJobMultiplier: 1.25,
      prepWorkMultipliers: {
        none: 1.0,
        light: 1.1,
        moderate: 1.25,
        heavy: 1.5,
        extreme: 1.75
      },
      complexityMultipliers: {
        simple: 0.9,
        standard: 1.0,
        detailed: 1.2,
        highDetail: 1.4,
        custom: 1.6
      },
      heightMultipliers: {
        standard: 1.0,
        high: 1.1,
        veryHigh: 1.25,
        cathedral: 1.5
      },
      lastUpdated: new Date()
    }
  );

  const handleSave = async () => {
    try {
      // Save to API
      const response = await fetch('/api/companies/pricing-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Pricing configuration saved successfully'
        });
        onSave?.(config);
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save pricing configuration',
        variant: 'destructive'
      });
      console.error(error);
    }
  };

  const updateBaseRate = (field: keyof typeof config.baseRates, value: number) => {
    setConfig(prev => ({
      ...prev,
      baseRates: {
        ...prev.baseRates,
        [field]: value
      }
    }));
  };

  const updateSeasonalPricing = (season: keyof typeof config.seasonalPricing, value: number) => {
    setConfig(prev => ({
      ...prev,
      seasonalPricing: {
        ...prev.seasonalPricing,
        [season]: value
      }
    }));
  };

  const updateLocationPricing = (location: keyof typeof config.locationPricing, value: number) => {
    setConfig(prev => ({
      ...prev,
      locationPricing: {
        ...prev.locationPricing,
        [location]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pricing Configuration</CardTitle>
          <CardDescription>
            Configure your base rates and pricing adjustments for different conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="base-rates" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="base-rates">Base Rates</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
            </TabsList>

            <TabsContent value="base-rates" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Base Pricing Rates
                </h3>
                <p className="text-sm text-muted-foreground">
                  These are your standard rates before any adjustments
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="walls">Walls (per sq ft)</Label>
                    <Input
                      id="walls"
                      type="number"
                      step="0.01"
                      value={config.baseRates.wallsPerSqft}
                      onChange={(e) => updateBaseRate('wallsPerSqft', parseFloat(e.target.value))}
                      placeholder="1.50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ceilings">Ceilings (per sq ft)</Label>
                    <Input
                      id="ceilings"
                      type="number"
                      step="0.01"
                      value={config.baseRates.ceilingsPerSqft}
                      onChange={(e) => updateBaseRate('ceilingsPerSqft', parseFloat(e.target.value))}
                      placeholder="1.25"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doors">Doors (per unit)</Label>
                    <Input
                      id="doors"
                      type="number"
                      step="1"
                      value={config.baseRates.doorsPerUnit}
                      onChange={(e) => updateBaseRate('doorsPerUnit', parseFloat(e.target.value))}
                      placeholder="150"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="windows">Windows (per unit)</Label>
                    <Input
                      id="windows"
                      type="number"
                      step="1"
                      value={config.baseRates.windowsPerUnit}
                      onChange={(e) => updateBaseRate('windowsPerUnit', parseFloat(e.target.value))}
                      placeholder="100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primer">Primer (per sq ft)</Label>
                    <Input
                      id="primer"
                      type="number"
                      step="0.01"
                      value={config.baseRates.primerPerSqft}
                      onChange={(e) => updateBaseRate('primerPerSqft', parseFloat(e.target.value))}
                      placeholder="0.45"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trim">Trim (per linear ft)</Label>
                    <Input
                      id="trim"
                      type="number"
                      step="0.01"
                      value={config.baseRates.trimPerLinearFt}
                      onChange={(e) => updateBaseRate('trimPerLinearFt', parseFloat(e.target.value))}
                      placeholder="2.50"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seasonal" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Seasonal Pricing Adjustments
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adjust your rates based on seasonal demand (1.0 = no change, 1.15 = 15% increase)
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Spring</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.seasonalPricing.spring - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.seasonalPricing.spring]}
                      onValueChange={([value]) => updateSeasonalPricing('spring', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Summer (Busy Season)</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.seasonalPricing.summer - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.seasonalPricing.summer]}
                      onValueChange={([value]) => updateSeasonalPricing('summer', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Fall</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.seasonalPricing.fall - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.seasonalPricing.fall]}
                      onValueChange={([value]) => updateSeasonalPricing('fall', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Winter (Off Season)</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.seasonalPricing.winter - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.seasonalPricing.winter]}
                      onValueChange={([value]) => updateSeasonalPricing('winter', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location-Based Pricing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adjust rates based on job location
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Urban Areas</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.locationPricing.urban - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.locationPricing.urban]}
                      onValueChange={([value]) => updateLocationPricing('urban', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Suburban Areas</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.locationPricing.suburban - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.locationPricing.suburban]}
                      onValueChange={([value]) => updateLocationPricing('suburban', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Rural Areas</Label>
                      <span className="text-sm text-muted-foreground">
                        {((config.locationPricing.rural - 1) * 100).toFixed(0)}% adjustment
                      </span>
                    </div>
                    <Slider
                      value={[config.locationPricing.rural]}
                      onValueChange={([value]) => updateLocationPricing('rural', value)}
                      min={0.8}
                      max={1.5}
                      step={0.05}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Paint Products Configuration
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure paint products by grade with spread rates and costs
                </p>
                
                <div className="text-sm text-muted-foreground">
                  Product configuration can be adjusted per grade (Economy, Standard, Premium, Luxury)
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Suppliers</Label>
                  <Input
                    value={config.paintSuppliers.preferredSuppliers.join(', ')}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      paintSuppliers: {
                        ...prev.paintSuppliers,
                        preferredSuppliers: e.target.value.split(',').map(s => s.trim())
                      }
                    }))}
                    placeholder="Sherwin-Williams, Benjamin Moore, Behr"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="adjustments" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Additional Adjustments
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="overhead">Overhead (%)</Label>
                    <Input
                      id="overhead"
                      type="number"
                      value={config.overheadPercent}
                      onChange={(e) => setConfig(prev => ({ ...prev, overheadPercent: parseFloat(e.target.value) }))}
                      placeholder="15"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="profit">Profit Margin (%)</Label>
                    <Input
                      id="profit"
                      type="number"
                      value={config.profitMargin}
                      onChange={(e) => setConfig(prev => ({ ...prev, profitMargin: parseFloat(e.target.value) }))}
                      placeholder="30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minimum">Minimum Job Price</Label>
                    <Input
                      id="minimum"
                      type="number"
                      value={config.minimumJobPrice}
                      onChange={(e) => setConfig(prev => ({ ...prev, minimumJobPrice: parseFloat(e.target.value) }))}
                      placeholder="500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rush">Rush Job Multiplier</Label>
                    <Input
                      id="rush"
                      type="number"
                      step="0.05"
                      value={config.rushJobMultiplier}
                      onChange={(e) => setConfig(prev => ({ ...prev, rushJobMultiplier: parseFloat(e.target.value) }))}
                      placeholder="1.25"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}