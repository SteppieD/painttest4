import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Music, Sun, Droplets } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Austin Painting Contractors | Professional Painters in Austin, TX',
  description: 'Top-rated painting contractors in Austin, TX. Expert interior & exterior painting for Hill Country homes. Heat & humidity resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Austin painting contractors, painters Austin TX, Austin house painters, interior painting Austin, exterior painting Austin, commercial painting Austin',
  openGraph: {
    title: 'Austin Painting Contractors - #1 Painters in Live Music Capital',
    description: 'Professional painting services in Austin, TX. Weather-resistant finishes for Texas heat. Free quotes. Call (512) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-austin-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Austin Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/austin'
  }
}

const serviceAreas = [
  'Austin', 'Round Rock', 'Cedar Park', 'Georgetown', 'Pflugerville', 'Lakeway',
  'Westlake', 'Bee Cave', 'Dripping Springs', 'Kyle', 'Buda', 'Leander',
  'Manor', 'Hutto', 'Bastrop', 'Cedar Creek'
]

const localProjects = [
  {
    type: 'Modern Downtown Condo',
    location: 'Rainey Street District',
    description: '42-unit luxury complex',
    duration: '5 weeks',
    value: '$156,000'
  },
  {
    type: 'Hill Country Estate',
    location: 'Westlake Hills',
    description: '7,800 sq ft limestone home',
    duration: '2 weeks',
    value: '$35,400'
  },
  {
    type: 'Tech Campus',
    location: 'Domain NORTHSIDE',
    description: '3-building office complex',
    duration: '4 weeks',
    value: '$198,000'
  }
]

export default function AustinPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/austin',
    name: 'PaintQuote Pro Austin',
    image: 'https://paintquotepro.com/images/austin-office.jpg',
    telephone: '(512) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '800 Congress Ave',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.2672,
      longitude: -97.7431
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 30.2672,
        longitude: -97.7431
      },
      geoRadius: '40 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '412'
    }
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
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/locations" className="transition-colors hover:text-foreground/80">
                Locations
              </Link>
              <Link href="/services" className="transition-colors hover:text-foreground/80">
                Services
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="/contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <a href="tel:5125550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (512) 555-0123
              </a>
              <Link
                href="/quote"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Get Free Quote
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/locations' },
              { label: 'Austin' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Austin, TX
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Keep Austin Beautiful with expert painting services. Specializing in 
                    heat-resistant finishes and limestone-compatible coatings perfect for 
                    Texas Hill Country homes and Austin's eclectic architecture.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:5125550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (512) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2,450+</div>
                      <p className="text-sm text-muted-foreground">Austin Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">9 Years</div>
                      <p className="text-sm text-muted-foreground">In Austin</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Austin project image */}
                    <div className="flex h-full items-center justify-center">
                      <Music className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Greater Austin</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Central Texas</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Austin and Hill Country communities
                </p>
              </div>
              
              <div className="mt-12 grid gap-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {serviceAreas.map((area) => (
                  <div key={area} className="rounded-lg bg-muted/50 px-4 py-3 text-sm font-medium">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Austin-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Austin's Unique Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for Texas heat, humidity, and limestone surfaces
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Texas Heat Defense</h3>
                  <p className="mt-2 text-muted-foreground">
                    Austin's 100°F+ summers and intense sun require specialized paints. 
                    We use heat-reflective coatings that reduce surface temperature by 
                    up to 40°F and lower cooling costs.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Cool roof technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Heat-reflective pigments
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Energy Star rated
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Droplets className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Limestone Compatible</h3>
                  <p className="mt-2 text-muted-foreground">
                    Hill Country limestone requires pH-neutral products. Our specialized 
                    primers bond to limestone and prevent alkali burn-through while 
                    maintaining the stone's natural beauty.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      pH-neutral formulas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Mineral primers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Breathable systems
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Music className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Creative Color Matching</h3>
                  <p className="mt-2 text-muted-foreground">
                    Austin's eclectic style demands unique colors. From vibrant murals 
                    to subtle earth tones, we match any vision while ensuring HOA 
                    compliance and neighborhood harmony.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Custom color matching
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      HOA coordination
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Artistic finishes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Austin Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From downtown condos to Hill Country estates, see our work across Austin
              </p>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {localProjects.map((project, index) => (
                  <div key={index} className="rounded-lg bg-muted/50 p-6">
                    <h3 className="text-xl font-semibold">{project.type}</h3>
                    <p className="mt-1 flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {project.location}
                    </p>
                    <p className="mt-3">{project.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold">{project.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Project Value</p>
                        <p className="font-semibold">{project.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Local Testimonials */}
          <section className="bg-primary/5 py-16">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">What Austin Homeowners Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They handled our limestone home perfectly. The pH-neutral primer 
                    prevented any issues, and the heat-reflective topcoat has noticeably 
                    reduced our AC bills. True Austin professionals who get our climate."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Jennifer Walsh</strong>
                    <p className="text-sm text-muted-foreground">Westlake Hills Homeowner</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Outstanding work on our tech campus. They coordinated perfectly with 
                    our construction schedule and the modern color scheme looks incredible. 
                    The quality matches Austin's innovative spirit."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Marcus Chen</strong>
                    <p className="text-sm text-muted-foreground">Domain Tech Company</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Austin Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Austin Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Central Texas painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Austin Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$2.75 - $4.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, wall prep, cleanup</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Limestone</td>
                        <td className="px-6 py-4 font-semibold">$4.00 - $6.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Mineral primer, breathable paint</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Heat-Reflective Coating</td>
                        <td className="px-6 py-4 font-semibold">$4.50 - $6.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Energy-saving technology</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Commercial/Tech</td>
                        <td className="px-6 py-4 font-semibold">Volume Pricing</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Custom quotes, fast turnaround</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on surface type, accessibility, and specific requirements
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Keep Your Austin Property Weird & Beautiful?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Austin homeowners and businesses 
                trust us for quality finishes that beat the Texas heat.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:5125550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (512) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • TDLR #ABC123
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Austin Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Austin, Texas requires understanding both the technical 
                    challenges of our climate and the creative spirit of our city. Our 
                    Austin painting contractors have mastered working with Central Texas 
                    limestone, extreme heat, and the diverse architectural styles that 
                    make Austin unique – from historic homes in Hyde Park to modern 
                    high-rises downtown.
                  </p>
                  <p>
                    We use specialized products designed for Texas conditions, including 
                    Sherwin-Williams SuperPaint with VinylSafe technology for heat resistance 
                    and ROMABIO mineral paints specifically formulated for limestone surfaces. 
                    These premium materials ensure your paint job withstands Austin's 
                    100-degree summers and sudden weather changes.
                  </p>
                  <p>
                    Our portfolio spans Austin's eclectic neighborhoods, from the colorful 
                    bungalows of South Congress to the luxury estates of Westlake. We work 
                    closely with Austin's many HOAs and understand the balance between 
                    individual expression and community standards that makes our city special.
                  </p>
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
                <h3 className="text-lg font-semibold">Austin Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>800 Congress Ave</p>
                  <p>Austin, TX 78701</p>
                  <p>(512) 555-0123</p>
                  <p>austin@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Austin & Round Rock</li>
                  <li>Cedar Park & Leander</li>
                  <li>Lakeway & Bee Cave</li>
                  <li>Pflugerville & Georgetown</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Limestone Treatment</li>
                  <li>Heat-Reflective Coatings</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Mon-Fri: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 5:00 PM</li>
                  <li>Sunday: By appointment</li>
                  <li>Emergency service available</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Austin. Licensed & Insured. TDLR #ABC123</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}