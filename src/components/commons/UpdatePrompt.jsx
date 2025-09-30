import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { useDevice } from '../../hooks/useBreakpoint'
import { Icon } from './Icons'

export default function UpdatePrompt({ updateSW }) {
  const [show, setShow] = useState(false)
  const { type } = useDevice()
  const [rotate, setRotate] = useState(null)

  useEffect(() => {
    const handler = () => setShow(true)
    window.addEventListener('pwaUpdateAvailable', handler)
    return () => window.removeEventListener('pwaUpdateAvailable', handler)
  }, [])

  const handleUpdateClick = () => {
    setRotate('spin')
    updateSW?.()
  }

  if (!show) return null

  return (
    <Modal
      isOpen={show}
      onClose={() => setShow(false)}
      title='¡Nueva versión disponible!'
      outsideClick={false} // 🚨 No permitir cerrar clic fuera o Escape
    >
      <Modal.Body className='text-center mb-5'>
        <h1 className='m-0 text-muted'>
          <Icon name='cloud-arrow-down' variant='regular' />
        </h1>
        <p className='text-muted m-0 fs-h6'>
          Una actualización de la aplicación está lista. Se recomienda
          actualizar ahora para tener la mejor experiencia.
        </p>
      </Modal.Body>

      <Modal.Actions placement='center'>
        <Modal.Action
          variant='success'
          disabled={rotate === 'spin'}
          icon={{ name: 'arrows-rotate', animation: rotate }}
          onClick={handleUpdateClick}
        >
          Actualizar
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
