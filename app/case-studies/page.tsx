import Link from 'next/link'
import { TrendingUp, Clock, DollarSign, Users, Star, BarChart } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Contractor Success Stories | Case Studies | PaintQuote Pro',
  description: 'See how painting contractors increased profits and won more jobs with PaintQuote Pro. Real case studies and success stories from the field.',
  keywords: 'painting contractor success stories, painting business case studies, contractor testimonials, painting business growth, painting quote software results',
  openGraph: {
    title: 'Success Stories - How Contractors Grew with PaintQuote Pro',
    description: 'Real results from real painting contractors. See the impact of professional quoting.',
    type: 'article',
  },
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO-Optimized Header */}
      <SharedNavigation />

      <main>
        {/* Hero Section with H1 */}
        <section className="relative py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Painting Contractor Success Stories
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Real contractors. Real results. See how PaintQuote Pro helped painting businesses 
                increase profits, save time, and win more jobs.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  Start Your Success Story
                </Link>
                <Link
                  href="#results"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  View Results
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Results Overview */}
        <section id="results" className="border-t py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Average Results Across All Customers
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">87%</div>
                <p className="mt-2 text-lg font-semibold">Time Saved</p>
                <p className="text-base text-gray-200">On quote creation</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">42%</div>
                <p className="mt-2 text-lg font-semibold">More Jobs Won</p>
                <p className="text-base text-gray-200">Higher close rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">3.2x</div>
                <p className="mt-2 text-lg font-semibold">ROI</p>
                <p className="text-base text-gray-200">Return on investment</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">$18K</div>
                <p className="mt-2 text-lg font-semibold">Extra Revenue</p>
                <p className="text-base text-gray-200">Per month average</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study 1 */}
        <section className="bg-muted/50 py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-background p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Rodriguez Painting LLC</h2>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-lg text-gray-200">Phoenix, Arizona • 12 employees</p>
                
                <blockquote className="mt-8 border-l-4 border-primary pl-6">
                  <p className="text-xl italic">
                    "PaintQuote Pro transformed our business. We went from spending 2-3 hours per quote 
                    to just 15 minutes. The AI understands painting terminology perfectly and catches 
                    details we used to miss."
                  </p>
                  <footer className="mt-4">
                    <strong>Mike Rodriguez</strong>, Owner
                  </footer>
                </blockquote>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">58%</p>
                    <p className="text-base text-gray-200">Revenue increase</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <Clock className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">91%</p>
                    <p className="text-base text-gray-200">Time saved on quotes</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <Users className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">2.5x</p>
                    <p className="text-base text-gray-200">More quotes sent</p>
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-semibold">The Challenge</h3>
                <p className="mt-4 text-gray-200">
                  Rodriguez Painting was losing jobs to competitors who responded faster. Their manual 
                  quoting process took hours and often contained errors, leading to unprofitable jobs.
                </p>

                <h3 className="mt-6 text-xl font-semibold">The Solution</h3>
                <p className="mt-4 text-gray-200">
                  They implemented PaintQuote Pro's AI chat system, allowing them to generate quotes 
                  during the initial site visit. The charge rate calculator ensured consistent, 
                  profitable pricing on every job.
                </p>

                <h3 className="mt-6 text-xl font-semibold">The Results</h3>
                <ul className="mt-4 space-y-2 text-gray-200">
                  <li>• Grew from $80K to $126K monthly revenue in 6 months</li>
                  <li>• Increased quote-to-job conversion rate from 22% to 38%</li>
                  <li>• Eliminated pricing errors that cost them $3-5K monthly</li>
                  <li>• Hired 4 additional painters to handle increased workload</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study 2 */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-background p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Premier Coatings Inc</h2>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-lg text-gray-200">Seattle, Washington • 8 employees</p>
                
                <blockquote className="mt-8 border-l-4 border-primary pl-6">
                  <p className="text-xl italic">
                    "The charge rate system is brilliant. No more complex calculations trying to 
                    separate materials and labor. We set our rates once and the system handles 
                    everything. Our profit margins improved by 15% immediately."
                  </p>
                  <footer className="mt-4">
                    <strong>Sarah Chen</strong>, CEO
                  </footer>
                </blockquote>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">15%</p>
                    <p className="text-base text-gray-200">Higher profit margins</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <BarChart className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">73%</p>
                    <p className="text-base text-gray-200">Better job tracking</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <Star className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">4.9</p>
                    <p className="text-base text-gray-200">Customer rating</p>
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-semibold">The Challenge</h3>
                <p className="mt-4 text-gray-200">
                  Premier Coatings specialized in high-end residential repaints but struggled with 
                  inconsistent pricing. Different estimators quoted different prices for similar 
                  jobs, confusing customers and hurting profitability.
                </p>

                <h3 className="mt-6 text-xl font-semibold">The Solution</h3>
                <p className="mt-4 text-gray-200">
                  They standardized their pricing using PaintQuote Pro's charge rate system. All 
                  estimators now use the same rates, ensuring consistency. The analytics dashboard 
                  helps them track which types of jobs are most profitable.
                </p>

                <h3 className="mt-6 text-xl font-semibold">The Results</h3>
                <ul className="mt-4 space-y-2 text-gray-200">
                  <li>• Increased average job value from $4,200 to $5,100</li>
                  <li>• Reduced quote preparation time by 85%</li>
                  <li>• Improved customer satisfaction scores to 4.9/5.0</li>
                  <li>• Identified and focused on most profitable job types</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study 3 */}
        <section className="bg-muted/50 py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-background p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Wilson & Sons Painting</h2>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-lg text-gray-200">Atlanta, Georgia • 25 employees</p>
                
                <blockquote className="mt-8 border-l-4 border-primary pl-6">
                  <p className="text-xl italic">
                    "We've increased our quote acceptance rate by 40% since switching to PaintQuote Pro. 
                    Professional quotes make all the difference. Clients trust us more when they see 
                    detailed, accurate proposals delivered quickly."
                  </p>
                  <footer className="mt-4">
                    <strong>James Wilson</strong>, President
                  </footer>
                </blockquote>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <Users className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">40%</p>
                    <p className="text-base text-gray-200">Higher close rate</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">$2.1M</p>
                    <p className="text-base text-gray-200">Annual revenue</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <Clock className="h-8 w-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold">24hr</p>
                    <p className="text-base text-gray-200">Quote turnaround</p>
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-semibold">The Challenge</h3>
                <p className="mt-4 text-gray-200">
                  As a larger operation focusing on commercial projects, Wilson & Sons needed to 
                  process high volumes of quote requests quickly. Their old system couldn't scale, 
                  causing them to miss opportunities.
                </p>

                <h3 className="mt-6 text-xl font-semibold">The Solution</h3>
                <p className="mt-4 text-gray-200">
                  They deployed PaintQuote Pro across their entire sales team. The AI chat interface 
                  allowed even junior estimators to create accurate quotes. Integration with their 
                  CRM streamlined the entire sales process.
                </p>

                <h3 className="mt-6 text-xl font-semibold">The Results</h3>
                <ul className="mt-4 space-y-2 text-gray-200">
                  <li>• Scaled from $1.3M to $2.1M annual revenue</li>
                  <li>• Reduced quote turnaround from 5 days to 24 hours</li>
                  <li>• Won 3 major commercial contracts worth $400K+</li>
                  <li>• Expanded into new market segments successfully</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Small Contractor Success */}
        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Success at Every Scale
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-200">
              PaintQuote Pro works for contractors of all sizes, from solo operators to large crews
            </p>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {/* Solo Contractor */}
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-semibold">Solo Contractor</h3>
                <p className="mt-2 font-medium text-gray-200">
                  Tom's Quality Painting • Chicago, IL
                </p>
                <div className="mt-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-base italic">
                    "As a one-man operation, time is everything. PaintQuote Pro lets me quote jobs 
                    on-site and close deals immediately. My income doubled in the first year."
                  </p>
                  <p className="mt-2 text-base font-semibold">— Tom Martinez</p>
                </div>
                <div className="mt-4 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span>Monthly revenue:</span>
                    <span className="font-semibold">$8K → $16K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jobs per month:</span>
                    <span className="font-semibold">8 → 15</span>
                  </div>
                </div>
              </div>

              {/* Small Crew */}
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-semibold">Small Crew</h3>
                <p className="mt-2 font-medium text-gray-200">
                  Coastal Painters • San Diego, CA
                </p>
                <div className="mt-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-base italic">
                    "We were drowning in paperwork. Now our crew leader can create quotes in the 
                    field while I focus on growing the business. Game changer!"
                  </p>
                  <p className="mt-2 text-base font-semibold">— Lisa Park</p>
                </div>
                <div className="mt-4 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span>Team size:</span>
                    <span className="font-semibold">3 → 6 painters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quote accuracy:</span>
                    <span className="font-semibold">+95%</span>
                  </div>
                </div>
              </div>

              {/* Growing Company */}
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-semibold">Growing Company</h3>
                <p className="mt-2 font-medium text-gray-200">
                  Elite Finishes • Denver, CO
                </p>
                <div className="mt-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-base italic">
                    "PaintQuote Pro scaled with us perfectly. From 5 to 15 employees, the system 
                    handled our growth and helped maintain quality standards."
                  </p>
                  <p className="mt-2 text-base font-semibold">— Robert Lee</p>
                </div>
                <div className="mt-4 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span>Annual growth:</span>
                    <span className="font-semibold">+127%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit margin:</span>
                    <span className="font-semibold">22% → 31%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator CTA */}
        <section className="bg-primary py-12 text-primary-foreground md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Calculate Your Potential ROI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
              Based on our customer data, here's what you could achieve with PaintQuote Pro
            </p>
            
            <div className="mx-auto mt-12 max-w-2xl rounded-lg bg-background p-8 text-foreground">
              <h3 className="text-xl font-semibold">If you currently create 20 quotes per month:</h3>
              <div className="mt-6 space-y-4 text-left">
                <div className="flex justify-between border-b pb-2">
                  <span>Time saved per month:</span>
                  <span className="font-semibold">35 hours</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Additional quotes possible:</span>
                  <span className="font-semibold">+30 quotes</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Expected close rate increase:</span>
                  <span className="font-semibold">+15-20%</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-primary">
                  <span>Potential revenue increase:</span>
                  <span>+$15,000/month</span>
                </div>
              </div>
              <p className="mt-6 text-base text-gray-200">
                *Based on average customer results. Individual results may vary.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
              >
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by Painting Contractors Nationwide
              </h2>
              <div className="mt-12 grid gap-8 md:grid-cols-4">
                <div>
                  <div className="text-4xl font-bold text-primary">2,847</div>
                  <p className="mt-2 text-base text-gray-200">Active Contractors</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">186K</div>
                  <p className="mt-2 text-base text-gray-200">Quotes Created</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">$47M</div>
                  <p className="mt-2 text-base text-gray-200">In Quoted Work</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">4.8/5</div>
                  <p className="mt-2 text-base text-gray-200">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-base text-gray-200">
              © 2025 PaintQuote Pro. Helping contractors succeed since 2023.
            </p>
            <div className="flex gap-6">
              <Link href="/painting-estimate-calculator-free" className="text-base text-gray-200 hover:text-foreground">
                Calculator
              </Link>
              <Link href="/how-to-quote-painting-jobs" className="text-base text-gray-200 hover:text-foreground">
                How to Quote
              </Link>
              <Link href="/painting-quote-templates" className="text-base text-gray-200 hover:text-foreground">
                Templates
              </Link>
              <Link href="/pricing" className="text-base text-gray-200 hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}