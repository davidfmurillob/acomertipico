import React from 'react'

const Footer = () => {
  return (
  
<div className=" bg-zinc-700 ">
    <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
            <h3 className="font-extralight text-3xl mb-3 mx-4"> Descarga nuestra aplicación móvil </h3>
            <p> AcomerTipico. </p>
            <div className="flex justify-center my-8">
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" alt="img1"/>
                    <div className="text-left ml-3">
                        <p className='text-xs text-gray-200'>Descarga en </p>
                        <p className="text-sm md:text-base"> Google Play Store </p>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0"> Equipo AcomerTípico - Sena </p>
            <div className="order-1 md:order-2">
                <span className="px-2">Sobre nosotros</span>
                <span className="px-2 border-l">Contacto</span>
                <span className="px-2 border-l">Política de privacidad</span>
            </div>
        </div>
    </div>
</div>
    
  )
}

export default Footer