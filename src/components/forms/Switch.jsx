export const Switch = ({
  checked,
  onChange,
  label,
  className = '',
  ...props
}) => {
  return (
    <label className={`form-switch ${className}`}>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <span className='switch-slider' />
      {label && <span className='switch-label'>{label}</span>}
    </label>
  )
}
