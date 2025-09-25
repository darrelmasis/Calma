import { useState, useEffect } from 'react'

/**
 * Hook personalizado para detectar si la aplicación está offline.
 *
 * @returns {boolean} - true si la aplicación está offline, false si está online.
 *
 * ## Ejemplo de uso
 * ```jsx
 * const isOffline = useOfflineStatus()
 *
 * return (
 *   <div>
 *     {isOffline ? "Estás sin conexión 😢" : "Conectado ✅"}
 *   </div>
 * )
 * ```
 */
export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return isOffline
}
