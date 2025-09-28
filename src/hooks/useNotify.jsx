import { useState, useEffect, useCallback } from 'react'

// Hook principal
const useNotification = () => {
  const [permission, setPermission] = useState('default')
  const [isSupported, setIsSupported] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const supported = 'Notification' in window
    setIsSupported(supported)
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    )

    if (supported) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn('❌ Notificaciones no soportadas')
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch (error) {
      console.error('Error solicitando permiso:', error)
      return false
    }
  }, [isSupported, isMobile])

  const showNotification = useCallback(
    (title, options = {}) => {
      if (!isSupported || permission !== 'granted') {
        console.warn('Notificaciones no disponibles')
        return null
      }

      // Configuración optimizada para móviles
      const mobileOptimizedOptions = {
        icon: '/images/pwa/icon-192.png',
        badge: '/images/pwa/icon-72.png',
        lang: 'es',
        requireInteraction: false,
        silent: isMobile,
        ...options
      }

      // Limpiar opciones que no funcionan bien en Android
      if (isMobile) {
        delete mobileOptimizedOptions.requireInteraction
      }

      try {
        const notification = new Notification(title, mobileOptimizedOptions)

        // Manejar eventos
        notification.onclick = () => {
          window.focus()
          if (options.onClick) options.onClick(notification)
          if (!isMobile) notification.close()
        }

        notification.onclose = () => {
          if (options.onClose) options.onClose(notification)
        }

        notification.onshow = () => {
          if (options.onShow) options.onShow(notification)
        }

        // Cierre automático solo si no es requireInteraction
        if (!options.requireInteraction) {
          const autoCloseTime = options.autoClose || (isMobile ? 4000 : 5000)
          setTimeout(() => notification.close(), autoCloseTime)
        }

        return notification
      } catch (error) {
        console.error('Error creando notificación:', error)
        return null
      }
    },
    [isSupported, permission, isMobile]
  )

  // Notificación preconfigurada con TODAS las opciones
  const notify = useCallback(
    ({
      // Contenido básico
      title,
      body,
      // Timing
      delay = 0,
      autoClose,
      // Iconos e imágenes
      icon = '/images/pwa/icon-192.png',
      image,
      badge = '/images/pwa/icon-72.png',
      // Comportamiento
      requireInteraction = false,
      silent = false,
      renotify = false,
      // Metadatos
      tag,
      dir = 'auto', // auto, ltr, rtl
      lang = 'es',
      // Vibración (solo Android)
      vibrate,
      // Timestamp
      timestamp = Date.now(),
      // Acciones (solo desktop y algunos móviles)
      actions = [],
      // Data personalizada
      data,
      // Event handlers
      onClick,
      onClose,
      onShow,
      ...otherOptions
    }) => {
      const notificationOptions = {
        body,
        icon,
        image,
        badge,
        requireInteraction,
        silent,
        renotify,
        tag,
        dir,
        lang,
        vibrate,
        timestamp,
        actions,
        data,
        autoClose,
        onClick,
        onClose,
        onShow,
        ...otherOptions
      }

      // Si hay delay, programar la notificación
      if (delay > 0) {
        return setTimeout(() => {
          showNotification(title, notificationOptions)
        }, delay * 1000)
      }

      // Sin delay, mostrar inmediatamente
      return showNotification(title, notificationOptions)
    },
    [showNotification]
  )

  const cancelDelayedNotification = useCallback((timeoutId) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }, [])

  return {
    isSupported,
    permission,
    isMobile,
    requestPermission,
    showNotification,
    notify,
    cancelDelayedNotification
  }
}

export default useNotification
