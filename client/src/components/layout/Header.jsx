import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="header border-bottom d-flex flex-direction-row justify-content-center align-items-center">
      <nav className={`container navbar d-flex flex-direction-row justify-content-center align-items-center ${isOpen ? 'active' : ''}`}>
        <ul className="m-0 navbar-nav-list d-flex flex-direction-row justify-content-center align-items-center w-100 text-center">
          {/* Menú izquierdo */}
          <li className="navbar-nav-item px-3">
            <NavLink to="/services">Servicios</NavLink>
          </li>
          <li className="navbar-nav-item px-3">
            <NavLink to="/packages">Paquetes</NavLink>
          </li>

          {/* Logo centrado */}
          <li className="navbar-nav-item px-3 d-flex justify-content-center">
            <NavLink to="/">
              <img src="src/assets/logo_calma.png" alt="Logo de Calma" className="logo" />
            </NavLink>
          </li>

          {/* Menú derecho */}
          <li className="navbar-nav-item px-3">
            <NavLink to="/contact">Contacto</NavLink>
          </li>
          <li className="navbar-nav-item px-3">
            <NavLink to="/history">Historia</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
