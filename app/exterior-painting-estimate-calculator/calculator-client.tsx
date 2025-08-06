'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Plus, Minus, Info, Download, ArrowRight, Sun, Shield } from 'lucide-react'

interface Surface {
  id: number;
  name: string;
  type: 'siding' | 'trim' | 'shutters' | 'doors' | 'deck' | 'garage';
  area: number;
  length: number;
  count: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

export default function ExteriorPaintingCalculatorClient() {
  const [surfaces, setSurfaces] = useState<Surface[]>([
    { id: 1, name: 'Front Siding', type: 'siding', area: 800, length: 0, count: 0, condition: 'good' },
    { id: 2, name: 'Trim & Fascia', type: 'trim', area: 0, length: 200, count: 0, condition: 'fair' }
  ])
  
  // Base rates for different surfaces
  const [sidingRate, setSidingRate] = useState(3.50)
  const [trimRate, setTrimRate] = useState(4.50)
  const [shutterRate, setShutterRate] = useState(65)
  const [doorRate, setDoorRate] = useState(125)
  const [deckRate, setDeckRate] = useState(2.75)
  const [garageDoorRate, setGarageDoorRate] = useState(175)

  const addSurface = () => {
    setSurfaces([...surfaces, {
      id: surfaces.length + 1,
      name: `Surface ${surfaces.length + 1}`,
      type: 'siding',
      area: 0,
      length: 0,
      count: 0,
      condition: 'good'
    } as Surface])
  }

  const updateSurface = (id: number, field: keyof Surface, value: string | number) => {
    setSurfaces(surfaces.map(surface => 
      surface.id === id ? { ...surface, [field]: value } as Surface : surface
    ))
  }

  const removeSurface = (id: number) => {
    if (surfaces.length > 1) {
      setSurfaces(surfaces.filter(surface => surface.id !== id))
    }
  }

  const getConditionMultiplier = (condition: string) => {
    switch (condition) {
      case 'excellent': return 0.9
      case 'good': return 1.0
      case 'fair': return 1.2
      case 'poor': return 1.5
      default: return 1.0
    }
  }

  const calculateSurfaceTotal = (surface: Surface) => {
    const conditionMultiplier = getConditionMultiplier(surface.condition)
    
    switch (surface.type) {
      case 'siding':
        return (surface.area || 0) * sidingRate * conditionMultiplier
      case 'trim':
        return (surface.length || 0) * trimRate * conditionMultiplier
      case 'shutters':
        return (surface.count || 0) * shutterRate * conditionMultiplier
      case 'doors':
        return (surface.count || 0) * doorRate * conditionMultiplier
      case 'deck':
        return (surface.area || 0) * deckRate * conditionMultiplier
      case 'garage':
        return (surface.count || 0) * garageDoorRate * conditionMultiplier
      default:
        return 0
    }
  }

  const calculateTotal = () => {
    return surfaces.reduce((total, surface) => total + calculateSurfaceTotal(surface), 0)
  }

  const laborCost = calculateTotal() * 0.3
  const materialCost = calculateTotal() * 0.7

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Exterior Painting Estimate Calculator',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Free exterior painting estimate calculator for contractors. Calculate siding, trim, and exterior costs.',
          })
        }}
      />

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">PaintQuote Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-base font-medium">
            <Link href="/interior-painting-quote-calculator" className="transition-colors hover:text-foreground/80">
              Interior Calculator
            </Link>
            <Link href="/house-painting-cost-calculator" className="transition-colors hover:text-foreground/80">
              Full House Calculator
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
          </nav>
          <div className="ml-auto">
            <Link
              href="/auth/signup"
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Save & Get Full Features
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="border-b py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Exterior Painting Estimate Calculator
              </h1>
              <p className="mt-4 text-lg text-gray-200">
                Calculate exterior painting costs for any building. Add surfaces, adjust for condition, 
                and get accurate quotes for siding, trim, doors, decks, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Surface Input Section */}
                <div className="lg:col-span-2">
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Exterior Surfaces</h2>
                      <button
                        onClick={addSurface}
                        className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-base font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Surface
                      </button>
                    </div>

                    <div className="mt-6 space-y-6">
                      {surfaces.map((surface) => (
                        <div key={surface.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={surface.name}
                              onChange={(e) => updateSurface(surface.id, 'name', e.target.value)}
                              className="text-lg font-medium bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none"
                            />
                            {surfaces.length > 1 && (
                              <button
                                onClick={() => removeSurface(surface.id)}
                                className="text-destructive hover:text-destructive/80"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                            )}
                          </div>

                          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                            <div>
                              <label className="text-base font-medium">Surface Type</label>
                              <select
                                value={surface.type}
                                onChange={(e) => updateSurface(surface.id, 'type', e.target.value)}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                              >
                                <option value="siding">Siding</option>
                                <option value="trim">Trim/Fascia</option>
                                <option value="shutters">Shutters</option>
                                <option value="doors">Doors</option>
                                <option value="deck">Deck/Porch</option>
                                <option value="garage">Garage Door</option>
                              </select>
                            </div>

                            {(surface.type === 'siding' || surface.type === 'deck') && (
                              <div>
                                <label className="text-base font-medium">Area (sq ft)</label>
                                <input
                                  type="number"
                                  value={surface.area || ''}
                                  onChange={(e) => updateSurface(surface.id, 'area', Number(e.target.value))}
                                  className="mt-1 w-full rounded-md border px-3 py-2"
                                  placeholder="0"
                                />
                              </div>
                            )}

                            {surface.type === 'trim' && (
                              <div>
                                <label className="text-base font-medium">Length (linear ft)</label>
                                <input
                                  type="number"
                                  value={surface.length || ''}
                                  onChange={(e) => updateSurface(surface.id, 'length', Number(e.target.value))}
                                  className="mt-1 w-full rounded-md border px-3 py-2"
                                  placeholder="0"
                                />
                              </div>
                            )}

                            {(surface.type === 'shutters' || surface.type === 'doors' || surface.type === 'garage') && (
                              <div>
                                <label className="text-base font-medium">Count</label>
                                <input
                                  type="number"
                                  value={surface.count || ''}
                                  onChange={(e) => updateSurface(surface.id, 'count', Number(e.target.value))}
                                  className="mt-1 w-full rounded-md border px-3 py-2"
                                  placeholder="0"
                                />
                              </div>
                            )}

                            <div>
                              <label className="text-base font-medium">Condition</label>
                              <select
                                value={surface.condition}
                                onChange={(e) => updateSurface(surface.id, 'condition', e.target.value)}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                              >
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-base font-medium">Surface Total</label>
                              <div className="mt-1 rounded-md bg-muted px-3 py-2 font-semibold">
                                ${calculateSurfaceTotal(surface).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Charge Rates Section */}
                  <div className="mt-6 rounded-lg border bg-card p-6">
                    <h3 className="text-lg font-semibold">Exterior Charge Rates</h3>
                    <p className="mt-1 text-base text-gray-200">
                      Rates include prep work, primer, and two coats of paint
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label className="text-base font-medium">Siding ($/sq ft)</label>
                        <input
                          type="number"
                          value={sidingRate}
                          onChange={(e) => setSidingRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="0.25"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Trim/Fascia ($/linear ft)</label>
                        <input
                          type="number"
                          value={trimRate}
                          onChange={(e) => setTrimRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="0.25"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Shutters ($/each)</label>
                        <input
                          type="number"
                          value={shutterRate}
                          onChange={(e) => setShutterRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="5"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Doors ($/each)</label>
                        <input
                          type="number"
                          value={doorRate}
                          onChange={(e) => setDoorRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="5"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Deck/Porch ($/sq ft)</label>
                        <input
                          type="number"
                          value={deckRate}
                          onChange={(e) => setDeckRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="0.25"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Garage Door ($/each)</label>
                        <input
                          type="number"
                          value={garageDoorRate}
                          onChange={(e) => setGarageDoorRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Summary Section */}
                <div className="lg:col-span-1">
                  <div className="sticky top-4 rounded-lg border bg-card p-6">
                    <h2 className="text-xl font-semibold">Quote Summary</h2>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-200">Surface Breakdown</h3>
                        {surfaces.map((surface) => (
                          <div key={surface.id} className="mt-2 flex justify-between text-base">
                            <span>{surface.name}</span>
                            <span>${calculateSurfaceTotal(surface).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="mt-2 flex justify-between text-base text-gray-200">
                          <span>Labor (30%)</span>
                          <span>${laborCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base text-gray-200">
                          <span>Materials (70%)</span>
                          <span>${materialCost.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total Estimate</span>
                          <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <Link
                          href="/auth/signup"
                          className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground hover:bg-primary/90"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Save Quote as PDF
                        </Link>
                        <p className="text-center text-base text-gray-200">
                          Create a free account to save and share quotes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Condition Guide */}
                  <div className="mt-6 rounded-lg border bg-card p-4">
                    <h3 className="font-semibold">Surface Condition Guide</h3>
                    <div className="mt-3 space-y-2 text-base">
                      <div className="flex items-start">
                        <Shield className="mr-2 h-4 w-4 flex-shrink-0 text-green-600" />
                        <div>
                          <span className="font-medium">Excellent:</span> New or like-new, minimal prep
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Shield className="mr-2 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <div>
                          <span className="font-medium">Good:</span> Minor wear, standard prep needed
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Shield className="mr-2 h-4 w-4 flex-shrink-0 text-yellow-600" />
                        <div>
                          <span className="font-medium">Fair:</span> Moderate wear, scraping/sanding required
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Shield className="mr-2 h-4 w-4 flex-shrink-0 text-red-600" />
                        <div>
                          <span className="font-medium">Poor:</span> Heavy wear, extensive prep work
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="border-t py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-center text-3xl font-bold">
                Exterior Painting Cost Factors
              </h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold">Key Pricing Considerations</h3>
                  <ul className="mt-4 space-y-3 text-gray-200">
                    <li className="flex items-start">
                      <Sun className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Weather Protection:</strong> Exterior paint must withstand sun, rain, and temperature changes</span>
                    </li>
                    <li className="flex items-start">
                      <Home className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Surface Material:</strong> Wood, vinyl, stucco, and brick all require different approaches</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Height & Access:</strong> Multi-story homes require scaffolding or lifts</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Prep Work:</strong> Power washing, scraping, and priming add to costs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Average Exterior Painting Rates</h3>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Siding</span>
                        <span>$2.00 - $6.00 per sq ft</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Trim & Fascia</span>
                        <span>$3.00 - $8.00 per linear ft</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Shutters</span>
                        <span>$40 - $100 each</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Exterior Doors</span>
                        <span>$75 - $200 each</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Deck/Porch</span>
                        <span>$2.00 - $5.00 per sq ft</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Garage Doors</span>
                        <span>$100 - $300 each</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-lg bg-primary/5 p-8 text-center">
                <h3 className="text-2xl font-bold">Professional Exterior Quotes in Minutes</h3>
                <p className="mt-4 text-gray-200">
                  This calculator provides quick estimates. For detailed quotes with weather considerations, 
                  warranty options, and project scheduling, upgrade to PaintQuote Pro.
                </p>
                <Link
                  href="/auth/signup"
                  className="mt-6 inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-base font-semibold">Other Calculators</h3>
              <ul className="mt-4 space-y-2 text-base text-gray-200">
                <li><Link href="/interior-painting-quote-calculator" className="hover:text-foreground">Interior Calculator</Link></li>
                <li><Link href="/house-painting-cost-calculator" className="hover:text-foreground">Full House Calculator</Link></li>
                <li><Link href="/painting-estimate-calculator-free" className="hover:text-foreground">General Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-base text-gray-200">
                <li><Link href="/how-to-quote-painting-jobs" className="hover:text-foreground">How to Quote</Link></li>
                <li><Link href="/painting-quote-templates" className="hover:text-foreground">Quote Templates</Link></li>
                <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Software</h3>
              <ul className="mt-4 space-y-2 text-base text-gray-200">
                <li><Link href="/painting-estimate-software" className="hover:text-foreground">Estimate Software</Link></li>
                <li><Link href="/painting-contractors" className="hover:text-foreground">For Contractors</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-base text-gray-200">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="/help" className="hover:text-foreground">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
            <p>&copy; 2025 PaintQuote Pro. Free exterior painting estimate calculator for contractors.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}