import { Metadata } from 'next'
import Link from 'next/link'
// import { Card } from '@/components/ui/card' // TODO: Check if this import is needed
// import { Badge } from '@/components/ui/badge' // TODO: Check if this import is needed
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  BookOpen,
  Calculator,
  Zap,
  TrendingUp,
  Home,
  Building,
  Paintbrush,
  DollarSign,
  Users,
  FileText,
  Target,
  Clock,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Contractor Guides & Resources | PaintQuote Pro',
  description: 'Free guides for painting contractors. Learn estimating, pricing, business growth, and software tools. Expert resources to grow your painting business.',
  keywords: 'painting guides, contractor resources, painting business guides, estimating guides, painting tutorials',
  openGraph: {
    title: 'Free Guides for Painting Contractors',
    description: 'Comprehensive resources to help you estimate jobs, grow your business, and use technology effectively.',
    type: 'website',
  },
  alternates: {
    canonical: '/guides'
  }
}

// Guide categories
const guideCategories = [
  {
    title: 'Essential Guides',
    description: 'Core knowledge every painting contractor needs',
    guides: [
      {
        title: 'How to Quote Painting Jobs',
        description: 'Complete guide to creating professional painting quotes that win jobs',
        href: '/guides/how-to-quote-painting-jobs',
        icon: FileText,
        color: 'blue',
        readTime: '15 min',
        level: 'Beginner'
      },
      {
        title: 'Painting Business Guide',
        description: 'How to start, run, and scale a profitable painting company',
        href: '/guides/painting-business-guide',
        icon: TrendingUp,
        color: 'green',
        readTime: '20 min',
        level: 'All Levels'
      }
    ]
  },
  {
    title: 'Tools & Software',
    description: 'Technology to streamline your business',
    guides: [
      {
        title: 'Painting Estimate Software',
        description: 'Compare the best software solutions for painting contractors',
        href: '/guides/painting-estimate-software',
        icon: Zap,
        color: 'purple',
        readTime: '12 min',
        level: 'Intermediate'
      },
      {
        title: 'Paint Calculator Tools',
        description: 'Free calculators for paint coverage, costs, and materials',
        href: '/guides/paint-calculator',
        icon: Calculator,
        color: 'yellow',
        readTime: '10 min',
        level: 'Beginner'
      }
    ]
  },
  {
    title: 'Specialized Topics',
    description: 'Deep dives into specific areas',
    guides: [
      {
        title: 'Interior Painting Guide',
        description: 'Room-by-room pricing and estimation strategies',
        href: '/guides/interior-painting-estimator',
        icon: Home,
        color: 'blue',
        readTime: '8 min',
        level: 'Intermediate'
      },
      {
        title: 'Commercial Painting',
        description: 'How to win and manage commercial painting projects',
        href: '/guides/commercial-painting-guide',
        icon: Building,
        color: 'purple',
        readTime: '12 min',
        level: 'Advanced'
      }
    ]
  }
]

// Quick resources
const quickResources = [
  {
    title: 'ROI Calculator',
    description: 'Calculate your return on software investment',
    href: '/roi-calculator',
    icon: DollarSign
  },
  {
    title: 'Quote Templates',
    description: 'Professional painting quote templates',
    href: '/templates',
    icon: FileText
  },
  {
    title: 'Pricing Database',
    description: 'Regional painting prices by city',
    href: '/pricing',
    icon: Target
  },
  {
    title: 'Video Tutorials',
    description: 'Learn PaintQuote Pro features',
    href: '/tutorials',
    icon: BookOpen
  }
]

