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
  const { requestPermission } = useNotificationPermission()

  const isDesktop = type === 'desktop'

  // detectar evento beforeinstallprompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const mobileMessage = t('notification.mobileMessage')
  const desktopMessage = t('notification.desktopMessage')
  const notificationMessage = isDesktop ? desktopMessage : mobileMessage

  // evento appinstalled (solo si ya hay permiso)
  useEffect(() => {
    const handleAppInstalled = () => {
      if (Notification.permission === 'granted') {
        new Notification(`✅ ${t('notification.appInstalled')}`, {
          body: notificationMessage,
          icon: '/images/pwa/icon-192.png'
        })
      } else {
        // fallback si no hay permiso
        console.log(
          'App instalada. El usuario no otorgó permiso de notificaciones.'
        )
        alert(t('notification.appInstalled'))
      }
    }
    window.addEventListener('appinstalled', handleAppInstalled)
    return () => window.removeEventListener('appinstalled', handleAppInstalled)
  }, [t, notificationMessage])

  // disparar instalación manualmente
  const promptInstall = async () => {
    if (!deferredPrompt) return

    // pedir permiso de notificaciones en respuesta a la acción del usuario
    await requestPermission()

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
