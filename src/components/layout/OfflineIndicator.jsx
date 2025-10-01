import { useState, useEffect } from 'react'
import { useOfflineStatus } from '../../hooks/useOfflineStatus'
import { useLang } from '../../i18n/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../commons/Icons'
import { limitedToast as toast } from '../../utils/toast'

const OfflineIndicator = () => {
  const isOffline = useOfflineStatus()
  const [showOffline, setShowOffline] = useState(false)
  const [showOnline, setShowOnline] = useState(false)
  const [pendingOnline, setPendingOnline] = useState(false) // bandera para esperar
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    if (isFirstLoad && !isOffline) {
      setIsFirstLoad(false)
      return
    }

    if (isOffline) {
      // Se fue la conexión
      setShowOnline(false)
      setPendingOnline(false)
      setShowOffline(true)
      document.body.classList.add('thinbar-open')
      toast.warning(t('offlineStatus.offline'))
    } else {
      // Volvió la conexión
      setShowOffline(false)

      if (!isFirstLoad) {
        // no mostramos online inmediatamente, esperamos a que offline termine
        setPendingOnline(true)
        toast.success(t('offlineStatus.online'))
      } else {
        document.body.classList.remove('thinbar-open')
      }
    }
  }, [isOffline])

  return (
    <>
      {/* Offline */}
      <AnimatePresence
        onExitComplete={() => {
          // cuando offline terminó de salir
          if (pendingOnline) {
            setShowOnline(true)
            setPendingOnline(false)

            const timer = setTimeout(() => {
              setShowOnline(false)
              document.body.classList.remove('thinbar-open')
            }, 3000)

            return () => clearTimeout(timer)
          }
        }}>
        {showOffline && (
          <motion.div
            key='offline-bar'
            initial={{ opacity: 1, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{
              duration: 0.5,
              ease: [0.68, -0.55, 0.27, 1.55] // efecto "jalón" o rebote ligero
            }}
            className='network-status-offline bg-warning-100 text-center fw-semibold py-3'>
            <div className='d-flex m-0 align-items-center text-warning-900 justify-content-center gap-1'>
              <Icon name='wifi-exclamation' />
              <span className='fw-light'>{t('offlineStatus.offline')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Online */}
      <AnimatePresence>
        {showOnline && (
          <motion.div
            key='online-bar'
            initial={{ opacity: 1, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{
              duration: 0.5,
              ease: [0.68, -0.55, 0.27, 1.55] // efecto "jalón" o rebote ligero
            }}
            className='network-status-online bg-success-100 text-white text-center py-3'>
            <div className='d-flex m-0 align-items-center text-success-900 justify-content-center gap-1'>
              <Icon name='wifi' />
              <span className='fw-light'>{t('offlineStatus.online')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OfflineIndicator
