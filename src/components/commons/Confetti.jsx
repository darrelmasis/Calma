// Confetti.jsx
import { useEffect, useRef } from 'react'

const defaultDateRanges = [
  { start: '2025-09-27', end: '2025-09-27' } // ejemplo: del 26 al 27 de septiembre
]

export const Confetti = ({
  dateRanges = defaultDateRanges,
  confettiCount = 150,
  speed = 1,
  maxSize = 10,
  shape = 'square' // 'square', 'circle', o 'triangle'
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  const isInDateRanges = (ranges) => {
    const now = new Date()
    return (
      ranges.length === 0 ||
      ranges.some(({ start, end }) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        return now >= startDate && now <= endDate
      })
    )
  }

  useEffect(() => {
    if (!isInDateRanges(dateRanges)) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const colors = [
      '#7d653e',
      '#a53a5c',
      '#9a5aad',
      '#bfab88',
      '#c67891',
      '#b98ac7',
      '#715c37'
    ]

    // Crear partículas
    const confetti = Array.from({ length: confettiCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * -H, // empiezan arriba
      size: Math.random() * (maxSize - 4) + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      velocityY: Math.random() * 2 + 1,
      velocityX: (Math.random() - 0.5) * 0.8, // viento base
      drift: Math.random() * 100, // para oscilación
      driftSpeed: Math.random() * 0.02 + 0.01
    }))

    const drawShape = (x, y, size, rotation, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillStyle = color

      if (shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (shape === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(0, -size / 2)
        ctx.lineTo(-size / 2, size / 2)
        ctx.lineTo(size / 2, size / 2)
        ctx.closePath()
        ctx.fill()
      } else {
        // square (por defecto)
        const width = size * 1.2
        const height = size * 0.6
        const radius = width / 4
        ctx.beginPath()
        ctx.moveTo(radius, 0)
        ctx.lineTo(width - radius, 0)
        ctx.quadraticCurveTo(width, 0, width, radius)
        ctx.lineTo(width, height - radius)
        ctx.quadraticCurveTo(width, height, width - radius, height)
        ctx.lineTo(radius, height)
        ctx.quadraticCurveTo(0, height, 0, height - radius)
        ctx.lineTo(0, radius)
        ctx.quadraticCurveTo(0, 0, radius, 0)
        ctx.fill()
      }

      ctx.restore()
    }

    const update = () => {
      confetti.forEach((c) => {
        // Gravedad suave
        c.velocityY += 0.02 * speed
        c.y += c.velocityY

        // Viento + oscilación
        c.drift += c.driftSpeed
        c.x += c.velocityX * speed + Math.sin(c.drift) * 0.3

        // Rotación
        c.rotation += c.rotationSpeed

        // Reiniciar si sale por abajo
        if (c.y > H + 20) {
          c.y = -10 - Math.random() * 20
          c.x = Math.random() * W
          c.velocityY = Math.random() * 2 + 1
          c.velocityX = (Math.random() - 0.5) * 0.8
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      confetti.forEach((c) => {
        drawShape(c.x, c.y, c.size, c.rotation, c.color)
      })
    }

    const animate = () => {
      update()
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [dateRanges, confettiCount, speed, maxSize, shape])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        zIndex: 9999
      }}
    />
  )
}

export const ConfettiExplosion = ({
  particleCount = 150,
  origin = { x: '50%', y: '50%' },
  maxSize = 10,
  onComplete
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  const colors = [
    '#7d653e',
    '#9f814d',
    '#a53a5c',
    '#1a75e6',
    '#2a9d60',
    '#e69a00',
    '#e53e3e'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Calcular origen en píxeles
    const originX =
      typeof origin.x === 'string' && origin.x.endsWith('%')
        ? (parseFloat(origin.x) / 100) * W
        : origin.x
    const originY =
      typeof origin.y === 'string' && origin.y.endsWith('%')
        ? (parseFloat(origin.y) / 100) * H
        : origin.y

    // Crear partículas
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 4 + 2 // un poco más rápido
      const size = Math.random() * (maxSize - 4) + 4
      return {
        x: originX,
        y: originY,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        gravity: 0.08
      }
    })

    particlesRef.current = particles

    const drawParticle = (p) => {
      const width = p.size * 1.2
      const height = p.size * 0.6
      const radius = width / 4

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color

      ctx.beginPath()
      ctx.moveTo(radius, 0)
      ctx.lineTo(width - radius, 0)
      ctx.quadraticCurveTo(width, 0, width, radius)
      ctx.lineTo(width, height - radius)
      ctx.quadraticCurveTo(width, height, width - radius, height)
      ctx.lineTo(radius, height)
      ctx.quadraticCurveTo(0, height, 0, height - radius)
      ctx.lineTo(0, radius)
      ctx.quadraticCurveTo(0, 0, radius, 0)
      ctx.fill()
      ctx.restore()
    }

    const isOffscreen = (p) => {
      return (
        p.y > H + 100 || // abajo
        p.x < -100 || // izquierda
        p.x > W + 100 // derecha
      )
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      let allOffscreen = true
      particlesRef.current.forEach((p) => {
        // Física
        p.vy += p.gravity
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        if (!isOffscreen(p)) {
          drawParticle(p)
          allOffscreen = false
        }
      })

      if (allOffscreen) {
        // ✅ Todas las partículas están fuera → limpiar y terminar
        ctx.clearRect(0, 0, W, H)
        onComplete?.()
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      // Limpieza final del canvas al desmontar
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }, [particleCount, origin, maxSize, onComplete])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        zIndex: 9999
      }}
    />
  )
}
