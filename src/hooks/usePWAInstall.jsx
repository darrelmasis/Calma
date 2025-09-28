import { createContext, useContext, useEffect, useState } from 'react'
import { useDevice } from './useBreakpoint'
import { useLang } from '../i18n/LanguageContext'

const PWAInstallContext = createContext()

export function PWAInstallProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const { type } = useDevice()
  const { t } = useLang()

  const isDesktop = type === 'desktop'

  // Detectar evento beforeinstallprompt
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

  // Mostrar notificación al instalar la app
  useEffect(() => {
    const handleAppInstalled = () => {
      if (Notification.permission === 'granted') {
        new Notification('¡Hola!', {
          body: 'Esto es una prueba'
        })
        console.log('App instalada y notificación enviada.')
      } else {
        console.log('App instalada, pero sin permiso de notificaciones.')
      }
    }

    window.addEventListener('appinstalled', handleAppInstalled)
    return () => window.removeEventListener('appinstalled', handleAppInstalled)
  }, [t, notificationMessage])

  // Disparar instalación manualmente + pedir permiso de notificaciones
  // Dentro de PWAInstallProvider

  const promptInstall = async () => {
    if (!deferredPrompt) {
      console.warn('No se puede instalar: deferredPrompt no disponible')
      return
    }

    // 1. Pedir permiso de notificaciones (si es necesario)
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      console.log('Permiso de notificaciones:', permission)
    }

    // 2. Mostrar el popup de instalación
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    // Limpiar estado
    setDeferredPrompt(null)
    setIsInstallable(false)

    console.log('Resultado de instalación:', outcome)
    console.log('Permiso actual:', Notification.permission)

    // 3. ✅ Mostrar notificación SOLO si el usuario aceptó Y tiene permiso
    if (outcome === 'accepted' && Notification.permission === 'granted') {
      try {
        new Notification(`✅ ${t('notification.appInstalled')}`, {
          body: isDesktop
            ? t('notification.desktopMessage')
            : t('notification.mobileMessage'),
          icon: '/images/pwa/icon-192.png' // asegúrate de que exista
        })
        console.log('✅ Notificación de instalación mostrada')
      } catch (err) {
        console.error('❌ Error al crear notificación:', err)
      }
    } else {
      console.warn('No se muestra notificación. Motivo:', {
        outcome,
        permission: Notification.permission
      })
    }

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
