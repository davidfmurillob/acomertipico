import React from 'react'
import CocinaConNosotros from '../components/cocinaConNosotros/CocinaConNosotros'
import Footer from '../components/footer/Footer'
import HeroSection from '../components/hero/HeroSection'
import Productos from '../components/productos/Productos'
import Restaurantes from '../components/restaurantes/Restaurantes'
import NosotrosView from './NosotrosView'


const Landing = () => {
  return (
    <div className='bg-gray-800'>
        <HeroSection />
        <Productos />
        <Restaurantes />
        <CocinaConNosotros />
        <NosotrosView />
        <Footer />
    </div>
  )
}

export default Landing