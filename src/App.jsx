// eslint-disable-next-line no-unused-vars
import AppRoutes from '@routes/routes'
import { useSelectedServices } from './hooks/useSelectedService'
import { useDynamicFavicon } from './hooks/useFavicon'
import { useEffect } from 'react'
import { useNotificationPermission } from './hooks/useNotificationPermission'
import UpdatePrompt from './components/commons/UpdatePrompt.jsx'
import { sounds, getSound } from './components/commons/SoundManager'

const App = ({ updateSW }) => {
  const { totalServices } = useSelectedServices()
  const showFaviconBadge = totalServices > 0
  useDynamicFavicon(showFaviconBadge)

  const { permission, requestPermission, isSupported } = useNotificationPermission()

  useEffect(() => {
    // Solo intentamos pedir permiso si:
    // - El navegador lo soporta
    // - Aún no se ha concedido ni denegado (es decir, está en 'default')
    if (isSupported && permission === 'default') {
      requestPermission()
    }
  }, [isSupported, permission, requestPermission])

  useEffect(() => {
    Object.keys(sounds).forEach((key) => {
      getSound(key) // fuerza creación e inicio de carga
    })
  }, [])

  return (
    <>
      <AppRoutes />
      <UpdatePrompt updateSW={updateSW} />
    </>
  )
}

export default App
