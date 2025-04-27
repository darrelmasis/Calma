import React from 'react'
import {usePageTitle} from "@utils/utils";
import Header from '../../components/layout/Header';

const About = () => {
  usePageTitle('No Encontrado')
  return (
    <div>
       <Header/>
      <h1>404 - Página No Encontrada</h1>
      <p>Parece que la página que buscas no está disponible</p>
    </div>

  );
};
export default About
