import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useEffect } from 'react'
import { useSelectedServices } from '../../hooks/useSelectedService'


const Success = () => {
  usePageTitle('Reserva Exitosa')
  const navigate = useNavigate()
  const location = useLocation()
  const { clearServices, isLoaded } = useSelectedServices()

  // Validar acceso
  useEffect(() => {
    if (!location.state?.success) {
      navigate('/') // redirigir si no viene del flujo correcto
    }
  }, [location, navigate])

  useEffect(() => {
    if (isLoaded) {
      clearServices("bell"); // Limpiar servicios seleccionados al cargar la página de éxito
    }
  },[]);

  // Manejar botón regresar

  const goHome = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div>
      <Header />
      {
        location.state?.success && (
      <div className="d-flex flex-direction-column justify-content-center align-items-center text-center p-5">
        <span className="fs-display-2 mb-3">🎉</span>
        <h3 className="fs-h3 mb-2">¡Tu reserva se ha realizado con éxito!</h3>
        <p className="text-muted mb-4">
          Te contactaremos pronto para confirmar los detalles.
        </p>

        {/* CTA principal */}
        <Button
          variant="success"
          className="my-3"
          size="large"
          icon="left-to-bracket"
          label="Regresar"
          onClick={goHome}
        />
      </div>
      )
      }
    </div>
  )
}

export default Success
