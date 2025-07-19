'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, Calculator, BarChart, Zap, Shield, Check, ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Speed Problem → Solved',
    description: 'Mobile quoting eliminates office trips. Quote on-site in minutes while competitors take days.',
    highlight: 'Quote anywhere, anytime',
    color: 'from-blue-400 to-cyan-400',
    metric: '95%',
    metricLabel: 'Faster'
  },
  {
    icon: Calculator,
    title: 'Professional Appearance → Solved', 
    description: 'Look like a $10M company with professional templates and branding.',
    highlight: 'Premium presentation',
    color: 'from-purple-400 to-pink-400',
    metric: '3x',
    metricLabel: 'More Trust'
  },
  {
    icon: BarChart,
    title: 'Follow-up Failure → Solved',
    description: 'Automated reminders ensure systematic nurturing. Follow up for weeks automatically.',
    highlight: 'Never lose a lead',
    color: 'from-emerald-400 to-green-400',
    metric: '60%',
    metricLabel: 'More Closes'
  },
  {
    icon: Zap,
    title: 'Pricing Errors → Solved',
    description: 'Built-in calculations ensure consistent accuracy. Never lose profit by pricing wrong.',
    highlight: 'Accurate every time',
    color: 'from-amber-400 to-orange-400',
    metric: '100%',
    metricLabel: 'Accurate'
  },
  {
    icon: Shield,
    title: 'Mobile-First Design',
    description: 'Quote anywhere, no internet required. Built specifically for field contractors.',
    highlight: 'Works offline',
    color: 'from-cyan-400 to-blue-400',
    metric: '24/7',
    metricLabel: 'Available'
  },
  {
    icon: Check,
    title: 'Real Business Results',
    description: 'Average contractor increases from 50 to 200+ quotes monthly, wins 3 additional jobs.',
    highlight: '+$8,400 revenue/month',
    color: 'from-rose-400 to-pink-400',
    metric: '4x',
    metricLabel: 'ROI'
  }
]

export function ModernFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [inView, setInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center badge-modern text-slate-300 mb-8 ${inView ? 'animate-in' : 'opacity-0'}`}>
            <Target className="h-4 w-4 text-purple-400" />
            <span>Stop Losing Jobs to Competition</span>
          </div>
          
          <h2 className={`text-5xl lg:text-6xl font-black text-white mb-6 ${inView ? 'animate-in animate-delay-100' : 'opacity-0'}`}>
            Fix The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">4 Critical</span>
            <br />Failure Points
          </h2>
          
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${inView ? 'animate-in animate-delay-200' : 'opacity-0'}`}>
            We solve the exact problems that cost painters 40-60% of their potential jobs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredCard === index
            
            return (
              <div
                key={index}
                className={`group relative ${inView ? 'animate-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100 + 300}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow Effect */}
                {isHovered && (
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-30`}></div>
                )}
                
                <div className="relative glass-card p-8 h-full card-hover-modern">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Highlight Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      <Sparkles className="h-4 w-4" style={{ color: 'currentColor' }} />
                      {feature.highlight}
                    </span>
                    
                    <ArrowRight className={`h-5 w-5 text-gray-500 transition-all ${isHovered ? 'translate-x-2 text-white' : ''}`} />
                  </div>
                  
                  {/* Metric Display */}
                  <div className="absolute top-8 right-8 text-right opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="text-4xl font-black text-white">{feature.metric}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">{feature.metricLabel}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interactive Demo Section */}
        <div className="glass-card p-2 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8">
            {/* Demo Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-medium">PaintQuote Pro Dashboard</span>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">2.5m</div>
                <div className="text-sm text-gray-400">Avg Quote Time</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">65%</div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400">$8.4k</div>
                <div className="text-sm text-gray-400">Added Revenue</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-amber-400">4.9★</div>
                <div className="text-sm text-gray-400">Customer Rating</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Implementation Progress</span>
                <span className="text-emerald-400 font-medium">98% Complete</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000"
                  style={{ width: '98%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 ${inView ? 'animate-in animate-delay-600' : 'opacity-0'}`}>
          <div className="inline-flex flex-col lg:flex-row items-center gap-8 p-8 glass-card container-glass">
            <div className="text-left">
              <div className="text-2xl font-bold text-white mb-2">Ready to solve all 6 problems?</div>
              <div className="text-gray-400">Join 2,000+ contractors winning more jobs</div>
            </div>
            <Link href="/trial-signup" className="group relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative btn-primary-modern inline-flex items-center gap-2 px-8 py-4">
                <Sparkles className="h-5 w-5" />
                Start Your Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}