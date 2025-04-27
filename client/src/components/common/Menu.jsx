import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className="bg-secondary py-2">
      <ul className="grid">
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/about">Acerca de</NavLink>
        </li>
        <li>
          <NavLink to="/booking">Reservar</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contacto</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">Galería</NavLink>
        </li>
        <li>
          <NavLink to="/history">Historia</NavLink>
        </li>
        <li>
          <NavLink to="/packages">Paquetes</NavLink>
        </li>
        <li>
          <NavLink to="/services">Servicios</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
