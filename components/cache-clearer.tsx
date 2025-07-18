'use client'

import { useEffect } from 'react'

export function CacheClearer() {
  useEffect(() => {
    // Clear service worker caches on mount
    if ('serviceWorker' in navigator) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
      
      // Unregister any service workers
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister()
        })
      })
    }

    // Force reload if we detect old cached content
    const buildId = document.querySelector('meta[name="next-build-id"]')?.getAttribute('content')
    const lastBuildId = localStorage.getItem('last-build-id')
    
    if (buildId && lastBuildId && buildId !== lastBuildId) {
      localStorage.setItem('last-build-id', buildId)
      // Force a hard reload to clear all caches
      window.location.reload()
    } else if (buildId) {
      localStorage.setItem('last-build-id', buildId)
    }
  }, [])

  return null
}