import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Button } from '../../components/ui/Button'

const About = () => {
  usePageTitle('No Encontrado')
  return (
    <section className='bg-dark not-found-page d-flex flex-direction-column justify-content-center align-items-center text-center p-4 border-bottom text-white'>
      <h1 className='fs-display-1 fw-bold'>404</h1>
      <p className='fs-lead'>
        Parece que la página que buscas no está disponible
      </p>
      <Button
        as='link'
        to='/'
        icon='house'
        variant='dark'
        size='lg'
        label='Volver al inicio'
        className='mt-3'
      />
    </section>
  )
}
export default About
