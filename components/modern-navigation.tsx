'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import MobileMenu from './mobile-menu'

function ModernNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)

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
        ? 'bg-gray-950/98 backdrop-blur-xl border-b border-gray-700' 
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
            <span className="font-bold text-lg text-white group-hover:text-gray-50 transition-colors">
              PaintQuote Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Software Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200 flex items-center gap-1">
                Software
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-gray-950/95 backdrop-filter backdrop-blur-md border border-white/30 rounded-lg p-2 space-y-1">
                  <Link href="/painting-contractor-software" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    Painting Contractor Software
                  </Link>
                  <Link href="/painting-quote-software" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    Quote Software
                  </Link>
                  <Link href="/painting-estimate-software" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    Estimate Software
                  </Link>
                  <Link href="/painting-business-software" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    Business Software
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              href="/#features" 
              className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
            >
              Pricing
            </Link>
            <Link 
              href="/roi-calculator" 
              className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
            >
              ROI Calculator
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu */}
            <MobileMenu />
            
            {/* Desktop Buttons */}
            <Link
              href="/access-code"
              className="hidden lg:inline-flex px-4 py-2 text-base font-medium text-gray-50 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/access-code?code=DEMO2024"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-medium text-base rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Try Demo
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default ModernNavigation