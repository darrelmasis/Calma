// hooks/useBookingValidation.js
import { useState, useCallback } from 'react'
import { useLang } from '../i18n/LanguageContext'

const VALIDATIONS = {
  name: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('booking.steps.personalData.nameInput.errors.required')
          }
        : { state: 'normal' }
    if (value.trim().length < 5)
      return {
        state: 'error',
        message: t('booking.steps.personalData.nameInput.errors.tooShort')
      }
    return { state: 'success' }
  },

  email: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('booking.steps.personalData.emailInput.errors.required')
          }
        : { state: 'normal' }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return {
        state: 'error',
        message: t('booking.steps.personalData.emailInput.errors.invalid')
      }
    return { state: 'success' }
  },

  phone: (value, isStrict, formData = {}, t) => {
    if (!value?.trim())
      return isStrict
        ? {
            state: 'error',
            message: t('booking.steps.personalData.phoneInput.errors.required')
          }
        : { state: 'normal' }

    const digits = value.replace(/\D/g, '')
    const prefix = formData.prefix || '+505'

    if (prefix === '+1' && !/^\d{10}$/.test(digits))
      return {
        state: 'error',
        message: t('booking.steps.personalData.phoneInput.errors.invalidUSA')
      }
    if (prefix === '+505' && !/^\d{8}$/.test(digits))
      return {
        state: 'error',
        message: t('booking.steps.personalData.phoneInput.errors.invalidNic')
      }
    if (digits.length < 8 || digits.length > 15)
      return {
        state: 'error',
        message: t('booking.steps.personalData.phoneInput.errors.invalid')
      }

    return { state: 'success' }
  },

  date: (value, isStrict, formData = {}, t) => {
    if (!value)
      return isStrict
        ? {
            state: 'error',
            message: t('booking.steps.schedule.dateInput.errors.required')
          }
        : { state: 'normal' }

    try {
      const selectedDate = new Date(value + 'T00:00:00')
      const today = new Date()

      const selectedDayStart = new Date(selectedDate)
      selectedDayStart.setHours(0, 0, 0, 0)

      const todayDayStart = new Date(today)
      todayDayStart.setHours(0, 0, 0, 0)

      return selectedDayStart >= todayDayStart
        ? { state: 'success' }
        : {
            state: 'error',
            message: t('booking.steps.schedule.dateInput.errors.pastDate')
          }
    } catch (error) {
      return {
        state: 'error',
        message: t('booking.steps.schedule.dateInput.errors.invalid')
      }
    }
  },

  time: (value, isStrict, formData = {}, t) => {
    if (!value)
      return isStrict
        ? {
            state: 'error',
            message: t('booking.steps.schedule.timeInput.errors.required')
          }
        : { state: 'normal' }

    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      return {
        state: 'error',
        message: t('booking.steps.schedule.timeInput.errors.invalid')
      }
    }

    if (formData.date) {
      try {
        const selectedDateTime = new Date(formData.date + 'T' + value)
        const now = new Date()

        if (selectedDateTime < now) {
          return {
            state: 'error',
            message: t('booking.steps.schedule.timeInput.errors.pastTime')
          }
        }

        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)
        if (selectedDateTime < oneHourFromNow) {
          return {
            state: 'error',
            message: t(
              'booking.steps.schedule.timeInput.errors.requiredAnticipation'
            )
          }
        }
      } catch {}
    }

    const [hours, minutes] = value.split(':').map(Number)
    if (hours < 8 || hours > 18) {
      return {
        state: 'error',
        message: t('booking.steps.schedule.timeInput.errors.available')
      }
    }

    return { state: 'success' }
  }
}

const STEP_FIELDS = {
  1: ['name', 'email', 'phone'],
  2: ['date', 'time']
}

// Helper function para formatear hora
export const formatTimeForDisplay = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export const useBookingValidation = () => {
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

  const validateStep = useCallback(
    (stepIndex, formData) => {
      const fieldNames = STEP_FIELDS[stepIndex] || []
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
    validateStep,
    validateField,
    getField,
    clearField
  }
}
