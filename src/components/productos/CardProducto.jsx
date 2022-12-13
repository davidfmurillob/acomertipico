import React from "react";
import { Link } from "react-router-dom";
import empanada from "../../assets/empanadas1.jpg";
import {BsArrowRight} from 'react-icons/bs'


// Hay que cambiar los <a></a> por los LINK de las rutas


const CardProducto = ({nombre, descripcion, urlImagen}) => {


  return (
    <div className="w-80 h-[450px] max-h-full mx-auto bg-zinc-800 border-gray-700 mb-9 rounded-lg flex flex-col justify-between ">
      
        <img className="rounded-t-lg w-80 h-52 object-center" src={urlImagen} alt="" />
      <div className="p-5 flex flex-col text-slate-200 h-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-200 self-start">
              {nombre} 
            </h5>
          <p className="mb-3 font-light text-slate-200">
            {descripcion}
          </p>

        </div>
        <div className="mx-auto w-full ml-5 mb-6" >
          {/* <Link
            to="productos-cart"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-300 rounded border-black border shadow-md  hover:bg-slate-200 hover:scale-95"
          >
            Ver más productos
            <BsArrowRight size={18} className="ml-2"/>
          </Link> */}

        </div>
    </div>
  );
};

export default CardProducto;


