import React, { useEffect, useState } from "react";
import Loader from "../components/utils/Loader";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const RestaurantesView = () => {
  const [restaurante, setRestaurante] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios.get("api/establishments").then((response) => {
      console.log(response.data.establishment);
      setRestaurante(response.data.establishment);
      setIsLoading(false);
    });
  }, []);




  const setData = (data) => {
    console.log(data)
    const {id,nombre_establecimiento,telefono_establecimiento} = data;
    localStorage.setItem('id_restaurante', id)
    localStorage.setItem('nombre_restaurante', nombre_establecimiento)
    localStorage.setItem('telefono_establecimiento', telefono_establecimiento)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-auto fixed w-full h-full bg-zinc-800">
          <h2 className="text-2xl sm:text-3xl text-center text-white italic pt-10 px-6">
            Todos los{" "}
            <span className="text-2xl sm:text-3xl text-orange-400">
              restaurantes
            </span>{" "}
            que puedes encontrar en AcomerTípico
          </h2>
          <div className="px-4 py-16 mb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 ">
            {restaurante.map((elemento) => (
              <div
                className="grid gap-12 row-gap-8 lg:grid-cols-2 rounded-lg border border-slate-50 p-6 shadow-xl mb-10 bg-zinc-900"
                key={elemento.id}
              >
                <div className="flex flex-col">
                  <div className="max-w-xl mb-6">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl sm:leading-none">
                      {elemento.nombre_establecimiento}
                      <br className="hidden md:block" />
                    </h2>
                    <p className="text-base text-slate-50 md:text-lg">
                      {elemento.direccion_establecimiento}
                    </p>
                  </div>
                  <div className="grid gap-8 row-gap-8">
                    <div className="location-map">
                      <h6 className="mb-2 font-semibold leading-5 text-orange-400">
                        Descripcion:
                      </h6>
                      <div className="italic text-slate-50">
                        {elemento.descripcion}
                      </div>
                    </div>
                    <Link
                        to="/productos-restaurante"
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-300 rounded border-black border shadow-md  bg-slate-200 hover:scale-95"
                        onClick={() => setData(elemento)}
                      >
                        Ver productos de este restaurante
                        <BsArrowRight size={18} className="ml-2"/>
                    </Link>
                  </div>
                </div>
                <div className="">
                  <img
                    className="object-cover w-full h-56 rounded shadow-lg sm:h-64 md:h-96"
                    src={elemento.imagen}
                    alt="fooBar"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantesView;
