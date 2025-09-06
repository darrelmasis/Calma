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

// formatea un número de teléfono a formato internacional +CCC XXXX XXXX
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/[^\d+]/g, '');
  const match = cleaned.match(/^(\+\d{3})(\d{4})(\d{4})$/);
  if (!match) return phone;
  return `${match[1]} ${match[2]} ${match[3]}`;
};


export { usePageTitle }
