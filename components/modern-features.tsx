'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Calculator, BarChart, Zap, Shield, Check, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Speed Problem → Solved',
    description: 'Mobile quoting eliminates office trips. Quote on-site in minutes while competitors take days.',
    highlight: 'Quote anywhere, anytime',
    color: 'orange'
  },
  {
    icon: Calculator,
    title: 'Professional Appearance → Solved', 
    description: 'Look like a $10M company with professional templates and branding.',
    highlight: 'Premium presentation',
    color: 'blue'
  },
  {
    icon: BarChart,
    title: 'Follow-up Failure → Solved',
    description: 'Automated reminders ensure systematic nurturing. Follow up for weeks automatically.',
    highlight: 'Never lose a lead',
    color: 'green'
  },
  {
    icon: Zap,
    title: 'Pricing Errors → Solved',
    description: 'Built-in calculations ensure consistent accuracy. Never lose profit by pricing wrong.',
    highlight: 'Accurate every time',
    color: 'purple'
  },
  {
    icon: Shield,
    title: 'Mobile-First Design',
    description: 'Quote anywhere, no internet required. Built specifically for field contractors.',
    highlight: 'Works offline',
    color: 'cyan'
  },
  {
    icon: Check,
    title: 'Real Business Results',
    description: 'Average contractor increases from 50 to 200+ quotes monthly, wins 3 additional jobs.',
    highlight: '+$8,400 revenue/month',
    color: 'emerald'
  }
]

const colorMap = {
  orange: 'from-orange-500 to-red-500',
  blue: 'from-blue-500 to-indigo-500', 
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-pink-500',
  cyan: 'from-cyan-500 to-blue-500',
  emerald: 'from-emerald-500 to-green-500'
}

export function ModernFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [inView, setInView] = useState(false)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" className="text-white/10" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm mb-6 ${inView ? 'animate-in' : 'opacity-0'}`}>
            <Zap className="h-4 w-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Stop Losing Jobs</span>
          </div>
          
          <h2 className={`text-4xl lg:text-6xl font-black text-white mb-6 ${inView ? 'animate-in animate-delay-100' : 'opacity-0'}`}>
            Fix The <span className="text-gradient">4 Critical</span><br />
            Failure Points
          </h2>
          
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${inView ? 'animate-in animate-delay-200' : 'opacity-0'}`}>
            We solve the exact problems that cost painters 40-60% of their potential jobs
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === activeFeature
              const gradientClass = colorMap[feature.color as keyof typeof colorMap]
              
              return (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-500 ${
                    inView ? 'animate-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isActive 
                      ? 'bg-white/10 border-white/30 shadow-2xl scale-105' 
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}>
                    
                    {/* Active Indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradientClass} transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`relative flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                          {isActive && (
                            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${gradientClass} opacity-50 animate-pulse`}></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {feature.description}
                          </p>
                          <div className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                            <span>{feature.highlight}</span>
                            <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-1' : ''}`} style={{color: 'inherit'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Visual Demo */}
          <div className="relative">
            <div className={`card-dark p-8 hover-lift ${inView ? 'animate-in animate-delay-400' : 'opacity-0'}`}>
              {/* Demo Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">PaintQuote Pro Dashboard</span>
              </div>

              {/* Active Feature Demo */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = features[activeFeature].icon
                    const gradientClass = colorMap[features[activeFeature].color as keyof typeof colorMap]
                    return (
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    )
                  })()}
                  <div>
                    <div className="font-semibold text-white">{features[activeFeature].title}</div>
                    <div className="text-sm text-gray-400">Active Solution</div>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Implementation Progress</span>
                    <span className="text-green-400">98% Complete</span>
                  </div>
                  <div className="progress-modern">
                    <div 
                      className="progress-fill" 
                      style={{ width: '98%' }}
                    ></div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">+65%</div>
                    <div className="text-xs text-gray-400">Win Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">2m</div>
                    <div className="text-xs text-gray-400">Quote Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 glass p-4 rounded-lg hover-scale">
              <div className="text-sm text-white mb-1">Problems Solved</div>
              <div className="text-2xl font-bold text-gradient">{activeFeature + 1}/6</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${inView ? 'animate-in animate-delay-600' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="text-left">
              <div className="text-lg font-bold text-white">Ready to solve all 6 problems?</div>
              <div className="text-sm text-gray-300">Start your free trial today</div>
            </div>
            <button className="btn-primary-enhanced">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}