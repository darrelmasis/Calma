// useDevice.js
import { useState, useEffect } from 'react'

/**
 * Hook para detectar el tipo de dispositivo (mobile, tablet o desktop)
 * basado en breakpoints definidos en SCSS (mobile first).
 *
 * Breakpoints (en px):
 * - xs: 0
 * - sm: 576
 * - md: 768
 * - lg: 992
 * - xl: 1200
 * - xxl: 1400
 *
 * Uso:
 * const { device, width } = useDevice();
 * console.log(device); // "mobile" | "tablet" | "desktop"
 */
export function useDevice() {
  // Definimos los breakpoints (alineados a tu SCSS)
  const BREAKPOINTS = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  }

  // Función para determinar el tipo de dispositivo
  const getDeviceType = (width) => {
    if (width < BREAKPOINTS.md) return 'mobile' // hasta <768
    if (width < BREAKPOINTS.lg) return 'tablet' // 768 - 991
    return 'desktop' // >= 992
  }

  // Estado inicial: ancho + tipo de dispositivo
  const [device, setDevice] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    type:
      typeof window !== 'undefined'
        ? getDeviceType(window.innerWidth)
        : 'mobile'
  }))

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setDevice({ width, type: getDeviceType(width) })
    }

    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize)

    // Inicializar
    handleResize()

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return device
}
