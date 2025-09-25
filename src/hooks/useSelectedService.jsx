// SelectedServicesContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { useSound } from '../components/commons/SoundManager'
import { ServicesData } from '../data/services'
import { useLang } from '../i18n/LanguageContext'

const LOCAL_STORAGE_KEY = 'selectedServices'
const SelectedServicesContext = createContext()

export const SelectedServicesProvider = ({ children }) => {
  const addSound = useSound('dropBag')
  const removeSound = useSound('trashBag')
  const clearShoppingBagSound = useSound('cleanShoppingBag')
  const bellSound = useSound('bell')
  const [isLoaded, setIsLoaded] = useState(false)

  const { t } = useLang()

  // Guardamos un objeto { categoryId: [{ subCategoryId, serviceId }] }
  const [services, setServices] = useState({})

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}')
    setServices(stored)
    setIsLoaded(true)
  }, [])

  // ➕ Agregar servicio
  const addService = (categoryId, subCategoryId, serviceId) => {
    setServices((prev) => {
      const updated = { ...prev }
      if (!updated[categoryId]) updated[categoryId] = []

      // Evitamos duplicados
      const exists = updated[categoryId].some(
        (s) => s.subCategoryId === subCategoryId && s.serviceId === serviceId
      )
      if (!exists) {
        updated[categoryId].push({ subCategoryId, serviceId })
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    addSound.play()
  }

  // ➖ Eliminar servicio
  const removeService = (categoryId, subCategoryId, serviceId) => {
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
    removeSound.play()
  }

  const clearServices = (sound = 'clear') => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setServices({})
    if (sound === 'clear') clearShoppingBagSound.play()
    if (sound === 'bell') bellSound.play()
  }

  const totalServices = useMemo(
    () => Object.values(services).reduce((acc, arr) => acc + arr.length, 0),
    [services]
  )

  const getServicePrice = (subCategoryId, serviceId) => {
    const category = ServicesData[subCategoryId]
    if (!category) return 0

    const price = category.prices[serviceId]
    if (!price) return 0

    return typeof price === 'number' ? price : price.from || 0
  }

  const totalPrice = useMemo(() => {
    return Object.entries(services).reduce((acc, [categoryId, items]) => {
      const sum = items.reduce(
        (s, { subCategoryId, serviceId }) =>
          s + getServicePrice(subCategoryId, serviceId),
        0
      )
      return acc + sum
    }, 0)
  }, [services])

  // 🔎 Servicios con nombre, descripción y precio
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
          subCategoryId,
        }
      })
    })
    return result
  }, [services, t])

  return (
    <SelectedServicesContext.Provider
      value={{
        services, // { categoryId: [{ subCategoryId, serviceId }] }
        servicesWithInfo, // nombres, descripciones y precios
        totalServices,
        totalPrice,
        addService,
        removeService,
        clearServices,
        getServicePrice,
        isLoaded,
      }}
    >
      {children}
    </SelectedServicesContext.Provider>
  )
}

export const useSelectedServices = () => useContext(SelectedServicesContext)
