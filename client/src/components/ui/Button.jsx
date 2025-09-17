import React from 'react'
import classNames from 'classnames'
import { Icon } from '../commons/Icons'

export const Button = ({
  size = 'medium',            // small | medium | large
  variant = 'initial',        // primary | secondary | success | danger | warning | info | light | dark | link
  ghost = false,              // botón ghost (transparente)
  fullWidth = false,          // ancho completo
  onClick,
  disabled = false,
  icon = null,                // puede ser string, objeto o array de objetos
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

  // Valores por defecto de un icono
  const defaultIconProps = {
    name: null,
    variant: 'regular',
    duotone: 'regular',
    position: 'left',
    size: 'md',
  }

  // Normalizamos el icon prop a un array de objetos
  let finalIcons = []
  if (icon) {
    if (Array.isArray(icon)) {
      finalIcons = icon.map(ic => {
        if (typeof ic === 'string') return { ...defaultIconProps, name: ic }
        if (typeof ic === 'object') return { ...defaultIconProps, ...ic }
        return null
      }).filter(Boolean)
    } else if (typeof icon === 'string') {
      finalIcons = [{ ...defaultIconProps, name: icon }]
    } else if (typeof icon === 'object' && icon.name) {
      finalIcons = [{ ...defaultIconProps, ...icon }]
    }
  }

  // Función para renderizar un icono
  const renderIcon = (ic) => {
    if (!ic || !ic.name) return null
    return <Icon key={ic.name} name={ic.name} variant={ic.variant} duotone={ic.duotone} size={ic.size} className="btn-icon" />
  }

  // Renderizamos iconos por posición
  const renderIconsByPosition = (pos) => {
    if (!finalIcons.length) return null
    return finalIcons
      .filter((ic, idx) => {
        if (ic.position) return ic.position === pos
        // si no tiene position, primer icono a la izquierda, segundo a la derecha
        return idx === 0 ? pos === 'left' : pos === 'right'
      })
      .map(ic => renderIcon(ic))
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

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={handleClick}
      autoFocus={autoFocus}
      aria-label={ariaLabel || (isIconOnly ? finalIcons[0]?.name : undefined)}
      {...rest}
    >
      {/* Iconos a la izquierda */}
      {renderIconsByPosition('left')}

      {/* Texto o children */}
      {hasChildren ? children : hasLabel && <span className="btn-label">{label}</span>}

      {/* Iconos a la derecha */}
      {renderIconsByPosition('right')}
    </button>
  )
}
