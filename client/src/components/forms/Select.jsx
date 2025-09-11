import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from '../ui/Button'

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Seleccionar',
  error,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const selectedOption = options.find((opt) => opt.value === value)

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev)
  }

  const handleSelect = (optionValue) => {
    onChange(optionValue) // Actualiza el valor seleccionado
    setIsOpen(false) // Cierra el menú después de seleccionar
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={classNames('form-group', className)} ref={selectRef}>
      {label && <label className="form-label">{label}</label>}
      <div
        className={classNames('custom-select', {
          'is-open': isOpen,
          'is-disabled': disabled,
          'has-error': error,
        })}
        onClick={toggleDropdown}
      >
        <Button
          variant='primary'
          ariaLabel="Cambiar de Idioma"
          ghost={true}
          label={selectedOption ? selectedOption.label : placeholder}
          icon={
            {
              name: 'earth-americas',
              size: "sm",
              variant: "duotones",
              duotone: "regular"
            }
          }
        />

        {isOpen && (
          <ul className="custom-select__list border text-dark">
            {options.map((opt) => (
              <li
                key={opt.value}
                className={classNames('custom-select__option', {
                  'is-selected': opt.value === value,
                })}
                onClick={(e) => {
                  e.stopPropagation() // Evita que el clic cierre el menú antes de seleccionar
                  handleSelect(opt.value)
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
