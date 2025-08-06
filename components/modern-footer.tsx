import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Sparkles, Shield, Star, Zap, Clock, CheckCircle, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
const footerLinks = {
  product: {
    title: 'Painting Quote Software',
    links: [
      { label: 'AI Painting Estimator', href: '/features#ai-assistant', description: 'Instant accurate quotes' },
      { label: 'Quote Templates', href: '/painting-quote-templates', description: 'Professional designs' },
      { label: 'Paint Calculator', href: '/paint-quote-calculator', description: 'Material estimation' },
      { label: 'Mobile Estimating App', href: '/mobile', description: 'Quote on-site' },
      { label: 'Pricing Database', href: '/features#pricing-database', description: 'Regional pricing data' },
      { label: 'Integrations', href: '/integrations', description: 'Connect your tools' },
    ]
  },
  solutions: {
    title: 'For Contractors',
    links: [
      { label: 'House Painters', href: '/solutions/residential', description: 'Residential quotes' },
      { label: 'Commercial Painters', href: '/solutions/commercial', description: 'Large project bids' },
      { label: 'Painting Franchises', href: '/solutions/franchise', description: 'Multi-location support' },
      { label: 'New Contractors', href: '/solutions/startups', description: 'Get started guide' },
      { label: 'Enterprise Teams', href: '/solutions/enterprise', description: 'Scale your business' },
    ]
  },
  resources: {
    title: 'Free Tools & Guides',
    links: [
      { label: 'Painting ROI Calculator', href: '/roi-calculator', description: 'Calculate your savings' },
      { label: 'How to Quote Paint Jobs', href: '/guides/how-to-quote-painting-jobs', description: 'Complete guide' },
      { label: 'Paint Calculator', href: '/guides/paint-calculator', description: 'Accurate measurements' },
      { label: 'Painting Business Guide', href: '/guides/painting-business-guide', description: 'Start & grow' },
      { label: 'Interior Painting Quotes', href: '/guides/interior-painting-quotes', description: 'Room pricing' },
      { label: 'All Guides', href: '/guides', description: 'View all resources' },
    ]
  },
  support: {
    title: 'Help & Support',
    links: [
      { label: 'Help Center', href: '/help', description: '24/7 support docs' },
      { label: 'Contact Support', href: '/contact', description: 'Get in touch' },
      { label: 'API Documentation', href: '/api-docs', description: 'Developer resources' },
      { label: 'System Status', href: '/status', description: 'Uptime monitoring' },
      { label: 'Feature Requests', href: '/feedback', description: 'Vote on features' },
    ]
  }
};

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* CTA Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Transform Your Painting Business?
            </h3>
            <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
              Join thousands of painting contractors who save 6+ hours per week with AI-powered quotes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Watch 2-Min Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span>PaintQuote Pro</span>
            </Link>
            <p className="text-gray-200 mb-4 max-w-xs">
              The #1 painting estimate software used by 2,000+ contractors to create professional quotes 6x faster. Win more jobs with AI-powered accuracy.
            </p>
            
            {/* Rich Snippet Data */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-base">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-200">SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-gray-200">2-minute average quote time</span>
              </div>
              <div className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-gray-200">50,000+ quotes created monthly</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:support@paintquotepro.com" className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span>support@paintquotepro.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com/paintquotepro', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com/paintquotepro', label: 'Instagram' },
                { icon: Twitter, href: 'https://twitter.com/paintquotepro', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com/company/paintquotepro', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://youtube.com/@paintquotepro', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* SEO-Optimized Footer Links with Descriptions */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="group block"
                    >
                      <div className="text-base text-gray-100 group-hover:text-white transition-colors">
                        {link.label}
                      </div>
                      {link.description && (
                        <div className="text-base text-gray-200 group-hover:text-gray-200 transition-colors">
                          {link.description}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-base font-semibold text-white">Bank-Level Security</div>
              <div className="text-base text-gray-200">256-bit SSL encryption</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-base font-semibold text-white">4.9/5 Rating</div>
              <div className="text-base text-gray-200">2,000+ reviews</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-base font-semibold text-white">2-Min Quotes</div>
              <div className="text-base text-gray-200">6+ hours saved weekly</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-base font-semibold text-white">AI-Powered</div>
              <div className="text-base text-gray-200">Smart assistance</div>
            </div>
          </div>
        </div>

        {/* SEO-Optimized Service Areas */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Painting Contractors Near You</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { city: 'Phoenix', state: 'AZ', contractors: '450+' },
              { city: 'Denver', state: 'CO', contractors: '380+' },
              { city: 'Austin', state: 'TX', contractors: '520+' },
              { city: 'Las Vegas', state: 'NV', contractors: '290+' },
              { city: 'Nashville', state: 'TN', contractors: '310+' },
              { city: 'Charlotte', state: 'NC', contractors: '420+' },
              { city: 'Orlando', state: 'FL', contractors: '480+' },
              { city: 'San Diego', state: 'CA', contractors: '550+' },
            ].map(({ city, state, contractors }) => (
              <Link
                key={city}
                href={`/painting-contractors/${city.toLowerCase().replace(' ', '-')}-${state.toLowerCase()}`}
                className="group"
              >
                <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="text-base font-medium text-white group-hover:text-blue-400">
                    {city}, {state}
                  </div>
                  <div className="text-base text-gray-200">{contractors} contractors</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-base">
            <span className="text-gray-200">Popular searches:</span>
            {[
              'painting estimate software',
              'contractor quoting app',
              'paint job calculator',
              'house painting estimator',
              'commercial painting software'
            ].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="text-blue-400 hover:text-blue-300"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {/* Industry Associations & Certifications */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-base font-semibold text-white mb-4">Industry Partners & Certifications</h4>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="text-base text-gray-200">
              <Award className="h-5 w-5 mb-1 text-yellow-400" />
              <div>PDCA Member</div>
            </div>
            <div className="text-base text-gray-200">
              <Shield className="h-5 w-5 mb-1 text-green-400" />
              <div>BBB A+ Rating</div>
            </div>
            <div className="text-base text-gray-200">
              <CheckCircle className="h-5 w-5 mb-1 text-blue-400" />
              <div>ISO 27001</div>
            </div>
            <div className="text-base text-gray-200">
              <Star className="h-5 w-5 mb-1 text-purple-400" />
              <div>G2 Leader 2024</div>
            </div>
          </div>
        </div>

        {/* Schema.org Markup Helper Text */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-base text-gray-200 space-y-1">
            <p>PaintQuote Pro is professional painting estimate software designed for residential and commercial painting contractors.</p>
            <p>Create accurate painting quotes in minutes • Mobile-friendly • AI-powered pricing • 14-day free trial</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-base text-gray-200">
              © {currentYear} PaintQuote Pro, LLC. All rights reserved. | <span className="text-base">Painting Estimate Software</span>
            </div>
            <div className="flex flex-wrap gap-6 text-base">
              <Link href="/privacy" className="text-gray-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-200 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap.xml" className="text-gray-200 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-200 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}