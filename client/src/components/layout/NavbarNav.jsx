// src/components/layout/NavbarNav.jsx
import { NavLink } from 'react-router-dom'

export const NavbarNav = ({ links = [], className = '' }) => (
  <ul className={`navbar-links p-0 m-0 d-flex flex-direction-column gap-3 ${className}`}>
    {links.map(link => (
      <li key={link.path}>
        <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>
)
