// Componente Grupo Accordion
import React, { useState, Children, cloneElement, isValidElement } from 'react'

export const AccordionGroup = ({ children, className }) => {
  const [indiceActivo, establecerIndiceActivo] = useState(null)

  const manejarAlternar = (indice) => {
    establecerIndiceActivo(indiceActivo === indice ? null : indice)
  }

  let indice = 0

  const hijosClonados = Children.map(children, (hijo) => {
    // Manejar Accordions envueltos en otros componentes
    if (isValidElement(hijo) && hijo.props.children) {
      const interno = hijo.props.children
      if (
        isValidElement(interno) &&
        interno.type?.displayName === 'Accordion'
      ) {
        const internoClonado = cloneElement(interno, {
          indice,
          indiceActivo,
          alAlternar: manejarAlternar,
        })
        indice++
        return cloneElement(hijo, {}, internoClonado)
      }
    }

    // Manejar Accordions directos
    if (isValidElement(hijo) && hijo.type?.displayName === 'Accordion') {
      const clonado = cloneElement(hijo, {
        indice,
        indiceActivo,
        alAlternar: manejarAlternar,
      })
      indice++
      return clonado
    }

    return hijo
  })

  const accordionGroupClases = `accordion-group ${className || ''}`

  return <div className={accordionGroupClases}>{hijosClonados}</div>
}
