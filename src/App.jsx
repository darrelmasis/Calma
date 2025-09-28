// eslint-disable-next-line no-unused-vars
import AppRoutes from '@routes/routes'
import { useSelectedServices } from './hooks/useSelectedService'
import { useDynamicFavicon } from './hooks/useFavicon'
import { useEffect } from 'react'
import { useNotificationPermission } from './hooks/useNotificationPermission'

const App = () => {
  const { totalServices } = useSelectedServices()
  const showFaviconBadge = totalServices > 0
  useDynamicFavicon(showFaviconBadge)

  const { permission, requestPermission, isSupported } =
    useNotificationPermission()

  useEffect(() => {
    // Solo intentamos pedir permiso si:
    // - El navegador lo soporta
    // - Aún no se ha concedido ni denegado (es decir, está en 'default')
    if (isSupported && permission === 'default') {
      requestPermission()
    }
  }, [isSupported, permission, requestPermission])

  return <AppRoutes />
}

export default App
