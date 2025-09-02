import classNames from 'classnames'

export const FormGroup = ({ label, error, children, className = '' }) => {
  return (
    <div className={classNames('form-group', className)}>
      {label && <label className="form-label">{label}</label>}
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}