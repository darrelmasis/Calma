import { useEffect, useState, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import { Button } from './Button'

// Context para exponer handleClose a Modal.Action
export const ModalContext = createContext({ handleClose: () => {} })

export default function Modal({ isOpen, onClose, title, children, outsideClick = true }) {
  const [isVisible, setIsVisible] = useState(false)
  const ANIMATION_DURATION = 200 // ms

  // Sincroniza isVisible con isOpen
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    document.body.classList.toggle('modal-open', isVisible)
    return () => document.body.classList.remove('modal-open')
  }, [isVisible])

  // Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (outsideClick && e.key === 'Escape') handleClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, outsideClick])

  if (typeof window === 'undefined') return null

  // Función que cierra el modal con animación
  const handleClose = () => {
    setIsVisible(false) // dispara animación de salida
    setTimeout(() => onClose?.(), ANIMATION_DURATION)
  }

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <ModalContext.Provider value={{ handleClose }}>
          {/* Overlay */}
          <motion.div
            key='modal-overlay'
            className='modal-overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION / 1000 }}
            onClick={outsideClick ? handleClose : undefined}
          />

          {/* Contenedor */}
          <motion.div
            key='modal-container'
            className='modal-container max-wx-md-600 w-100'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION / 1000 }}>
            <motion.div
              key='modal-dialog'
              className='position-relative w-100 bg-container overflow-hidden rounded-all-sm d-block border'
              role='dialog'
              aria-modal='true'
              aria-label={title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: ANIMATION_DURATION / 1000 }}
              onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className='modal-header bg-light-50 d-flex align-items-center justify-content-space-between position-relative w-100 py-3 px-3 border-bottom'>
                <div className='text-center w-100 mi-2-875'>
                  <h1 className='fs-lead'>{title}</h1>
                </div>
                {outsideClick && (
                  <div className='position-absolute top-1 right-1 d-flex align-items-center justify-content-center'>
                    <Button icon='xmark' variant='basic' ghost className='text-muted border-0' onClick={handleClose} />
                  </div>
                )}
              </div>

              {/* Body */}
              <div className='d-flex flex-direction-column flex-1'>{children}</div>
            </motion.div>
          </motion.div>
        </ModalContext.Provider>
      )}
    </AnimatePresence>,
    document.body
  )
}

// Subcomponentes
Modal.Body = ({ children, className }) => <div className={classNames('p-3', className)}>{children}</div>

Modal.Actions = ({ children, className, placement }) => {
  const placementClasses = classNames(
    {
      'justify-content-flex-start': placement === 'start',
      'justify-content-center': placement === 'center' || !placement,
      'justify-content-flex-end': placement === 'end'
    },
    'd-flex p-3 w-100 bg-light-100 border-top',
    className
  )
  return <div className={placementClasses}>{children}</div>
}

// Acción que cierra el modal automáticamente usando contexto
Modal.Action = ({ children, className, variant = 'primary', onClick, closeOnClick = true, ...props }) => {
  const { handleClose } = useContext(ModalContext)

  return (
    <Button
      {...props}
      variant={variant}
      className={className}
      onClick={async (e) => {
        if (onClick) await onClick(e) // ejecuta lógica extra (puede ser async)
        if (closeOnClick) handleClose() // cierra animado solo si closeOnClick=true
      }}>
      {children}
    </Button>
  )
}
