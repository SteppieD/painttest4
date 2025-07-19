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
        <section className="py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-gray-900"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">
                The Quoting Time Crunch is Costing You Jobs
              </h2>
              <div className="grid gap-6 md:grid-cols-3 mb-16">
                <div className="glass-card p-8 text-center group card-hover-modern">
                  <div className="text-5xl font-bold text-gray-400 mb-2">3-6</div>
                  <div className="text-xl font-semibold text-white mb-2">Hours</div>
                  <p className="text-sm text-gray-400">Traditional quote creation</p>
                </div>
                <div className="glass-card p-8 text-center group card-hover-modern">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">10-15</div>
                  <div className="text-xl font-semibold text-white mb-2">Minutes</div>
                  <p className="text-sm text-gray-400">With PaintQuote Pro</p>
                </div>
                <div className="glass-card p-8 text-center group card-hover-modern">
                  <div className="text-5xl font-bold text-emerald-400 mb-2">+$8,400</div>
                  <div className="text-xl font-semibold text-white mb-2">Per Month</div>
                  <p className="text-sm text-gray-400">Average revenue increase</p>
                </div>
              </div>
              <div className="glass-card p-8 text-left container-glass">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Why Speed Matters in Painting Quotes
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">73% of customers choose the contractor who responds within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">Professional presentation increases win rates by 40-60%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">Same-day quotes close 2.5x more often than 48+ hour quotes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">Every day of delay decreases win probability by 15-25%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Features Section */}
        <ModernFeatures />

        {/* Common Failure Points Section */}
        <section className="py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-slate-900"></div>
          
          {/* Animated Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 -right-48 w-96 h-96 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center badge-modern text-slate-300 mb-8">
                  <Shield className="h-4 w-4 text-red-400" />
                  <span>Critical Analysis</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                  Why Painting Contractors Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">Losing 40-60%</span> of Potential Jobs
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Our research with 2,000+ contractors revealed these critical failure points
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 mb-16">
                <div className="glass-card p-8 group card-hover-modern">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-amber-400 rounded-full blur-md opacity-50"></div>
                      <div className="relative rounded-full bg-gradient-to-br from-red-400 to-amber-400 p-3">
                        <span className="text-2xl font-bold text-white">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Slow Response Time <span className="text-red-400">(40-60% of Lost Jobs)</span></h3>
                      <p className="text-gray-400 mb-4">
                        "Most customers tell me other painters don't even get the quotes back or 
                        they take a week to get it back to them"
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                        <Check className="h-4 w-4" />
                        <span>Solution: Quote on-site in minutes, not days later</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 group card-hover-modern">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-amber-400 rounded-full blur-md opacity-50"></div>
                      <div className="relative rounded-full bg-gradient-to-br from-red-400 to-amber-400 p-3">
                        <span className="text-2xl font-bold text-white">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Unprofessional Presentation <span className="text-red-400">(25-35% of Lost Jobs)</span></h3>
                      <p className="text-gray-400 mb-4">
                        Basic, hand-written quotes signal amateur operation. Customers choose 
                        contractors who look established.
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                        <Check className="h-4 w-4" />
                        <span>Solution: Professional templates with your branding</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 group card-hover-modern">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-amber-400 rounded-full blur-md opacity-50"></div>
                      <div className="relative rounded-full bg-gradient-to-br from-red-400 to-amber-400 p-3">
                        <span className="text-2xl font-bold text-white">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Inconsistent Follow-up <span className="text-red-400">(30-40% of Lost Jobs)</span></h3>
                      <p className="text-gray-400 mb-4">
                        "Too many contractors give up on a lead too early and lose the job"
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                        <Check className="h-4 w-4" />
                        <span>Solution: Automated reminders and follow-up sequences</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 group card-hover-modern">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-amber-400 rounded-full blur-md opacity-50"></div>
                      <div className="relative rounded-full bg-gradient-to-br from-red-400 to-amber-400 p-3">
                        <span className="text-2xl font-bold text-white">4</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Pricing Inconsistency <span className="text-red-400">(20-30% of Lost Jobs)</span></h3>
                      <p className="text-gray-400 mb-4">
                        Manual calculations often result in pricing that's either too high 
                        (losing jobs) or too low (losing profit)
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                        <Check className="h-4 w-4" />
                        <span>Solution: Built-in charge rate calculations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-10 text-center container-glass">
                <h3 className="text-3xl font-bold text-white mb-6">The Bottom Line</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  If you're doing 20 quotes per month with a 35% win rate, improving to 50% 
                  means <strong className="text-white">3 additional jobs monthly</strong>. At $2,800 average job value, 
                  that's <strong className="text-emerald-400">$8,400 more revenue per month</strong>.
                </p>
                <Link href="/roi-calculator" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative btn-primary-modern inline-flex items-center gap-2 px-8 py-4">
                    <Calculator className="h-5 w-5" />
                    Calculate Your ROI
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
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
        <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
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
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-slate-900 shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-8 py-3 text-base font-medium text-white hover:bg-white/10 transition-all duration-200"
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