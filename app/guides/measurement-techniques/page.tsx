import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Ruler,
  Calculator,
  Camera,
  Smartphone,
  Square,
  Home,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
  Maximize2,
  ScanLine
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Measurement Techniques: Laser, App & Manual Methods [2024]',
  description: 'Master accurate painting measurements with laser tools, mobile apps, and manual techniques. Calculate square footage correctly for perfect quotes.',
  keywords: 'painting measurement techniques, measure rooms for painting, laser measuring painting, square footage calculation',
  openGraph: {
    title: 'Professional Painting Measurement Techniques',
    description: 'Learn exact measurement methods for accurate painting quotes using modern tools and proven techniques.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/measurement-techniques'
  }
}

// Schema markup
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://paintquotepro.com/guides/measurement-techniques"
      },
      "headline": "Painting Measurement Techniques: Professional Guide",
      "description": "Complete guide to measuring for painting projects using laser tools, apps, and manual methods for accurate estimates.",
      "datePublished": "2024-01-25",
      "dateModified": "2024-01-25",
      "author": {
        "@type": "Organization",
        "name": "PaintQuote Pro"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you measure a room for painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To measure a room for painting: 1) Measure wall height and width separately, 2) Calculate each wall area (height × width), 3) Add all wall areas together, 4) Subtract doors (21 sq ft) and windows (15 sq ft avg), 5) Add ceiling area if painting. For accuracy, use a laser measurer and always measure twice."
          }
        },
        {
          "@type": "Question",
          "name": "What tools do professional painters use for measuring?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Professional painters use: Laser distance measurers (accurate to 1/16\"), measuring apps (RoomScan, MagicPlan), traditional tape measures (25-30 ft), digital measuring wheels for large spaces, and photo documentation tools. Laser measurers save 75% of measuring time with 99% accuracy."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Measure Rooms for Painting",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Prepare the space",
          "text": "Clear pathways and ensure good lighting for accurate measurements"
        },
        {
          "@type": "HowToStep",
          "name": "Measure wall dimensions",
          "text": "Use laser measurer to capture height and width of each wall"
        },
        {
          "@type": "HowToStep",
          "name": "Document openings",
          "text": "Measure and subtract doors, windows, and built-ins"
        },
        {
          "@type": "HowToStep",
          "name": "Calculate total area",
          "text": "Add all surfaces and apply measurement formulas"
        },
        {
          "@type": "HowToStep",
          "name": "Verify measurements",
          "text": "Double-check critical dimensions and document with photos"
        }
      ]
    }
  ]
}

