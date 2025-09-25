import classNames from 'classnames'
import * as RegularIcons from '../../assets/icons/processed/regular/index'
import * as SolidIcons from '../../assets/icons/processed/solid/index'
import * as BrandsIcons from '../../assets/icons/processed/brands/index'
import * as DuotonesRegularIcons from '../../assets/icons/processed/duotone/regular/index'
import * as DuotonesSolidIcons from '../../assets/icons/processed/duotone/solid/index'

export const Icons = {
  regular: RegularIcons,
  solid: SolidIcons,
  brands: BrandsIcons,
  duotones: {
    regular: DuotonesRegularIcons,
    solid: DuotonesSolidIcons
  }
}

export const Icon = ({
  name,
  variant = 'regular',
  duotone = 'regular',
  className,
  size = 'md',
  ref = null,
  dataName,
  animation = null
}) => {
  const nameCleanaed = name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')

  let IconComponent

  if (variant === 'duotones') {
    // Si es duotone, usar el sub-variant (solid o regular)
    IconComponent = Icons.duotones?.[duotone]?.[nameCleanaed]
  } else {
    IconComponent = Icons[variant]?.[nameCleanaed]
  }

  // fallback al icono CircleQuestion de regular si no existe
  if (!IconComponent) IconComponent = Icons['regular']?.CircleQuestion

  if (!IconComponent) return null

  const componentClasses = classNames(
    'icon-wrapper',
    className,
    `icon-wrapper-${size}`,
    {
      'icon-spin': animation === 'spin'
    }
  )

  return (
    <span ref={ref} className={componentClasses} data-name={dataName || name}>
      <IconComponent className='icon' />
    </span>
  )
}
