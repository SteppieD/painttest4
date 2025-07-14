import Link from 'next/link'
import { BookOpen, ArrowRight, CheckCircle, TrendingUp, Users, FileText, Calculator } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Quote Painting Jobs: Complete Guide for Contractors | PaintQuote Pro',
  description: 'Learn how to quote painting jobs professionally. Step-by-step guide covering pricing, measurements, labor costs, and winning more contracts.',
  keywords: 'how to quote painting jobs, painting estimate guide, painting contractor pricing, painting quote tutorial, how to price painting work, painting business quotes',
  openGraph: {
    title: 'How to Quote Painting Jobs - Professional Guide',
    description: 'Master the art of quoting painting jobs. Learn professional techniques to price jobs accurately and win more contracts.',
    type: 'article',
  },
}

export default function HowToQuotePaintingJobs() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO-Optimized Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">PaintQuote Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/painting-estimate-calculator-free" className="transition-colors hover:text-foreground/80">
              Calculator
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/painting-quote-templates" className="transition-colors hover:text-foreground/80">
              Templates
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Start Free Trial
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section with H1 */}
        <section className="relative py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  How to Quote Painting Jobs Like a Pro
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  The complete guide to creating accurate, professional painting quotes that win more jobs 
                  and increase your profits. Learn the techniques successful contractors use.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Try Our Quote Tool
                  </Link>
                  <Link
                    href="#table-of-contents"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Read the Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section id="table-of-contents" className="border-t py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold">In This Guide:</h2>
              <nav className="mt-6 space-y-2">
                <a href="#step-1-measurements" className="block text-primary hover:underline">
                  1. Taking Accurate Measurements
                </a>
                <a href="#step-2-pricing" className="block text-primary hover:underline">
                  2. Understanding Charge Rates and Pricing
                </a>
                <a href="#step-3-labor" className="block text-primary hover:underline">
                  3. Calculating Labor Costs
                </a>
                <a href="#step-4-materials" className="block text-primary hover:underline">
                  4. Estimating Material Requirements
                </a>
                <a href="#step-5-profit" className="block text-primary hover:underline">
                  5. Adding Profit Margins
                </a>
                <a href="#step-6-presentation" className="block text-primary hover:underline">
                  6. Presenting Your Quote Professionally
                </a>
                <a href="#common-mistakes" className="block text-primary hover:underline">
                  7. Common Quoting Mistakes to Avoid
                </a>
              </nav>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <article className="py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl space-y-12">
              {/* Step 1: Measurements */}
              <section id="step-1-measurements">
                <h2 className="text-3xl font-bold">1. Taking Accurate Measurements</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Accurate measurements are the foundation of profitable painting quotes. Here's how to measure 
                  different surfaces correctly:
                </p>
                
                <h3 className="mt-8 text-xl font-semibold">Interior Measurements</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Walls:</strong> Measure height × width for each wall. Subtract doors and windows 
                      over 15 sq ft. Don't forget closets and hallways.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Ceilings:</strong> Length × width of the room. Add 10% for textured ceilings 
                      that require more paint.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Trim & Baseboards:</strong> Measure linear feet. Include door frames, window 
                      casings, and crown molding separately.
                    </div>
                  </li>
                </ul>

                <h3 className="mt-8 text-xl font-semibold">Exterior Measurements</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Siding:</strong> Measure each side of the house. Height × width, accounting for 
                      gables and architectural features.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Fascia & Soffits:</strong> Linear feet for fascia boards, square feet for 
                      soffits. Don't forget to check accessibility.
                    </div>
                  </li>
                </ul>

                <div className="mt-8 rounded-lg bg-muted p-6">
                  <p className="font-semibold">Pro Tip:</p>
                  <p className="mt-2">
                    Always add a 10-15% waste factor to your measurements. This covers touch-ups, overspray, 
                    and ensures you don't run short on materials.
                  </p>
                </div>
              </section>

              {/* Step 2: Pricing */}
              <section id="step-2-pricing">
                <h2 className="text-3xl font-bold">2. Understanding Charge Rates and Pricing</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Modern painting contractors use charge rates - a single price per unit that includes both 
                  materials and labor. This simplifies quoting and improves accuracy.
                </p>

                <h3 className="mt-8 text-xl font-semibold">Typical Charge Rates (2025)</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 text-left">Surface Type</th>
                        <th className="border p-3 text-left">Unit</th>
                        <th className="border p-3 text-left">Low End</th>
                        <th className="border p-3 text-left">Average</th>
                        <th className="border p-3 text-left">High End</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3">Interior Walls</td>
                        <td className="border p-3">per sq ft</td>
                        <td className="border p-3">$1.50</td>
                        <td className="border p-3">$2.50</td>
                        <td className="border p-3">$4.00</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Ceilings</td>
                        <td className="border p-3">per sq ft</td>
                        <td className="border p-3">$1.75</td>
                        <td className="border p-3">$3.00</td>
                        <td className="border p-3">$5.00</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Baseboards</td>
                        <td className="border p-3">per linear ft</td>
                        <td className="border p-3">$2.00</td>
                        <td className="border p-3">$3.50</td>
                        <td className="border p-3">$5.00</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Exterior Siding</td>
                        <td className="border p-3">per sq ft</td>
                        <td className="border p-3">$2.00</td>
                        <td className="border p-3">$3.50</td>
                        <td className="border p-3">$6.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6">
                  Factors that affect your charge rates:
                </p>
                <ul className="mt-4 space-y-2">
                  <li>• Geographic location and local market rates</li>
                  <li>• Surface condition and prep work required</li>
                  <li>• Paint quality and number of coats</li>
                  <li>• Job complexity and accessibility</li>
                  <li>• Your experience and reputation</li>
                </ul>
              </section>

              {/* Step 3: Labor */}
              <section id="step-3-labor">
                <h2 className="text-3xl font-bold">3. Calculating Labor Costs</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Labor typically represents 25-35% of your total project cost. Here's how to calculate it accurately:
                </p>

                <h3 className="mt-8 text-xl font-semibold">The 30% Rule</h3>
                <p className="mt-4">
                  A simple approach many contractors use: Labor = 30% of total charge. For example:
                </p>
                <ul className="mt-4 space-y-2">
                  <li>• Total project charge: $5,000</li>
                  <li>• Labor cost (30%): $1,500</li>
                  <li>• Materials and overhead (70%): $3,500</li>
                </ul>

                <h3 className="mt-8 text-xl font-semibold">Detailed Labor Calculation</h3>
                <p className="mt-4">
                  For more accuracy, calculate actual hours needed:
                </p>
                <ol className="mt-4 space-y-3">
                  <li>
                    <strong>1. Estimate hours per surface:</strong>
                    <ul className="mt-2 ml-6 space-y-1">
                      <li>• Walls: 150-200 sq ft per hour</li>
                      <li>• Ceilings: 100-150 sq ft per hour</li>
                      <li>• Trim: 50-75 linear ft per hour</li>
                    </ul>
                  </li>
                  <li>
                    <strong>2. Add prep time:</strong> Usually 20-40% of painting time
                  </li>
                  <li>
                    <strong>3. Multiply by hourly rate:</strong> $25-$75/hour depending on location
                  </li>
                </ol>
              </section>

              {/* Step 4: Materials */}
              <section id="step-4-materials">
                <h2 className="text-3xl font-bold">4. Estimating Material Requirements</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Accurate material estimates prevent costly overruns and ensure profitability.
                </p>

                <h3 className="mt-8 text-xl font-semibold">Paint Coverage Guidelines</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Standard paint:</strong> 350-400 sq ft per gallon
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Primer:</strong> 200-300 sq ft per gallon
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Textured surfaces:</strong> Reduce coverage by 25-30%
                    </div>
                  </li>
                </ul>

                <h3 className="mt-8 text-xl font-semibold">Additional Materials to Include</h3>
                <ul className="mt-4 space-y-2">
                  <li>• Primer (if needed)</li>
                  <li>• Brushes and rollers</li>
                  <li>• Drop cloths and plastic</li>
                  <li>• Tape and masking supplies</li>
                  <li>• Caulk and patching compounds</li>
                  <li>• Cleaning supplies</li>
                </ul>

                <div className="mt-8 rounded-lg bg-muted p-6">
                  <p className="font-semibold">Material Cost Formula:</p>
                  <p className="mt-2">
                    (Total Square Feet ÷ Coverage per Gallon) × Cost per Gallon × Number of Coats = Paint Cost
                  </p>
                </div>
              </section>

              {/* Step 5: Profit */}
              <section id="step-5-profit">
                <h2 className="text-3xl font-bold">5. Adding Profit Margins</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Your quote must include adequate profit to sustain and grow your business.
                </p>

                <h3 className="mt-8 text-xl font-semibold">Industry Standard Markups</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <TrendingUp className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Materials:</strong> Mark up 20-50% from wholesale cost
                    </div>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Labor:</strong> Include overhead (insurance, equipment, vehicles) plus 15-25% profit
                    </div>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Overall project:</strong> Aim for 20-40% net profit margin
                    </div>
                  </li>
                </ul>

                <p className="mt-6">
                  Remember: Charging too little hurts the entire industry. Price for value, not just to win jobs.
                </p>
              </section>

              {/* Step 6: Presentation */}
              <section id="step-6-presentation">
                <h2 className="text-3xl font-bold">6. Presenting Your Quote Professionally</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  A professional presentation can be the difference between winning and losing a job.
                </p>

                <h3 className="mt-8 text-xl font-semibold">Essential Quote Elements</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <FileText className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Company information:</strong> Logo, license number, insurance details
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Detailed scope:</strong> Exactly what's included (and what's not)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Itemized pricing:</strong> Break down by room or surface type
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Timeline:</strong> Start date, duration, and completion date
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <strong>Terms:</strong> Payment schedule, warranty, and conditions
                    </div>
                  </li>
                </ul>

                <h3 className="mt-8 text-xl font-semibold">Professional Tips</h3>
                <ul className="mt-4 space-y-2">
                  <li>• Deliver quotes within 24-48 hours while interest is high</li>
                  <li>• Use professional quote software or templates</li>
                  <li>• Include photos from the site visit</li>
                  <li>• Offer multiple options (good, better, best)</li>
                  <li>• Follow up within 3-5 days</li>
                </ul>
              </section>

              {/* Common Mistakes */}
              <section id="common-mistakes">
                <h2 className="text-3xl font-bold">7. Common Quoting Mistakes to Avoid</h2>
                <div className="mt-8 space-y-6">
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
                    <h3 className="text-xl font-semibold">❌ Underestimating prep work</h3>
                    <p className="mt-2">
                      Prep can take 30-50% of total job time. Always inspect surfaces carefully and price accordingly.
                    </p>
                  </div>
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
                    <h3 className="text-xl font-semibold">❌ Forgetting overhead costs</h3>
                    <p className="mt-2">
                      Insurance, equipment, vehicles, and office expenses must be factored into every quote.
                    </p>
                  </div>
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
                    <h3 className="text-xl font-semibold">❌ Racing to the bottom on price</h3>
                    <p className="mt-2">
                      Competing on price alone attracts bad clients and kills profitability. Sell value instead.
                    </p>
                  </div>
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
                    <h3 className="text-xl font-semibold">❌ Vague scope of work</h3>
                    <p className="mt-2">
                      Unclear quotes lead to disputes. Be specific about what's included and excluded.
                    </p>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="rounded-lg bg-muted p-8">
                <h2 className="text-2xl font-bold">Ready to Create Professional Quotes?</h2>
                <p className="mt-4 text-lg">
                  Mastering painting quotes takes practice, but with the right tools and knowledge, you can 
                  create accurate, profitable quotes that win more jobs.
                </p>
                <p className="mt-4 text-lg">
                  Our AI-powered quoting tool automates these calculations, ensuring accuracy and saving you 
                  hours on every estimate.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    Try PaintQuote Pro Free
                  </Link>
                  <Link
                    href="/painting-quote-templates"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    View Quote Templates
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </article>

        {/* Related Resources */}
        <section className="border-t py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Related Resources
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Link href="/painting-estimate-calculator-free" className="group">
                <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                  <Calculator className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">
                    Free Painting Calculator
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Calculate painting costs instantly with our professional estimation tool
                  </p>
                </div>
              </Link>
              <Link href="/painting-quote-templates" className="group">
                <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                  <FileText className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">
                    Quote Templates
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Download professional painting quote templates to use in your business
                  </p>
                </div>
              </Link>
              <Link href="/case-studies" className="group">
                <div className="rounded-lg border p-6 transition-colors hover:bg-accent">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">
                    Success Stories
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    See how contractors increased profits with better quoting practices
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 PaintQuote Pro. The complete guide to quoting painting jobs professionally.
          </p>
        </div>
      </footer>
    </div>
  )
}