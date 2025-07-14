import Link from 'next/link'
import { Check, Zap, Shield, BarChart, MessageSquare, Calculator } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">PaintQuote Pro</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="#testimonials" className="transition-colors hover:text-foreground/80">
                Testimonials
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link
              href="/auth/signin"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Start Free Trial
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-14">
          <div className="container relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center py-24 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Professional Painting Quotes in Minutes
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-powered quote generation with intelligent charge rate calculations. 
                Save hours on estimates and win more jobs with accurate, professional quotes.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  View Pricing
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                No credit card required • 1 free quote per month • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Everything You Need to Grow Your Painting Business
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From AI-powered quotes to business analytics, we've got you covered
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Quote Assistant</h3>
                <p className="text-muted-foreground">
                  Chat naturally with Claude Sonnet to generate accurate quotes. 
                  Our AI understands painting terminology and extracts all details automatically.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Charge Rate Calculator</h3>
                <p className="text-muted-foreground">
                  Intelligent pricing with automatic labor calculations. Set your charge rates 
                  once and let the system handle the complex calculations.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <BarChart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Business Analytics</h3>
                <p className="text-muted-foreground">
                  Track conversion rates, revenue trends, and customer insights. 
                  Make data-driven decisions to grow your business.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Instant Quotes</h3>
                <p className="text-muted-foreground">
                  Generate professional PDF quotes in seconds. Send directly to clients 
                  with your branding and terms.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with automatic backups. Your data is encrypted 
                  and protected at all times.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <Check className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Intuitive interface designed for painters, not tech experts. Get started 
                  in minutes with our guided setup.
                </p>
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
                  "PaintQuote Pro transformed how we handle estimates. The AI assistant 
                  understands exactly what we need and saves us hours every week."
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
                  "The charge rate system is brilliant. No more complex calculations - 
                  just set your rates and let the software do the work. Highly recommended!"
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
                  "We've increased our quote acceptance rate by 40% since switching to 
                  PaintQuote Pro. Professional quotes make all the difference."
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
              Join hundreds of contractors who are winning more jobs with professional, 
              AI-powered quotes.
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
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
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
                <li><Link href="/painting-estimate-calculator-free" className="hover:text-foreground">Free Calculator</Link></li>
                <li><Link href="/how-to-quote-painting-jobs" className="hover:text-foreground">How to Quote</Link></li>
                <li><Link href="/painting-quote-templates" className="hover:text-foreground">Quote Templates</Link></li>
                <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
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