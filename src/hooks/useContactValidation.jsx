import { useState, useCallback } from 'react'
import { useLang } from '../i18n/LanguageContext'

const VALIDATIONS = {
  nombre: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('contact.form.errors.name.required')
          }
        : { state: 'normal' }
    if (value.trim().length < 2)
      return {
        state: 'error',
        message: t('contact.form.errors.name.tooShort')
      }
    return { state: 'success' }
  },

  apellido: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('contact.form.errors.lastName.required')
          }
        : { state: 'normal' }
    if (value.trim().length < 2)
      return {
        state: 'error',
        message: t('contact.form.errors.lastName.tooShort')
      }
    return { state: 'success' }
  },

  email: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('contact.form.errors.email.required')
          }
        : { state: 'normal' }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return {
        state: 'error',
        message: t('contact.form.errors.email.invalid')
      }
    return { state: 'success' }
  },

  telefono: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('contact.form.errors.phone.required')
          }
        : { state: 'normal' }

    const digits = value.replace(/\D/g, '')
    const prefix = formData.prefix || '+505'

    if (prefix === '+1' && !/^\d{10}$/.test(digits))
      return {
        state: 'error',
        message: t('contact.form.errors.phone.invalidUSA')
      }
    if (prefix === '+505' && !/^\d{8}$/.test(digits))
      return {
        state: 'error',
        message: t('contact.form.errors.phone.invalidNic')
      }
    if (digits.length < 8 || digits.length > 15)
      return {
        state: 'error',
        message: t('contact.form.errors.phone.invalid')
      }

    return { state: 'success' }
  },

  mensaje: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('contact.form.errors.message.required')
          }
        : { state: 'normal' }
    if (value.trim().length < 10)
      return {
        state: 'error',
        message: t('contact.form.errors.message.tooShort')
      }
    return { state: 'success' }
  }
}

export const useContactValidation = () => {
  const { t } = useLang()
  const [fields, setFields] = useState({})

  const validateField = useCallback(
    (fieldName, value, formData = {}) => {
      const validator = VALIDATIONS[fieldName]
      if (!validator) return { state: 'normal' }

      const newFieldState = validator(value, false, formData, t)
      setFields((prev) => ({ ...prev, [fieldName]: newFieldState }))
      return newFieldState
    },
    [t]
  )

  const validateForm = useCallback(
    (formData) => {
      const fieldNames = ['nombre', 'apellido', 'email', 'telefono', 'mensaje']
      const newFields = {}

      fieldNames.forEach((fieldName) => {
        const validator = VALIDATIONS[fieldName]
        if (validator) {
          newFields[fieldName] = validator(
            formData[fieldName],
            true,
            formData,
            t
          )
        }
      })

      setFields(newFields)
      return Object.values(newFields).every((f) => f.state === 'success')
    },
    [t]
  )

  const getField = (field) => fields[field] || { state: 'normal' }

  const clearField = useCallback((fieldName) => {
    setFields((prev) => ({ ...prev, [fieldName]: { state: 'normal' } }))
  }, [])

  return {
    fields,
    validateForm,
    validateField,
    getField,
    clearField
  }
}
