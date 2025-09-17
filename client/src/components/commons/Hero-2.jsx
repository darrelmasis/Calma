import React from 'react'
import { Button } from '../ui/Button'
import { FadeInWhenVisible as Fade } from './animations/FadeInWhenVisible'
import classNames from 'classnames'

const Hero2 = ({
  background,
  overlayType = 'dark',
  title,
  subtitle,
  cta = null, // puede ser objeto o array
  alignContent = 'center'
}) => {
  // Normalización del CTA
  const normalizeCta = (ctaProp) => {
    const defaultCta = {
      variant: "primary",
      ariaLabel: "Call to Action",
      label: "Get Started",
      size: "large",
      icon: { name: "spa", size: "lg", variant: "duotones", duotone: "regular" },
      onClick: null
    }

    if (!ctaProp) return []
    if (Array.isArray(ctaProp)) return ctaProp.map(btn => ({ ...defaultCta, ...btn }))
    return [{ ...defaultCta, ...ctaProp }]
  }

  const ctas = normalizeCta(cta)

  // Clases del overlay
  const overlayClasses = classNames(
    'hero-overlay position-absolute top-0 start-0 w-100 h-100',
    {
      'hero-overlay-dark': overlayType === 'dark',
      'hero-overlay-light': overlayType === 'light',
      'hero-overlay-end-transparent': overlayType === 'end-transparent',
      'hero-overlay-bottom-transparent': overlayType === 'bottom-transparent'
    }
  )

  // Clases del contenedor
  const containerClasses = classNames(
    'container position-relative d-flex',
    {
      'align-items-center justify-content-center text-center': alignContent === 'center',
      'align-items-center justify-content-start text-start': alignContent === 'start'
    }
  )

  // Clases del contenido
  const contentClasses = classNames(
    'd-flex flex-direction-column',
    {
      'align-items-center text-center': alignContent === 'center',
      'align-items-flex-start text-start': alignContent === 'start'
    }
  )

  return (
    <section className="hero bg-container position-relative d-flex overflow-hidden">
      {/* Imagen de fondo */}
      {background && (
        <div className="hero-bg position-absolute bottom-0 end-0 w-100 h-100 pointer-events-none user-select-none">
          <img
            src={background}
            alt=""
            className="hero-image object-fit-cover position-absolute top-0 start-0 w-100 h-100"
          />
        </div>
      )}

      {/* Overlay */}
      {overlayType !== 'none' && <div className={overlayClasses} />}

      {/* Contenido */}
      <div className={containerClasses}>
        <div className="hero-content">
          <div className={contentClasses}>
            {title && (
              <Fade>
                <h1 className="hero-title mt-0">{title}</h1>
              </Fade>
            )}

            {subtitle && (
              <Fade delay={0.2}>
                <p className="hero-subtitle fs-h5 max-wx-700 w-100">{subtitle}</p>
              </Fade>
            )}

            {ctas.length > 0 && (
              <Fade delay={0.4} className="d-flex flex-wrap gap-2 mt-3">
                {ctas.map((btn, idx) => (
                  <Button
                    key={idx}
                    onClick={btn.onClick}
                    variant={btn.variant}
                    ariaLabel={btn.ariaLabel}
                    label={btn.label}
                    size={btn.size}
                    icon={btn.icon}
                  />
                ))}
              </Fade>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero2 }