export default function GuidesIndex() {
  return (
    <>
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                Free Resources
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Painting Contractor Guides & Resources
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Everything you need to know about estimating, pricing, and growing your painting business. 
                Written by industry experts, used by 2,000+ contractors.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-base text-gray-200">In-depth guides</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">3 hrs</div>
                  <div className="text-base text-gray-200">Of content</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">50k+</div>
                  <div className="text-base text-gray-200">Monthly readers</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-base text-gray-200">Free forever</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Resources */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Quick Resources</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {quickResources.map((resource) => (
                  <Link key={resource.title} href={resource.href} className="group">
                    <Card className="bg-gray-800/30 border-gray-700 p-4 hover:border-blue-500/50 transition-all text-center">
                      <resource.icon className="h-8 w-8 text-gray-200 group-hover:text-blue-400 mx-auto mb-2" />
                      <h3 className="font-semibold text-white group-hover:text-blue-400 text-base">
                        {resource.title}
                      </h3>
                      <p className="text-base text-gray-200 mt-1">{resource.description}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {guideCategories.map((category, categoryIndex) => (
                <div key={category.title} className={categoryIndex > 0 ? 'mt-16' : ''}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
                    <p className="text-gray-200">{category.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.guides.map((guide) => (
                      <Link key={guide.title} href={guide.href} className="group">
                        <Card className="bg-gray-800/30 border-gray-700 p-6 h-full hover:border-blue-500/50 transition-all">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-${guide.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <guide.icon className={`h-6 w-6 text-${guide.color}-400`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 mb-2">
                                {guide.title}
                              </h3>
                              <p className="text-gray-200 text-base mb-3">
                                {guide.description}
                              </p>
                              <div className="flex items-center gap-4 text-base">
                                <span className="text-gray-200">
                                  <Clock className="h-3 w-3 inline mr-1" />
                                  {guide.readTime}
                                </span>
                                <Badge variant="outline" className="border-gray-600 text-gray-200">
                                  {guide.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Most Popular Guides
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-2xl font-bold text-yellow-400">#1</div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      Most Read
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <Link href="/guides/how-to-quote-painting-jobs" className="hover:text-blue-400">
                      How to Quote Painting Jobs
                    </Link>
                  </h3>
                  <p className="text-gray-200 text-base mb-4">
                    Step-by-step guide to creating quotes that win jobs. Includes pricing formulas, 
                    templates, and pro tips.
                  </p>
                  <div className="flex items-center gap-4 text-base text-gray-200">
                    <span>25k+ reads</span>
                    <span>•</span>
                    <span>4.9★ rating</span>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-2xl font-bold text-silver-400">#2</div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Trending
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <Link href="/guides/paint-calculator" className="hover:text-green-400">
                      Paint Calculator & Tools
                    </Link>
                  </h3>
                  <p className="text-gray-200 text-base mb-4">
                    Free calculators for paint coverage, material costs, and labor hours. 
                    Used by contractors daily.
                  </p>
                  <div className="flex items-center gap-4 text-base text-gray-200">
                    <span>18k+ uses</span>
                    <span>•</span>
                    <span>Saves 30 min</span>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-2xl font-bold text-bronze-400">#3</div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      Essential
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <Link href="/guides/painting-business-guide" className="hover:text-purple-400">
                      Starting a Painting Business
                    </Link>
                  </h3>
                  <p className="text-gray-200 text-base mb-4">
                    Everything from startup to $1M+ revenue. Legal setup, pricing, hiring, 
                    and scaling strategies.
                  </p>
                  <div className="flex items-center gap-4 text-base text-gray-200">
                    <span>15k+ reads</span>
                    <span>•</span>
                    <span>20 min read</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Get New Guides & Tips Weekly
                </h2>
                <p className="text-xl text-gray-100 mb-8">
                  Join 5,000+ contractors getting actionable advice to grow their business.
                </p>
                
                <form className="max-w-md mx-auto flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Subscribe
                  </button>
                </form>
                
                <p className="text-base text-gray-200 mt-4">
                  No spam, unsubscribe anytime. We share tips, not sales pitches.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Additional Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">By Business Stage</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/guides/painting-business-guide#getting-started" className="text-gray-100 hover:text-white">
                        → Just Starting Out (0-$100k)
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/painting-business-guide#growing" className="text-gray-100 hover:text-white">
                        → Growing Your Business ($100-500k)
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/painting-business-guide#scaling" className="text-gray-100 hover:text-white">
                        → Scaling to $1M+
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">By Topic</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/guides/how-to-quote-painting-jobs#pricing" className="text-gray-100 hover:text-white">
                        → Pricing Strategies
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/painting-estimate-software" className="text-gray-100 hover:text-white">
                        → Technology & Software
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/paint-calculator" className="text-gray-100 hover:text-white">
                        → Estimation Tools
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </>
  )
}