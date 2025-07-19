import Link from 'next/link'
import { Check, Zap, Shield, BarChart, MessageSquare, Calculator } from 'lucide-react'
import SharedNavigationSimple from '@/components/shared-navigation-simple'
import { EnhancedHero } from '@/components/enhanced-hero'
import { ModernFeatures } from '@/components/modern-features'

export default function Home() {
  return (
    <>
      <SharedNavigationSimple />

      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <EnhancedHero />

        {/* Time Savings Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
                The Quoting Time Crunch is Costing You Jobs
              </h2>
              <div className="grid gap-8 md:grid-cols-3 mb-12">
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-muted-foreground/50">3-6</div>
                  <div className="text-lg font-semibold">Hours</div>
                  <p className="text-sm text-muted-foreground">Traditional quote creation</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-primary">10-15</div>
                  <div className="text-lg font-semibold">Minutes</div>
                  <p className="text-sm text-muted-foreground">With PaintQuote Pro</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-green-600">+$8,400</div>
                  <div className="text-lg font-semibold">Per Month</div>
                  <p className="text-sm text-muted-foreground">Average revenue increase</p>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 text-left">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Why Speed Matters in Painting Quotes
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>73% of customers choose the contractor who responds within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Professional presentation increases win rates by 40-60%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Same-day quotes close 2.5x more often than 48+ hour quotes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Every day of delay decreases win probability by 15-25%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Features Section */}
        <ModernFeatures />

        {/* Common Failure Points Section */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Why Painting Contractors Are Losing 40-60% of Potential Jobs
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our research with 2,000+ contractors revealed these critical failure points
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-3">
                      <span className="text-2xl font-bold text-red-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Slow Response Time (40-60% of Lost Jobs)</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Most customers tell me other painters don't even get the quotes back or 
                        they take a week to get it back to them"
                      </p>
                      <p className="text-sm font-medium text-primary">
                        Solution: Quote on-site in minutes, not days later
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-3">
                      <span className="text-2xl font-bold text-red-600">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Unprofessional Presentation (25-35% of Lost Jobs)</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Basic, hand-written quotes signal amateur operation. Customers choose 
                        contractors who look established.
                      </p>
                      <p className="text-sm font-medium text-primary">
                        Solution: Professional templates with your branding
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-3">
                      <span className="text-2xl font-bold text-red-600">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Inconsistent Follow-up (30-40% of Lost Jobs)</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Too many contractors give up on a lead too early and lose the job"
                      </p>
                      <p className="text-sm font-medium text-primary">
                        Solution: Automated reminders and follow-up sequences
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-3">
                      <span className="text-2xl font-bold text-red-600">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Pricing Inconsistency (20-30% of Lost Jobs)</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Manual calculations often result in pricing that's either too high 
                        (losing jobs) or too low (losing profit)
                      </p>
                      <p className="text-sm font-medium text-primary">
                        Solution: Built-in charge rate calculations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-lg bg-primary/10 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
                <p className="text-lg mb-6">
                  If you're doing 20 quotes per month with a 35% win rate, improving to 50% 
                  means <strong>3 additional jobs monthly</strong>. At $2,800 average job value, 
                  that's <strong>$8,400 more revenue per month</strong>.
                </p>
                <Link
                  href="/roi-calculator"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
                >
                  Calculate Your ROI
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Trusted by Painting Contractors
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what our customers have to say about PaintQuote Pro
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-background p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary text-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Before PaintQuote Pro, quotes took me 4-5 hours each. Now I'm done in 15 minutes 
                  and winning 60% more jobs. The speed of response makes all the difference."
                </p>
                <p className="font-semibold">Mike Rodriguez</p>
                <p className="text-sm text-muted-foreground">Rodriguez Painting LLC</p>
              </div>

              <div className="rounded-lg border bg-background p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary text-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I'm sending quotes same-day now instead of 3-4 days later. My close rate 
                  jumped from 25% to 65%. The professional templates really impress clients."
                </p>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Premier Coatings Inc</p>
              </div>

              <div className="rounded-lg border bg-background p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary text-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The analytics showed I was losing jobs to faster competitors. Now I quote 
                  in under 20 minutes and increased revenue by $12,000/month. Game changer!"
                </p>
                <p className="font-semibold">James Wilson</p>
                <p className="text-sm text-muted-foreground">Wilson & Sons Painting</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Transform Your Painting Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              The ROI is simple: Win 3 more jobs per month at $2,800 average = 
              $8,400 additional revenue. That's 100x your investment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
                <li><Link href="/api" className="hover:text-foreground">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/roi-calculator" className="hover:text-foreground">ROI Calculator</Link></li>
                <li><Link href="/paint-estimate-templates" className="hover:text-foreground">Estimate Templates</Link></li>
                <li><Link href="/painting-quote-templates" className="hover:text-foreground">Quote Templates</Link></li>
                <li><Link href="/painting-projects" className="hover:text-foreground">Our Work</Link></li>
                <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Locations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/locations/phoenix" className="hover:text-foreground">Phoenix</Link></li>
                <li><Link href="/locations/denver" className="hover:text-foreground">Denver</Link></li>
                <li><Link href="/locations/orlando" className="hover:text-foreground">Orlando</Link></li>
                <li><Link href="/locations/las-vegas" className="hover:text-foreground">Las Vegas</Link></li>
                <li><Link href="/locations/miami" className="hover:text-foreground">Miami</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-foreground">Security</Link></li>
                <li><Link href="/gdpr" className="hover:text-foreground">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PaintQuote Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}