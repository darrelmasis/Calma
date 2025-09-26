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

  const promptInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setIsInstallable(false)
    return outcome
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