export default function MeasurementTechniquesGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-12">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li>/</li>
                <li><Link href="/guides/paint-calculator" className="hover:text-white">Paint Calculator</Link></li>
                <li>/</li>
                <li className="text-white">Measurement Techniques</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional Painting Measurement Techniques
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master accurate measurements with modern tools and proven methods. Save time, 
                eliminate errors, and create precise quotes. Part of our 
                <Link href="/guides/paint-calculator" className="text-blue-400 hover:text-blue-300"> paint calculator guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                    Try Smart Measuring
                    <ScanLine className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/guides/paint-calculator">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Back to Calculator
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Section */}
        <section className="py-8 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">How Do You Measure a Room for Painting?</h2>
                <p className="text-lg text-gray-300">
                  To measure for painting: 1) Measure wall height and width separately using a laser measurer, 
                  2) Calculate each wall area (height × width), 3) Add all wall areas together, 4) Subtract 
                  doors (21 sq ft) and windows (15 sq ft average), 5) Add ceiling if painting. Professional 
                  laser tools provide 99% accuracy and save 75% of measuring time.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Modern Measuring Tools */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Modern Measuring Tools Comparison</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/30 p-6">
                  <div className="flex items-start gap-4">
                    <ScanLine className="h-10 w-10 text-amber-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Laser Distance Measurers</h3>
                      <div className="text-2xl font-bold text-amber-400 mb-2">99% Accurate</div>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>Measure up to 165 ft</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>Instant area calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>Bluetooth data transfer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>Works in bright sunlight</span>
                        </li>
                      </ul>
                      <div className="bg-gray-900/50 rounded p-3">
                        <p className="text-sm text-gray-300">
                          <strong className="text-amber-400">Top Pick:</strong> Bosch GLM 50 C ($120)
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="h-10 w-10 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Measuring Apps</h3>
                      <div className="text-2xl font-bold text-blue-400 mb-2">90-95% Accurate</div>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>AR room scanning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>Automatic floor plans</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                          <span>Photo documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-400 mt-1" />
                          <span>Requires good lighting</span>
                        </li>
                      </ul>
                      <div className="bg-gray-900/50 rounded p-3">
                        <p className="text-sm text-gray-300">
                          <strong className="text-blue-400">Best Apps:</strong> RoomScan Pro, MagicPlan
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="bg-gray-800/30 border-gray-700 p-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Traditional Tools Still Needed</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Ruler className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-300 mb-1">Tape Measure</h4>
                    <p className="text-sm text-gray-400">For detail work & verification</p>
                  </div>
                  <div className="text-center">
                    <Square className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-300 mb-1">Speed Square</h4>
                    <p className="text-sm text-gray-400">Checking corners & angles</p>
                  </div>
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-300 mb-1">Camera</h4>
                    <p className="text-sm text-gray-400">Document conditions</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Step-by-Step Measurement Process */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Professional Measurement Process</h2>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Room Preparation</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="space-y-2 text-gray-300">
                          <li>• Clear measurement paths</li>
                          <li>• Turn on all lights</li>
                          <li>• Close all doors</li>
                        </ul>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Note special features</li>
                          <li>• Check wall conditions</li>
                          <li>• Identify obstacles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Wall Measurements</h3>
                      <div className="bg-gray-900/50 rounded p-4 mb-4">
                        <h4 className="text-amber-400 font-semibold mb-2">Laser Technique:</h4>
                        <ol className="space-y-2 text-gray-300 text-sm">
                          <li>1. Place laser flat against wall</li>
                          <li>2. Aim at opposite wall at same height</li>
                          <li>3. Record width measurement</li>
                          <li>4. Rotate 90° for height</li>
                          <li>5. Repeat for each wall</li>
                        </ol>
                      </div>
                      <div className="bg-amber-500/10 rounded p-3">
                        <p className="text-sm text-amber-400">
                          <strong>Pro Tip:</strong> Measure at 3 points (top, middle, bottom) to check for bowing
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Opening Deductions</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-2">Standard Deductions:</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Entry door: 21 sq ft</li>
                            <li>• Interior door: 18 sq ft</li>
                            <li>• Double door: 36 sq ft</li>
                            <li>• Garage door: 128 sq ft</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-2">Window Sizes:</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Small (2×3): 6 sq ft</li>
                            <li>• Standard (3×5): 15 sq ft</li>
                            <li>• Large (4×6): 24 sq ft</li>
                            <li>• Picture (6×8): 48 sq ft</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Room Type Formulas */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Measurement Formulas by Room Type</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Home className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Standard Rooms</h3>
                  <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                    <p className="text-green-400">{"// Basic Formula"}</p>
                    <p className="text-yellow-400">Wall Area = 2(L+W) × H</p>
                    <p className="text-gray-400 mt-2">{"// Example: 12×15 room, 9ft ceiling"}</p>
                    <p className="text-cyan-400">= 2(12+15) × 9</p>
                    <p className="text-cyan-400">= 54 × 9 = 486 sq ft</p>
                    <p className="text-gray-400 mt-2">{"// Subtract openings"}</p>
                    <p className="text-cyan-400">- 2 windows (30 sq ft)</p>
                    <p className="text-cyan-400">- 1 door (21 sq ft)</p>
                    <p className="text-green-400 font-bold">= 435 sq ft paintable</p>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Maximize2 className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Complex Spaces</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-1">Stairwells:</h4>
                      <p className="text-sm text-gray-300">Average wall height × perimeter + 20%</p>
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-1">Cathedral Ceilings:</h4>
                      <p className="text-sm text-gray-300">(Low wall + high wall) ÷ 2 × width</p>
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-1">Dormers:</h4>
                      <p className="text-sm text-gray-300">Measure each surface separately</p>
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-1">Bay Windows:</h4>
                      <p className="text-sm text-gray-300">Add 15-20 sq ft per bay</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/30 p-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Estimation Tricks</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-amber-400">Floor × 3.5</div>
                    <p className="text-sm text-gray-400">Quick wall area estimate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">-15%</div>
                    <p className="text-sm text-gray-400">Standard opening deduction</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">+10%</div>
                    <p className="text-sm text-gray-400">Always add safety margin</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Measurement Mistakes */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Avoid These Measurement Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Common Errors</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1" />
                      <div>
                        <strong>Using floor area for walls</strong>
                        <p className="text-sm text-gray-400">Can underestimate by 200%+</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1" />
                      <div>
                        <strong>Forgetting closets</strong>
                        <p className="text-sm text-gray-400">Adds 50-100 sq ft typically</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1" />
                      <div>
                        <strong>Measuring only once</strong>
                        <p className="text-sm text-gray-400">Always verify critical dims</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1" />
                      <div>
                        <strong>Ignoring texture</strong>
                        <p className="text-sm text-gray-400">Textured walls need 20%+ more</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Best Practices</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                      <div>
                        <strong>Create a sketch</strong>
                        <p className="text-sm text-gray-400">Visual reference prevents errors</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                      <div>
                        <strong>Photo everything</strong>
                        <p className="text-sm text-gray-400">Reference for office calculations</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                      <div>
                        <strong>Label measurements</strong>
                        <p className="text-sm text-gray-400">North wall, South wall, etc.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                      <div>
                        <strong>Note special conditions</strong>
                        <p className="text-sm text-gray-400">Water damage, repairs needed</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Measurement Checklist */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Professional Measurement Checklist</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">Interior Checklist</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Wall dimensions (H × W)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Ceiling area and height</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Door count and sizes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Window measurements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Trim linear footage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Closet interiors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Special features</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">Exterior Checklist</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Siding square footage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Gable measurements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Soffit and fascia LF</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Garage door area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Shutters count</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Foundation height</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Accessibility issues</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-amber-500/10 rounded">
                  <p className="text-sm text-gray-300">
                    <strong className="text-amber-400">Download Tip:</strong> Take a photo of this checklist 
                    or save it to your phone for easy field reference.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Measure Once, Quote Right
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our app connects to laser measurers, calculates areas instantly, and creates 
                  professional quotes on-site. Save 45 minutes per estimate with 99% accuracy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                      Try Smart Measuring
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/guides/paint-calculator">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Paint Calculator Guide
                      <FileText className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Measurement Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/paint-calculator" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Paint Calculator
                    </h3>
                    <p className="text-sm text-gray-400">
                      Complete calculation guide
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/paint-coverage-rates" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Maximize2 className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Coverage Rates
                    </h3>
                    <p className="text-sm text-gray-400">
                      Paint coverage by surface
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/paint-quantity-calculations" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Square className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Quantity Calculations
                    </h3>
                    <p className="text-sm text-gray-400">
                      Advanced paint formulas
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </>
  )
}