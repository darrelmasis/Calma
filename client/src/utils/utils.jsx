import { useEffect } from 'react'

const usePageTitle = pageTitle => {
  const appName = import.meta.env.VITE_APP_NAME || 'Calma' // Valor por defecto si no está definido

  useEffect(() => {
    const fullTitle = pageTitle ? `${pageTitle} | ${appName}` : appName
    document.title = fullTitle

    return () => {
      document.title = appName // Restablece el título al desmontar el componente
    }
  }, [pageTitle, appName])
}

export { usePageTitle }
