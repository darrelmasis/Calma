import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { useEffect } from 'react'

const Empty = () => {
  usePageTitle('No Encontrado')
  const navigate = useNavigate()
  const { totalServices, isLoaded } = useSelectedServices()

   useEffect(() => {
    if (isLoaded && totalServices !== 0) {
      navigate("/booking");
    }
  }, [isLoaded, totalServices, navigate]);

  const onExploreClick = (e) => {
    e.preventDefault()
    navigate('/services')
  }

  const onContactClick = (e) => {
    e.preventDefault()
    navigate('/contact')
  }
  return (
    <div>
      <Header />
      {
        isLoaded && totalServices === 0 && (
          <div className="d-flex flex-direction-column justify-content-center align-items-center text-center p-5">
        <span className="fs-display-2 mb-3">😅</span>
        <h3 className="fs-h3 mb-2">¡Aún no has seleccionado ningún servicio!</h3>
        <p className="text-muted mb-4">
          Para agendar una cita, primero debes elegir los servicios que deseas.
        </p>
        {/* CTA principal */}
        <Button variant="primary" className="my-3" size='large' icon="compass" label={"Explorar servicios"} onClick={onExploreClick}/>

        {/* Enlace secundario */}
        <p className="fs-small text-muted">
          <a href="/contact" style={{ color: 'var(--text-info)' }} onClick={onContactClick} className="text-info">solo quiero ponerme en contacto</a>
        </p>
      </div>
        )
      }
    </div>
  )
}
export default Empty
