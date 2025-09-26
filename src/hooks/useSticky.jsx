import { useState, useEffect, useRef } from 'react'

// Encuentra el contenedor desplazable más cercano (o window)
function getScrollParent(node) {
  if (!node) return window
  let parent = node.parentElement
  const overflowRegex = /(auto|scroll|overlay)/
  while (parent && parent !== document.documentElement) {
    const style = getComputedStyle(parent)
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent
    }
    parent = parent.parentElement
  }
  return window
}

// Convierte valores CSS (px/rem/em) a px (maneja px, rem, em y valores numéricos)
function toPx(value) {
  if (value == null) return 0
  if (typeof value === 'number') return value
  const v = String(value).trim()
  if (v === '0') return 0
  if (v.endsWith('px')) return parseFloat(v)
  if (v.endsWith('rem')) {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize || 16)
    return parseFloat(v) * root
  }
  if (v.endsWith('em')) {
    const bodyFs = parseFloat(getComputedStyle(document.body).fontSize || 16)
    return parseFloat(v) * bodyFs
  }
  // fallback: intentar parseFloat
  return parseFloat(v) || 0
}

/**
 * useSticky(ref, offset = 0)
 * - ref: ref al elemento sticky (elemento con position: sticky)
 * - offset: número de px extra para ajustar la detección (opcional)
 */
export function useSticky(ref, offset = 0) {
  const [isSticky, setIsSticky] = useState(false)
  const roRef = useRef(null)

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const computed = getComputedStyle(el)
    const topCss = computed.top // puede ser 'auto' o '16px' o '1rem'
    const bottomCss = computed.bottom

    const hasTop = topCss && topCss !== 'auto'
    const hasBottom = bottomCss && bottomCss !== 'auto'
    const topPx = toPx(topCss)
    const bottomPx = toPx(bottomCss)

    const scrollParent = getScrollParent(el)
    const parentIsWindow = scrollParent === window

    const getViewportBounds = () => {
      if (parentIsWindow) {
        return { top: 0, bottom: window.innerHeight }
      }
      const r = scrollParent.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom }
    }

    const check = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewport = getViewportBounds()
      let stuck = false

      if (hasTop) {
        // Cuando está "pegado" con top, rect.top estará <= viewport.top + topPx
        stuck = rect.top <= viewport.top + topPx + offset
      } else if (hasBottom) {
        // Cuando está "pegado" con bottom, rect.bottom estará >= viewport.bottom - bottomPx
        stuck = rect.bottom >= viewport.bottom - bottomPx - offset
      } else {
        // fallback: asumir top = 0
        stuck = rect.top <= offset
      }

      setIsSticky(Boolean(stuck))
    }

    // throttle via rAF
    const onScroll = () => {
      requestAnimationFrame(check)
    }

    // inicial
    check()

    // listeners
    const parent = parentIsWindow ? window : scrollParent
    parent.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Resizes del elemento/scrollParent (re-evalúa)
    if (typeof ResizeObserver !== 'undefined') {
      roRef.current = new ResizeObserver(() => onScroll())
      roRef.current.observe(el)
      if (!parentIsWindow) roRef.current.observe(scrollParent)
    }

    return () => {
      parent.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (roRef.current) roRef.current.disconnect()
    }
  }, [ref, offset])

  return isSticky
}
