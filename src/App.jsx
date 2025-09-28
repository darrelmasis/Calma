// eslint-disable-next-line no-unused-vars
import AppRoutes from '@routes/routes'
import { useSelectedServices } from './hooks/useSelectedService'
import { useDynamicFavicon } from './hooks/useFavicon'

const App = () => {
  const { totalServices } = useSelectedServices()
  const showFaviconBadge = totalServices > 0
  useDynamicFavicon(showFaviconBadge)
  return <AppRoutes />
}

export default App
