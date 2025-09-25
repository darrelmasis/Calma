import React from 'react'
import classNames from 'classnames'
import { Icon } from '../commons/Icons'
import { Link } from 'react-router-dom'

export const Button = ({
  as = 'button', // button | a | link
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
    animation: null,
  }

  // Normalizamos el icon prop a un array de objetos
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

    const iconClasses = classNames('btn-icon', {
      'icon-spin': ic.animation === 'spin',
    })

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
      .map((ic) => renderIcon(ic))
  }

  const buttonClasses = classNames(
    'btn',
    `btn-${size}`,
    `btn-${variant}${ghost ? '-ghost' : ''}`,
    {
      'btn-square': isIconOnly,
      'btn-block': fullWidth,
      'btn-link': as === 'link',
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
    </>
  )

  if (as === 'a') {
    return (
      <a
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel || (isIconOnly ? finalIcons[0]?.name : undefined)}
        {...rest}
      >
        {content}
      </a>
    )
  }

  if (as === 'link') {
    return (
      <Link
        to={to}
        className={buttonClasses}
        aria-label={ariaLabel || (isIconOnly ? finalIcons[0]?.name : undefined)}
        {...rest}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      autoFocus={autoFocus}
      aria-label={ariaLabel || (isIconOnly ? finalIcons[0]?.name : undefined)}
      {...rest}
    >
      {content}
    </button>
  )
}
