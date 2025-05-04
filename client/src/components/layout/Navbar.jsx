import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../common/Button'
import { NavbarNav } from './NavbarNav'

const navLinks = [
  { path: '/', label: 'Inicio', position: 'left' },
  { path: '/services', label: 'Servicios', position: 'left' },
  { path: '/packages', label: 'Paquetes', position: 'right' },
  { path: '/history', label: 'Historia', position: 'right' },
]

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const leftLinks = navLinks.filter(link => link.position === 'left')
  const rightLinks = navLinks.filter(link => link.position === 'right')

  const CTA = <Button variant="primary" classes="me-lg-3" size="large" icon="calendar-check" label="Reservar una cita" />

  return (
    <nav className="navbar d-flex container align-items-center justify-content-center position-relative">
      {/* Contenido de navegación centrado */}

      <NavbarNav links={leftLinks} className="d-none d-lg-flex flex-direction-lg-row justify-content-flex-end" />

      {/* Logo centrado */}
      <NavLink className="px-4 d-flex justify-content-center align-items-center" to="/">
        <img src="/src/assets/logo_calma.png" alt="Logo" className="navbar-logo" />
      </NavLink>

      <NavbarNav links={rightLinks} className="d-none d-lg-flex flex-direction-lg-row justify-content-flex-start" />

      {/* Menu móvil */}
      <div className={`d-lg-none d-flex flex-direction-column flex-wrap-wrap gap-3 align-items-center navbar-mobile-menu position-fixed py-3 w-100 ${isMenuOpen ? 'open' : ''}`}>
        <NavbarNav links={navLinks} />
        {CTA}
      </div>

      {/* Botón de reserva y Menu a la derecha */}
      <div className="position-absolute right-0">
        <div className='d-none d-lg-inline-flex'>{CTA}</div>
        <Button variant="primary" classes="d-lg-none me-3" icon="bars" size="large" onClick={() => setIsMenuOpen(!isMenuOpen)}></Button>
      </div>
    </nav>
  )
}
