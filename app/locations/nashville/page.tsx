import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Music2, CloudRain, Home } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Nashville Painting Contractors | Professional Painters in Nashville, TN',
  description: 'Top-rated painting contractors in Nashville, TN. Expert interior & exterior painting for Music City homes. Weather-resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Nashville painting contractors, painters Nashville TN, Nashville house painters, interior painting Nashville, exterior painting Nashville, commercial painting Nashville',
  openGraph: {
    title: 'Nashville Painting Contractors - #1 Painters in Music City',
    description: 'Professional painting services in Nashville, TN. Humidity-resistant finishes for Tennessee weather. Free quotes. Call (615) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-nashville-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Nashville Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/nashville'
  }
}

const serviceAreas = [
  'Nashville', 'Franklin', 'Brentwood', 'Murfreesboro', 'Hendersonville', 'Gallatin',
  'Mount Juliet', 'Lebanon', 'Smyrna', 'La Vergne', 'Spring Hill', 'Nolensville',
  'Belle Meade', 'Green Hills', 'East Nashville', 'Germantown'
]

const localProjects = [
  {
    type: 'Music Venue Renovation',
    location: 'Broadway District',
    description: 'Historic honky-tonk restoration',
    duration: '2 weeks',
    value: '$45,000'
  },
  {
    type: 'Belle Meade Estate',
    location: 'Belle Meade',
    description: '9,200 sq ft antebellum home',
    duration: '12 days',
    value: '$52,000'
  },
  {
    type: 'Healthcare Complex',
    location: 'Medical District',
    description: '5-building medical campus',
    duration: '5 weeks',
    value: '$215,000'
  }
]

export default function NashvillePaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/nashville',
    name: 'PaintQuote Pro Nashville',
    image: 'https://paintquotepro.com/images/nashville-office.jpg',
    telephone: '(615) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Music Square',
      addressLocality: 'Nashville',
      addressRegion: 'TN',
      postalCode: '37203',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.1627,
      longitude: -86.7816
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
        latitude: 36.1627,
        longitude: -86.7816
      },
      geoRadius: '40 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '612'
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
              <a href="tel:6155550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (615) 555-0123
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
              { label: 'Nashville' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Nashville, TN
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Music City's premier painting experts. From honky-tonks to healthcare, 
                    we deliver weather-resistant finishes that harmonize with Nashville's 
                    unique character and climate.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:6155550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (615) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">3,100+</div>
                      <p className="text-sm text-muted-foreground">Nashville Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">11 Years</div>
                      <p className="text-sm text-muted-foreground">In Nashville</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Nashville project image */}
                    <div className="flex h-full items-center justify-center">
                      <Music2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Middle Tennessee</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Middle Tennessee</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Nashville and surrounding communities
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

          {/* Nashville-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Nashville's Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for Tennessee humidity, storms, and seasonal changes
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <CloudRain className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Storm & Humidity Defense</h3>
                  <p className="mt-2 text-muted-foreground">
                    Nashville's thunderstorms and 70% humidity require moisture-resistant 
                    solutions. We use premium waterproofing primers and breathable topcoats 
                    to prevent water damage and mold.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Waterproof barriers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Mold prevention
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Storm-tested products
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Historic Home Expertise</h3>
                  <p className="mt-2 text-muted-foreground">
                    Nashville's rich architectural heritage requires specialized care. 
                    From antebellum estates to craftsman bungalows, we preserve historic 
                    character while providing modern protection.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Period-accurate colors
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Lead-safe practices
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Preservation techniques
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Music2 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Music Industry Specialist</h3>
                  <p className="mt-2 text-muted-foreground">
                    From recording studios to performance venues, we understand the unique 
                    needs of Nashville's music industry. Low-VOC products and acoustic 
                    considerations for optimal environments.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Acoustic-friendly finishes
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Quick turnaround
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Industry references
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Nashville Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From Music Row to medical centers, see our work across Nashville
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
              <h2 className="text-center text-3xl font-bold">What Nashville Property Owners Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They transformed our historic Broadway venue while preserving its 
                    character. The acoustic considerations for our performance space were 
                    spot-on. They understand Music City's unique needs."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Tommy Walker</strong>
                    <p className="text-sm text-muted-foreground">Broadway Venue Owner</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Our Belle Meade estate required expertise in historic preservation. 
                    They matched 150-year-old colors perfectly and used techniques that 
                    protect against Tennessee's humidity. True craftsmen."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Catherine Whitfield</strong>
                    <p className="text-sm text-muted-foreground">Belle Meade Homeowner</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Nashville Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Nashville Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Middle Tennessee painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Nashville Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$2.50 - $4.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, wall prep, cleanup</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Weatherproofing</td>
                        <td className="px-6 py-4 font-semibold">$3.50 - $5.25/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Moisture barriers, prime & paint</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Historic Restoration</td>
                        <td className="px-6 py-4 font-semibold">$5.50 - $9.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Preservation methods, custom match</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Music Venue/Commercial</td>
                        <td className="px-6 py-4 font-semibold">$3.00 - $5.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Low-VOC, acoustic considerations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on project complexity, historic requirements, and finishes
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Make Your Nashville Property Sing?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Nashville property owners 
                trust us for beautiful finishes that stand up to Tennessee weather.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:6155550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (615) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • TN Lic #987654
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Nashville Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Nashville, Tennessee requires understanding both the city's 
                    unique character and its challenging climate. Our Nashville painting 
                    contractors have mastered working with Middle Tennessee's high humidity, 
                    frequent thunderstorms, and temperature variations that can stress 
                    inferior paint applications.
                  </p>
                  <p>
                    We use premium products designed for Tennessee conditions, including 
                    Sherwin-Williams Duration Home and Benjamin Moore Advance, which provide 
                    exceptional moisture resistance and durability. These paints are crucial 
                    for maintaining beautiful finishes despite Nashville's average 119 rainy 
                    days per year and summer humidity levels.
                  </p>
                  <p>
                    Our portfolio spans Nashville's diverse architecture, from the neon-lit 
                    honky-tonks of Lower Broadway to the stately homes of Belle Meade. We've 
                    painted recording studios, healthcare facilities, and thousands of 
                    residential properties, always delivering results that honor Music City's 
                    creative spirit while providing lasting protection.
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
                <h3 className="text-lg font-semibold">Nashville Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>1 Music Square</p>
                  <p>Nashville, TN 37203</p>
                  <p>(615) 555-0123</p>
                  <p>nashville@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Nashville & Downtown</li>
                  <li>Franklin & Brentwood</li>
                  <li>Murfreesboro</li>
                  <li>Hendersonville & Gallatin</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Historic Restoration</li>
                  <li>Music Venue Specialist</li>
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
              <p>&copy; 2025 PaintQuote Pro Nashville. Licensed & Insured. TN Lic #987654</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}