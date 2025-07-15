'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, MessageSquare, FileText, Users, Settings, Palette, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface MobileNavProps {
  userEmail: string
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/chat', label: 'New Quote Chat', icon: MessageSquare },
  { href: '/dashboard/quotes', label: 'Quotes', icon: FileText },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/products', label: 'Products', icon: Palette },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function MobileNav({ userEmail }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">PaintQuote Pro</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            
            <div className="border-t pt-4 mt-4">
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {userEmail}
              </div>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <nav className="grid grid-cols-5 gap-1 p-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}