'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronRight, Menu, X, Sparkles } from 'lucide-react'

export default function SharedNavigationSimple() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    handleScroll() // Check initial scroll position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/#features', label: 'Features', glow: 'from-blue-400 to-cyan-400' },
    { href: '/pricing', label: 'Pricing', glow: 'from-purple-400 to-pink-400' },
    { href: '/roi-calculator', label: 'ROI Calculator', glow: 'from-emerald-400 to-green-400' },
    { href: '/#testimonials', label: 'Testimonials', glow: 'from-amber-400 to-orange-400' },
  ]

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      mounted && isScrolled 
        ? 'bg-gray-900/80 backdrop-blur-2xl shadow-2xl shadow-black/20 border-b border-white/10' 
        : 'bg-gradient-to-b from-gray-900/60 to-transparent backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with animation */}
          <Link href="/" className="group flex items-center space-x-3 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-xl blur-lg opacity-100 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white font-black text-xl">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-200 group-hover:to-slate-400 transition-all duration-300">
                PaintQuote Pro
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Enterprise Quoting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden lg:flex items-center">
            <div className="relative flex items-center space-x-1 p-1.5 bg-gray-900/80 rounded-2xl backdrop-blur-xl border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-5 py-2.5 text-base font-medium text-gray-100 hover:text-white transition-all duration-300 rounded-xl"
                >
                  {hoveredItem === item.label && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.glow} opacity-20 rounded-xl blur-xl`}></div>
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {hoveredItem === item.label && (
                    <div className="absolute inset-0 bg-gray-900/70 rounded-xl"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons with enhanced styling */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/access-code"
              className="relative px-5 py-2.5 text-base font-medium text-slate-300 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="/trial-signup"
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 rounded-xl blur-md opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-semibold text-base rounded-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-slate-500/25 group-hover:scale-105">
                <Sparkles className="h-4 w-4" />
                Start Free Trial
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-2.5 text-gray-100 hover:text-white transition-colors"
          >
            <div className="absolute inset-0 bg-gray-900/70 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu with glassmorphism */}
        <div className={`lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-6 space-y-2 bg-gray-900/95 backdrop-blur-2xl rounded-2xl mt-2 border border-white/10">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="block mx-4 px-5 py-3 text-base font-medium text-gray-100 hover:text-white hover:bg-gray-900/70 rounded-xl transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mx-4 pt-4 space-y-3 border-t border-white/10">
              <Link
                href="/access-code"
                className="block px-5 py-3 text-base font-medium text-gray-100 hover:text-white hover:bg-gray-900/70 rounded-xl transition-all duration-200 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/trial-signup"
                className="block px-5 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium text-base rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/25"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}