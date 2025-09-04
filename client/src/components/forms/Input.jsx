import React, { forwardRef } from 'react'
import classNames from 'classnames';

export const Input = forwardRef(({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  error,
  className = '',
  ...props
}, ref) => {
  const id = props.id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <>
      <div className="input-group">
        {label && <label htmlFor={id} className="form-label">{label}</label>}
        <input
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={classNames('form-control', { 'has-error': error })}
          {...props}
        />
        {error && <span className="form-error">{error}</span>}
      </div>
    </>
  )
})
