'use client'

import { useEffect, useState } from 'react'

interface ClientTimestampProps {
  timestamp: Date
  className?: string
}

export function ClientTimestamp({ timestamp, className }: ClientTimestampProps) {
  const [timeString, setTimeString] = useState<string>('')
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    setTimeString(timestamp.toLocaleTimeString())
  }, [timestamp])
  
  // Show empty string on initial render to avoid hydration mismatch
  if (!isClient || !timeString) return null
  
  return <span className={className}>{timeString}</span>
}