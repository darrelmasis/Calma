import { Fragment } from 'react'
import classNames from 'classnames'
class IconClass {
  constructor(viewBox, svg) {
    this.viewBox = viewBox
    this.svg = <Fragment>{svg}</Fragment>
  }
}

const svgsIcons = {
  'calendar-check': new IconClass(
    '0 0 21 24',
    (
      <path d="M6 0c0.624 0 1.125 0.501 1.125 1.125v1.875h6.75V1.125C13.875 0.501 14.376 0 15 0s1.125 0.501 1.125 1.125v1.875h1.875a3.001 3.001 0 0 1 3 3v15a3.001 3.001 0 0 1 -3 3H3A3.001 3.001 0 0 1 0 21.001V6a3.001 3.001 0 0 1 3 -3h1.875V1.125C4.875 0.501 5.377 0 6.001 0m12.75 9H2.25V21a0.752 0.752 0 0 0 0.75 0.75h15a0.752 0.752 0 0 0 0.75 -0.75zm-3.329 4.922 -5.25 5.25a1.12 1.12 0 0 1 -1.589 0L5.582 16.172a1.124 1.124 0 0 1 1.589 -1.589l2.203 2.203 4.453 -4.453a1.124 1.124 0 0 1 1.589 1.589z" />
    ),
  ),
  bars: new IconClass(
    '0 0 21 24',
    (
      <path d="M0 4.125c0 -0.623 0.502 -1.125 1.125 -1.125h18.75c0.623 0 1.125 0.502 1.125 1.125s-0.502 1.125 -1.125 1.125H1.125c-0.623 0 -1.125 -0.502 -1.125 -1.125m0 7.5c0 -0.623 0.502 -1.125 1.125 -1.125h18.75c0.623 0 1.125 0.502 1.125 1.125s-0.502 1.125 -1.125 1.125H1.125c-0.623 0 -1.125 -0.502 -1.125 -1.125m21 7.5c0 0.623 -0.502 1.125 -1.125 1.125H1.125c-0.623 0 -1.125 -0.502 -1.125 -1.125s0.502 -1.125 1.125 -1.125h18.75c0.623 0 1.125 0.502 1.125 1.125" />
    ),
  ),

  // Muy importante agregar un valor por default que regrese null
  // para evitar problemas por si llegamos a escribir mal el nombre de un ícono
  default: {
    viewBox: '0 0 24 24',
    svg: (
      <path d="M21.75 12a9.75 9.75 0 1 0 -19.5 0 9.75 9.75 0 1 0 19.5 0M0 12a12 12 0 1 1 24 0 12 12 0 1 1 -24 0m7.959 -4.252c0.37 -1.045 1.364 -1.748 2.475 -1.748h2.733c1.636 0 2.958 1.327 2.958 2.958 0 1.059 -0.567 2.039 -1.486 2.569L13.125 12.394c-0.009 0.609 -0.511 1.106 -1.125 1.106 -0.623 0 -1.125 -0.502 -1.125 -1.125v-0.633c0 -0.403 0.216 -0.773 0.567 -0.975l2.077 -1.191c0.22 -0.127 0.356 -0.361 0.356 -0.614 0 -0.394 -0.319 -0.708 -0.708 -0.708h-2.733c-0.159 0 -0.3 0.098 -0.352 0.248l-0.019 0.056c-0.206 0.586 -0.853 0.891 -1.434 0.684s-0.891 -0.853 -0.684 -1.434l0.019 -0.056zM10.5 16.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 1 1 -3 0" />
    ),
  },
}

export const Icon = ({ icon, classes }) => {
  const svgRender = svgsIcons[icon] || svgsIcons.default
  const componentClasses = classNames('icon', classes && classes)
  return (
    <span>
      <svg className={componentClasses} viewBox={svgRender.viewBox} xmlns="http://www.w3.org/2000/svg">
        {svgRender.svg}
      </svg>
    </span>
  )
}

// puedes llamar al componente Icon de la siguiente manera
// <Icon icon="nombre-del-icono" classes="clase-1 clase-2" [fixedWidth]/>
// la props fixedWidth es opcional
