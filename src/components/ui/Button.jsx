import React, { useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Icon } from '../commons/Icons'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'

// Helper para obtener el valor anterior
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export const Button = ({
  as = 'button', // 'button' | 'a' | 'link'
  size = 'medium',
  variant = 'initial',
  ghost = false,
  fullWidth = false,
  onClick,
  disabled = false,
  icon = null,
  label,
  children,
  className,
  autoFocus = false,
  type = 'button',
  ariaLabel,
  to, // para Link
  href, // para <a>
  badge = null, // número o string
  ...rest
}) => {
  const hasChildren = React.Children.count(children) > 0
  const hasLabel = Boolean(label)
  const isIconOnly = !hasLabel && !hasChildren

  // Para animar SOLO cuando el badge cambia
  const prevBadge = usePrevious(badge)
  const shouldAnimate = prevBadge !== undefined && prevBadge !== badge

  // Normalización de íconos
  const defaultIconProps = {
    name: null,
    variant: 'regular',
    duotone: 'regular',
    position: 'left',
    size: 'md',
    animation: null,
    className: ''
  }

  let finalIcons = []
  if (icon) {
    if (Array.isArray(icon)) {
      finalIcons = icon
        .map((ic) => {
          if (typeof ic === 'string') return { ...defaultIconProps, name: ic }
          if (typeof ic === 'object') return { ...defaultIconProps, ...ic }
          return null
        })
        .filter(Boolean)
    } else if (typeof icon === 'string') {
      finalIcons = [{ ...defaultIconProps, name: icon }]
    } else if (typeof icon === 'object' && icon.name) {
      finalIcons = [{ ...defaultIconProps, ...icon }]
    }
  }

  const renderIcon = (ic) => {
    if (!ic || !ic.name) return null
    const iconClasses = classNames(
      'btn-icon',
      { 'icon-spin': ic.animation === 'spin' },
      ic.className
    )
    return (
      <Icon
        key={ic.name}
        name={ic.name}
        variant={ic.variant}
        duotone={ic.duotone}
        size={ic.size}
        className={iconClasses}
      />
    )
  }

  const renderIconsByPosition = (pos) => {
    if (!finalIcons.length) return null
    return finalIcons
      .filter((ic, idx) => {
        if (ic.position) return ic.position === pos
        return idx === 0 ? pos === 'left' : pos === 'right'
      })
      .map(renderIcon)
  }

  const buttonClasses = classNames(
    'btn',
    'position-relative',
    `btn-${size}`,
    `btn-${variant}${ghost ? '-ghost' : ''}`,
    {
      'btn-square': isIconOnly,
      'btn-block': fullWidth,
      'btn-link': as === 'link'
    },
    className
  )

  const content = (
    <>
      {renderIconsByPosition('left')}
      {hasChildren
        ? children
        : hasLabel && <span className='btn-label'>{label}</span>}
      {renderIconsByPosition('right')}

      {/* Badge animado solo si el valor cambia */}
      {badge != null && (
        <BadgeAnimation value={badge}>
          {typeof badge === 'number' ? badge : String(badge)}
        </BadgeAnimation>
      )}
    </>
  )

  const commonProps = {
    className: buttonClasses,
    'aria-label': ariaLabel || (isIconOnly ? finalIcons[0]?.name : undefined),
    ...rest
  }

  if (as === 'a') {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    )
  }

  if (as === 'link') {
    return (
      <Link to={to} {...commonProps}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      autoFocus={autoFocus}
      {...commonProps}
    >
      {content}
    </button>
  )
}

const BadgeAnimation = ({ value, children }) => {
  const [prevValue, setPrevValue] = useState(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Si el valor actual no es válido, reseteamos y salimos
    if (value == null || value <= 0) {
      setPrevValue(value)
      return
    }

    // Convertir a número
    const currentNum = Number(value)
    const prevNum = prevValue

    let animate = false

    // Caso 1: primera aparición (prevValue es null/undefined)
    if (prevNum == null) {
      animate = true
    }
    // Caso 2: ambos son números y el nuevo es mayor
    else if (typeof prevNum === 'number' && !isNaN(prevNum) && currentNum > prevNum) {
      animate = true
    }

    setShouldAnimate(animate)
    setPrevValue(value)
  }, [value])

  // No renderizar si no hay valor válido
  if (value == null || value <= 0) {
    return null
  }

  return (
    <motion.span
      key={shouldAnimate ? `anim-${value}` : `static-${value}`}
      className='btn-badge fs-small text-white bg-danger-400 border-white border-2 fw-bold'
      initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={
        shouldAnimate
          ? {
              scale: { type: 'spring', stiffness: 500, damping: 12, mass: 0.5 },
              opacity: { duration: 0.15 }
            }
          : {}
      }
    >
      {children}
    </motion.span>
  )
}
