import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Sun, Thermometer, Calendar } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Phoenix Painting Contractors | Professional Painters in Phoenix, AZ',
  description: 'Top-rated painting contractors in Phoenix, AZ. Professional interior & exterior painting services. Free quotes, licensed & insured. Serving Phoenix Valley since 2015.',
  keywords: 'Phoenix painting contractors, painters Phoenix AZ, Phoenix house painters, interior painting Phoenix, exterior painting Phoenix, commercial painting Phoenix',
  openGraph: {
    title: 'Phoenix Painting Contractors - #1 Painters in Phoenix Valley',
    description: 'Professional painting services in Phoenix, AZ. Free quotes, quality work, and 5-year warranty. Call (602) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-phoenix-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Phoenix Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/phoenix'
  }
}

const serviceAreas = [
  'Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Gilbert',
  'Glendale', 'Peoria', 'Surprise', 'Avondale', 'Goodyear', 'Buckeye',
  'Queen Creek', 'Paradise Valley', 'Cave Creek', 'Fountain Hills'
]

const localProjects = [
  {
    type: 'Residential Exterior',
    location: 'Scottsdale',
    description: '4,500 sq ft stucco home',
    duration: '5 days',
    value: '$8,750'
  },
  {
    type: 'Commercial Interior',
    location: 'Downtown Phoenix',
    description: '12,000 sq ft office space',
    duration: '8 days',
    value: '$18,500'
  },
  {
    type: 'HOA Complex',
    location: 'Chandler',
    description: '32 townhomes exterior',
    duration: '3 weeks',
    value: '$85,000'
  }
]

export default function PhoenixPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/phoenix',
    name: 'PaintQuote Pro Phoenix',
    image: 'https://paintquotepro.com/images/phoenix-office.jpg',
    telephone: '(602) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1234 E Camelback Rd',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      postalCode: '85016',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.5093,
      longitude: -112.0311
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
        latitude: 33.4484,
        longitude: -112.0740
      },
      geoRadius: '50 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '287'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SharedNavigation />
      
      <div className="min-h-screen bg-background pt-14">
        <main>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/locations' },
              { label: 'Phoenix' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Phoenix, AZ
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Trusted by 2,100+ Phoenix homeowners and businesses. Expert interior and 
                    exterior painting services with heat-resistant coatings perfect for Arizona's climate.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:6025550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (602) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2,100+</div>
                      <p className="text-sm text-muted-foreground">Phoenix Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">8 Years</div>
                      <p className="text-sm text-muted-foreground">In Phoenix</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Phoenix project image */}
                    <div className="flex h-full items-center justify-center">
                      <MapPin className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Phoenix Valley</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Phoenix Valley</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving all Phoenix metro areas
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

          {/* Phoenix-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Designed for Phoenix Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized solutions for Arizona's extreme heat and sun exposure
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Heat-Reflective Coatings</h3>
                  <p className="mt-2 text-muted-foreground">
                    Reduce cooling costs by up to 30% with specialized exterior paints that 
                    reflect Arizona's intense sun. Perfect for Phoenix's 100+ degree summers.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Energy Star certified products
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      15-year fade warranty
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Lower surface temperatures
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Thermometer className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Elastomeric Stucco Coating</h3>
                  <p className="mt-2 text-muted-foreground">
                    Essential for Phoenix homes. Our elastomeric coatings bridge cracks and 
                    provide superior protection against monsoon moisture and heat expansion.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      10x thicker than paint
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Waterproof protection
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Bridges cracks up to 1/8"
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Calendar className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Year-Round Service</h3>
                  <p className="mt-2 text-muted-foreground">
                    Phoenix's mild winters mean we paint year-round. We schedule smartly to 
                    avoid monsoon season and extreme summer heat for optimal results.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Early morning summer starts
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Weather monitoring
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Flexible scheduling
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Phoenix Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                See why Phoenix homeowners and businesses trust us with their painting needs
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
              <h2 className="text-center text-3xl font-bold">What Phoenix Residents Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They understand Phoenix weather! Scheduled our exterior painting for October 
                    to avoid the heat. The heat-reflective coating has made a real difference 
                    in our cooling bills."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Michael Rodriguez</strong>
                    <p className="text-sm text-muted-foreground">Scottsdale Homeowner</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Professional team that knows stucco! They fixed all the cracks before 
                    applying elastomeric coating. Our HOA was so impressed they hired them 
                    for the entire community."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Jennifer Chen</strong>
                    <p className="text-sm text-muted-foreground">Chandler HOA President</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Phoenix Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Phoenix Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Phoenix Valley painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Phoenix Price</th>
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
                        <td className="px-6 py-4">Exterior Stucco</td>
                        <td className="px-6 py-4 font-semibold">$3.50 - $5.50/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Elastomeric coating, crack repair</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Cabinet Painting</td>
                        <td className="px-6 py-4 font-semibold">$85 - $150/door</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Spray finish, hardware removal</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Commercial/HOA</td>
                        <td className="px-6 py-4 font-semibold">Volume Pricing</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Custom quotes, 15-20% discount</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on surface condition, accessibility, and specific paint products
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your Phoenix Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and join thousands of satisfied Phoenix customers. 
                We'll beat any written estimate by 10%.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:6025550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (602) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • ROC #123456
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Phoenix Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    When it comes to painting in Phoenix, Arizona, local expertise matters. Our 
                    Phoenix painting contractors understand the unique challenges of painting in 
                    the Sonoran Desert climate. From scorching summers that can reach 120°F to 
                    monsoon season humidity, we've mastered the techniques needed for long-lasting results.
                  </p>
                  <p>
                    We exclusively use premium paints designed for Arizona's extreme UV exposure. 
                    Brands like Dunn-Edwards and Sherwin-Williams offer specialized formulas that 
                    resist fading, chalking, and heat damage – essential for Phoenix exteriors.
                  </p>
                  <p>
                    Our team serves all Phoenix neighborhoods, from the historic districts of 
                    Central Phoenix to the master-planned communities of Ahwatukee and Anthem. 
                    We're familiar with HOA requirements throughout the Valley and can help you 
                    choose colors that comply with your community standards.
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
                <h3 className="text-lg font-semibold">Phoenix Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>1234 E Camelback Rd</p>
                  <p>Phoenix, AZ 85016</p>
                  <p>(602) 555-0123</p>
                  <p>phoenix@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Phoenix</li>
                  <li>Scottsdale</li>
                  <li>Tempe & Mesa</li>
                  <li>Chandler & Gilbert</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Stucco Repair & Coating</li>
                  <li>Cabinet Refinishing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Monday - Friday: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                  <li>Emergency service available</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Phoenix. Licensed & Insured. ROC #123456</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}