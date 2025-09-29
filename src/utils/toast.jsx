import toast from 'react-hot-toast'
import { Icon } from '../components/commons/Icons'
import { useSound } from '../components/commons/SoundManager' // usa una función en lugar de hook

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
    icon: <Icon name='circle-check' className='w-16 text-success-800' />
  },
  error: {
    style: {
      ...baseStyles,
      background: 'var(--danger-50)',
      color: 'var(--danger-800)',
      borderColor: 'var(--danger-200)'
    },
    icon: <Icon name='circle-xmark' className='w-16 text-danger-800' />
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

const limitedToast = (message, options = {}) => {
  if (activeToastIds.length >= MAX_TOASTS) {
    const oldestId = activeToastIds.shift()
    toast.dismiss(oldestId)
  }

  const id = options.id || Math.random().toString(36).slice(2)
  activeToastIds.push(id)

  const toastId = toast(message, {
    duration: 3000,
    position: 'bottom-right',
    ...options,
    id,
    onDismiss: (t) => {
      const index = activeToastIds.indexOf(t.id)
      if (index > -1) activeToastIds.splice(index, 1)
      options.onDismiss?.(t)
    }
  })

  if (options.sound) {
    useSound(options.sound, 0.5).play()
  }

  return toastId
}

// Métodos específicos
limitedToast.success = (message, options = {}) => {
  return limitedToast(message, {
    ...toastTypes.success,
    sound: 'toastNotify',
    ...options
  })
}

limitedToast.error = (message, options = {}) => {
  return limitedToast(message, {
    ...toastTypes.error,
    sound: 'toastNotifyError',
    ...options
  })
}

limitedToast.warning = (message, options = {}) => {
  return limitedToast(message, {
    ...toastTypes.warning,
    sound: 'toastNotify',
    ...options
  })
}

limitedToast.info = (message, options = {}) => {
  return limitedToast(message, {
    ...toastTypes.info,
    sound: 'toastNotify',
    ...options
  })
}

// Re-exportar utilidades
limitedToast.dismiss = toast.dismiss
limitedToast.remove = toast.remove
limitedToast.promise = toast.promise
limitedToast.loading = toast.loading

export { limitedToast }
