import toast from 'react-hot-toast'
import { Icon } from '../components/commons/Icons'
import { useSound } from '../components/commons/SoundManager'

const MAX_TOASTS = 3
const activeToastIds = []

// Estilos base comunes
const baseStyles = {
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--fs-medium)',
  fontWeight: 'var(--fw-bold)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-color)'
}

// Estilos específicos para cada tipo
const toastTypes = {
  success: {
    style: {
      ...baseStyles,
      background: 'var(--success-50)',
      color: 'var(--success-800)',
      borderColor: 'var(--success-200)'
    },
    icon: <Icon name='circle-check' className='text-success-800' />
  },
  error: {
    style: {
      ...baseStyles,
      background: 'var(--danger-50)',
      color: 'var(--danger-800)',
      borderColor: 'var(--danger-200)'
    },
    icon: <Icon name='circle-xmark' className='text-danger-800' />
  },
  warning: {
    style: {
      ...baseStyles,
      background: 'var(--warning-50)',
      color: 'var(--warning-800)',
      borderColor: 'var(--warning-200)'
    },
    icon: <Icon name='circle-exclamation' className='text-warning-800' />
  },
  info: {
    style: {
      ...baseStyles,
      background: 'var(--info-50)',
      color: 'var(--info-800)',
      borderColor: 'var(--info-200)'
    },
    icon: <Icon name='circle-info' className='text-info-800' />
  }
}

const limitedToast = (message, sound = 'toastNotify', options = {}) => {
  // Si ya hay 3 toasts, elimina el más antiguo
  if (activeToastIds.length >= MAX_TOASTS) {
    const oldestId = activeToastIds.shift()
    toast.dismiss(oldestId)
  }

  const toastNotifySound = useSound(sound, 0.5)

  // Genera un ID único si no se proporciona
  const id = options.id || Math.random().toString(36).slice(2)

  // Agrega el nuevo ID
  activeToastIds.push(id)

  // Muestra el toast
  const toastId = toast(message, {
    duration: 3000,
    position: 'bottom-right',
    ...options,
    id,
    onDismiss: (t) => {
      // Elimina del array cuando se cierra
      const index = activeToastIds.indexOf(t.id)
      if (index > -1) activeToastIds.splice(index, 1)
      options.onDismiss?.(t)
    }
  })

  toastNotifySound.play()

  return toastId
}

// Métodos específicos para cada tipo
limitedToast.success = (message, sound = 'toastNotify', options = {}) => {
  return limitedToast(message, sound, {
    ...toastTypes.success,
    ...options
  })
}

limitedToast.error = (message, sound = 'toastNotify', options = {}) => {
  return limitedToast(message, sound, {
    ...toastTypes.error,
    ...options
  })
}

limitedToast.warning = (message, sound = 'toastNotify', options = {}) => {
  return limitedToast(message, sound, {
    ...toastTypes.warning,
    ...options
  })
}

limitedToast.info = (message, sound = 'toastNotify', options = {}) => {
  return limitedToast(message, sound, {
    ...toastTypes.info,
    ...options
  })
}

// Re-exportar otros métodos de toast si los necesitas
limitedToast.dismiss = toast.dismiss
limitedToast.remove = toast.remove
limitedToast.promise = toast.promise
limitedToast.loading = toast.loading

export { limitedToast }
