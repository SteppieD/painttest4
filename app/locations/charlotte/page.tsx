import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Cloud, TreePine, Building } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Charlotte Painting Contractors | Professional Painters in Charlotte, NC',
  description: 'Top-rated painting contractors in Charlotte, NC. Expert interior & exterior painting for Queen City homes. Humidity-resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Charlotte painting contractors, painters Charlotte NC, Charlotte house painters, interior painting Charlotte, exterior painting Charlotte, commercial painting Charlotte',
  openGraph: {
    title: 'Charlotte Painting Contractors - #1 Painters in Queen City',
    description: 'Professional painting services in Charlotte, NC. Weather-resistant finishes for Carolina climate. Free quotes. Call (704) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-charlotte-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Charlotte Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/charlotte'
  }
}

const serviceAreas = [
  'Charlotte', 'Matthews', 'Mint Hill', 'Pineville', 'Huntersville', 'Cornelius',
  'Davidson', 'Mooresville', 'Indian Trail', 'Weddington', 'Waxhaw', 'Fort Mill',
  'Rock Hill', 'Ballantyne', 'South Park', 'Myers Park'
]

const localProjects = [
  {
    type: 'Banking Headquarters',
    location: 'Uptown Charlotte',
    description: '15-floor office renovation',
    duration: '4 weeks',
    value: '$285,000'
  },
  {
    type: 'Historic Dilworth Home',
    location: 'Dilworth',
    description: '1920s craftsman restoration',
    duration: '2 weeks',
    value: '$19,500'
  },
  {
    type: 'Lake Norman Estate',
    location: 'Cornelius',
    description: '8,500 sq ft waterfront home',
    duration: '10 days',
    value: '$42,000'
  }
]

export default function CharlottePaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/charlotte',
    name: 'PaintQuote Pro Charlotte',
    image: 'https://paintquotepro.com/images/charlotte-office.jpg',
    telephone: '(704) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '401 N Tryon St',
      addressLocality: 'Charlotte',
      addressRegion: 'NC',
      postalCode: '28202',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.2271,
      longitude: -80.8431
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
        latitude: 35.2271,
        longitude: -80.8431
      },
      geoRadius: '35 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '523'
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
              <a href="tel:7045550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (704) 555-0123
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
              { label: 'Charlotte' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Charlotte, NC
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    The Queen City's trusted painting experts. Specializing in humidity-resistant 
                    finishes perfect for Carolina's four-season climate, from banking headquarters 
                    to historic neighborhoods.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:7045550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (704) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2,800+</div>
                      <p className="text-sm text-muted-foreground">Charlotte Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.8/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">12 Years</div>
                      <p className="text-sm text-muted-foreground">In Charlotte</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Charlotte project image */}
                    <div className="flex h-full items-center justify-center">
                      <Building className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Greater Charlotte</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout the Charlotte Metro</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Charlotte and surrounding communities
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

          {/* Charlotte-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Charlotte's Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for Carolina humidity, seasonal changes, and pine pollen
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Cloud className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Humidity & Mildew Control</h3>
                  <p className="mt-2 text-muted-foreground">
                    Charlotte's 70% average humidity demands specialized paints. We use 
                    mildew-resistant primers and moisture-blocking finishes to prevent 
                    growth and maintain pristine surfaces.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Anti-microbial additives
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Moisture barriers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Breathable topcoats
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <TreePine className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Pine Pollen Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Charlotte's infamous yellow pollen season requires special prep and 
                    timing. We schedule around pollen peaks and use washable finishes 
                    that clean easily without damage.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Pollen-resistant sealers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Easy-clean surfaces
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Strategic scheduling
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Corporate Excellence</h3>
                  <p className="mt-2 text-muted-foreground">
                    As a major banking center, Charlotte demands professional finishes. 
                    We specialize in corporate spaces with minimal disruption and 
                    compliance with strict building standards.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      After-hours service
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Low-VOC products
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Security clearances
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Charlotte Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From Uptown offices to Lake Norman estates, see our work across Charlotte
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
              <h2 className="text-center text-3xl font-bold">What Charlotte Residents Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They painted our entire floor of Bank of America Plaza over a weekend. 
                    Zero disruption to our Monday operations. The low-VOC paint meant no 
                    complaints from staff. Exceptional professionalism."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>James Patterson</strong>
                    <p className="text-sm text-muted-foreground">Corporate Facilities Manager</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Our 1920s Dilworth home needed special care. They matched the original 
                    colors perfectly and used period-appropriate techniques. The mildew-resistant 
                    primer was crucial for our old wood siding."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Margaret Sullivan</strong>
                    <p className="text-sm text-muted-foreground">Dilworth Historic District</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Charlotte Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Charlotte Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Charlotte area painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Charlotte Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$2.75 - $4.25/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, wall prep, cleanup</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Wood Siding</td>
                        <td className="px-6 py-4 font-semibold">$3.50 - $5.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Mildew treatment, prime & paint</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Historic Restoration</td>
                        <td className="px-6 py-4 font-semibold">$5.00 - $8.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Lead-safe, period techniques</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Corporate/Commercial</td>
                        <td className="px-6 py-4 font-semibold">$2.50 - $4.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">After-hours, low-VOC</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on surface condition, accessibility, and specific requirements
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your Charlotte Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Charlotte homeowners and businesses 
                trust us for beautiful, lasting finishes that withstand Carolina weather.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:7045550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (704) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • NC Lic #123456
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Charlotte Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Charlotte, North Carolina requires expertise in managing 
                    the Southeast's variable climate. Our Charlotte painting contractors 
                    have perfected techniques for dealing with high humidity, seasonal 
                    temperature swings, and the notorious pine pollen season that can 
                    wreak havoc on exterior finishes.
                  </p>
                  <p>
                    We use premium paints designed for the Carolinas, including Benjamin 
                    Moore Regal Select Exterior and Sherwin-Williams SuperPaint, which 
                    offer superior mildew resistance and color retention. These products 
                    are essential for maintaining beautiful finishes despite Charlotte's 
                    humid summers and the yellow pollen blanket each spring.
                  </p>
                  <p>
                    Our team has painted properties throughout the Queen City, from the 
                    gleaming towers of Uptown to the tree-lined streets of Myers Park 
                    and Dilworth. We understand Charlotte's mix of corporate excellence 
                    and Southern charm, delivering results that enhance both modern 
                    offices and historic homes.
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
                <h3 className="text-lg font-semibold">Charlotte Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>401 N Tryon St</p>
                  <p>Charlotte, NC 28202</p>
                  <p>(704) 555-0123</p>
                  <p>charlotte@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Charlotte & Uptown</li>
                  <li>South Charlotte</li>
                  <li>Lake Norman Area</li>
                  <li>Matthews & Mint Hill</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Historic Restoration</li>
                  <li>Corporate Offices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Mon-Fri: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 5:00 PM</li>
                  <li>Sunday: By appointment</li>
                  <li>Corporate hours available</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Charlotte. Licensed & Insured. NC Lic #123456</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}