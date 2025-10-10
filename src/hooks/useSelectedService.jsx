// SelectedServicesContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import { ServicesData } from '../data/services'
import { useLang } from '../i18n/LanguageContext'
import { limitedToast as toast } from '../utils/toast'

const LOCAL_STORAGE_KEY = 'selectedServices'
const BAG_LIMIT = 6

const SelectedServicesContext = createContext()

export const SelectedServicesProvider = ({ children }) => {
  const [showBagFull, setShowBagFull] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const { t } = useLang()

  const [services, setServices] = useState({})

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

  // ⚠ Mostrar toast cuando la bolsa está llena
  useEffect(() => {
    if (showBagFull) {
      toast.warning(t('header.dropdown.fullBag'), { sound: 'notifyWarning' })
      setShowBagFull(false) // reset
    }
  }, [showBagFull])

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
  const clearServices = useCallback(() => {
    setServices({})
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }, [t])

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
      }}>
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
