'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Calculator, DollarSign, Briefcase, Phone, LogIn, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '/#features', icon: Briefcase },
  { name: 'Pricing', href: '/pricing', icon: DollarSign },
  { name: 'ROI Calculator', href: '/roi-calculator', icon: Calculator },
  { name: 'Demo', href: '/demo', icon: Briefcase },
  { name: 'Case Studies', href: '/case-studies', icon: Briefcase },
  { name: 'Contact', href: '/contact', icon: Phone },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-gray-900 border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-white text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <nav className="mt-6 flex flex-col space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
                           (item.href !== '/' && pathname.startsWith(item.href.replace('/#', '/')))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-8 space-y-3 px-4">
          <Link href="/access-code" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
          
          <Link href="/access-code?code=DEMO2024" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Try Demo
            </Button>
          </Link>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="text-center text-sm text-gray-400">
            <p>© 2025 PaintQuote Pro</p>
            <p className="mt-1">Professional Painting Quotes</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}