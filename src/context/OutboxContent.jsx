// src/context/OutboxContext.jsx
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { getOutbox, removeFromOutbox, addToOutbox } from '../utils/OutboxManager'
import { useOfflineStatus } from '../hooks/useOfflineStatus'
import { limitedToast as toast } from '../utils/toast'
import { useLang } from '../i18n/LanguageContext'
import { useLocation, useNavigate } from 'react-router-dom'

const OutboxContext = createContext()

export const OutboxProvider = ({ apiUrl, children }) => {
  const isOffline = useOfflineStatus()
  const [queue, setQueue] = useState([])
  const { t } = useLang()
  const location = useLocation()
  const processingRef = useRef(false)
  const navigate = useNavigate()

  // Cargar la outbox desde IndexedDB al iniciar
  useEffect(() => {
    const loadOutbox = async () => {
      const items = await getOutbox()
      setQueue(items)
    }
    loadOutbox()
  }, [])

  // Escuchar cuando vuelva la conexión
  useEffect(() => {
    const handleOnline = () => processQueue()
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [])

  // Reintenta la cola SOLO cuando haya conexión y se cambia de ruta
  useEffect(() => {
    if (!isOffline && queue.length > 0) {
      processQueue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOffline, location]) // 👈 quitamos queue de dependencias para evitar loops

  const endpointMap = {
    booking: '/api/send-mail',
    contact: '/api/contact',
    default: '/api/send-mail'
  }

  const processQueue = async () => {
    if (processingRef.current) return
    processingRef.current = true

    try {
      const items = await getOutbox()
      for (const item of items) {
        try {
          const endpoint = endpointMap[item.type] || endpointMap.default
          const res = await axios.post(`${apiUrl}${endpoint}`, item.payload, {
            headers: { 'Content-Type': 'application/json' }
          })
          if (res.data.ok) {
            await removeFromOutbox(item.id)
            setQueue((prev) => prev.filter((i) => i.id !== item.id))
            toast.success(t('senders.outbox.toastSuccess'), { duration: 5000 })
            // Si venimos de un form, redirigir a success
            if (location.pathname === '/outbox') {
              setTimeout(() => {
                navigate('/')
              }, 5000)
            }
          }
        } catch (err) {
          console.error('❌ Error reintentando outbox:', err)
        }
      }
    } finally {
      processingRef.current = false
    }
  }

  const addToQueue = async (payload, type = 'default') => {
    const added = await addToOutbox(payload, type)
    if (added) {
      const items = await getOutbox()
      setQueue(items)
      if (isOffline) {
        toast.info(t('senders.outbox.toastMessage'), { duration: 5000 })
      }
    } else {
      console.warn('⚠️ Payload duplicado no añadido a outbox.')
    }
  }

  return <OutboxContext.Provider value={{ queue, addToQueue, processQueue }}>{children}</OutboxContext.Provider>
}

export const useOutbox = () => useContext(OutboxContext)
