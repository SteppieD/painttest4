'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, FileText, Users, Settings, BarChart3, Calculator, LogOut, Sparkles, CreditCard, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
// import { OnboardingModal } from '@/components/onboarding-modal'
 // TODO: Check if this import is needed
interface CompanyData {
  id: number
  name: string
  email: string
  access_code: string
  onboarding_completed?: boolean
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem('paintquote_company')
    if (!storedData) {
      router.push('/access-code')
      return
    }

    try {
      const data = JSON.parse(storedData)
      setCompany({
        id: data.id,
        name: data.name,
        email: data.email,
        access_code: data.access_code,
        onboarding_completed: data.onboarding_completed
      })
      
      // Check if onboarding is needed
      if (!data.onboarding_completed && !data.skipOnboarding && pathname !== '/onboarding' && pathname !== '/onboarding/chat') {
        setShowOnboarding(true)
      }
    } catch (error) {
      console.error('Error parsing company data:', error)
      router.push('/access-code')
    } finally {
      setLoading(false)
    }
  }, [router])
  
  const handleSignOut = () => {
    localStorage.removeItem('paintquote_company')
    router.push('/access-code')
  }

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutGrid, color: 'from-blue-400 to-cyan-400' },
    { href: '/create-quote', label: 'Quick Quote', icon: Zap, color: 'from-purple-400 to-pink-400' },
    { href: '/dashboard/quotes', label: 'Quote Pipeline', icon: FileText, color: 'from-emerald-400 to-green-400' },
    { href: '/dashboard/customers', label: 'Customers', icon: Users, color: 'from-amber-400 to-orange-400' },
    { href: '/billing', label: 'Billing', icon: CreditCard, color: 'from-rose-400 to-pink-400' },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings, color: 'from-slate-400 to-gray-400' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-900">
        <div className="text-center bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-100 animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-white font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Layout Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar */}
        <div className="hidden lg:flex top-0 left-0 h-full bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg rounded-none border-r border-white/10 z-30 flex-col" style={{ position: 'fixed', width: '256px' }}>
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 p-6 border-b border-white/10 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-xl blur-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">P</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-white">PaintQuote Pro</div>
                <div className="text-base text-gray-200">{company.name}</div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-gray-900/70 text-white' 
                        : 'text-gray-200 hover:text-white hover:bg-gray-900/80'
                      }
                    `}
                  >
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-xl blur-md`}></div>
                    )}
                    <div className={`relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} ${isActive ? '' : 'opacity-60 group-hover:opacity-100'} transition-opacity`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="relative font-medium">{item.label}</span>
                    {isActive && (
                      <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/10">
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-base font-medium text-white">Pro Tip</span>
                </div>
                <p className="text-base text-gray-200">Create quotes 95% faster with our AI assistant</p>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-900/80 rounded-xl transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
        </div>

        {/* Main Content */}
        <main className="w-full lg:pl-64 min-h-screen flex flex-col">
          {/* Top Bar */}
          <div className="h-20 bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg rounded-none border-b border-white/10 px-8 flex items-center">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl font-bold text-white">
                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-base text-gray-200 hidden md:block">⚡ {company.email}</span>
                <Link href="/create-quote" className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative btn-primary-modern inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    New Quote
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-card rounded-t-2xl border-t border-white/10">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gray-900/70 text-white' 
                    : 'text-gray-200 hover:text-white hover:bg-gray-900/80'
                  }
                `}
              >
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} ${isActive ? '' : 'opacity-60'} transition-opacity`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)}
        companyData={company}
      />
    </div>
  )
}