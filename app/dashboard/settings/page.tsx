'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'

interface ChargeRates {
  // Interior
  walls: number
  ceilings: number
  baseboards: number
  crownMolding: number
  doors: number
  windows: number
  // Exterior
  exteriorWalls: number
  fascia: number
  soffits: number
  exteriorDoors: number
  exteriorWindows: number
}

interface CompanySettings {
  companyName: string
  taxRate: number
  overheadPercent: number
  profitMargin: number
  chargeRates: ChargeRates
}

const defaultSettings: CompanySettings = {
  companyName: 'Acme Painting Co.',
  taxRate: 8.25,
  overheadPercent: 15,
  profitMargin: 30,
  chargeRates: {
    // Interior (per sq ft unless noted)
    walls: 3.50,
    ceilings: 4.00,
    baseboards: 2.50, // per linear foot
    crownMolding: 5.00, // per linear foot
    doors: 125.00, // per unit
    windows: 75.00, // per unit
    // Exterior
    exteriorWalls: 4.50, // per sq ft
    fascia: 6.00, // per linear foot
    soffits: 5.00, // per sq ft
    exteriorDoors: 150.00, // per unit
    exteriorWindows: 100.00, // per unit
  }
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<CompanySettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load settings from API
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }

  const saveSettings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      toast({
        title: 'Settings saved',
        description: 'Your settings have been updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateChargeRate = (key: keyof ChargeRates, value: string) => {
    const numValue = parseFloat(value) || 0
    setSettings(prev => ({
      ...prev,
      chargeRates: {
        ...prev.chargeRates,
        [key]: numValue
      }
    }))
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your company settings and charge rates
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="interior">Interior Rates</TabsTrigger>
          <TabsTrigger value="exterior">Exterior Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic company settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>Tax, overhead, and profit margins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="overhead">Overhead (%)</Label>
                  <Input
                    id="overhead"
                    type="number"
                    step="0.01"
                    value={settings.overheadPercent}
                    onChange={(e) => setSettings({ ...settings, overheadPercent: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="profit">Profit Margin (%)</Label>
                  <Input
                    id="profit"
                    type="number"
                    step="0.01"
                    value={settings.profitMargin}
                    onChange={(e) => setSettings({ ...settings, profitMargin: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interior Charge Rates</CardTitle>
              <CardDescription>
                Set your charge rates for interior surfaces. Rates include both labor and materials.
                Labor is automatically calculated as 30% of the total charge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="walls">Walls (per sq ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="walls"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.walls}
                      onChange={(e) => updateChargeRate('walls', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ceilings">Ceilings (per sq ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="ceilings"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.ceilings}
                      onChange={(e) => updateChargeRate('ceilings', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="baseboards">Baseboards (per linear ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="baseboards"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.baseboards}
                      onChange={(e) => updateChargeRate('baseboards', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="crownMolding">Crown Molding (per linear ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="crownMolding"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.crownMolding}
                      onChange={(e) => updateChargeRate('crownMolding', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="doors">Doors & Door Jams (per unit)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="doors"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.doors}
                      onChange={(e) => updateChargeRate('doors', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="windows">Windows (per unit)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="windows"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.windows}
                      onChange={(e) => updateChargeRate('windows', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exterior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exterior Charge Rates</CardTitle>
              <CardDescription>
                Set your charge rates for exterior surfaces. Rates include both labor and materials.
                Labor is automatically calculated as 30% of the total charge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="exteriorWalls">Exterior Walls (per sq ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="exteriorWalls"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.exteriorWalls}
                      onChange={(e) => updateChargeRate('exteriorWalls', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fascia">Fascia Boards (per linear ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="fascia"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.fascia}
                      onChange={(e) => updateChargeRate('fascia', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="soffits">Soffits (per sq ft)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="soffits"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.soffits}
                      onChange={(e) => updateChargeRate('soffits', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="exteriorDoors">Exterior Doors (per unit)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="exteriorDoors"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.exteriorDoors}
                      onChange={(e) => updateChargeRate('exteriorDoors', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="exteriorWindows">Exterior Windows (per unit)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="exteriorWindows"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={settings.chargeRates.exteriorWindows}
                      onChange={(e) => updateChargeRate('exteriorWindows', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}