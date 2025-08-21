'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import MobileMenu from './mobile-menu'

function ModernNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
            className="flex items-center space-x-3 group"
          >
            <Image 
              src="/Paint Quote App Logo Transparent.png" 
              alt="PaintQuote Pro Logo" 
              width={40} 
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-bold text-lg text-white group-hover:text-gray-50 transition-colors">
              PaintQuote Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/#features" 
              className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="relative z-10 px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
              onClick={(e) => {
                // Ensure navigation happens with fallback
                console.log('Pricing link clicked');
                if (e.defaultPrevented) {
                  e.preventDefault();
                  router.push('/pricing');
                }
              }}
            >
              Pricing
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative group z-20">
              <button className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200 flex items-center gap-1">
                Resources
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-gray-950/95 backdrop-filter backdrop-blur-md border border-white/30 rounded-lg p-2">
                  <div className="text-xs text-gray-400 px-3 py-1 uppercase tracking-wider">Guides</div>
                  <Link href="/pillars/how-to-price-painting-jobs" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    How to Price Painting Jobs
                  </Link>
                  <Link href="/pillars/painting-contractor-business" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    Start a Painting Business
                  </Link>
                  <div className="text-xs text-gray-400 px-3 py-1 uppercase tracking-wider mt-2">Tools</div>
                  <Link href="/pillars/painting-cost-calculator" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    🧮 Cost Calculator
                  </Link>
                  <Link href="/roi-calculator" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    📊 ROI Calculator
                  </Link>
                  <Link href="/pillars/painting-estimate-templates" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    📄 Estimate Templates
                  </Link>
                  <div className="text-xs text-gray-400 px-3 py-1 uppercase tracking-wider mt-2">Software</div>
                  <Link href="/pillars/painting-estimate-software" className="block px-3 py-2 text-base text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-colors">
                    Compare Software Options
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              href="/demo" 
              className="px-4 py-2 text-base font-medium text-gray-50 hover:text-white hover:bg-gray-950/80 rounded-lg transition-all duration-200"
            >
              Demo
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
              href="/trial-signup"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium text-base rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              title="Forever free plan • Join 15K+ contractors"
            >
              Get 5 Free Quotes
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default ModernNavigation