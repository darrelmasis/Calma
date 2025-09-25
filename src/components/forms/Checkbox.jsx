export const Checkbox = ({
  checked,
  onChange,
  label,
  className = '',
  ...props
}) => {
  return (
    <label className={`form-checkbox ${className}`}>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <span className='checkbox-custom' />
      {label && <span className='checkbox-label'>{label}</span>}
    </label>
  )
}
