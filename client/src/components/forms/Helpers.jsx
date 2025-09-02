export const capitalize = (text) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : ''

export const isEmpty = (value) =>
  value === null || value === undefined || value === '' || value.length === 0

export const getValidationClass = (error) => (error ? 'has-error' : '')

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)