import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  MessageSquare,
  ThumbsUp,
  Lightbulb,
  Bug,
  Zap,
  TrendingUp,
  Users,
  Star,
  ArrowUp,
  Clock,
  CheckCircle,
  GitBranch,
  Heart,
  Target,
  Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Feature Requests & Feedback | Help Shape PaintQuote Pro',
  description: 'Submit feature requests, vote on ideas, and help shape the future of PaintQuote Pro. Your feedback drives our product roadmap.',
  openGraph: {
    title: 'PaintQuote Pro Feedback Hub',
    description: 'Vote on features and submit ideas to improve PaintQuote Pro',
    images: ['/og-feedback.png'],
  },
}

export default function FeedbackPage() {
  const feedbackCategories = [
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Suggest new features or improvements',
      count: 342,
      color: 'blue'
    },
    {
      icon: Bug,
      title: 'Bug Report',
      description: 'Report issues or problems',
      count: 28,
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Integration',
      description: 'Request new integrations',
      count: 156,
      color: 'purple'
    },
    {
      icon: Heart,
      title: 'Appreciation',
      description: 'Share what you love',
      count: 487,
      color: 'pink'
    }
  ]

  const topRequests = [
    {
      title: 'Mobile app offline mode',
      description: 'Create quotes without internet connection and sync when back online',
      votes: 234,
      status: 'In Development',
      category: 'Mobile',
      comments: 45
    },
    {
      title: 'Zapier integration',
      description: 'Connect PaintQuote Pro with 5000+ apps through Zapier',
      votes: 189,
      status: 'Planned',
      category: 'Integration',
      comments: 32
    },
    {
      title: 'Multi-currency support',
      description: 'Support for quotes in different currencies with auto-conversion',
      votes: 167,
      status: 'Under Review',
      category: 'Feature',
      comments: 28
    },
    {
      title: 'Custom quote templates',
      description: 'Create and save custom quote templates for different job types',
      votes: 145,
      status: 'In Development',
      category: 'Feature',
      comments: 41
    },
    {
      title: 'Team chat integration',
      description: 'Built-in chat for teams to discuss quotes and projects',
      votes: 132,
      status: 'Under Review',
      category: 'Collaboration',
      comments: 19
    }
  ]

  const recentUpdates = [
    {
      title: 'QuickBooks Desktop Integration',
      description: 'You asked, we delivered! Full QuickBooks Desktop support is now live.',
      date: '2 days ago',
      votes: 312,
      icon: CheckCircle
    },
    {
      title: 'Dark Mode',
      description: 'Easier on the eyes during those late-night quotes.',
      date: '1 week ago',
      votes: 487,
      icon: CheckCircle
    },
    {
      title: 'Bulk Quote Export',
      description: 'Export multiple quotes to CSV or PDF at once.',
      date: '2 weeks ago',
      votes: 203,
      icon: CheckCircle
    }
  ]

  const roadmapPhases = [
    {
      phase: 'Q1 2024',
      status: 'current',
      items: [
        'Mobile offline mode',
        'Custom templates',
        'Advanced reporting'
      ]
    },
    {
      phase: 'Q2 2024',
      status: 'planned',
      items: [
        'Zapier integration',
        'Multi-currency',
        'API v2.0'
      ]
    },
    {
      phase: 'Q3 2024',
      status: 'future',
      items: [
        'AI enhancements',
        'Team collaboration',
        'White-label options'
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Planned':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'Under Review':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-100 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <MessageSquare className="h-3 w-3 mr-1" />
              Feedback Hub
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Help Shape the Future
            </h1>
            
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Your ideas drive our roadmap. Vote on features, submit requests, 
              and see what we're building next.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Lightbulb className="h-5 w-5 mr-2" />
                Submit an Idea
              </Button>
              <Link href="#roadmap">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  View Roadmap
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Categories */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Share Your Feedback
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedbackCategories.map((category, index) => (
              <Card key={index} className="glass-card p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <category.icon className={`h-12 w-12 mx-auto mb-4 ${
                  category.color === 'blue' ? 'text-blue-400' :
                  category.color === 'red' ? 'text-red-400' :
                  category.color === 'purple' ? 'text-purple-400' :
                  'text-pink-400'
                }`} />
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-gray-200 mb-3">{category.description}</p>
                <Badge variant="outline">{category.count} submissions</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Feature Requests */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Top Feature Requests
            </h2>
            <p className="text-gray-100">Vote for features you want to see</p>
          </div>

          <div className="space-y-4">
            {topRequests.map((request, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    <Button 
                      size="default" 
                      variant="ghost" 
                      className="hover:text-blue-400 transition-colors"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                    <span className="text-2xl font-bold text-white">{request.votes}</span>
                    <span className="text-base text-gray-200">votes</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{request.title}</h3>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-200 mb-3">{request.description}</p>
                    
                    <div className="flex items-center gap-6 text-base text-gray-200">
                      <Badge variant="outline">{request.category}</Badge>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{request.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              View All Requests
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Recently Shipped
            </h2>
            <p className="text-gray-100">Features you requested that are now live</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {recentUpdates.map((update, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <update.icon className="h-8 w-8 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{update.title}</h3>
                    <p className="text-gray-200 mb-3">{update.description}</p>
                    <div className="flex items-center gap-4 text-base text-gray-200">
                      <span>{update.date}</span>
                      <span>•</span>
                      <span className="text-green-400">{update.votes} votes delivered</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Product Roadmap
            </h2>
            <p className="text-gray-100">See what we're working on next</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {roadmapPhases.map((phase, index) => (
              <Card key={index} className={`glass-card p-6 ${
                phase.status === 'current' ? 'border-blue-500' : ''
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                  {phase.status === 'current' && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      In Progress
                    </Badge>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        phase.status === 'current' ? 'bg-blue-400' :
                        phase.status === 'planned' ? 'bg-purple-400' :
                        'bg-gray-400'
                      }`} />
                      <span className="text-gray-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Idea CTA */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12">
            <div className="text-center">
              <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Have an Idea?
              </h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                We read every submission. The best ideas get built and shipped to all users.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 text-left mb-6">
                  <label className="block text-base font-medium text-gray-100 mb-2">
                    What would make PaintQuote Pro better?
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Describe your idea..."
                  />
                  
                  <div className="mt-4 flex gap-4">
                    <select className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                      <option>Feature Request</option>
                      <option>Bug Report</option>
                      <option>Integration</option>
                      <option>Other</option>
                    </select>
                    
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Submit Idea
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-base text-gray-200">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Join 2,000+ contributors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Every idea reviewed</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Community Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">2,847</div>
              <div className="text-gray-100">Ideas Submitted</div>
            </Card>
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">342</div>
              <div className="text-gray-100">Features Shipped</div>
            </Card>
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">15,234</div>
              <div className="text-gray-100">Votes Cast</div>
            </Card>
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">89%</div>
              <div className="text-gray-100">User Satisfaction</div>
            </Card>
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}