import React from 'react'
import classNames from 'classnames'
import { Icon } from '../commons/Icons'

export const Button = ({
  size = 'medium', // 'small' | 'medium' | 'large'
  variant = 'primary', // 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left', // 'left' | 'right'
  label,
  children,
  classes,
  autoFocus = false,
  type = 'button',
  ...rest
}) => {
  const sizeValidate = size || 'medium'

  const hasChildren = React.Children.count(children) > 0
  const hasLabel = Boolean(label)
  const isIconOnly = !hasLabel && !hasChildren

  // const iconMargin = hasLabel || hasChildren ? sizeToIconMargin[size] : ''
  const iconComponent = icon ? typeof icon === 'string' ? <Icon name={icon} /> : <span>{icon}</span> : null

  const buttonClasses = classNames('btn', `btn-${sizeValidate}`, `btn-${variant}`, isIconOnly && 'btn-square', classes)

  const handleClick = e => {
    if (!disabled && onClick) onClick(e)
  }

  return (
    <button type={type} disabled={disabled} className={buttonClasses} onClick={handleClick} autoFocus={autoFocus} {...rest}>
      {iconPosition === 'left' && iconComponent}
      {hasChildren ? children : hasLabel && <span className="label">{label}</span>}
      {iconPosition === 'right' && iconComponent}
    </button>
  )
}
