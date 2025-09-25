export const Radio = ({
  name,
  value,
  checked,
  onChange,
  label,
  className = '',
  ...props
}) => {
  return (
    <label className={`form-radio ${className}`}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <span className='radio-custom' />
      {label && <span className='radio-label'>{label}</span>}
    </label>
  )
}
