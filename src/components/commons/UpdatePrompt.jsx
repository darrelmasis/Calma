import { useState, useContext, useEffect } from 'react'
import Modal, { ModalContext } from '../ui/Modal'
import { useDevice } from '../../hooks/useBreakpoint'
import { Icon } from './Icons'
import { limitedToast as toast } from '../../utils/toast'
import { usePWAUpdate } from '../../hooks/usePWAUpdate'

export default function UpdatePrompt({ updateSW }) {
  const [rotate, setRotate] = useState(null)
  const { type } = useDevice()
  const isMobile = type === 'mobile' || type === 'tablet'

  const { modalType, setModalType, justUpdatedOnReload, clearJustUpdatedOnReload } = usePWAUpdate(updateSW, isMobile)

  const handleShowToast = () => {
    toast.success('Calma se ha actualizado', {
      duration: 3000,
      sound: 'updateComplete',
      delay: 1
    })
  }

  // Si detectamos que venimos de una actualización en mobile, mostramos toast al mount
  useEffect(() => {
    if (!justUpdatedOnReload) return
    handleShowToast()
    clearJustUpdatedOnReload()
  }, [justUpdatedOnReload, clearJustUpdatedOnReload])

  // Botón de actualización (dentro del modal 'update')
  const UpdateButton = () => {
    const { handleClose } = useContext(ModalContext)

    const handleClick = async () => {
      setRotate('spin')
      try {
        // IMPORTANT: marcamos antes de llamar a updateSW() para que sobreviva al reload
        try {
          localStorage.setItem('justUpdated', 'true')
        } catch (e) {}
        await updateSW?.()
        // Nota: si updateSW provoca un reload inmediato, el código posterior puede no ejecutarse.
        // En ese caso el hook detectará el flag en el nuevo mount y disparará el toast.
      } catch (err) {
        toast.error('No se pudo actualizar la aplicación')
        // si hay error, limpiamos el flag para no mostrar toast por error
        try {
          localStorage.removeItem('justUpdated')
        } catch (e) {}
      } finally {
        // Mostrar toast inmediato en caso de que no haya reload automático (opcional para desktop)
        if (!isMobile) handleShowToast()
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
            <Modal.Action
              variant='success'
              size='large'
              onClick={() => {
                handleShowToast()
                setModalType(null)
              }}>
              Continuar
            </Modal.Action>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}
