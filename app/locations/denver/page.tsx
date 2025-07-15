import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Snowflake, Mountain, CloudRain } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Denver Painting Contractors | Professional Painters in Denver, CO',
  description: 'Top-rated painting contractors in Denver, CO. Professional interior & exterior painting for Mile High homes. Free quotes, licensed & insured. Weather-resistant finishes.',
  keywords: 'Denver painting contractors, painters Denver CO, Denver house painters, interior painting Denver, exterior painting Denver, commercial painting Denver',
  openGraph: {
    title: 'Denver Painting Contractors - #1 Painters in Mile High City',
    description: 'Professional painting services in Denver, CO. Weather-resistant finishes for Colorado climate. Free quotes. Call (303) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-denver-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Denver Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/denver'
  }
}

const serviceAreas = [
  'Denver', 'Aurora', 'Lakewood', 'Thornton', 'Arvada', 'Westminster',
  'Centennial', 'Parker', 'Littleton', 'Englewood', 'Wheat Ridge', 'Northglenn',
  'Commerce City', 'Greenwood Village', 'Cherry Hills', 'Highlands Ranch'
]

const localProjects = [
  {
    type: 'Historic Home Restoration',
    location: 'Capitol Hill',
    description: 'Victorian home exterior, 3 colors',
    duration: '7 days',
    value: '$12,500'
  },
  {
    type: 'Modern Condo Complex',
    location: 'LoDo District',
    description: '48-unit building, all balconies',
    duration: '3 weeks',
    value: '$67,000'
  },
  {
    type: 'Mountain View Estate',
    location: 'Cherry Hills Village',
    description: '7,200 sq ft luxury home',
    duration: '10 days',
    value: '$24,800'
  }
]

export default function DenverPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/denver',
    name: 'PaintQuote Pro Denver',
    image: 'https://paintquotepro.com/images/denver-office.jpg',
    telephone: '(303) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1550 Larimer St',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80202',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.7392,
      longitude: -104.9903
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 39.7392,
        longitude: -104.9903
      },
      geoRadius: '40 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '342'
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
              <a href="tel:3035550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (303) 555-0123
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
              { label: 'Denver' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Denver, CO
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Mile High City's trusted painters since 2016. Expert interior and exterior 
                    painting with weather-resistant finishes designed for Colorado's extreme 
                    temperature swings and UV exposure.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:3035550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (303) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">1,850+</div>
                      <p className="text-sm text-muted-foreground">Denver Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">9 Years</div>
                      <p className="text-sm text-muted-foreground">In Denver</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Denver project image */}
                    <div className="flex h-full items-center justify-center">
                      <Mountain className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Metro Denver</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Metro Denver</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Denver and surrounding communities
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

          {/* Denver-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Denver's Unique Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for Colorado's 300+ days of sun and dramatic weather changes
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Snowflake className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Weather-Resistant Finishes</h3>
                  <p className="mt-2 text-muted-foreground">
                    Denver's 90°F summers to -10°F winters demand flexible paints. We use 
                    premium elastomeric coatings that expand and contract without cracking.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Temperature-flexible formulas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Freeze-thaw resistant
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      15-year durability warranty
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Mountain className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">High-Altitude UV Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    At 5,280 feet, UV rays are 25% stronger. Our high-altitude paints prevent 
                    fading and chalking, keeping your home beautiful despite intense sun exposure.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      UV-resistant pigments
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Fade-proof technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      High-altitude formulas
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CloudRain className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Moisture & Hail Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Colorado's afternoon thunderstorms and hail require special preparation. 
                    We prime and seal to protect against moisture infiltration and impact damage.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Moisture-barrier primers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Impact-resistant coatings
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Proper wood treatment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Denver Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From historic restorations to modern homes, see our work across Denver
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
              <h2 className="text-center text-3xl font-bold">What Denver Homeowners Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They know Denver weather! Waited for the perfect window between snow 
                    and rain. The paint they recommended has survived two harsh winters 
                    without any issues. Highly recommend for any Mile High home."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>David Thompson</strong>
                    <p className="text-sm text-muted-foreground">Wash Park Homeowner</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Outstanding work on our Victorian in Capitol Hill. They matched the 
                    historic colors perfectly and used period-appropriate techniques. The 
                    high-altitude UV protection has kept colors vibrant for 3 years now."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Sarah Mitchell</strong>
                    <p className="text-sm text-muted-foreground">Capitol Hill Historic Home</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Denver Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Denver Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Denver Metro painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Denver Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Interior Painting</td>
                        <td className="px-6 py-4 font-semibold">$3.00 - $4.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">2 coats, wall prep, cleanup</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Exterior Siding</td>
                        <td className="px-6 py-4 font-semibold">$3.75 - $5.75/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Weather-resistant paint, prep</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Historic Restoration</td>
                        <td className="px-6 py-4 font-semibold">$5.00 - $8.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Lead-safe practices, detail work</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Cabinet Painting</td>
                        <td className="px-6 py-4 font-semibold">$95 - $165/door</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Spray finish, hardware removal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on elevation, accessibility, and specific paint products
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your Denver Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and discover why Denver homeowners trust us 
                for weather-resistant, beautiful finishes that last.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:3035550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (303) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • Colorado Reg #456789
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Denver Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Denver, Colorado requires specialized knowledge and experience. 
                    Our Denver painting contractors understand the unique challenges of the 
                    Mile High City – from extreme temperature swings that can vary 40°F in a 
                    single day to intense UV radiation at altitude that can quickly fade 
                    inferior paints.
                  </p>
                  <p>
                    We exclusively use paints formulated for Colorado's climate, including 
                    Sherwin-Williams Duration and Benjamin Moore Aura, which offer superior 
                    adhesion and flexibility. These premium products are essential for 
                    withstanding Denver's freeze-thaw cycles and preventing the cracking 
                    and peeling common with standard paints.
                  </p>
                  <p>
                    Our team has painted homes in every Denver neighborhood, from the 
                    historic Victorians of Capitol Hill to the modern developments in 
                    Stapleton. We understand Denver's architectural diversity and HOA 
                    requirements, ensuring your project meets all guidelines while 
                    enhancing your property's beauty and value.
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
                <h3 className="text-lg font-semibold">Denver Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>1550 Larimer St</p>
                  <p>Denver, CO 80202</p>
                  <p>(303) 555-0123</p>
                  <p>denver@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Denver</li>
                  <li>Aurora & Lakewood</li>
                  <li>Littleton & Centennial</li>
                  <li>Highlands Ranch</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Historic Restoration</li>
                  <li>Cabinet Refinishing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Monday - Friday: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                  <li>Weather permitting</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Denver. Licensed & Insured. Colorado Reg #456789</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}