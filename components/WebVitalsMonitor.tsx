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
    const {
      endpoint = '/api/web-vitals',
      sampleRate = 1,
      debug = false,
      enableRealTime = true
    } = config

    // Only load web-vitals in production or when explicitly enabled
    if (process.env.NODE_ENV === 'development' && !debug) {
      return
    }

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
      
      // Check thresholds and alert if needed
      checkThresholds(vitalData)
      
      // Send immediately if real-time is enabled
      if (enableRealTime) {
        sendToEndpoint(endpoint, [vitalData])
      }
    }

    const checkThresholds = (vital: VitalData) => {
      const thresholds = {
        CLS: { good: 0.1, poor: 0.25 },
        INP: { good: 200, poor: 500 },
        LCP: { good: 2500, poor: 4000 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 }
      }

      const threshold = thresholds[vital.name as keyof typeof thresholds]
      if (threshold) {
        if (vital.value <= threshold.good) {
          vital.rating = 'good'
        } else if (vital.value <= threshold.poor) {
          vital.rating = 'needs-improvement'
        } else {
          vital.rating = 'poor'
          
          // Alert for poor performance
          if (debug) {
            console.warn(`Poor ${vital.name} detected:`, vital.value)
          }
          
          // Send alert to monitoring service
          sendAlert(vital)
        }
      }
    }

    const sendAlert = (vital: VitalData) => {
      // Send to monitoring service (e.g., Sentry, DataDog, etc.)
      if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (command: string, action: string, params: object) => void }).gtag) {
        (window as typeof window & { gtag: (command: string, action: string, params: object) => void }).gtag('event', 'poor_web_vital', {
          event_category: 'Performance',
          event_label: vital.name,
          value: Math.round(vital.value)
        })
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
        if (debug) {
          console.error('Failed to send vitals:', error)
        }
      }
    }

    // Send all collected data before page unload
    const handleBeforeUnload = () => {
      if (vitalsData.length > 0 && !enableRealTime) {
        sendToEndpoint(endpoint, vitalsData)
      }
    }

    // Dynamic import of web-vitals to avoid SSR issues
    import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      onCLS(sendVital)
      onINP(sendVital)
      onLCP(sendVital)
      onFCP(sendVital)
      onTTFB(sendVital)
    }).catch(error => {
      if (debug) {
        console.error('Failed to load web-vitals:', error)
      }
    })

    window.addEventListener('beforeunload', handleBeforeUnload)
    
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
  if (typeof navigator === 'undefined' || !(navigator as typeof navigator & { connection?: { effectiveType?: string } }).connection) {
    return 'unknown'
  }
  
  const connection = (navigator as typeof navigator & { connection?: { effectiveType?: string } }).connection
  return connection.effectiveType || 'unknown'
}

// Hook for using web vitals in components
export function useWebVitals() {
  useEffect(() => {
    const vitals: { [key: string]: number } = {}
    
    const handleVital = (vital: VitalData) => {
      vitals[vital.name] = vital.value
    }

    import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      onCLS(handleVital)
      onINP(handleVital)
      onLCP(handleVital)
      onFCP(handleVital)
      onTTFB(handleVital)
    })

    return vitals
  }, [])
}