import classNames from 'classnames'
import * as RegularIcons from '../../assets/icons/processed/regular/index'
import * as SolidIcons from '../../assets/icons/processed/solid/index'
import * as BrandsIcons from '../../assets/icons/processed/brands/index'

export const Icons = {
  regular: RegularIcons,
  solid: SolidIcons,
  brands: BrandsIcons,
}


export const Icon = ({ name, variant = 'regular', className, size = 'md' }) => {
  const nameCleanaed = name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  const IconComponent = Icons[variant]?.[nameCleanaed] || Icons['regular']?.CircleQuestion

  if (!IconComponent) return null

  const componentClasses = classNames(
    'icon-wrapper',
    className,
    `icon-wrapper--${size}`
  )

  return (
    <span className={componentClasses}>
      <IconComponent className="icon" />
    </span>
  )
}

// puedes llamar al componente Icon de la siguiente manera
// <Icon name="nombre-del-icono" classes="clase-1 clase-2" [fixedWidth]/>
// la props fixedWidth es opcional
