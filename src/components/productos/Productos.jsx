import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import CardProducto from "./CardProducto";

const Productos = () => {
  const [producto, setProducto] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    axios.get("api/products").then((response) => {
      console.log(response.data.product);
      setProducto(response.data.product.slice(0, 3));
      setIsLoading(false);
    });
  }, []);

  const handleClickRoute = () => {
    navigate("productos");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-zinc-900 h-full py-10" id="productos-home">
          <div className="container mx-auto px-8 h-20 flex gap-6 justify-center items-center mt-4 ">
            <h2 className="text-2xl sm:text-3xl text-center text-white italic pb-10">
              Contamos con deliciosos{" "}
              <span className="text-2xl sm:text-3xl text-orange-400">
                productos
              </span>{" "}
              como:
            </h2>
          </div>
          <div className="container mx-auto max-w-5xl h-full p-8 sm:p-2 sm:h-[full] flex-col items-center sm:flex sm:flex-row sm:flex-wrap gap-6 sm:justify-between sm:items-center ">
            {producto.map((product) => (
              <CardProducto
                nombre={product.nombre_producto}
                descripcion={
                  product.descripcion_producto.slice(0, 150) + " ..."
                }
                urlImagen={product.imagen_producto}
                key={product.id}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center ">
            <h3 className=" text-2xl sm:text-3xl text-center text-white italic pb-10">
              Ir a la sección de
              <button
                className="text-2xl ml-3 sm:text-3xl italic text-orange-400 underline underline-offset-8 hover:scale-105"
                onClick={handleClickRoute}
              >
                productos
              </button>
            </h3>
            <Link
              to="productos"
              className="mx-auto w-64 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 rounded border-slate-200 border shadow-md  hover:bg-slate-200 hover:text-black focus:shadow-outline focus:outline-none"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Productos;
