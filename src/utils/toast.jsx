import toast from 'react-hot-toast'
import { Icon } from '../components/commons/Icons'
import { useSound } from '../components/commons/SoundManager'

const MAX_TOASTS = 3
const activeToastIds = []

const baseStyles = {
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--fs-medium)',
  fontWeight: 'var(--fw-bold)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-color)'
}

const toastTypes = {
  success: {
    style: { ...baseStyles, background: 'var(--success-50)', color: 'var(--success-800)', borderColor: 'var(--success-200)' },
    icon: <Icon name='circle-check' className='w-16 text-success-800' />,
    sound: 'notifySuccess'
  },
  error: {
    style: { ...baseStyles, background: 'var(--danger-50)', color: 'var(--danger-800)', borderColor: 'var(--danger-200)' },
    icon: <Icon name='circle-xmark' className='w-16 text-danger-800' />,
    sound: 'notifyError'
  },
  warning: {
    style: { ...baseStyles, background: 'var(--warning-50)', color: 'var(--warning-800)', borderColor: 'var(--warning-200)' },
    icon: <Icon name='circle-exclamation' className='text-warning-800' />,
    sound: 'notifyWarning'
  },
  info: {
    style: { ...baseStyles, background: 'var(--info-50)', color: 'var(--info-800)', borderColor: 'var(--info-200)' },
    icon: <Icon name='circle-info' className='text-info-800' />,
    sound: 'notifyInfo'
  }
}

const limitedToast = (message, options = { sound: 'notifyInfo' }) => {
  if (activeToastIds.length >= MAX_TOASTS) {
    const oldestId = activeToastIds.shift()
    toast.dismiss(oldestId)
  }

  const id = options.id || Math.random().toString(36).slice(2)
  activeToastIds.push(id)

  const showToast = () => {
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

  if (options.delay > 0) return setTimeout(showToast, options.delay * 1000)

  return showToast()
}

// Métodos específicos con soporte de delay
Object.keys(toastTypes).forEach((type) => {
  limitedToast[type] = (message, options = {}) =>
    limitedToast(message, {
      ...toastTypes[type],
      ...options
    })
})

// Re-exportar utilidades
limitedToast.dismiss = toast.dismiss
limitedToast.remove = toast.remove
limitedToast.promise = toast.promise
limitedToast.loading = toast.loading

export { limitedToast }
