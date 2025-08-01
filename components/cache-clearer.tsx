'use client'

import { useEffect } from 'react'

export function CacheClearer() {
  useEffect(() => {
    // Only clear caches if there{'''}s a known issue
    const hasWebpackError = sessionStorage.getItem('webpack-error-detected')
    
    if (hasWebpackError) {
      // Clear service worker caches
      if ('serviceWorker' in navigator) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name)
          })
        })
      }
      
      // Clear the flag
      sessionStorage.removeItem('webpack-error-detected')
    }

    // Detect webpack errors for future visits
    window.addEventListener('error', (event) => {
      if (event.message?.includes("Cannot read properties of undefined (reading 'call')")) {
        sessionStorage.setItem('webpack-error-detected', 'true')
      }
    })
  }, [])

  return null
}