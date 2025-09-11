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
    position: "left",
    size: "md"
  },
  label,
  children,
  className,
  autoFocus = false,
  type = 'button',
  ariaLabel, // para accesibilidad, si el botón no tiene texto visible
  ...rest
}) => {
  const hasChildren = React.Children.count(children) > 0
  const hasLabel = Boolean(label)
  const isIconOnly = !hasLabel && !hasChildren

  // const iconMargin = hasLabel || hasChildren ? sizeToIconMargin[size] : ''
  const iconComponent =
    icon && typeof icon === 'object' && typeof icon.name === 'string'
      ? <Icon className='btn-icon' name={icon.name} variant={icon.variant} duotone={icon.duotone} size={icon.size} />
      : React.isValidElement(icon)
        ? <span className='btn-icon'>{icon}</span>
        : null


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

  const iconPosition = icon && typeof icon === 'object' ? icon.position || 'left' : 'left';


  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={handleClick}
      autoFocus={autoFocus}
      {...rest}
    >
      {iconPosition === 'left' && iconComponent}
      {hasChildren ? children : hasLabel && <span className="btnlabel">{label}</span>}
      {iconPosition === 'right' && iconComponent}
    </button>
  )
}
