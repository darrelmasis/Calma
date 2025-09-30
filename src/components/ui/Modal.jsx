import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import { Button } from './Button'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  outsideClick = true // permite cerrar clic fuera o ESC
}) {
  // Cerrar con Escape (solo si outsideClick = true)
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e) => {
      if (outsideClick && e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, outsideClick])

  if (typeof window === 'undefined') return null

  const handleClose = () => {
    outsideClick && onClose?.()
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='modal-overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => outsideClick && onClose?.()}
          />

          {/* Dialog */}
          <div className='container modal-container d-flex flex-direction-column align-items-center justify-content-center'>
            <motion.div
              className='max-wx-550 position-relative bg-container overflow-hidden rounded-all-sm d-flex flex-direction-column align-items-center justify-content-center border'
              role='dialog'
              aria-modal='true'
              aria-label={title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} // evita que clic interno cierre modal
            >
              <div className='modal-header bg-light-50 d-flex align-items-center justify-content-space-between position-relative w-100 py-3 px-3 border-bottom'>
                <div className='white-space-nowrap w-100 mi-2-875'>
                  <h1 className='fs-lead my-0 text-center'>{title}</h1>
                </div>
                <div className='position-absolute right-1 d-flex align-items-center justify-content-center'>
                  <Button
                    icon='xmark'
                    variant='basic'
                    ghost
                    className='text-muted border-0'
                    onClick={handleClose}
                  />
                </div>
              </div>

              <div className='d-flex flex-direction-column'>{children}</div>

              <div className='modal-footer'></div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

// Subcomponentes
Modal.Body = ({ children, className }) => (
  <div className={classNames('p-3', className)}>{children}</div>
)
Modal.Actions = ({ children, className, placement }) => {
  const placementClasses = classNames(
    {
      'justify-content-flex-start': placement === 'start',
      'justify-content-center': placement === 'center' || !placement,
      'justify-content-flex-end': placement === 'end'
    },
    'd-flex p-3 bg-light-100 border-top',
    className
  )

  return <div className={placementClasses}>{children}</div>
}
Modal.Action = ({ children, className, variant = 'primary', ...props }) => (
  <Button {...props} variant={variant} className={className}>
    {children}
  </Button>
)
