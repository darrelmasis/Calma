import { forwardRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Select } from './Select-alt';
// =======================
// Componente Input
// =======================
const Input = forwardRef(({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  error,
  name,
  className = '',
  classNameInput = '',
  classNameLabel = '',
  classNameError = '',
  required = false,
  ...props
}, ref) => {

  const id = props.id || `input-${label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).slice(2, 5)}`;

  const textareaRef = useRef(null);

  // Ajustar altura del textarea al contenido
  useEffect(() => {
    if (type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset
      textareaRef.current.style.height = (textareaRef.current.scrollHeight + 2) + 'px';
    }
  }, [value, type]);

  const handleChange = (e) => {
    if (type === 'checkbox') {
      onChange?.(e.target.checked, e);
    } else if (type === 'file') {
      onChange?.(e.target.files, e);
    } else {
      onChange?.(e.target.value, e);
    }
  };

  const inputProps = {
    id,
    ref: type === 'textarea' ? textareaRef : ref,
    name,
    value: type !== 'checkbox' && type !== 'file' ? value : undefined,
    checked: type === 'checkbox' ? value : undefined,
    onChange: handleChange,
    placeholder: type !== 'checkbox' && type !== 'file' ? placeholder : undefined,
    className: classNames('form-control', classNameInput, { 'has-error': !!error }),
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    ...props
  };

  return (
    <div className={classNames('input-group', className)}>
      {label && (
        <label htmlFor={id} className={classNames('form-label', classNameLabel)}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}

      {error && (
        <span id={`${id}-error`} className={classNames('form-error fs-small text-danger mt-1', classNameError)}>
          {error}
        </span>
      )}
    </div>
  );
});

// =======================
// Componente PhoneNumber
// =======================
const countries = [
  { value: "ni", code: "🇳🇮 +505", mask: "____-____", placeholder: "8128-5678" },
  { value: "us", code: "🇺🇸 +1", mask: "(___) ___-____", placeholder: "(123) 456-7890" },
];

// Aplica máscara simple
function applyMask(raw, mask) {
  let result = "";
  let rawIndex = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "_") {
      if (rawIndex < raw.length) {
        result += raw[rawIndex];
        rawIndex++;
      } else break;
    } else {
      if (rawIndex < raw.length) result += mask[i];
    }
  }
  return result;
}

const PhoneNumber = forwardRef(({ value = "", onChange, label, error, className, required = false }, ref) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCountryChange = (countryCode) => {
    const country = countries.find((c) => c.value === countryCode);
    setSelectedCountry(country);
    onChange?.(""); // reset valor
  };

  const handleInputChange = (e) => {
    let raw = e.target.value.replace(/\D/g, ""); // solo dígitos
    if (!raw) { onChange?.("", e); return; }

    const maxDigits = selectedCountry.mask.replace(/[^_]/g, "").length;
    raw = raw.slice(0, maxDigits);

    const maskedValue = applyMask(raw, selectedCountry.mask);
    const prefix = selectedCountry.code.split(" ")[1];

    onChange?.({
      formatted: maskedValue, // número con máscara y prefijo
      raw,                        // solo dígitos
      prefix,
      country: selectedCountry.value
    }, e);
  };

  return (
    <div className={classNames("input-group phone-input-group w-100", className)}>
      {label && <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>}

      <div className="d-flex gap-1 align-items-flex-start w-100">
        <div className="d-flex align-items-center w-100 max-wx-120">
          <Select
            options={countries.map((c) => ({ value: c.value, label: c.code }))}
            value={selectedCountry.value}
            onChange={handleCountryChange}
            className="phone-country-select w-100"
            placeholder="Selecciona un país"
          />
        </div>
        <div className="d-flex flex-direction-column flex-1">
          <input
            ref={ref}
            type="tel"
            value={value}
            onChange={handleInputChange}
            placeholder={selectedCountry.placeholder}
            className={classNames("form-control", { "has-error": !!error })}
          />
          {error && <span className="form-error fs-small text-danger mt-1">{error}</span>}
        </div>
      </div>

    </div>
  );
});

export { Input, PhoneNumber };
