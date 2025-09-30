// src/hooks/usePWAUpdate.js
import { useEffect, useState } from 'react'

export function usePWAUpdate(updateSW, isMobile) {
  const [modalType, setModalType] = useState(null) // null | 'update' | 'info'
  const [justUpdatedOnReload, setJustUpdatedOnReload] = useState(false)

  const FLAG_KEY = 'justUpdated'

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = () => {
      if (isMobile) {
        setModalType('update')
      } else {
        try {
          localStorage.setItem(FLAG_KEY, JSON.stringify({ status: 'true', source: 'desktop' }))
        } catch (e) {}
        updateSW?.()
      }
    }

    window.addEventListener('pwaUpdateAvailable', handler)
    return () => window.removeEventListener('pwaUpdateAvailable', handler)
  }, [isMobile, updateSW])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let data
    try {
      data = JSON.parse(localStorage.getItem(FLAG_KEY))
    } catch {
      data = null
    }
    if (!data || data.status !== 'true') return

    try {
      localStorage.removeItem(FLAG_KEY)
    } catch (e) {}

    if (data.source === 'mobile') {
      setJustUpdatedOnReload(true)
    } else if (data.source === 'desktop') {
      setModalType('info')
    }
  }, [])

  const clearJustUpdatedOnReload = () => setJustUpdatedOnReload(false)

  return { modalType, setModalType, justUpdatedOnReload, clearJustUpdatedOnReload, FLAG_KEY }
}
