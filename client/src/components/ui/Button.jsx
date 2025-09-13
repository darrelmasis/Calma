import React from 'react'
import classNames from 'classnames'
import { Icon } from '../commons/Icons'

export const Button = ({
  size = 'medium', // 'small' | 'medium' | 'large'
  variant = 'primary', // 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
  ghost = false, // botón con estilo ghost (transparente)
  fullWidth = false, // que ocupe el 100% del ancho disponible
  onClick,
  disabled = false,
  icon = {
    name: null,
    variant: "regular",
    duotone: "regular",
    position: "left", // 'left' | 'right' | 'both'
    name_alt: null,   // nombre alterno para el ícono derecho
    size: "md"
  },
  label,
  children,
  className,
  autoFocus = false,
  type = 'button',
  ariaLabel,
  ...rest
}) => {
  const hasChildren = React.Children.count(children) > 0
  const hasLabel = Boolean(label)
  const isIconOnly = !hasLabel && !hasChildren

  // Función para renderizar un ícono
  const renderIcon = (iconName) => {
    if (icon && typeof icon === 'object' && typeof iconName === 'string') {
      return <Icon className='btn-icon' name={iconName} variant={icon.variant} duotone={icon.duotone} size={icon.size} />
    }
    if (React.isValidElement(icon)) {
      return <span className='btn-icon'>{icon}</span>
    }
    return null
  }

  const buttonClasses = classNames(
    'btn',
    `btn-${size}`,
    `btn-${variant}${ghost ? '-ghost' : ''}`,
    {
      'btn-square': isIconOnly,
      'btn-block': fullWidth
    },
    className
  )

  const handleClick = e => {
    if (!disabled && onClick) onClick(e)
  }

  const iconPosition = icon && typeof icon === 'object' ? icon.position || 'left' : 'left'

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={handleClick}
      autoFocus={autoFocus}
      aria-label={ariaLabel || (isIconOnly ? icon?.name : undefined)}
      {...rest}
    >
      {/* Icono izquierdo */}
      {(iconPosition === 'left' || iconPosition === 'both') && renderIcon(icon.name)}

      {/* Texto o children */}
      {hasChildren ? children : hasLabel && <span className="btn-label">{label}</span>}

      {/* Icono derecho */}
      {(iconPosition === 'right' || iconPosition === 'both') && renderIcon(icon.name_alt)}
    </button>
  )
}
