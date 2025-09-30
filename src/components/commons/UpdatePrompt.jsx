import { useEffect, useState, useContext } from 'react'
import Modal, { ModalContext } from '../ui/Modal'
import { useDevice } from '../../hooks/useBreakpoint'
import { Icon } from './Icons'
import { limitedToast as toast } from '../../utils/toast'

export default function UpdatePrompt({ updateSW }) {
  const [modalType, setModalType] = useState(null) // null | "update" | "info"
  const [rotate, setRotate] = useState(null)

  const { type } = useDevice()
  const isMobile = type === 'mobile' || type === 'tablet'

  // Detectar actualización disponible
  useEffect(() => {
    const handler = () => {
      if (isMobile) {
        setModalType('update')
      } else {
        localStorage.setItem('justUpdated', 'true')
        updateSW?.()
      }
    }

    window.addEventListener('pwaUpdateAvailable', handler)
    return () => window.removeEventListener('pwaUpdateAvailable', handler)
  }, [isMobile, updateSW])

  // Mostrar modal de "info" después de la recarga
  useEffect(() => {
    if (localStorage.getItem('justUpdated') === 'true') {
      localStorage.removeItem('justUpdated')
      setModalType('info')
    }
  }, [])

  const handleShowToast = () => {
    toast.success('Calma se ha actualizado', {
      duration: 3000,
      sound: 'updateComplete',
      delay: 1
    })
  }

  // Botón de actualización
  const UpdateButton = () => {
    const { handleClose } = useContext(ModalContext)

    const handleClick = async () => {
      setRotate('spin')
      try {
        await updateSW?.()
        // marcar que ya se actualizó para que al recargar se muestre info
        localStorage.setItem('justUpdated', 'true')
      } catch (err) {
        toast.error('No se pudo actualizar la aplicación')
      } finally {
        handleShowToast()
        setTimeout(() => {
          setRotate(null)
          handleClose()
        }, 1000)
      }
    }

    return (
      <Modal.Action
        variant='success'
        disabled={rotate === 'spin'}
        icon={{ name: 'arrows-rotate', animation: rotate }}
        onClick={handleClick}
        size='large'
        closeOnClick={false}>
        Actualizar
      </Modal.Action>
    )
  }

  if (!modalType) return null

  return (
    <>
      {modalType === 'update' && (
        <Modal isOpen onClose={() => setModalType(null)} title='¡Nueva versión disponible!' outsideClick={false}>
          <Modal.Body className='text-center mb-5'>
            <h1 className='text-muted'>
              <Icon name='cloud-arrow-down' variant='regular' />
            </h1>
            <p className='text-muted m-0 fs-h6'>
              Una actualización de la aplicación está lista. Se recomienda actualizar ahora para tener la mejor experiencia.
            </p>
          </Modal.Body>

          <Modal.Actions placement='center'>
            <UpdateButton />
          </Modal.Actions>
        </Modal>
      )}

      {modalType === 'info' && (
        <Modal isOpen onClose={() => setModalType(null)} title='¡Nueva versión!'>
          <Modal.Body className='text-center mb-5'>
            <h1 className='text-muted'>🥳</h1>
            <p className='text-muted m-0 fs-h6'>¡Ya estás usando la última versión de la aplicación!</p>
          </Modal.Body>

          <Modal.Actions placement='center'>
            <Modal.Action variant='success' size='large' onClick={handleShowToast}>
              Continuar
            </Modal.Action>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}
