'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function SharedNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      label: 'Features',
      href: '/#features',
      type: 'link'
    },
    {
      label: 'Resources',
      type: 'dropdown',
      items: [
        { label: 'ROI Calculator', href: '/roi-calculator' },
        { label: 'Paint Estimate Templates', href: '/paint-estimate-templates' },
        { label: 'Painting Quote Templates', href: '/painting-quote-templates' },
        { label: 'How to Quote', href: '/how-to-quote-painting-jobs' },
        { label: 'Success Stories', href: '/case-studies' },
        { label: 'Our Work', href: '/painting-projects' }
      ]
    },
    {
      label: 'Locations',
      type: 'dropdown',
      items: [
        { label: 'Phoenix, AZ', href: '/locations/phoenix' },
        { label: 'Denver, CO', href: '/locations/denver' },
        { label: 'Orlando, FL', href: '/locations/orlando' },
        { label: 'San Diego, CA', href: '/locations/san-diego' },
        { label: 'Austin, TX', href: '/locations/austin' },
        { label: 'Las Vegas, NV', href: '/locations/las-vegas' },
        { label: 'Charlotte, NC', href: '/locations/charlotte' },
        { label: 'Nashville, TN', href: '/locations/nashville' },
        { label: 'Tampa, FL', href: '/locations/tampa' },
        { label: 'Miami, FL', href: '/locations/miami' }
      ]
    },
    {
      label: 'Pricing',
      href: '/pricing',
      type: 'link'
    }
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img 
              src="/Paint Quote App Logo Transparent.png" 
              alt="PaintQuote Pro Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'inline';
              }}
            />
            <span className="font-bold hidden">PaintQuote Pro</span>
            <span className="font-bold">PaintQuote Pro</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
            {navigationItems.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <Link 
                    key={index}
                    href={item.href || '#'} 
                    className={`transition-colors hover:text-foreground/80 ${
                      pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              } else if (item.type === 'dropdown') {
                return (
                  <div key={index} className="relative group">
                    <button 
                      className="flex items-center space-x-1 transition-colors hover:text-foreground/80 text-foreground/60"
                      onMouseEnter={() => {
                        if (item.label === 'Resources') setResourcesOpen(true)
                        if (item.label === 'Locations') setLocationsOpen(true)
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div 
                      className={`absolute top-full -left-4 mt-2 w-56 rounded-md bg-background border shadow-lg ${
                        (item.label === 'Resources' && resourcesOpen) || 
                        (item.label === 'Locations' && locationsOpen) 
                          ? 'opacity-100 visible' 
                          : 'opacity-0 invisible'
                      } transition-all duration-200`}
                      onMouseEnter={() => {
                        if (item.label === 'Resources') setResourcesOpen(true)
                        if (item.label === 'Locations') setLocationsOpen(true)
                      }}
                      onMouseLeave={() => {
                        if (item.label === 'Resources') setResourcesOpen(false)
                        if (item.label === 'Locations') setLocationsOpen(false)
                      }}
                    >
                      <div className="py-2">
                        {item.items?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2 text-base hover:bg-accent hover:text-accent-foreground"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })}
          </nav>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/access-code"
            className="inline-flex items-center rounded-md px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/trial-signup"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            {navigationItems.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={index}
                    href={item.href || '#'}
                    className="block py-2 text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              } else if (item.type === 'dropdown') {
                return (
                  <div key={index}>
                    <div className="py-2 text-base font-medium text-gray-200">
                      {item.label}
                    </div>
                    <div className="ml-4 space-y-2">
                      {item.items?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block py-1 text-base"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            })}
            <div className="pt-4 border-t space-y-2">
              <Link
                href="/access-code"
                className="block py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/trial-signup"
                className="block py-2 text-base font-medium text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}