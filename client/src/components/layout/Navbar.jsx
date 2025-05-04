import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../common/Button'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Inicio', position: 'left' },
    { path: '/services', label: 'Servicios', position: 'left' },
    { path: '/packages', label: 'Paquetes', position: 'right' },
    { path: '/history', label: 'Historia', position: 'right' },
  ]

  const leftLinks = navLinks.filter(link => link.position === 'left')
  const rightLinks = navLinks.filter(link => link.position === 'right')

  return (
    <nav className="navbar d-flex container align-items-center position-relative">
      {/* Contenido de navegación centrado */}

      <ul className={`navbar-left navbar-links p-0 m-0 d-flex justify-content-flex-end gap-3`}>
        {leftLinks.map(link => (
          <li key={link.path}>
            <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logo centrado */}
      <NavLink className="px-4 d-flex justify-content-center align-items-center" to="/">
        <img src="/src/assets/logo_calma.png" alt="Logo" className="navbar-logo" />
      </NavLink>

      <ul className={`navbar-right navbar-links ps-0 m-0 d-flex gap-3 justify-content-flex-start ${isMenuOpen ? 'active' : ''}`}>
        {rightLinks.map(link => (
          <li key={link.path}>
            <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Botón de reserva a la derecha */}
      <div className="position-absolute right-0">
        <Button variant="primary" size="large" icon="calendar-check" label="Reservar una cita" />
        <Button variant="primary" icon="bars" onClick={() => setIsMenuOpen(!isMenuOpen)}></Button>
      </div>
    </nav>
  )
}
