import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loader from "../components/utils/Loader";

const ProductosView = () => {
  const [productos, setProductos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get("api/products").then((response) => {
      console.log(response.data.product);
      setProductos(response.data.product);
      setIsLoading(false);
    });
  }, []);

  const setData = (data) => {
    const { establishment_id, establishment_name } = data;
    getNumeroRestaurante(establishment_id)
    localStorage.setItem("id_restaurante", establishment_id);
    localStorage.setItem("nombre_restaurante", establishment_name);
    navigate("/productos-restaurante");
  };

  const getNumeroRestaurante = (id) => {
    // fetch(`http://localhost:8000/api/establishments/${id}`)
    fetch(`https://acomertipico-production-c2ff.up.railway.app/api/establishments/${id}`)
    .then(response => response.json())
    .then(data => localStorage.setItem("telefono_establecimiento", data.establishment.telefono_establecimiento))
  }

  return (

    <>
    {isLoading ? (
      <Loader />
    ) : (
    <div className="overflow-auto fixed bg-zinc-800 py-10 w-full h-full px-12">
      <h2 className="text-2xl sm:text-3xl text-center text-white italic px-6">
        Todos los{" "}
        <span className="text-2xl sm:text-3xl text-orange-400">productos</span>{" "}
        que puedes encontrar en Acomertípico
      </h2>
      <div className="mb-10 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map((product) => (
          <div
            className="my-8 rounded shadow-lg  shadow-zinc-900 bg-zinc-900 duration-300 pb-4"
            key={product.id}
          >
            <figure>
              <img
                src={product.imagen_producto}
                className="rounded-t h-72 w-full object-cover"
                alt={product.nombre_producto}
              />

              <figcaption className="p-4">
                <p className="text-lg mb-4 font-bold leading-relaxed text-slate-50">
                  {product.nombre_producto}
                </p>

                <small className="leading-5 text-slate-200">
                  {product.descripcion_producto}
                </small>
                <h3 className="mb-2 font-bold text-slate-200 mt-4">
                  Restaurante:{" "}
                </h3>
                <span className="font-light text-slate-200">
                  {product.establishment_name}
                </span>
              </figcaption>
            </figure>
            <div className="flex justify-center">
              <button
                // to="/productos-restaurante"
                className="mx-auto inline-flex items-center justify-center h-12 px-6 font-medium  text-black transition duration-300 rounded border-black border shadow-md  bg-slate-200 hover:scale-95"
                onClick={() => setData(product)}
              >
                Ir a restaurante
                <BsArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    )}
    </>
  );
};

export default ProductosView;
