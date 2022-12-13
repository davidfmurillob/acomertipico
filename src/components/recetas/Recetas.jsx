import React from 'react'
import { Link } from 'react-router-dom'
import Cardrecetas from './Cardrecetas'

const Recetas = () => {
  return (
    <div className="bg-zinc-800 h-full py-10">
    <div className="container mx-auto px-8 h-20 flex gap-6 justify-center items-center mt-4">
      <h2 className="text-2xl sm:text-3xl text-center text-white italic pb-10">
        Aquí encontrarás diversos restaurantes como:
      </h2>
    </div>
    <div className="container mx-auto h-full p-8 sm:p-2 sm:h-[full] flex-col items-center sm:flex sm:flex-row sm:flex-wrap gap-6 sm:justify-between sm:items-center ">
     <Cardrecetas />
     <Cardrecetas />
     <Cardrecetas />
    </div>
    <div className="flex justify-center py-4">
      <Link
        to="/"
        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 rounded border-slate-200 border shadow-md  hover:bg-slate-200 hover:text-black"
      >
        Ver restaurantes
      </Link>
    </div>
  </div>
  )
}

export default Recetas