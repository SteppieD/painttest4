'use client'

import { useEffect, useState } from 'react'

interface ClientDateProps {
  date: Date | string
  className?: string
  options?: Intl.DateTimeFormatOptions
}

export function ClientDate({ date, className, options }: ClientDateProps) {
  const [dateString, setDateString] = useState<string>('')
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    const dateObj = typeof date === 'string' ? new Date(date) : date
    setDateString(dateObj.toLocaleDateString(undefined, options))
  }, [date, options])
  
  // Show empty string on initial render to avoid hydration mismatch
  if (!isClient || !dateString) return null
  
  return <span className={className}>{dateString}</span>
}