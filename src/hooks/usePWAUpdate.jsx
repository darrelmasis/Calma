// src/hooks/usePWAUpdate.js
import { useEffect, useState } from 'react'

export function usePWAUpdate(updateSW, isMobile) {
  const [modalType, setModalType] = useState(null) // null | 'update' | 'info'
  const [justUpdatedOnReload, setJustUpdatedOnReload] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = () => {
      if (isMobile) {
        setModalType('update')
      } else {
        try {
          localStorage.setItem('justUpdated', 'true')
        } catch (e) {}
        updateSW?.()
      }
    }

    window.addEventListener('pwaUpdateAvailable', handler)
    return () => window.removeEventListener('pwaUpdateAvailable', handler)
  }, [isMobile, updateSW])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const wasUpdated = localStorage.getItem('justUpdated') === 'true'
    if (!wasUpdated) return

    // limpiamos el flag siempre
    try {
      localStorage.removeItem('justUpdated')
    } catch (e) {}

    if (isMobile) {
      // en mobile: no queremos el modal 'info', solo informar que hubo update
      setJustUpdatedOnReload(true)
    } else {
      // en desktop sí mostramos el modal info
      setModalType('info')
    }
  }, [isMobile])

  const clearJustUpdatedOnReload = () => setJustUpdatedOnReload(false)

  return { modalType, setModalType, justUpdatedOnReload, clearJustUpdatedOnReload }
}
