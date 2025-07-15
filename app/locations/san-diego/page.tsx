import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Waves, Sun, Wind } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'San Diego Painting Contractors | Professional Painters in San Diego, CA',
  description: 'Top-rated painting contractors in San Diego, CA. Expert interior & exterior painting for coastal homes. Salt-air resistant finishes. Free quotes, licensed & insured.',
  keywords: 'San Diego painting contractors, painters San Diego CA, San Diego house painters, interior painting San Diego, exterior painting San Diego, commercial painting San Diego',
  openGraph: {
    title: 'San Diego Painting Contractors - #1 Painters in Americas Finest City',
    description: 'Professional painting services in San Diego, CA. Coastal-resistant finishes for perfect weather. Free quotes. Call (619) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-san-diego-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'San Diego Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/san-diego'
  }
}

const serviceAreas = [
  'San Diego', 'La Jolla', 'Pacific Beach', 'Mission Beach', 'Point Loma', 'Coronado',
  'Del Mar', 'Carlsbad', 'Encinitas', 'Chula Vista', 'La Mesa', 'El Cajon',
  'Poway', 'Rancho Santa Fe', 'Solana Beach', 'Imperial Beach'
]

const localProjects = [
  {
    type: 'Oceanfront Estate',
    location: 'La Jolla Shores',
    description: '6,000 sq ft coastal mansion',
    duration: '2 weeks',
    value: '$32,500'
  },
  {
    type: 'Historic Gaslamp Building',
    location: 'Downtown San Diego',
    description: '4-story commercial restoration',
    duration: '3 weeks',
    value: '$78,900'
  },
  {
    type: 'Beach Condo Complex',
    location: 'Pacific Beach',
    description: '28-unit beachfront property',
    duration: '4 weeks',
    value: '$125,000'
  }
]

export default function SanDiegoPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/san-diego',
    name: 'PaintQuote Pro San Diego',
    image: 'https://paintquotepro.com/images/san-diego-office.jpg',
    telephone: '(619) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1420 Kettner Blvd',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      postalCode: '92101',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7157,
      longitude: -117.1611
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
        latitude: 32.7157,
        longitude: -117.1611
      },
      geoRadius: '35 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '567'
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
              <a href="tel:6195550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (619) 555-0123
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
              { label: 'San Diego' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in San Diego, CA
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    America's Finest City deserves the finest painters. Specializing in coastal-resistant 
                    finishes that withstand salt air, marine layer, and year-round sunshine while 
                    maintaining vibrant colors.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:6195550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (619) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2,900+</div>
                      <p className="text-sm text-muted-foreground">SD Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Yelp Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">11 Years</div>
                      <p className="text-sm text-muted-foreground">In San Diego</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for San Diego project image */}
                    <div className="flex h-full items-center justify-center">
                      <Waves className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">San Diego County</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout San Diego County</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  From coastal communities to inland neighborhoods, we serve all of San Diego
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

          {/* San Diego-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for San Diego's Coastal Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for perfect weather that includes salt air and marine layer
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Waves className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Salt Air Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Coastal properties face constant salt exposure. We use marine-grade 
                    primers and salt-resistant topcoats that prevent corrosion and 
                    maintain adhesion despite ocean spray.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Marine-grade primers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Salt-resistant topcoats
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Anti-corrosion barriers
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Wind className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Marine Layer Defense</h3>
                  <p className="mt-2 text-muted-foreground">
                    San Diego's morning marine layer brings moisture that can trap under 
                    paint. Our application timing and moisture-resistant products prevent 
                    peeling and bubbling.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Moisture meters used
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Afternoon application
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Breathable paint systems
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Year-Round UV Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    With 266 sunny days annually, UV damage is a constant threat. Our 
                    premium paints include advanced UV blockers to prevent fading and 
                    maintain color vibrancy for years.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      UV-stable pigments
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Fade-resistant technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      15-year color warranty
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent San Diego Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From beachfront estates to historic restorations, see our work across San Diego
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
              <h2 className="text-center text-3xl font-bold">What San Diego Homeowners Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Living two blocks from the beach, we need painters who understand 
                    salt air damage. They used marine-grade products and our home still 
                    looks freshly painted after 3 years of ocean exposure."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Robert Chen</strong>
                    <p className="text-sm text-muted-foreground">La Jolla Shores Resident</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Exceptional work on our Gaslamp Quarter building. They navigated 
                    historic preservation requirements perfectly and the Victorian details 
                    look stunning. True craftsmen who understand San Diego architecture."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Elizabeth Martinez</strong>
                    <p className="text-sm text-muted-foreground">Downtown Property Owner</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* San Diego Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">San Diego Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for San Diego County painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average San Diego Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$3.50 - $5.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, wall prep, cleanup</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Coastal</td>
                        <td className="px-6 py-4 font-semibold">$4.50 - $6.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Marine-grade products, salt prep</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Stucco Refinishing</td>
                        <td className="px-6 py-4 font-semibold">$4.00 - $6.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Crack repair, elastomeric coating</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Historic Restoration</td>
                        <td className="px-6 py-4 font-semibold">$6.00 - $10.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Period-accurate, detail work</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on coastal proximity, property access, and specific requirements
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your San Diego Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why San Diego homeowners trust us 
                for beautiful, lasting finishes that withstand coastal conditions.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:6195550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (619) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • CA Lic #987654
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose San Diego Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in San Diego, California requires expertise in coastal conditions 
                    that many contractors underestimate. Our San Diego painting contractors 
                    have perfected techniques for dealing with salt air corrosion, marine 
                    layer moisture, and intense year-round UV exposure that can quickly 
                    deteriorate standard paint applications.
                  </p>
                  <p>
                    We use only premium coastal-grade paints like Dunn-Edwards Evershield 
                    and Benjamin Moore Regal Select Exterior, specifically formulated to 
                    withstand San Diego's unique microclimate. These products offer superior 
                    salt resistance and flexibility to handle temperature variations between 
                    coastal and inland areas.
                  </p>
                  <p>
                    Our portfolio spans San Diego's diverse neighborhoods, from the Spanish 
                    Colonial homes of Mission Hills to the modern beach houses of Del Mar. 
                    We understand the architectural heritage of each community and work 
                    closely with HOAs and historical societies to ensure compliance while 
                    delivering exceptional results.
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
                <h3 className="text-lg font-semibold">San Diego Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>1420 Kettner Blvd</p>
                  <p>San Diego, CA 92101</p>
                  <p>(619) 555-0123</p>
                  <p>sandiego@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Coastal Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>La Jolla & Del Mar</li>
                  <li>Pacific & Mission Beach</li>
                  <li>Point Loma & Coronado</li>
                  <li>Carlsbad & Encinitas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Coastal Home Painting</li>
                  <li>Commercial Properties</li>
                  <li>Historic Restoration</li>
                  <li>Marine-Grade Coatings</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Mon-Fri: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 5:00 PM</li>
                  <li>Sunday: By appointment</li>
                  <li>Year-round service</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro San Diego. Licensed & Insured. CA Lic #987654</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}