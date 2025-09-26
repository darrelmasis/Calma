import React, { useRef, useEffect } from 'react'
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
  const controls = useAnimation()
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current !== value) {
      // Reinicia la animación
      controls.set({ scale: 0, opacity: 0 })
      controls.start({
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
          scale: { type: 'spring', stiffness: 600, damping: 12 },
          opacity: { duration: 0.15 }
        }
      })
      prevValue.current = value
    }
  }, [value, controls])

  return (
    <motion.span
      className='btn-badge fs-small text-white bg-danger-400 border-white border-2 fw-bold'
      initial={false}
      animate={controls}
    >
      {children}
    </motion.span>
  )
}
