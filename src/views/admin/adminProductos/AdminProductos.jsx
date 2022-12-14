import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import swal from "sweetalert";
import { Link } from "react-router-dom";

const AdminProductos = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
   getAllProducts()
    
  }, []);


  const getAllProducts = () => {
    axios.get('api/products').then((response) => {
      console.log(response.data.product);
      setProducts(response.data.product);
    });
  }

  const handleClickDelete = (id) => {
    axios.delete(`api/delete-product/${id}`)
      .then(()=> {
        swal('success', 'Producto eliminado', 'success')
        getAllProducts()
      })
      
  }


  const setData = (data) => {
    console.log(data)
    let {
        id, 
        nombre_producto, 
        imagen_producto,
        precio_producto,
        descripcion_producto
      } = data

      localStorage.setItem('id_producto', id)
      localStorage.setItem('imagen_producto', imagen_producto)
      localStorage.setItem('nombre_producto', nombre_producto)
      localStorage.setItem('precio_producto', precio_producto)
      localStorage.setItem('descripcion_producto', descripcion_producto)
  }


  
  return (
    <div className="overflow-auto">
      <div className="mx-auto w-4/6 sm:w-2/5 text-center text-slate-50 rounded rounded-b-none text-3xl mt-5 py-2 bg-gray-600">
        Listado de productos
      </div>
      <div className="md:grid md:grid-cols-6 md:gap-6">
        <div className="lg:col-span-1"></div>
        <table className="min-w-full border-collapse block md:table col-span-5">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Imagen
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Producto
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Restaurante
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Precio
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Categoria
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">

            {/* /////////////////////////// primer tabla ///////////////////// */}


            {
              products.map(product => (
                 <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row" key={product.id}>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Imagen
                </span>
                <img src={product.imagen_producto} alt={product.nombre_producto} className="mx-auto w-52 max-w-sm"/>
                
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Producto
                </span>
                {product.nombre_producto}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Restaurante
                </span>
                {product.establishment_name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Precio
                </span>
                {product.precio_producto}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {product.category_name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Acciones
                </span>
                <Link 
                to={'editar'} 
                onClick={() => setData(product)}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 mx-0.5 border border-blue-500 rounded" >
                  Editar
                </Link>
                <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 mx-0.5 border border-red-500 rounded" onClick={() => handleClickDelete(product.id)}>
                  Borrar
                </button>
              </td>
            </tr>

              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductos;
