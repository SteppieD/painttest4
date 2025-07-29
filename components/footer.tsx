import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Paint Calculator', href: '/paint-quote-calculator' },
      { label: 'Quote Generator', href: '/painting-quote-generator' },
      { label: 'Mobile App', href: '/mobile-painting-estimate-app' },
      { label: 'Integrations', href: '/features#integrations' },
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'ROI Calculator', href: '/roi-calculator' },
      { label: 'Paint Estimate Templates', href: '/paint-estimate-templates' },
      { label: 'Painting Quote Templates', href: '/painting-quote-templates' },
      { label: 'How to Quote Paint Jobs', href: '/how-to-quote-painting-jobs' },
      { label: 'Interior Paint Guide', href: '/how-to-estimate-interior-paint-jobs' },
      { label: 'Success Stories', href: '/case-studies' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Refund Policy', href: '/refunds' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'Security', href: '/security' },
    ]
  }
}

const locations = [
  'Phoenix',
  'Denver', 
  'Orlando',
  'San Diego',
  'Austin',
  'Las Vegas',
  'Charlotte',
  'Nashville',
  'Tampa',
  'Miami'
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary">
              PaintQuote Pro
            </Link>
            <p className="mt-4 text-base text-gray-200 max-w-xs">
              Professional painting estimating software that helps contractors save time, 
              win more jobs, and grow their business.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-base text-gray-200">
                <Mail className="h-4 w-4" />
                <span>support@paintquotepro.com</span>
              </div>
              <div className="flex items-start gap-2 text-base text-gray-200">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Business Ave, Suite 100<br />Austin, TX 78701</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <Link 
                href="https://facebook.com/paintquotepro" 
                className="text-gray-200 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://twitter.com/paintquotepro" 
                className="text-gray-200 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/paintquotepro" 
                className="text-gray-200 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link 
                href="https://youtube.com/paintquotepro" 
                className="text-gray-200 hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-base text-gray-200 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Locations Section */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-semibold mb-4">Service Areas</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {locations.map((location) => (
              <Link
                key={location}
                href={`/locations/${location.toLowerCase().replace(' ', '-')}`}
                className="text-base text-gray-200 hover:text-primary"
              >
                {location}
              </Link>
            ))}
            <Link
              href="/locations"
              className="text-base text-primary hover:underline"
            >
              View all locations →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base text-gray-200">
              © {currentYear} PaintQuote Pro. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-base text-gray-200">
              <Link href="/sitemap" className="hover:text-primary">
                Sitemap
              </Link>
              <Link href="/accessibility" className="hover:text-primary">
                Accessibility
              </Link>
              <Link href="/status" className="hover:text-primary">
                System Status
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <div className="text-base text-gray-200">
            <div className="font-semibold">🔒 SSL Secured</div>
            <div>Your data is encrypted</div>
          </div>
          <div className="text-base text-gray-200">
            <div className="font-semibold">✓ SOC 2 Compliant</div>
            <div>Enterprise-grade security</div>
          </div>
          <div className="text-base text-gray-200">
            <div className="font-semibold">🏆 Top Rated</div>
            <div>4.9/5 stars from 2,000+ reviews</div>
          </div>
        </div>

        {/* Sitemap Link - Very Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <Link 
            href="/sitemap.xml" 
            className="text-base text-gray-200 hover:text-primary"
          >
            XML Sitemap
          </Link>
        </div>
      </div>
    </footer>
  )
}