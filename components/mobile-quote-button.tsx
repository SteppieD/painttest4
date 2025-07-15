'use client'

import { Plus, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function MobileQuoteButton() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2">
      <Link href="/dashboard/quotes/mobile">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          title="Quick Quote Form"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
      <Link href="/dashboard/chat">
        <Button
          size="icon"
          variant="secondary"
          className="h-14 w-14 rounded-full shadow-lg"
          title="AI Chat Quote"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}