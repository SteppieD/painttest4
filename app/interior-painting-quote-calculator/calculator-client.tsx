'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, Info, Download, ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

interface Room {
  id: number;
  name: string;
  walls: number;
  ceilings: number;
  trim: number;
  doors: number;
  windows: number;
}

export default function InteriorPaintingCalculatorClient() {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Living Room', walls: 400, ceilings: 200, trim: 60, doors: 2, windows: 3 }
  ])
  const [wallRate, setWallRate] = useState(2.50)
  const [ceilingRate, setCeilingRate] = useState(3.00)
  const [trimRate, setTrimRate] = useState(3.50)
  const [doorRate, setDoorRate] = useState(85)
  const [windowRate, setWindowRate] = useState(45)

  const addRoom = () => {
    setRooms([...rooms, {
      id: rooms.length + 1,
      name: `Room ${rooms.length + 1}`,
      walls: 0,
      ceilings: 0,
      trim: 0,
      doors: 0,
      windows: 0
    }])
  }

  const updateRoom = (id: number, field: string, value: number | string) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ))
  }

  const removeRoom = (id: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id))
    }
  }

  const calculateRoomTotal = (room: Room) => {
    return (room.walls * wallRate) + 
           (room.ceilings * ceilingRate) + 
           (room.trim * trimRate) + 
           (room.doors * doorRate) + 
           (room.windows * windowRate)
  }

  const calculateTotal = () => {
    return rooms.reduce((total, room) => total + calculateRoomTotal(room), 0)
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
            name: 'Interior Painting Quote Calculator',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Free interior painting quote calculator for contractors. Calculate room painting costs instantly.',
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
            <Link href="/exterior-painting-estimate-calculator" className="transition-colors hover:text-foreground/80">
              Exterior Calculator
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
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Calculators', href: '/painting-estimate-calculator-free' },
            { label: 'Interior Painting Quote Calculator' }
          ]}
          className="container"
        />
        
        {/* Hero Section */}
        <section className="border-b py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Interior Painting Quote Calculator
              </h1>
              <p className="mt-4 text-lg text-gray-200">
                Calculate interior painting costs instantly. Add rooms, enter measurements, 
                and get accurate quotes for walls, ceilings, trim, doors, and windows.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Room Input Section */}
                <div className="lg:col-span-2">
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Room Details</h2>
                      <button
                        onClick={addRoom}
                        className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-base font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Room
                      </button>
                    </div>

                    <div className="mt-6 space-y-6">
                      {rooms.map((room) => (
                        <div key={room.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={room.name}
                              onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                              className="text-lg font-medium bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none"
                            />
                            {rooms.length > 1 && (
                              <button
                                onClick={() => removeRoom(room.id)}
                                className="text-destructive hover:text-destructive/80"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                            )}
                          </div>

                          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <div>
                              <label className="text-base font-medium">Walls (sq ft)</label>
                              <input
                                type="number"
                                value={room.walls}
                                onChange={(e) => updateRoom(room.id, 'walls', Number(e.target.value))}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-base font-medium">Ceilings (sq ft)</label>
                              <input
                                type="number"
                                value={room.ceilings}
                                onChange={(e) => updateRoom(room.id, 'ceilings', Number(e.target.value))}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-base font-medium">Trim (linear ft)</label>
                              <input
                                type="number"
                                value={room.trim}
                                onChange={(e) => updateRoom(room.id, 'trim', Number(e.target.value))}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-base font-medium">Doors (count)</label>
                              <input
                                type="number"
                                value={room.doors}
                                onChange={(e) => updateRoom(room.id, 'doors', Number(e.target.value))}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-base font-medium">Windows (count)</label>
                              <input
                                type="number"
                                value={room.windows}
                                onChange={(e) => updateRoom(room.id, 'windows', Number(e.target.value))}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-base font-medium">Room Total</label>
                              <div className="mt-1 rounded-md bg-muted px-3 py-2 font-semibold">
                                ${calculateRoomTotal(room).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Charge Rates Section */}
                  <div className="mt-6 rounded-lg border bg-card p-6">
                    <h3 className="text-lg font-semibold">Charge Rates</h3>
                    <p className="mt-1 text-base text-gray-200">
                      Adjust rates based on your local market and paint quality
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label className="text-base font-medium">Walls ($/sq ft)</label>
                        <input
                          type="number"
                          value={wallRate}
                          onChange={(e) => setWallRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="0.25"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Ceilings ($/sq ft)</label>
                        <input
                          type="number"
                          value={ceilingRate}
                          onChange={(e) => setCeilingRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="0.25"
                        />
                      </div>
                      <div>
                        <label className="text-base font-medium">Trim ($/linear ft)</label>
                        <input
                          type="number"
                          value={trimRate}
                          onChange={(e) => setTrimRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="0.25"
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
                        <label className="text-base font-medium">Windows ($/each)</label>
                        <input
                          type="number"
                          value={windowRate}
                          onChange={(e) => setWindowRate(Number(e.target.value))}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          step="5"
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
                        <h3 className="font-medium text-gray-200">Room Breakdown</h3>
                        {rooms.map((room) => (
                          <div key={room.id} className="mt-2 flex justify-between text-base">
                            <span>{room.name}</span>
                            <span>${calculateRoomTotal(room).toFixed(2)}</span>
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
                          <span>Total Quote</span>
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
                Interior Painting Cost Factors
              </h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold">What Affects Interior Painting Costs?</h3>
                  <ul className="mt-4 space-y-3 text-gray-200">
                    <li className="flex items-start">
                      <Info className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Surface Condition:</strong> Walls needing repair or heavy prep work cost more</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Paint Quality:</strong> Premium paints cost more but last longer and look better</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Number of Coats:</strong> Dark colors or stained walls may need extra coats</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span><strong>Ceiling Height:</strong> Rooms over 10 feet require scaffolding or special equipment</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Average Interior Painting Rates</h3>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Walls</span>
                        <span>$1.50 - $4.00 per sq ft</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Ceilings</span>
                        <span>$1.75 - $5.00 per sq ft</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Trim & Baseboards</span>
                        <span>$2.00 - $5.00 per linear ft</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Interior Doors</span>
                        <span>$50 - $150 each</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Window Frames</span>
                        <span>$25 - $75 each</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-lg bg-primary/5 p-8 text-center">
                <h3 className="text-2xl font-bold">Get More Accurate Quotes with PaintQuote Pro</h3>
                <p className="mt-4 text-gray-200">
                  This calculator provides estimates. For detailed, professional quotes that win jobs, 
                  try our full software with AI assistance, customer management, and profit tracking.
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
                <li><Link href="/exterior-painting-estimate-calculator" className="hover:text-foreground">Exterior Calculator</Link></li>
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
            <p>&copy; 2025 PaintQuote Pro. Free interior painting quote calculator for contractors.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}