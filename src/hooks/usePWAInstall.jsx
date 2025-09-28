// hooks/usePWAInstall.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useDevice } from './useBreakpoint'
import { useLang } from '../i18n/LanguageContext'
import { useNotificationPermission } from './useNotificationPermission'

const PWAInstallContext = createContext()

export function PWAInstallProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const { type } = useDevice()
  const { t } = useLang()
  const isDesktop = type === 'desktop'

  const { isGranted, isSupported, requestPermission } =
    useNotificationPermission()

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const showNotification = (title, body) => {
    if (typeof Notification === 'undefined') return

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/images/pwa/icon-192.png'
      })
    }
  }

  // En usePWAInstall (provider)
  const promptInstall = async () => {
    if (!deferredPrompt) return { success: false, reason: 'no_prompt' }

    let notificationPermission = isGranted
    if (!notificationPermission && isSupported) {
      const result = await requestPermission()
      notificationPermission = result === 'granted'
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setIsInstallable(false)

    if (outcome === 'accepted') {
      return {
        success: true,
        hasNotificationPermission: notificationPermission,
        outcome
      }
    }

    return {
      success: false,
      hasNotificationPermission: notificationPermission,
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
