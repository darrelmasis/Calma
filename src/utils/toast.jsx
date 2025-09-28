// utils/toast-limited.js
import toast from 'react-hot-toast'

const MAX_TOASTS = 3
const activeToastIds = []

export const limitedToast = (message, options = {}) => {
  // Si ya hay 3 toasts, elimina el más antiguo
  if (activeToastIds.length >= MAX_TOASTS) {
    const oldestId = activeToastIds.shift()
    toast.dismiss(oldestId)
  }

  // Genera un ID único si no se proporciona
  const id = options.id || Math.random().toString(36).slice(2)

  // Agrega el nuevo ID
  activeToastIds.push(id)

  // Muestra el toast
  const toastId = toast(message, {
    ...options,
    id,
    onDismiss: (t) => {
      // Elimina del array cuando se cierra
      const index = activeToastIds.indexOf(t.id)
      if (index > -1) activeToastIds.splice(index, 1)
      options.onDismiss?.(t)
    }
  })

  return toastId
}
