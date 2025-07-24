'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatOnboardingPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to form onboarding
    router.replace('/onboarding')
  }, [router])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to setup...</p>
      </div>
    </div>
  )
}