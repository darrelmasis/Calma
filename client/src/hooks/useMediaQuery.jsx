import { useState, useEffect } from 'react'

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

// Convierte nombre de breakpoint o número a valor en px
const resolveValue = (value) => {
  if (typeof value === 'number') return value
  if (breakpoints[value] !== undefined) return breakpoints[value]
  throw new Error(`Breakpoint "${value}" no existe`)
}

const useMediaQuery = (min, max) => {
  const minWidth = min !== undefined ? resolveValue(min) : null
  const maxWidth = max !== undefined ? resolveValue(max) : null

  // Mobile first → siempre al menos min-width
  if (minWidth === null) {
    throw new Error('Debes definir al menos un min (mobile first)')
  }

  let query = `(min-width: ${minWidth}px)`
  if (maxWidth !== null) {
    query += ` and (max-width: ${maxWidth - 0.02}px)`
    // -0.02px para evitar solapamientos entre breakpoints
  }

  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export { useMediaQuery, breakpoints }
