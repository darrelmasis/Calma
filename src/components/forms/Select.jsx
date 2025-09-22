import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from '../ui/Button'

export const Select = ({
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
    <div
      className={classNames('custom-select', {
        'is-open': isOpen,
        'is-disabled': disabled,
        'has-error': error,
      }, className)}
      onClick={toggleDropdown}
      ref={selectRef}
    >
      <Button
        variant='primary'
        className={'custom-select-button justify-content-space-between'}
        ariaLabel="Cambiar de Idioma"
        ghost={true}
        label={selectedOption ? selectedOption.label : placeholder}
        icon={
          [
            { name: 'language-alt', position: 'left', variant: "duotones", duotone: "regular" },
            { name: 'angles-up-down', position: 'right', variant: "regular" }
          ]
        }
      />

      {isOpen && (
        <ul className="custom-select-list border text-dark px-0 py-3 m-0 d-flex flex-direction-column rounded-all-sm">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={classNames('custom-select-list-option', {
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
  )
}
