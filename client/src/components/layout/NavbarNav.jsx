import { NavLink } from 'react-router-dom'
import { Icon } from '../commons/Icons'

export const NavbarNav = ({ links = [], className = '', onLinkClick }) => (
  <ul className={`navbar-links p-0 m-0 d-flex flex-direction-column gap-2 ${className}`}>
    {links.map(link => (
      <li key={link.path}>
        <NavLink to={link.path} onClick={(e) => {
          if (onLinkClick) {
            e.preventDefault()
            onLinkClick(link.path)
          }
        }}>
          {({ isActive }) => (
            <>
              {link.icon && (
                <Icon
                  name={link.icon}
                  className="me-2"
                  variant={isActive ? 'solid' : 'regular'} // ✅ variante según active
                />
              )}
              {link.label}
            </>
          )}
        </NavLink>
      </li>
    ))}
  </ul>
)
