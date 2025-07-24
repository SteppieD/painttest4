'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'

function ModernNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-lg text-white group-hover:text-slate-300 transition-colors">
              PaintQuote Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Software Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-1">
                Software
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="glass-card p-2 space-y-1">
                  <Link href="/painting-contractor-software" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    Painting Contractor Software
                  </Link>
                  <Link href="/painting-quote-software" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    Quote Software
                  </Link>
                  <Link href="/painting-estimate-software" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    Estimate Software
                  </Link>
                  <Link href="/painting-business-software" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    Business Software
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              href="/#features" 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              Pricing
            </Link>
            <Link 
              href="/roi-calculator" 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              ROI Calculator
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/access-code"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/trial-signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Free Trial
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-1">
            <Link 
              href="/painting-contractor-software" 
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Software
            </Link>
            <Link 
              href="/#features" 
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/roi-calculator" 
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ROI Calculator
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2 border-t border-gray-800">
              <Link
                href="/access-code"
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/trial-signup"
                className="block mx-4 px-4 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium text-sm rounded-lg text-center transition-all duration-200"
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

export default ModernNavigation