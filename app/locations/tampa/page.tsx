import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, CloudLightning, Droplets, Palmtree } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Tampa Painting Contractors | Professional Painters in Tampa, FL',
  description: 'Top-rated painting contractors in Tampa, FL. Expert interior & exterior painting for Tampa Bay homes. Hurricane-resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Tampa painting contractors, painters Tampa FL, Tampa house painters, interior painting Tampa, exterior painting Tampa, commercial painting Tampa',
  openGraph: {
    title: 'Tampa Painting Contractors - #1 Painters in Tampa Bay',
    description: 'Professional painting services in Tampa, FL. Storm-resistant finishes for Florida weather. Free quotes. Call (813) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-tampa-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Tampa Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/tampa'
  }
}

const serviceAreas = [
  'Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Riverview', 'Carrollwood',
  'Westchase', 'Town N Country', 'Temple Terrace', 'Plant City', 'Valrico', 'Lutz',
  'Wesley Chapel', 'Land O Lakes', 'Hyde Park', 'South Tampa'
]

const localProjects = [
  {
    type: 'Waterfront Condo Tower',
    location: 'Bayshore Boulevard',
    description: '185-unit luxury complex',
    duration: '6 weeks',
    value: '$312,000'
  },
  {
    type: 'Historic Ybor City Building',
    location: 'Ybor City',
    description: '1920s cigar factory conversion',
    duration: '3 weeks',
    value: '$67,500'
  },
  {
    type: 'Medical Center',
    location: 'Westshore District',
    description: '4-story healthcare facility',
    duration: '4 weeks',
    value: '$156,000'
  }
]

export default function TampaPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/tampa',
    name: 'PaintQuote Pro Tampa',
    image: 'https://paintquotepro.com/images/tampa-office.jpg',
    telephone: '(813) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4200 W Cypress St',
      addressLocality: 'Tampa',
      addressRegion: 'FL',
      postalCode: '33607',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 27.9506,
      longitude: -82.4572
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
        latitude: 27.9506,
        longitude: -82.4572
      },
      geoRadius: '30 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '678'
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
              <a href="tel:8135550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (813) 555-0123
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
              { label: 'Tampa' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Tampa, FL
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Tampa Bay's premier painting experts. Specializing in hurricane-resistant 
                    finishes and salt-air protection for coastal properties. Trusted by 
                    homeowners from Hyde Park to Wesley Chapel.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:8135550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (813) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">3,400+</div>
                      <p className="text-sm text-muted-foreground">Tampa Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">13 Years</div>
                      <p className="text-sm text-muted-foreground">In Tampa Bay</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Tampa project image */}
                    <div className="flex h-full items-center justify-center">
                      <Palmtree className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Tampa Bay</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Tampa Bay</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Tampa and the entire Bay area
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

          {/* Tampa-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Tampa's Tropical Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for hurricanes, humidity, and coastal conditions
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <CloudLightning className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Hurricane-Resistant Finishes</h3>
                  <p className="mt-2 text-muted-foreground">
                    Tampa's hurricane season demands exceptional durability. Our storm-tested 
                    coatings withstand 150+ mph winds and driving rain, protecting your 
                    investment when storms strike.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Wind-rated adhesion
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Impact-resistant formulas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Storm damage warranty
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Droplets className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Salt Air & Moisture Shield</h3>
                  <p className="mt-2 text-muted-foreground">
                    Tampa Bay's coastal location means constant salt exposure and 90% 
                    humidity mornings. We use marine-grade primers and salt-resistant 
                    topcoats for lasting protection.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Marine-grade products
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Anti-corrosion barriers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Mold prevention system
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Palmtree className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Tropical Sun Defense</h3>
                  <p className="mt-2 text-muted-foreground">
                    With 244 sunny days annually and intense UV exposure, Tampa properties 
                    need superior fade protection. Our UV-blocking paints maintain vibrant 
                    colors despite Florida's relentless sun.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      UV-stable pigments
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Heat-reflective technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      20-year fade warranty
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Tampa Bay Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From Bayshore mansions to Ybor City landmarks, see our work across Tampa
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
              <h2 className="text-center text-3xl font-bold">What Tampa Bay Residents Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "After Hurricane Ian, many homes needed repainting. They used hurricane-rated 
                    products on our waterfront home. It survived the next storm season perfectly. 
                    True professionals who understand Tampa Bay weather."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Michael Rodriguez</strong>
                    <p className="text-sm text-muted-foreground">Bayshore Boulevard Homeowner</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They restored our historic Ybor City building beautifully. The salt-resistant 
                    coating was essential being so close to the bay. They worked around our 
                    business hours and finished ahead of schedule."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Sofia Martinez</strong>
                    <p className="text-sm text-muted-foreground">Ybor City Business Owner</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Tampa Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Tampa Bay Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Tampa Bay area painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Tampa Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$2.75 - $4.25/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, mold-resistant primer</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Hurricane-Grade</td>
                        <td className="px-6 py-4 font-semibold">$4.00 - $6.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Storm-rated adhesion, salt protection</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Waterfront Properties</td>
                        <td className="px-6 py-4 font-semibold">$4.50 - $6.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Marine-grade products, corrosion barriers</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Commercial/HOA</td>
                        <td className="px-6 py-4 font-semibold">Volume Pricing</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Custom quotes, 15-25% discount</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on coastal proximity, storm protection level, and accessibility
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Protect Your Tampa Bay Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Tampa Bay homeowners trust us 
                for hurricane-resistant finishes that look beautiful year-round.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:8135550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (813) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • FL Lic #CBC1259615
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Tampa Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Tampa, Florida requires specialized knowledge of tropical 
                    weather patterns and coastal conditions. Our Tampa painting contractors 
                    have mastered techniques for dealing with extreme humidity, salt air 
                    corrosion, and the annual hurricane season that can devastate properties 
                    with inferior paint protection.
                  </p>
                  <p>
                    We exclusively use products designed for Florida's harsh environment, 
                    including Sherwin-Williams Loxon XP and Benjamin Moore Ultra Spec, which 
                    provide superior adhesion and flexibility during storms. These premium 
                    paints are essential for maintaining beautiful finishes despite Tampa's 
                    average 46 inches of annual rainfall and frequent thunderstorms.
                  </p>
                  <p>
                    Our experience spans Tampa Bay's diverse architecture, from the Spanish-style 
                    homes of Hyde Park to the modern towers of Westshore. We've protected 
                    thousands of properties from Clearwater Beach to Brandon, always delivering 
                    results that withstand Florida's toughest weather while enhancing curb 
                    appeal and property value.
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
                <h3 className="text-lg font-semibold">Tampa Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>4200 W Cypress St</p>
                  <p>Tampa, FL 33607</p>
                  <p>(813) 555-0123</p>
                  <p>tampa@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Tampa & South Tampa</li>
                  <li>St. Pete & Clearwater</li>
                  <li>Brandon & Riverview</li>
                  <li>Wesley Chapel & Lutz</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Hurricane Protection</li>
                  <li>Waterfront Specialist</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Mon-Fri: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 5:00 PM</li>
                  <li>Sunday: By appointment</li>
                  <li>Storm prep available 24/7</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Tampa. Licensed & Insured. FL Lic #CBC1259615</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}