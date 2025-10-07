import { useEffect } from 'react'
import { useDevice } from '../../hooks/useBreakpoint'

export default function GlobalRipple() {
  const { type } = useDevice()
  const isMobile = type === 'mobile' || type === 'tablet'

  useEffect(() => {
    const MOVE_TOLERANCE = 10 // px de movimiento permitido
    const HOLD_TIME = 300 // ms máximo para considerarse "tap" o "click rápido"

    let startX = 0, startY = 0, moved = false, pressTimer

    const createRipple = (x, y) => {
      const ripple = document.createElement('span')
      ripple.className = 'global-ripple'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      document.body.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    }

    // 🟣 TOUCH EVENTS
    const onTouchStart = (e) => {
      const t = e.touches[0]
      startX = t.clientX
      startY = t.clientY
      moved = false
      pressTimer = Date.now()
    }

    const onTouchMove = (e) => {
      const t = e.touches[0]
      if (Math.abs(t.clientX - startX) > MOVE_TOLERANCE || Math.abs(t.clientY - startY) > MOVE_TOLERANCE)
        moved = true
    }

    const onTouchEnd = (e) => {
      const t = e.changedTouches[0]
      const duration = Date.now() - pressTimer
      if (!moved && duration < HOLD_TIME) createRipple(t.clientX, t.clientY)
    }

    // 🟢 MOUSE EVENTS
    const onMouseDown = (e) => {
      startX = e.clientX
      startY = e.clientY
      moved = false
      pressTimer = Date.now()
    }

    const onMouseMove = (e) => {
      if (Math.abs(e.clientX - startX) > MOVE_TOLERANCE || Math.abs(e.clientY - startY) > MOVE_TOLERANCE)
        moved = true
    }

    const onMouseUp = (e) => {
      const duration = Date.now() - pressTimer
      if (!moved && duration < HOLD_TIME) createRipple(e.clientX, e.clientY)
    }

    // 🧩 Registro de eventos
    if (isMobile) {
      document.addEventListener('touchstart', onTouchStart, { passive: true })
      document.addEventListener('touchmove', onTouchMove, { passive: true })
      document.addEventListener('touchend', onTouchEnd, { passive: true })
    } else {
      document.addEventListener('mousedown', onMouseDown, { passive: true })
      document.addEventListener('mousemove', onMouseMove, { passive: true })
      document.addEventListener('mouseup', onMouseUp, { passive: true })
    }

    // 🧹 Limpieza
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isMobile])

  return null
}
