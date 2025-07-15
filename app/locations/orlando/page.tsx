import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, CheckCircle, Droplets, Sun, Umbrella } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Orlando Painting Contractors | Professional Painters in Orlando, FL',
  description: 'Top-rated painting contractors in Orlando, FL. Expert interior & exterior painting for Central Florida homes. Humidity-resistant finishes. Free quotes, licensed & insured.',
  keywords: 'Orlando painting contractors, painters Orlando FL, Orlando house painters, interior painting Orlando, exterior painting Orlando, commercial painting Orlando',
  openGraph: {
    title: 'Orlando Painting Contractors - #1 Painters in Central Florida',
    description: 'Professional painting services in Orlando, FL. Humidity-resistant finishes for Florida weather. Free quotes. Call (407) 555-0123.',
    type: 'website',
    images: [{
      url: '/og-orlando-painters.jpg',
      width: 1200,
      height: 630,
      alt: 'Orlando Painting Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/orlando'
  }
}

const serviceAreas = [
  'Orlando', 'Winter Park', 'Kissimmee', 'Windermere', 'Lake Nona', 'Dr. Phillips',
  'Altamonte Springs', 'Maitland', 'Winter Garden', 'Oviedo', 'Sanford', 'Lake Mary',
  'Celebration', 'Winter Springs', 'Casselberry', 'Apopka'
]

const localProjects = [
  {
    type: 'Theme Park Area Resort',
    location: 'Lake Buena Vista',
    description: '120-room hotel exterior refresh',
    duration: '4 weeks',
    value: '$145,000'
  },
  {
    type: 'Luxury Home Estate',
    location: 'Windermere',
    description: '8,500 sq ft waterfront property',
    duration: '12 days',
    value: '$28,900'
  },
  {
    type: 'Medical Office Complex',
    location: 'Lake Nona Medical City',
    description: '3-building healthcare facility',
    duration: '3 weeks',
    value: '$87,500'
  }
]

export default function OrlandoPaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://paintquotepro.com/locations/orlando',
    name: 'PaintQuote Pro Orlando',
    image: 'https://paintquotepro.com/images/orlando-office.jpg',
    telephone: '(407) 555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '200 S Orange Ave',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      postalCode: '32801',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5383,
      longitude: -81.3792
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
        latitude: 28.5383,
        longitude: -81.3792
      },
      geoRadius: '30 miles'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '423'
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
              <a href="tel:4075550123" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                (407) 555-0123
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
              { label: 'Orlando' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Painting Contractors in Orlando, FL
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Central Florida's trusted painting experts since 2015. Specializing in 
                    humidity-resistant finishes and mold-preventing primers perfect for 
                    Orlando's tropical climate and afternoon thunderstorms.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:4075550123"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      (407) 555-0123
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">3,200+</div>
                      <p className="text-sm text-muted-foreground">Orlando Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.8/5</div>
                      <p className="text-sm text-muted-foreground">Google Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">10 Years</div>
                      <p className="text-sm text-muted-foreground">In Orlando</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for Orlando project image */}
                    <div className="flex h-full items-center justify-center">
                      <Sun className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Serving All of</p>
                    <p className="text-xl font-bold">Central Florida</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Services Throughout Central Florida</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional painting contractors serving Orlando and surrounding communities
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

          {/* Orlando-Specific Services */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Painting Solutions for Orlando's Tropical Climate</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Specialized techniques for Central Florida's humidity, rain, and intense sun
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Droplets className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Humidity & Mold Prevention</h3>
                  <p className="mt-2 text-muted-foreground">
                    Orlando's 75% average humidity demands specialized paints. We use 
                    anti-microbial primers and moisture-resistant finishes to prevent 
                    mold and mildew growth.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Mold-resistant additives
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Moisture-barrier primers
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Breathable paint systems
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Umbrella className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Rain-Ready Application</h3>
                  <p className="mt-2 text-muted-foreground">
                    With Orlando's daily afternoon storms May-October, timing is critical. 
                    We monitor weather hourly and use quick-dry formulas to beat the rain.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Weather monitoring system
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Fast-cure paint technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Strategic scheduling
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">UV & Heat Protection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Florida sun is intense year-round. Our premium paints include UV 
                    inhibitors and heat-reflective pigments to prevent fading and reduce 
                    cooling costs.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      UV-stable pigments
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      Cool roof technology
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      15-year fade warranty
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Recent Orlando Area Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                From theme park resorts to luxury estates, see our work across Central Florida
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
              <h2 className="text-center text-3xl font-bold">What Orlando Residents Say</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "They understand Florida weather! Scheduled around our rainy season and 
                    used mold-resistant products. Our home looks amazing and has stayed 
                    pristine through two hurricane seasons."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Maria Gonzalez</strong>
                    <p className="text-sm text-muted-foreground">Windermere Homeowner</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg">
                    "Professional team that knows commercial properties. They completed our 
                    medical office complex on schedule despite daily thunderstorms. The 
                    anti-microbial paint was perfect for our healthcare facility."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Dr. James Wilson</strong>
                    <p className="text-sm text-muted-foreground">Lake Nona Medical Center</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Orlando Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold">Orlando Painting Pricing Guide</h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Transparent pricing for Central Florida painting projects
                </p>

                <div className="mt-12 overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Service Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Average Orlando Price</th>
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
                        <td className="px-6 py-4">Exterior Stucco</td>
                        <td className="px-6 py-4 font-semibold">$3.25 - $5.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Elastomeric coating, crack repair</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Pressure Wash & Paint</td>
                        <td className="px-6 py-4 font-semibold">$4.00 - $6.00/sq ft</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Mold removal, prime & paint</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Commercial/HOA</td>
                        <td className="px-6 py-4 font-semibold">Volume Pricing</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Custom quotes, 10-25% discount</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  * Prices vary based on surface condition, height, and specific paint products
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your Orlando Property?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Get your free quote today and join thousands of satisfied Central Florida 
                customers. Beat the rainy season - book your project now!
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Free Quote Online
                </Link>
                <a
                  href="tel:4075550123"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call (407) 555-0123
                </a>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free estimates • Licensed & insured • Florida Lic #CCC1234567
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Choose Orlando Painting Contractors?</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Painting in Orlando, Florida presents unique challenges that require local 
                    expertise. Our Orlando painting contractors have mastered the art of working 
                    with Central Florida's subtropical climate, where high humidity, daily 
                    thunderstorms, and intense UV radiation can quickly damage improperly 
                    applied paint.
                  </p>
                  <p>
                    We exclusively use paints formulated for Florida's climate, including 
                    Benjamin Moore Aura Exterior and Sherwin-Williams Resilience, which offer 
                    superior mold and mildew resistance. These premium products are essential 
                    for combating Orlando's average 75% humidity and preventing the growth 
                    that can occur in our warm, moist environment.
                  </p>
                  <p>
                    Our team has painted properties throughout Central Florida, from the 
                    historic homes of College Park to the modern developments in Lake Nona. 
                    We understand the specific requirements of Orlando's diverse architecture 
                    and numerous HOA communities, ensuring your project meets all guidelines 
                    while maximizing curb appeal and protection.
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
                <h3 className="text-lg font-semibold">Orlando Office</h3>
                <address className="mt-4 space-y-2 text-sm text-muted-foreground not-italic">
                  <p>200 S Orange Ave</p>
                  <p>Orlando, FL 32801</p>
                  <p>(407) 555-0123</p>
                  <p>orlando@paintquotepro.com</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Orlando & Winter Park</li>
                  <li>Kissimmee & Celebration</li>
                  <li>Lake Nona & Medical City</li>
                  <li>Windermere & Dr. Phillips</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Residential Painting</li>
                  <li>Commercial Painting</li>
                  <li>Resort & Hospitality</li>
                  <li>Pressure Washing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Mon-Fri: 7:00 AM - 6:00 PM</li>
                  <li>Saturday: 8:00 AM - 5:00 PM</li>
                  <li>Sunday: By appointment</li>
                  <li>Hurricane prep available</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro Orlando. Licensed & Insured. FL Lic #CCC1234567</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}