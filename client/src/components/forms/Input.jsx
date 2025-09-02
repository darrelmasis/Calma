import classNames from 'classnames'

export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={classNames('form-group', className)}>
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={classNames('form-control', { 'has-error': error })}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}