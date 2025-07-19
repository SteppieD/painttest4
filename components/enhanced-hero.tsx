'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Zap, DollarSign, Clock, Users } from 'lucide-react'

const stats = [
  { value: '2,000+', label: 'Contractors', icon: Users },
  { value: '40-60%', label: 'More Jobs Won', icon: DollarSign },
  { value: '2 min', label: 'Quote Creation', icon: Clock },
  { value: '24hr', label: 'Response Time', icon: Zap },
]

const testimonials = [
  {
    name: 'Mike Rodriguez',
    company: 'Rodriguez Painting LLC',
    quote: 'From 4 hours to 15 minutes. Winning 60% more jobs.',
    revenue: '+$8,400/month'
  },
  {
    name: 'Sarah Chen', 
    company: 'Premier Coatings Inc',
    quote: 'Same-day quotes instead of 3-4 days. Close rate jumped from 25% to 65%.',
    revenue: '+$12,000/month'
  },
  {
    name: 'James Wilson',
    company: 'Wilson & Sons Painting', 
    quote: 'Quote in under 20 minutes. Game changer for our business.',
    revenue: '+$15,200/month'
  }
]

export function EnhancedHero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl float-element"
          style={{
            left: mousePosition.x / 50,
            top: mousePosition.y / 50,
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl float-element"
          style={{
            right: mousePosition.x / 80,
            bottom: mousePosition.y / 80,
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">AI-Powered Quote Generation</span>
              </div>
              
              <h1 className="hero-text text-5xl lg:text-7xl font-black text-white leading-tight">
                From <span className="text-gradient">3-6 Hours</span><br />
                to <span className="text-gradient text-glow">2 Minutes</span>
              </h1>
              
              <p className="hero-text text-xl text-gray-300 leading-relaxed opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animation: 'fadeInUp 0.8s ease forwards' }}>
                Transform your painting business with AI-powered quotes. Join <strong>2,000+ contractors</strong> winning <strong>40-60% more jobs</strong> by responding within 24 hours.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 hero-text opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards', animation: 'fadeInUp 0.8s ease forwards' }}>
              <Link href="/trial-signup" className="btn-primary-enhanced group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/pricing" className="btn-ghost-enhanced">
                View Pricing
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 hero-text opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards', animation: 'fadeInUp 0.8s ease forwards' }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mb-2 group-hover:bg-orange-500/30 transition-colors">
                      <Icon className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Interactive Demo/Testimonials */}
          <div className="relative">
            {/* Testimonial Carousel */}
            <div className="card-dark p-8 space-y-6 hover-lift">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Live Results</span>
              </div>
              
              <div className="space-y-4">
                <blockquote className="text-lg text-gray-300 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-400">{testimonials[currentTestimonial].company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{testimonials[currentTestimonial].revenue}</div>
                    <div className="text-xs text-gray-400">Revenue Increase</div>
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-orange-500' : 'bg-gray-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Floating Quote Preview */}
            <div className="absolute -top-6 -right-6 card-enhanced p-4 hover-scale">
              <div className="text-sm text-gray-600 mb-2">Quote Generation Time</div>
              <div className="text-3xl font-bold text-gradient">2:34</div>
              <div className="text-xs text-gray-500">vs 3-6 hours traditional</div>
            </div>

            {/* Success Rate Badge */}
            <div className="absolute -bottom-4 -left-4 glass p-4 rounded-lg hover-scale">
              <div className="text-sm text-white mb-1">Win Rate</div>
              <div className="text-2xl font-bold text-green-400">65%</div>
              <div className="text-xs text-gray-300">+40% improvement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}