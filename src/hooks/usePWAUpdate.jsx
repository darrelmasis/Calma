import { useEffect, useState } from 'react'

export function usePWAUpdate(updateSW, isMobile) {
  const [modalType, setModalType] = useState(null) // null | 'update' | 'info'

  // Detectar actualización disponible
  useEffect(() => {
    const handler = () => {
      if (isMobile) {
        setModalType('update')
      } else {
        localStorage.setItem('justUpdated', 'true')
        updateSW?.()
      }
    }

    window.addEventListener('pwaUpdateAvailable', handler)
    return () => window.removeEventListener('pwaUpdateAvailable', handler)
  }, [isMobile, updateSW])

  // Mostrar modal de "info" después de la recarga (desktop)
  useEffect(() => {
    if (localStorage.getItem('justUpdated') === 'true') {
      localStorage.removeItem('justUpdated')
      setModalType('info')
    }
  }, [])

  return { modalType, setModalType }
}
