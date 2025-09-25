import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../commons/Icons'

// Componente Accordion principal
export const Accordion = ({
  title,
  children,
  indice,
  indiceActivo,
  alAlternar,
  className = ''
}) => {
  const estaActivo = indice === indiceActivo

  const manejarAlternar = () => {
    alAlternar?.(indice)
  }

  return (
    <div
      role='button'
      tabIndex={0}
      aria-expanded={estaActivo}
      onKeyDown={(e) => e.key === 'Enter' && manejarAlternar()}
      className={`border rounded py-3 px-5 bg-container faq-item mb-3 ${estaActivo ? 'active' : ''} ${className}`}
      onClick={manejarAlternar}
    >
      <div className='d-flex justify-content-space-between align-items-center'>
        <p className='m-0'>{title}</p>
        <motion.div animate={{ rotate: estaActivo ? 180 : 0 }}>
          <Icon name='chevron-down' className='text-primary' />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {estaActivo && (
          <motion.div
            key='contenido'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='mt-4'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Accordion.displayName = 'Accordion'
