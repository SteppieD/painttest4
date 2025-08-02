import Link from 'next/link'
import { Metadata } from 'next'
import { Building, FileSpreadsheet, Calculator, Clock, Users, Shield, BarChart, TrendingUp, CheckCircle, ArrowRight, Briefcase, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commercial Painting Estimating Software | Large Project Tools | PaintQuote Pro',
  description: 'Professional commercial painting estimating software for large projects. Handle complex bids, multiple buildings, prevailing wage, and win more commercial contracts.',
  keywords: 'commercial painting estimating software, commercial painting software, industrial painting estimator, commercial paint estimating, large project estimating software',
  openGraph: {
    title: 'Commercial Painting Estimating Software - Win Bigger Projects',
    description: 'Specialized tools for commercial painting contractors. Complex bids, multi-phase projects, and enterprise features.',
    type: 'website',
  },
}

export default function CommercialPaintingEstimatingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PaintQuote Pro Commercial Painting Software',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: 'Enterprise-grade commercial painting estimating software for large-scale projects and government contracts.',
    offers: {
      '@type': 'Offer',
      price: '149',
      priceCurrency: 'USD',
    },
    featureList: [
      'Multi-building estimating',
      'Prevailing wage calculations',
      'Project phase management',
      'Subcontractor management',
      'Bond and insurance tracking',
      'Government contract compliance',
      'Enterprise reporting',
      'API integration',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-14 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">PaintQuote Pro</span>
            </Link>
            <nav className="flex items-center space-x-6 text-base font-medium">
              <Link href="/painting-contractors" className="transition-colors hover:text-foreground/80">
                For Contractors
              </Link>
              <Link href="/features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="/enterprise" className="transition-colors hover:text-foreground/80">
                Enterprise
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <Link
                href="/demo"
                className="text-base font-medium transition-colors hover:text-foreground/80"
              >
                Schedule Demo
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Commercial Painting Estimating Software Built for Scale
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  Handle million-dollar projects with confidence. From office buildings to industrial 
                  facilities, create accurate estimates for any commercial painting project.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center rounded-md border px-8 py-3 text-base font-medium hover:bg-accent"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    See Enterprise Demo
                  </Link>
                </div>
                <p className="mt-4 text-base text-gray-200">
                  Trusted by commercial contractors managing $100M+ in annual projects
                </p>
              </div>
            </div>
          </section>

          {/* Commercial Features */}
          <section className="border-t py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Enterprise Features for Commercial Painting Contractors
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Specialized tools designed for the complexity of commercial projects
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-lg border bg-card p-8">
                  <Building className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Multi-Building Projects</h3>
                  <p className="mt-2 text-gray-200">
                    Estimate entire campuses, shopping centers, or multi-phase developments. 
                    Break down by building, floor, or area with detailed tracking.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Building-by-building breakdown
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Phase scheduling
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Area categorization
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <FileSpreadsheet className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Specification Compliance</h3>
                  <p className="mt-2 text-gray-200">
                    Meet exact project specifications with detailed product tracking, 
                    mil thickness calculations, and warranty requirements.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Spec sheet integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Product compliance tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Warranty documentation
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <DollarSign className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Prevailing Wage Calculator</h3>
                  <p className="mt-2 text-gray-200">
                    Automatically calculate labor costs for government and union projects. 
                    Stay compliant with Davis-Bacon and local wage requirements.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Davis-Bacon rates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Union scale tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Certified payroll ready
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Subcontractor Management</h3>
                  <p className="mt-2 text-gray-200">
                    Manage multiple subs on large projects. Track bids, insurance, 
                    certifications, and coordinate schedules seamlessly.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Sub bid comparison
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Insurance tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Compliance monitoring
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Bond & Insurance Tracking</h3>
                  <p className="mt-2 text-gray-200">
                    Keep all project bonds, insurance certificates, and compliance 
                    documents organized and accessible for every project.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Performance bonds
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Payment bonds
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      COI management
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Enterprise Reporting</h3>
                  <p className="mt-2 text-gray-200">
                    Advanced analytics for multi-million dollar projects. Track costs, 
                    progress, and profitability across all commercial jobs.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Executive dashboards
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Project comparisons
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Profit analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Project Types */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Built for Every Type of Commercial Project
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  From office buildings to industrial facilities, we{"'"}ve got you covered
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-background p-6 text-center">
                  <Building className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Office Buildings</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Multi-floor offices, corporate campuses, and high-rise buildings
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Briefcase className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Retail & Hospitality</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Shopping centers, hotels, restaurants, and retail chains
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Building className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Healthcare Facilities</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Hospitals, medical offices, and specialized healthcare environments
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Shield className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Government & Education</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Schools, universities, military bases, and government buildings
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Building className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Industrial Facilities</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Warehouses, manufacturing plants, and distribution centers
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Building className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Multi-Family Housing</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Apartment complexes, condos, and large residential developments
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Shield className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Parking Structures</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Parking garages, decks, and specialty coating projects
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <Building className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-semibold">Special Projects</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Stadiums, airports, bridges, and unique architectural projects
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Commercial Workflow */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Streamlined Commercial Estimating Process
                  </h2>
                  <p className="mt-4 text-lg text-gray-200">
                    Win more commercial contracts with our proven estimating workflow
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                        1
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Import Plans & Specifications</h3>
                        <p className="mt-1 text-gray-200">
                          Upload blueprints, spec sheets, and project documents. AI extracts 
                          key information and populates your estimate.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                        2
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Digital Takeoff & Measurements</h3>
                        <p className="mt-1 text-gray-200">
                          Measure directly from plans or use our square footage calculators. 
                          Break down by area type, substrate, and coating system.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                        3
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Calculate Materials & Labor</h3>
                        <p className="mt-1 text-gray-200">
                          Automatically calculate paint, equipment, and labor needs. Factor in 
                          productivity rates, access requirements, and project complexity.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                        4
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Generate Professional Proposal</h3>
                        <p className="mt-1 text-gray-200">
                          Create detailed proposals with scope of work, exclusions, and 
                          terms. Include bonds, insurance, and compliance documentation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-lg bg-muted p-8">
                    <h3 className="text-xl font-semibold">Sample Commercial Estimate</h3>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-md bg-background p-4">
                        <h4 className="font-medium">Corporate Office Complex</h4>
                        <p className="mt-1 text-base text-gray-200">3 Buildings • 450,000 sq ft</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-base">
                          <span>Exterior Surfaces</span>
                          <span>$385,000</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Interior Common Areas</span>
                          <span>$215,000</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Office Spaces</span>
                          <span>$340,000</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Parking Structures</span>
                          <span>$160,000</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-base">
                          <span>Materials & Equipment</span>
                          <span>$440,000</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Labor (Prevailing Wage)</span>
                          <span>$660,000</span>
                        </div>
                        <div className="flex justify-between text-base font-medium">
                          <span>Subtotal</span>
                          <span>$1,100,000</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Overhead & Profit (18%)</span>
                          <span>$198,000</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Project Estimate</span>
                          <span className="text-primary">$1,298,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enterprise Features */}
          <section className="border-t bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Enterprise-Grade Security & Compliance
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Meet the strictest requirements for commercial and government projects
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-semibold">SOC 2 Type II Certified</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Independently audited for security, availability, and confidentiality
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-semibold">GDPR Compliant</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Full compliance with international data protection regulations
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-semibold">256-bit Encryption</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Bank-level encryption for all data at rest and in transit
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-semibold">Role-Based Access</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Granular permissions for estimators, PMs, and executives
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-semibold">Audit Trail</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Complete history of all estimate changes and approvals
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-semibold">API Access</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Integrate with ERP, accounting, and project management systems
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Success Metrics */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Trusted by Leading Commercial Painting Contractors
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  See the results our commercial customers are achieving
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">$2.5B+</div>
                  <p className="mt-2 text-lg font-semibold">Projects Estimated</p>
                  <p className="mt-1 text-base text-gray-200">
                    Total value of commercial projects
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">47%</div>
                  <p className="mt-2 text-lg font-semibold">Win Rate Increase</p>
                  <p className="mt-1 text-base text-gray-200">
                    Average improvement in bid success
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">3.2x</div>
                  <p className="mt-2 text-lg font-semibold">Faster Estimates</p>
                  <p className="mt-1 text-base text-gray-200">
                    Compared to spreadsheets
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <p className="mt-2 text-lg font-semibold">Accuracy Rate</p>
                  <p className="mt-1 text-base text-gray-200">
                    Within 5% of actual costs
                  </p>
                </div>
              </div>

              <div className="mt-16 rounded-lg border bg-muted/50 p-8">
                <div className="mx-auto max-w-3xl text-center">
                  <svg className="mx-auto h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <blockquote className="mt-6 text-xl font-medium">
                    "PaintQuote Pro helped us win a $12M university project. The detailed 
                    breakdown and professional presentation set us apart from competitors. 
                    It{"'"}s now essential to our commercial estimating process.{"\""}
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-semibold">Michael Torres</p>
                    <p className="text-gray-200">VP of Estimating, Premier Commercial Coatings</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t py-16 md:py-24">
            <div className="container">
              <div className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground md:px-12 md:py-16">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Ready to Win More Commercial Projects?
                </h2>
                <p className="mt-4 text-lg opacity-100">
                  Join hundreds of commercial painting contractors using our software to scale their business
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-background/90"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 py-3 text-base font-medium hover:bg-primary-foreground/20"
                  >
                    Schedule Enterprise Demo
                  </Link>
                </div>
                <p className="mt-4 text-base opacity-100">
                  30-day free trial • No credit card required • Full feature access
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-base font-semibold">Commercial Solutions</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/enterprise" className="hover:text-foreground">Enterprise Features</Link></li>
                  <li><Link href="/government-contracting" className="hover:text-foreground">Government Contracting</Link></li>
                  <li><Link href="/prevailing-wage-calculator" className="hover:text-foreground">Prevailing Wage Tool</Link></li>
                  <li><Link href="/api" className="hover:text-foreground">API Documentation</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/commercial-painting-guide" className="hover:text-foreground">Commercial Guide</Link></li>
                  <li><Link href="/rfp-response-templates" className="hover:text-foreground">RFP Templates</Link></li>
                  <li><Link href="/case-studies/commercial" className="hover:text-foreground">Commercial Case Studies</Link></li>
                  <li><Link href="/webinars" className="hover:text-foreground">Webinars</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Support</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/enterprise-support" className="hover:text-foreground">Enterprise Support</Link></li>
                  <li><Link href="/implementation" className="hover:text-foreground">Implementation Services</Link></li>
                  <li><Link href="/training" className="hover:text-foreground">Training Programs</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact Sales</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/security" className="hover:text-foreground">Security & Compliance</Link></li>
                  <li><Link href="/sla" className="hover:text-foreground">SLA</Link></li>
                  <li><Link href="/terms/enterprise" className="hover:text-foreground">Enterprise Terms</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. Enterprise commercial painting estimating software.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}