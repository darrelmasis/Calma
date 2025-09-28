// hooks/usePWAInstall.js
import { createContext, useContext, useEffect, useState } from 'react'

const PWAInstallContext = createContext()

export function PWAInstallProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  // En usePWAInstall (provider)
  const promptInstall = async () => {
    if (!deferredPrompt) return { success: false, reason: 'no_prompt' }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setIsInstallable(false)

    if (outcome === 'accepted') {
      return {
        success: true,
        outcome
      }
    }

    return {
      success: false,
      outcome
    }
  }

  return (
    <PWAInstallContext.Provider value={{ isInstallable, promptInstall }}>
      {children}
    </PWAInstallContext.Provider>
  )
}

export function usePWAInstall() {
  return useContext(PWAInstallContext)
}
