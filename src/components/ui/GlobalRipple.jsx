import { useEffect } from 'react'
import { useDevice } from '../../hooks/useBreakpoint'

export default function GlobalRipple() {
  const { type } = useDevice()
  const isMobile = type === 'mobile' || type === 'tablet'

  useEffect(() => {
    const rippleEvent = isMobile ? 'touchstart' : 'click'

    const handleRipple = (event) => {
      const ripple = document.createElement('span')
      ripple.className = 'global-ripple'

      // Detecta posición del clic o toque
      const x = event.touches ? event.touches[0].clientX : event.clientX
      const y = event.touches ? event.touches[0].clientY : event.clientY

      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      document.body.appendChild(ripple)

      ripple.addEventListener('animationend', () => ripple.remove())
    }

    // ✅ Escucha el tipo de interacción correcto
    document.addEventListener(rippleEvent, handleRipple, { passive: true })

    // ✅ Limpieza segura
    return () => {
      document.removeEventListener(rippleEvent, handleRipple)
    }
  }, [isMobile])

  return null
}
