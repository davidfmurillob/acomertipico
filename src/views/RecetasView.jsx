import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import empanadasReceta from "../assets/empanadas3.png";
import Loader from "../components/utils/Loader";

const RecetasView = () => {
  const [receta, setReceta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios.get("api/recipes").then((response) => {
      console.log(response.data.data);
      setReceta(response.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-auto fixed w-screen h-screen -z-50 bg-zinc-800">
          <h2 className="text-2xl sm:text-3xl text-center text-white italic pt-10 px-6">
            Algunas{" "}
            <span className="text-2xl sm:text-3xl text-orange-400">
              recetas
            </span>{" "}
            de los diversos platos típicos que puedes encontrar en AcomerTípico
          </h2>
          <div className="mb-10 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 ">
            {receta.map(elemento => (
              <div
                key={elemento.id}
                className="grid gap-12 row-gap-8 lg:grid-cols-2 rounded-lg border border-slate-50 p-6 shadow-xl sm:mb-10 bg-zinc-900"
              >
                <div className="flex flex-col">
                  <div className="max-w-xl">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl sm:leading-none">
                      {elemento.name}
                      <br className="hidden md:block" />
                    </h2>
                  </div>
                  <div>
                    <img
                      className="object-cover w-full h-56 rounded shadow-lg sm:h-64 md:h-96"
                      src={elemento.image}
                      alt={elemento.name}
                    />
                  </div>
                </div>
                <div className="py-2 sm:py-10">                 
                  <div className="grid gap-3">
                    <h3 className="text-xl font-semibold leading-5 text-orange-400">
                      Preparación:
                    </h3>
                    <p className="text-base text-slate-50 md:text-lg">
                      {elemento.description}
                    </p>
                  </div>
                  <div className="grid gap-3 mt-5">
                    <h3 className="text-xl font-semibold leading-5 text-orange-400">
                      Link:
                    </h3>
                    <p className="text-base text-slate-50 md:text-lg">
                      {elemento.link}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecetasView;
