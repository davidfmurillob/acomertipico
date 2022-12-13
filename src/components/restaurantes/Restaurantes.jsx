import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import CardRestaurante from "./CardRestaurante";

const Restaurantes = () => {

  const [restaurante, setRestaurante] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);

    axios.get("api/establishments").then((response) => {
      console.log(response.data.establishment);
      setRestaurante(response.data.establishment.slice(0,3));
      setIsLoading(false);
    });
  }, []);


  const handleClickRoute = () => {
    navigate('restaurantes')
  }



  return (
    <>
    {isLoading ? (
      <Loader />
    ) : (
    <div className="bg-zinc-800 h-full py-10">
      <div className="container mx-auto px-8 h-20 flex gap-6 justify-center items-center mt-4">
        <h2 className="text-2xl sm:text-3xl text-center text-white italic pb-10">
          Aquí encontrarás diversos <span className="text-2xl sm:text-3xl text-orange-400">
              restaurantes
            </span> como:
        </h2>
      </div>
      <div className="container mx-auto h-full p-8 sm:p-2 sm:h-[full] flex-col items-center sm:flex sm:flex-row sm:flex-wrap gap-6 sm:justify-between sm:items-center ">

        {
          restaurante.map(element => (

            <CardRestaurante nombre={element.nombre_establecimiento} descripcion={element.descripcion} imagen={element.imagen} key={element.id}/>

          ))
        }
        
        
      </div>
      <div className="flex flex-col justify-center py-4">
      <h3 className=" text-2xl sm:text-3xl text-center text-white italic pb-10">Ir a la sección de 
          <button 
          className="text-2xl ml-3 sm:text-3xl italic text-orange-400 underline underline-offset-8 hover:scale-105"
          onClick={handleClickRoute}
          >
                restaurantes
          </button>
        </h3> 
        <Link
          to="restaurantes"
          className="mx-auto inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 rounded border-slate-200 border shadow-md  hover:bg-slate-200 hover:text-black"
        >
          Ver restaurantes
        </Link>
      </div>
    </div>
    )}
    </>
  );
};

export default Restaurantes;
