import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Waves, Sun, Building2 } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Miami Painting Contractors | Professional Painters in Miami, FL',
  description: 'Top-rated painting contractors in Miami, FL. Expert interior & exterior painting for South Florida homes. Hurricane & salt-resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Miami painting contractors, painters Miami FL, Miami house painters, interior painting Miami, exterior painting Miami, commercial painting Miami',
  openGraph: {
    title: 'Miami Painting Contractors - #1 Painters in Magic City',
    description: 'Professional painting services in Miami, FL. Hurricane-resistant finishes for tropical climate. Free quotes. Call (305) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-miami-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Miami Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/miami'
  }
}

const serviceAreas = [
  'Miami', 'Miami Beach', 'Coral Gables', 'Coconut Grove', 'Key Biscayne', 'Aventura',
  'Brickell', 'Downtown Miami', 'Wynwood', 'Design District', 'Doral', 'Kendall',
  'Homestead', 'Pinecrest', 'Palmetto Bay', 'Cutler Bay'
]

const localProjects = [
  {
    type: 'Luxury Oceanfront Condo',
    location: 'South Beach',
    description: '30-story tower, 450 units',
    duration: '8 weeks',
    value: '$485,000'
  },
  {
    type: 'Art Deco Restoration',
    location: 'Ocean Drive',
    description: '1930s historic hotel',
    duration: '4 weeks',
    value: '$125,000'
  },
  {
    type: 'Corporate Headquarters',
    location: 'Brickell',
    description: '45-floor financial center',
    duration: '6 weeks',
    value: '$650,000'
  }
]

export default function MiamiPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/miami',
    name: 'PaintQuote Pro Miami',
    image: 'https://paintquotepro.com/images/miami-office.jpg',
    telephone: '(305) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1001 Brickell Bay Dr',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33131',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7617,
      longitude: -80.1918
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '19:00'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 25.7617,
        longitude: -80.1918
      },
      geoRadius: '35 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '945'
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
              <a href="tel:3055550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (305) 555-0123
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
              { label: 'Miami' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Miami, FL
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    The Magic City demands magical finishes. Specializing in hurricane-proof 
                    coatings and tropical-resistant paints perfect for Miami's year-round 
                    sunshine, ocean salt, and vibrant architecture.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:3055550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (305) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">4,200+</div>
                      <p className="text-sm text-muted-foreground">Miami Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">15 Years</div>
                      <p className="text-sm text-muted-foreground">In Miami</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Miami project image */}
                    <div className="flex h-full items-center justify-center">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Miami-Dade County</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Miami-Dade</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Miami and all surrounding areas
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

          {/* Miami-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Miami's Tropical Paradise</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for hurricanes, ocean salt, and year-round humidity
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Waves className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Hurricane Category 5 Ready</h3>
                  <p className="mt-2 text-muted-foreground">
                    Miami faces the strongest hurricanes. Our Category 5 rated coatings 
                    withstand 180+ mph winds and torrential rain, tested and proven 
                    through Andrew, Irma, and beyond.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Miami-Dade approved
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      180+ mph wind rating
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Storm surge resistant
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Tropical UV Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Miami's tropical sun is relentless year-round. Our UV-blocking 
                    technology prevents fading and maintains vibrant colors that match 
                    Miami's energetic spirit and Art Deco heritage.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Tropical-grade UV blockers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Color-lock technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      25-year fade warranty
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">High-Rise Specialists</h3>
                  <p className="mt-2 text-muted-foreground">
                    From Brickell's financial towers to South Beach's luxury condos, 
                    we're certified for high-rise work with specialized equipment and 
                    wind-resistant application techniques.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Certified rope access
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Wind-safe application
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Building code compliant
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Miami Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From Ocean Drive to Brickell, see our work across the Magic City
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
              <h2 className="text-center text-3xl font-bold">What Miami Property Owners Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Our oceanfront condo needed serious hurricane protection. They used 
                    Miami-Dade approved products that survived two major storms already. 
                    The building looks pristine despite constant salt exposure."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Carlos Mendez</strong>
                    <p className="text-sm text-muted-foreground">South Beach Condo Board</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They restored our Art Deco hotel on Ocean Drive perfectly. Matched 
                    the historic colors while using modern hurricane-resistant products. 
                    The pastel colors still pop after 5 years of Miami sun."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Isabella Torres</strong>
                    <p className="text-sm text-muted-foreground">Ocean Drive Hotel Owner</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Miami Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Miami Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Miami-Dade painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Miami Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$3.00 - $4.75/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, humidity-resistant primer</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Hurricane-Grade</td>
                        <td className="px-6 py-4 font-semibold">$4.50 - $7.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Category 5 rated, salt barrier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">High-Rise/Oceanfront</td>
                        <td className="px-6 py-4 font-semibold">$5.50 - $8.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Specialized access, marine-grade</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Art Deco Restoration</td>
                        <td className="px-6 py-4 font-semibold">$6.00 - $10.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Historic match, custom colors</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on building height, ocean proximity, and hurricane protection level
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your Miami Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Miami property owners trust us 
                for hurricane-proof finishes that capture the Magic City's vibrant spirit.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:3055550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (305) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • FL Lic #CC2817345
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Miami Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Miami, Florida requires expertise unmatched anywhere else 
                    in the country. Our Miami painting contractors understand the unique 
                    challenges of tropical storms, year-round humidity, intense UV radiation, 
                    and salt air corrosion that can destroy standard paint applications 
                    within months.
                  </p>
                  <p>
                    We exclusively use Miami-Dade approved products, including PPG BREAK-THROUGH! 
                    and Sherwin-Williams ProMar 400, engineered to meet the strictest building 
                    codes in the nation. These premium coatings are tested to withstand 
                    Category 5 hurricanes and provide lasting protection in Miami's extreme 
                    conditions.
                  </p>
                  <p>
                    Our portfolio includes iconic properties from the Art Deco hotels of 
                    South Beach to the gleaming towers of Brickell. We've protected thousands 
                    of properties across Miami-Dade County, from Aventura to Homestead, always 
                    delivering finishes that celebrate Miami's vibrant culture while providing 
                    unmatched weather protection.
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
                <h3 className="text-lg font-semibold">Miami Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>1001 Brickell Bay Dr</p>
                  <p>Miami, FL 33131</p>
                  <p>(305) 555-0123</p>
                  <p>miami@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Miami & Miami Beach</li>
                  <li>Coral Gables & Coconut Grove</li>
                  <li>Brickell & Downtown</li>
                  <li>Aventura & Sunny Isles</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>High-Rise Specialist</li>
                  <li>Hurricane Protection</li>
                  <li>Art Deco Restoration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Mon-Fri: 7:00 AM - 7:00 PM</li>
                  <li>Saturday: 8:00 AM - 6:00 PM</li>
                  <li>Sunday: 9:00 AM - 5:00 PM</li>
                  <li>Hurricane prep 24/7</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Miami. Licensed & Insured. FL Lic #CC2817345</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}