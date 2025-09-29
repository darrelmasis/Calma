import { Icon } from '../commons/Icons'
import { useSelectedServices } from '../../hooks/useSelectedService'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from '../commons/SoundManager'

const AddService = ({ categoryId, subCategoryId, serviceId, className }) => {
  const { services, addService, removeService, canAddMore } =
    useSelectedServices()
  const playBagSound = useSound('dropBag', 0.5)

  // Comprobamos si el servicio ya fue agregado
  const isAdded =
    services[categoryId]?.some(
      (s) => s.subCategoryId === subCategoryId && s.serviceId === serviceId
    ) || false

  const mainButtonIconName = isAdded
    ? { name: 'circle-minus', color: 'text-danger' }
    : { name: 'circle-plus', color: 'text-muted' }

  const addServiceButtonClasses = classNames('add-service-button', className, {
    added: isAdded
  })

  const toggleService = () => {
    if (isAdded) {
      removeService(categoryId, subCategoryId, serviceId)
    } else {
      addService(categoryId, subCategoryId, serviceId)
      canAddMore && playBagSound.play()
    }
  }

  return (
    <span className={addServiceButtonClasses} onClick={toggleService}>
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.1 }}
          key={mainButtonIconName.name}
          className='d-flex align-items-center justify-content-center'
        >
          <Icon
            dataName={mainButtonIconName.name}
            name={mainButtonIconName.name}
            className={`add-service-icon ${mainButtonIconName.color}`}
          />
        </motion.div>
      </AnimatePresence>
    </span>
  )
}

export default AddService
