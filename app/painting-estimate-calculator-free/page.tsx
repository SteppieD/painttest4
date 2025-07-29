import Link from 'next/link'
import { Calculator, ArrowRight, Check, Clock, DollarSign } from 'lucide-react'
import { Metadata } from 'next'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Free Painting Estimate Calculator | Get Instant Quotes | PaintQuote Pro',
  description: 'Calculate painting costs instantly with our free online painting estimate calculator. Get accurate quotes for interior and exterior painting projects in seconds.',
  keywords: 'painting estimate calculator, painting cost calculator, free painting calculator, paint job calculator, house painting calculator, room painting calculator',
  openGraph: {
    title: 'Free Painting Estimate Calculator - Get Instant Quotes',
    description: 'Calculate your painting project costs instantly. Free tool for contractors and homeowners.',
    type: 'website',
  },
}

export default function PaintingEstimateCalculator() {
  return (
    <>
      <SharedNavigation />
      <div className="min-h-screen bg-background pt-14">
        <main>
        {/* Hero Section with H1 */}
        <section className="relative py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Free Painting Estimate Calculator
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Calculate accurate painting costs instantly. Our professional-grade calculator helps contractors 
                and homeowners estimate interior and exterior painting projects in seconds.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Calculator Free
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Learn How It Works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="border-t py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Why Use Our Painting Calculator?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Save Time</h3>
                <p className="mt-2 text-gray-200">
                  Generate professional painting estimates in under 60 seconds instead of hours
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Accurate Pricing</h3>
                <p className="mt-2 text-gray-200">
                  Industry-standard charge rates ensure competitive and profitable quotes
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Professional Results</h3>
                <p className="mt-2 text-gray-200">
                  Impress clients with detailed, itemized quotes that win more jobs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Types Section */}
        <section className="bg-muted/50 py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Painting Calculators for Every Project
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-200">
              Our comprehensive calculator handles all types of painting projects with precision
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-semibold">Interior Painting Calculator</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Wall painting cost calculator</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Ceiling painting estimates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Trim and baseboard calculations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Door and window frame pricing</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-semibold">Exterior Painting Calculator</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>House siding cost calculator</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Deck and fence estimates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Garage door painting costs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Fascia and soffit calculations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              How Our Painting Calculator Works
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="mt-4 text-xl font-semibold">Enter Project Details</h3>
                <p className="mt-2 text-gray-200">
                  Input room dimensions, surface types, and project specifications into our easy-to-use form
                </p>
              </div>
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="mt-4 text-xl font-semibold">AI Calculates Costs</h3>
                <p className="mt-2 text-gray-200">
                  Our intelligent system applies professional charge rates and calculates material and labor costs
                </p>
              </div>
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="mt-4 text-xl font-semibold">Get Instant Quote</h3>
                <p className="mt-2 text-gray-200">
                  Receive a detailed, professional quote you can share with clients or use for project planning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="border-t py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-12 max-w-3xl space-y-8">
              <div>
                <h3 className="text-xl font-semibold">How accurate is the painting estimate calculator?</h3>
                <p className="mt-2 text-gray-200">
                  Our calculator uses industry-standard charge rates and factors in both materials and labor costs. 
                  While estimates are highly accurate, final costs may vary based on specific project conditions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Can I use this calculator for commercial painting projects?</h3>
                <p className="mt-2 text-gray-200">
                  Yes! Our calculator handles both residential and commercial painting projects. Simply select 
                  the appropriate surface types and enter your measurements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">How much does it cost to use the painting calculator?</h3>
                <p className="mt-2 text-gray-200">
                  The basic calculator is completely free. Create a free account to save quotes and access 
                  advanced features. Professional plans start at $79/month for unlimited quotes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">What's included in the painting cost estimate?</h3>
                <p className="mt-2 text-gray-200">
                  Estimates include paint materials, supplies, labor costs (30% of total), prep work, and 
                  standard profit margins. You can customize rates in your account settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12 text-primary-foreground md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start Calculating Painting Costs Now
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
              Join thousands of painting contractors who save hours on every quote
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
              >
                Try Calculator Free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <p className="text-center text-base text-gray-200">
            © 2025 PaintQuote Pro. Professional painting estimate calculator for contractors.
          </p>
        </div>
      </footer>
      </div>
    </>
  )
}