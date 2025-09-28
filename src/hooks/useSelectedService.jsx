// SelectedServicesContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react'
import { useSound } from '../components/commons/SoundManager'
import { ServicesData } from '../data/services'
import { useLang } from '../i18n/LanguageContext'
import { limitedToast as toast } from '../utils/toast'
import { Icon } from '../components/commons/Icons'

const LOCAL_STORAGE_KEY = 'selectedServices'
const BAG_LIMIT = 5

const SelectedServicesContext = createContext()

export const SelectedServicesProvider = ({ children }) => {
  const addSound = useSound('dropBag')
  const removeSound = useSound('trashBag')
  const clearShoppingBagSound = useSound('cleanShoppingBag')
  const bellSound = useSound('bell')
  const bagFullSound = useSound('bagFull')
  const [showBagFull, setShowBagFull] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useLang()

  const [services, setServices] = useState({})
  const prevTotalRef = useRef(0)

  // ✅ Carga inicial con protección contra componentes desmontados
  useEffect(() => {
    let isMounted = true
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}')
    if (isMounted) {
      setServices(stored)
      setIsLoaded(true)
    }
    return () => {
      isMounted = false
    }
  }, [])

  const calculateTotalServices = useCallback((servicesObj) => {
    return Object.values(servicesObj).reduce((acc, arr) => acc + arr.length, 0)
  }, [])

  // ✅ getServicePrice como useCallback para evitar invalidar useMemo
  const getServicePrice = useCallback((subCategoryId, serviceId) => {
    const category = ServicesData[subCategoryId]
    if (!category) return 0

    const price = category.prices[serviceId]
    if (!price) return 0

    return typeof price === 'number' ? price : price.from || 0
  }, [])

  useEffect(() => {
    if (showBagFull) {
      toast(t('header.dropdown.fullBag'), {
        duration: 3000,
        icon: (
          <Icon
            name='circle-exclamation'
            variant='regular'
            className='text-warning-800'
          />
        ),
        position: 'bottom-right',
        className:
          'rounded fs-medium fw-bold text-warning-800 bg-warning-50 border-warning-200'
      })
      bagFullSound.play()
      setShowBagFull(false) // reset
    }
  }, [showBagFull, t, bagFullSound])

  // ➕ Agregar servicio
  const addService = useCallback(
    (categoryId, subCategoryId, serviceId) => {
      setServices((prev) => {
        const currentTotal = calculateTotalServices(prev)
        const isNewService = !prev[categoryId]?.some(
          (s) => s.subCategoryId === subCategoryId && s.serviceId === serviceId
        )

        if (isNewService && currentTotal >= BAG_LIMIT) {
          // ✅ Solo marca que queremos mostrar el error, sin efectos
          setShowBagFull(true)
          return prev
        }

        const updated = { ...prev }
        if (!updated[categoryId]) updated[categoryId] = []
        if (isNewService) {
          updated[categoryId].push({ subCategoryId, serviceId })
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
        }
        return updated
      })
    },
    [calculateTotalServices]
  )

  // ➖ Eliminar servicio
  const removeService = useCallback((categoryId, subCategoryId, serviceId) => {
    setServices((prev) => {
      const updated = { ...prev }
      if (updated[categoryId]) {
        updated[categoryId] = updated[categoryId].filter(
          (s) =>
            !(s.subCategoryId === subCategoryId && s.serviceId === serviceId)
        )
        if (updated[categoryId].length === 0) delete updated[categoryId]
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
      }
      return updated
    })
  }, [])

  // 🗑️ Limpiar servicios
  const clearServices = useCallback(
    (sound = 'clear') => {
      setServices({})
      localStorage.removeItem(LOCAL_STORAGE_KEY)

      toast(t('notifications.clearedServices.title'), {
        id: 'bag-cleared',
        duration: 3000,
        icon: <Icon name='check' className='text-success-800' />,
        position: 'bottom-right',
        className:
          'rounded fs-medium fw-bold text-success-800 bg-success-50 border-success-200'
      })

      if (sound === 'clear') clearShoppingBagSound.play()
      if (sound === 'bell') bellSound.play()
    },
    [t, clearShoppingBagSound, bellSound]
  )

  const totalServices = useMemo(
    () => calculateTotalServices(services),
    [services, calculateTotalServices]
  )

  const totalPrice = useMemo(() => {
    return Object.entries(services).reduce((acc, [categoryId, items]) => {
      const sum = items.reduce(
        (s, { subCategoryId, serviceId }) =>
          s + getServicePrice(subCategoryId, serviceId),
        0
      )
      return acc + sum
    }, 0)
  }, [services, getServicePrice])

  const servicesWithInfo = useMemo(() => {
    const result = {}
    Object.entries(services).forEach(([categoryId, items]) => {
      result[categoryId] = items.map(({ subCategoryId, serviceId }) => {
        const categoryName = t(`services.section_1.category.${categoryId}.name`)
        const subCategoryName = t(
          `services.section_1.category.${categoryId}.subCategory.${subCategoryId}.name`
        )
        const serviceName = t(
          `services.section_1.category.${categoryId}.subCategory.${subCategoryId}.services.${serviceId}.name`
        )
        const serviceDescription = t(
          `services.section_1.category.${categoryId}.subCategory.${subCategoryId}.services.${serviceId}.description`
        )
        const servicePrice = getServicePrice(subCategoryId, serviceId)
        return {
          id: serviceId,
          categoryName,
          subCategoryName,
          serviceName,
          serviceDescription,
          servicePrice,
          subCategoryId
        }
      })
    })
    return result
  }, [services, t, getServicePrice])

  // 🔊 Reproducir sonidos en respuesta a cambios reales (no dentro de setState)
  useEffect(() => {
    if (!isLoaded) return

    const prevTotal = prevTotalRef.current
    const newTotal = totalServices

    // ✅ Ignorar la carga inicial donde prevTotal es 0
    if (prevTotal > 0) {
      if (newTotal > prevTotal) {
        addSound.play()
      } else if (newTotal < prevTotal) {
        removeSound.play()
      }
    }

    prevTotalRef.current = newTotal
  }, [totalServices, isLoaded, addSound, removeSound])

  // 📱 App Badge API
  useEffect(() => {
    if (!isLoaded) return

    if ('setAppBadge' in navigator) {
      if (totalServices > 0) {
        navigator.setAppBadge(totalServices).catch(() => {})
      } else {
        navigator.clearAppBadge().catch(() => {})
      }
    }
  }, [totalServices, isLoaded])

  return (
    <SelectedServicesContext.Provider
      value={{
        services,
        servicesWithInfo,
        totalServices,
        totalPrice,
        addService,
        removeService,
        clearServices,
        getServicePrice,
        isLoaded,
        BAG_LIMIT,
        canAddMore: totalServices < BAG_LIMIT
      }}
    >
      {children}
    </SelectedServicesContext.Provider>
  )
}

export const useSelectedServices = () => {
  const context = useContext(SelectedServicesContext)
  if (!context) {
    throw new Error(
      'useSelectedServices must be used within a SelectedServicesProvider'
    )
  }
  return context
}
