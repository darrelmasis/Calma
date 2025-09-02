import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { Icon } from '../../components/commons/Icons'
import { Hero } from '../../components/commons/Hero'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import Footer from '../../components/layout/Footer'



const Home = () => {
  usePageTitle('Politica de Privacidad')

  return (
    <>
      <Header />

      <section className="privacy-policy">
        <div className="container">
          <h1 className='text-center'>Política de Privacidad</h1>
          <p><strong>Última actualización:</strong> 24 de mayo de 2025</p>

          <p>En <strong>Calma</strong>, nos tomamos muy en serio la privacidad de los visitantes de nuestro sitio web. Esta política explica qué datos recopilamos, cómo los utilizamos y cómo los protegemos.</p>

          <h2>1. ¿Qué información recopilamos?</h2>
          <p>El único dato personal que recopilamos en este sitio es la información que tú nos proporcionas voluntariamente a través de nuestro <strong>formulario de contacto</strong>. Esto puede incluir:</p>
          <ul>
            <li>Nombre</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Información adicional incluida en tu mensaje</li>
          </ul>

          <h2>2. ¿Para qué utilizamos tus datos?</h2>
          <p>Usamos la información que nos envías exclusivamente para:</p>
          <ul>
            <li>Responder a tus consultas</li>
            <li>Coordinar citas o brindar información sobre nuestros servicios</li>
            <li>Mejorar la atención al cliente</li>
          </ul>

          <h2>3. ¿Compartimos tu información?</h2>
          <p>No. En <strong>Calma</strong> no compartimos, vendemos ni alquilamos tu información personal con terceros.</p>

          <h2>4. Seguridad de los datos</h2>
          <p>Implementamos medidas razonables para proteger tu información. Sin embargo, debes saber que ningún método de transmisión por Internet es 100% seguro.</p>

          <h2>5. Enlaces a sitios externos</h2>
          <p>Nuestro sitio puede contener enlaces a otros sitios (como Google Maps). No somos responsables por las prácticas de privacidad de esos sitios.</p>

          <h2>6. Cambios a esta política</h2>
          <p>Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será publicado en esta misma página con la fecha de actualización.</p>

          <h2>7. Contacto</h2>
          <p>Si tienes alguna pregunta sobre esta Política de Privacidad, puedes escribirnos a través del formulario de contacto en este sitio.</p>
        </div>
      </section>


      <Footer />
    </>
  )
}
export default Home
