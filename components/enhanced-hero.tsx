'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Zap, DollarSign, Clock, Users, Sparkles, TrendingUp, ChevronRight } from 'lucide-react'

const stats = [
  { value: '2,000+', label: 'Contractors', icon: Users, color: 'from-blue-400 to-cyan-400' },
  { value: '40-60%', label: 'More Jobs Won', icon: DollarSign, color: 'from-emerald-400 to-green-400' },
  { value: '2 min', label: 'Quote Creation', icon: Clock, color: 'from-purple-400 to-pink-400' },
  { value: '24hr', label: 'Response Time', icon: Zap, color: 'from-amber-400 to-orange-400' },
]

const testimonials = [
  {
    name: 'Mike Rodriguez',
    company: 'Rodriguez Painting LLC',
    quote: 'From 4 hours to 15 minutes. Winning 60% more jobs.',
    revenue: '+$8,400/month',
    avatar: '👨‍🔧'
  },
  {
    name: 'Sarah Chen', 
    company: 'Premier Coatings Inc',
    quote: 'Same-day quotes instead of 3-4 days. Close rate jumped from 25% to 65%.',
    revenue: '+$12,000/month',
    avatar: '👩‍💼'
  },
  {
    name: 'James Wilson',
    company: 'Wilson & Sons Painting', 
    quote: 'Quote in under 20 minutes. Game changer for our business.',
    revenue: '+$15,200/month',
    avatar: '👨‍💻'
  }
]

export function EnhancedHero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  return (
    <section className="relative min-h-screen overflow-hidden gradient-animate">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.5}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.3}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
            transition: 'all 0.7s ease-out'
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Noise Texture */}
        <div className="noise-overlay absolute inset-0"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center badge-modern text-slate-300 floating">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>AI-Powered Enterprise Solution</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="text-white">From </span>
                <span className="text-gradient-modern">3-6 Hours</span>
                <br />
                <span className="text-white">to </span>
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    2 Minutes
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-30"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-100 leading-relaxed max-w-lg">
                Transform your painting business with AI-powered quotes. Join <strong className="text-white">2,000+ contractors</strong> winning <strong className="text-white">40-60% more jobs</strong> by responding within 24 hours.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/trial-signup" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-md opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative btn-primary-modern inline-flex items-center gap-2 px-8 py-4">
                  <Sparkles className="h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link href="/pricing" className="glass-card px-8 py-4 inline-flex items-center justify-center gap-2 text-white font-semibold hover:bg-gray-900/70 transition-all group">
                View Pricing
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="glass-card p-4 text-center group card-hover-modern">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-base text-gray-200">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Interactive Demo/Testimonials */}
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="glass-card p-8 space-y-6 container-glass">
              {/* Live Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-emerald-400 text-base font-medium">Live Results</span>
                </div>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              
              {/* Testimonial Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonials[currentTestimonial].avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-base text-gray-200">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
                
                <blockquote className="text-lg text-gray-100 leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                  <span className="text-base text-gray-100">Revenue Increase</span>
                  <span className="text-2xl font-bold text-emerald-400">{testimonials[currentTestimonial].revenue}</span>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Metric Cards */}
            <div className="absolute -top-8 -right-8 glass-card p-6 floating">
              <div className="text-base text-gray-200 mb-2">Quote Speed</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">2:34</div>
              <div className="text-base text-gray-200">vs 3-6 hours</div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass-card p-6 floating-delayed">
              <div className="text-base text-gray-200 mb-2">Win Rate</div>
              <div className="text-3xl font-bold text-emerald-400">65%</div>
              <div className="text-base text-gray-200">+40% improvement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="glass-card p-3 rounded-full animate-bounce">
          <ArrowRight className="h-5 w-5 text-white rotate-90" />
        </div>
      </div>
    </section>
  )
}