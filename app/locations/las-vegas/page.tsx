import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Sun, Sparkles, Building2 } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Las Vegas Painting Contractors | Professional Painters in Las Vegas, NV',
  description: 'Top-rated painting contractors in Las Vegas, NV. Expert interior & exterior painting for desert homes and commercial properties. UV-resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Las Vegas painting contractors, painters Las Vegas NV, Las Vegas house painters, interior painting Las Vegas, exterior painting Las Vegas, commercial painting Las Vegas',
  openGraph: {
    title: 'Las Vegas Painting Contractors - #1 Painters in Entertainment Capital',
    description: 'Professional painting services in Las Vegas, NV. Desert-resistant finishes for extreme heat. Free quotes. Call (702) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-las-vegas-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Las Vegas Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/las-vegas'
  }
}

const serviceAreas = [
  'Las Vegas', 'Henderson', 'North Las Vegas', 'Summerlin', 'Paradise', 'Spring Valley',
  'Enterprise', 'Sunrise Manor', 'Whitney', 'Winchester', 'Blue Diamond', 'Boulder City',
  'Anthem', 'Green Valley', 'Mountains Edge', 'Rhodes Ranch'
]

const localProjects = [
  {
    type: 'Casino Resort Renovation',
    location: 'Las Vegas Strip',
    description: '500+ room hotel refresh',
    duration: '6 weeks',
    value: '$425,000'
  },
  {
    type: 'Luxury High-Rise Condo',
    location: 'City Center',
    description: '42nd floor penthouse, 5,200 sq ft',
    duration: '8 days',
    value: '$38,500'
  },
  {
    type: 'Master-Planned Community',
    location: 'Summerlin',
    description: '56 townhomes exterior',
    duration: '5 weeks',
    value: '$178,000'
  }
]

export default function LasVegasPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/las-vegas',
    name: 'PaintQuote Pro Las Vegas',
    image: 'https://paintquotepro.com/images/las-vegas-office.jpg',
    telephone: '(702) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3960 Howard Hughes Pkwy',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89169',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.1699,
      longitude: -115.1398
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '20:00'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 36.1699,
        longitude: -115.1398
      },
      geoRadius: '30 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '892'
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
              <a href="tel:7025550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (702) 555-0123
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
              { label: 'Las Vegas' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Las Vegas, NV
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    The Entertainment Capital deserves spectacular finishes. Specializing in 
                    desert-resistant coatings that withstand extreme heat, dust storms, and 
                    24/7 commercial demands while maintaining brilliant colors.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:7025550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (702) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">3,500+</div>
                      <p className="text-sm text-muted-foreground">Vegas Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Yelp Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <p className="text-sm text-muted-foreground">Commercial Service</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Las Vegas project image */}
                    <div className="flex h-full items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Las Vegas Valley</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Las Vegas Valley</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Las Vegas and surrounding communities
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

          {/* Las Vegas-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Las Vegas Desert Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for extreme heat, dust storms, and 24/7 operations
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Extreme Heat Defense</h3>
                  <p className="mt-2 text-muted-foreground">
                    Las Vegas sees 140+ days above 90°F and peaks over 115°F. Our heat-reflective 
                    coatings reduce surface temperatures by 50°F and lower cooling costs 
                    significantly.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Thermal barrier coatings
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Solar-reflective technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Energy-saving certified
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">24/7 Commercial Service</h3>
                  <p className="mt-2 text-muted-foreground">
                    Vegas never sleeps, and neither do we. Specialized night crews work 
                    around casino and hospitality schedules to minimize business disruption 
                    while maintaining quality.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Off-hours scheduling
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Low-odor products
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Fast-dry formulas
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sparkles className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Dust & Sand Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Desert dust storms and sandblasting winds require specialized primers 
                    and sealers. Our dust-resistant finishes maintain smooth surfaces 
                    despite harsh conditions.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Anti-abrasion topcoats
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Dust-repelling sealers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Self-cleaning technology
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Las Vegas Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From Strip casinos to residential communities, see our work across Vegas
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
              <h2 className="text-center text-3xl font-bold">What Las Vegas Property Owners Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Managing a casino means 24/7 operations. They worked nights to paint 
                    our gaming floor hallways without any disruption. The low-odor paint 
                    and fast dry time were perfect for our needs."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Michael Torres</strong>
                    <p className="text-sm text-muted-foreground">Casino Operations Manager</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Our Summerlin HOA hired them for 56 homes. The heat-reflective coating 
                    has made a huge difference in our energy bills. They finished ahead of 
                    schedule despite 115° days. Highly professional!"
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Sandra Kim</strong>
                    <p className="text-sm text-muted-foreground">Summerlin HOA Board</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Las Vegas Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Las Vegas Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Las Vegas Valley painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Las Vegas Price</th>
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
                        <td className="px-6 py-4">Exterior Desert-Resistant</td>
                        <td className="px-6 py-4 font-semibold">$3.75 - $5.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Heat-reflective coating, dust seal</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Commercial 24/7</td>
                        <td className="px-6 py-4 font-semibold">$3.00 - $5.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Night work, low-odor products</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Casino/Hospitality</td>
                        <td className="px-6 py-4 font-semibold">Custom Pricing</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Volume rates, flexible scheduling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on project size, timing requirements, and specific coatings
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Make Your Las Vegas Property Shine?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Las Vegas property owners 
                trust us for desert-resistant finishes that look spectacular year-round.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:7025550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (702) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • NV Lic #0078945
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Las Vegas Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Las Vegas, Nevada requires expertise beyond traditional 
                    techniques. Our Las Vegas painting contractors understand the unique 
                    demands of the Mojave Desert climate, where extreme heat, minimal 
                    rainfall, and dust storms create challenges that can quickly destroy 
                    standard paint applications.
                  </p>
                  <p>
                    We use specialized coatings designed for desert conditions, including 
                    Dunn-Edwards SPARTASHIELD and Sherwin-Williams Loxon XP, which offer 
                    superior adhesion and flexibility in extreme temperatures. These products 
                    are essential for withstanding Las Vegas's temperature swings from 115°F 
                    summer days to near-freezing winter nights.
                  </p>
                  <p>
                    Our portfolio includes iconic Strip properties, master-planned communities 
                    from Summerlin to Henderson, and thousands of residential homes. We 
                    understand the 24/7 nature of Las Vegas business and offer flexible 
                    scheduling to minimize disruption while delivering exceptional results 
                    that withstand the test of time and desert conditions.
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
                <h3 className="text-lg font-semibold">Las Vegas Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>3960 Howard Hughes Pkwy</p>
                  <p>Las Vegas, NV 89169</p>
                  <p>(702) 555-0123</p>
                  <p>lasvegas@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Las Vegas & Strip District</li>
                  <li>Henderson & Green Valley</li>
                  <li>Summerlin & Red Rock</li>
                  <li>North Las Vegas & Aliante</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial/Casino</li>
                  <li>24/7 Emergency Service</li>
                  <li>Heat-Reflective Coatings</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>24/7 Commercial Service</li>
                  <li>Residential: 6 AM - 8 PM</li>
                  <li>7 days a week</li>
                  <li>Night crews available</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Las Vegas. Licensed & Insured. NV Lic #0078945</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}