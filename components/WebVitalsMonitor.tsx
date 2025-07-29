'use client'

import { useEffect } from 'react'

interface VitalData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  id?: string
  navigationType?: string
}

interface CoreWebVitalsConfig {
  endpoint?: string
  sampleRate?: number
  debug?: boolean
  enableRealTime?: boolean
}

export default function WebVitalsMonitor({ 
  config = {} 
}: { 
  config?: CoreWebVitalsConfig 
}) {
  useEffect(() => {
    // Only run in production and on client-side
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    const {
      endpoint = '/api/web-vitals',
      sampleRate = 0.1, // Lower sample rate for production
      debug = false,
      enableRealTime = false
    } = config

    // Skip if sampling rate doesn't match
    if (Math.random() > sampleRate) {
      return
    }

    const vitalsData: VitalData[] = []

    const sendVital = (vital: VitalData) => {
      const vitalData = {
        ...vital,
        url: window.location.href,
        timestamp: Date.now(),
        deviceType: getDeviceType(),
        connectionType: getConnectionType(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }

      if (debug) {
        console.log('Web Vital:', vitalData)
      }

      vitalsData.push(vitalData)
      
      // Send immediately if real-time is enabled
      if (enableRealTime) {
        sendToEndpoint(endpoint, [vitalData])
      }
    }

    const sendToEndpoint = async (endpoint: string, data: VitalData[]) => {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vitals: data }),
          keepalive: true
        })
      } catch (error) {
        // Silently fail in production
        if (debug) {
          console.error('Failed to send vitals:', error)
        }
      }
    }

    // Send all collected data before page unload
    const handleBeforeUnload = () => {
      if (vitalsData.length > 0 && !enableRealTime) {
        navigator.sendBeacon(
          endpoint,
          JSON.stringify({ vitals: vitalsData })
        )
      }
    }

    // Dynamic import with proper error handling
    const loadWebVitals = async () => {
      try {
        const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals')
        onCLS(sendVital)
        onINP(sendVital)
        onLCP(sendVital)
        onFCP(sendVital)
        onTTFB(sendVital)
      } catch (error) {
        // Silently fail if web-vitals can't be loaded
        if (debug) {
          console.error('Failed to load web-vitals:', error)
        }
      }
    }

    // Load web-vitals after component mounts
    loadWebVitals()

    // Add event listener for page unload
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [config])

  return null // This component doesn't render anything
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function getConnectionType(): string {
  if (typeof navigator === 'undefined') return 'unknown'
  
  const connection = (navigator as any).connection
  if (!connection) return 'unknown'
  
  return connection.effectiveType || 'unknown'
}