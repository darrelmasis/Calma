import React, { useRef } from 'react'
import { Icon } from '../commons/Icons'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useSelectedServices } from '../../hooks/useSelectedService'
import classNames from 'classnames'

const AddService = ({ categoryId, subCategoryId, serviceId, className }) => {
  const { services, addService, removeService } = useSelectedServices()

  // Comprobamos si el servicio ya fue agregado
  const isAdded =
    services[categoryId]?.some(
      (s) => s.subCategoryId === subCategoryId && s.serviceId === serviceId
    ) || false

  const mainButtonIconName = isAdded
    ? { name: 'circle-minus', color: 'text-danger' }
    : { name: 'circle-plus', color: 'text-muted' }

  const addServiceButtonClasses = classNames('add-service-button', className, {
    added: isAdded,
  })

  const iconRef = useRef(null)

  const toggleService = () => {
    if (isAdded) {
      removeService(categoryId, subCategoryId, serviceId)
    } else {
      addService(categoryId, subCategoryId, serviceId)
    }
  }

  return (
    <span className={addServiceButtonClasses} onClick={toggleService}>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={mainButtonIconName.name}
          timeout={150}
          nodeRef={iconRef}
          classNames='add-service-fade'
        >
          <Icon
            ref={iconRef}
            dataName={mainButtonIconName.name}
            name={mainButtonIconName.name}
            className={`add-service-icon ${mainButtonIconName.color}`}
          />
        </CSSTransition>
      </SwitchTransition>
    </span>
  )
}

export default AddService
