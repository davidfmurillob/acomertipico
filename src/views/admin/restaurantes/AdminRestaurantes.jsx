import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AdminRestaurantes = () => {
  const [restaurante, setRestaurante] = useState([]);

  useEffect(() => {
    getAllEstablishments()
  }, []);

  const getAllEstablishments = () => {
    axios.get('api/establishments').then(response => {
      console.log(response.data.establishment)
      setRestaurante(response.data.establishment)     
    })
  }

  const handleClickDelete = (id) => {
    axios.delete(`api/delete-establishment/${id}`)
      .then(()=> {
        swal('success', 'Restaurante eliminado', 'success')
        getAllEstablishments()
      })
      
  }

  const setData = (data) => {
    console.log(data)
    let {id, imagen, nombre_establecimiento, direccion_establecimiento, telefono_establecimiento,ubicacion, descripcion} = data;
    localStorage.setItem('id',id)
    localStorage.setItem('nombre_establecimiento',nombre_establecimiento)
    localStorage.setItem('direccion_establecimiento',direccion_establecimiento)
    localStorage.setItem('telefono_establecimiento',telefono_establecimiento)
    localStorage.setItem('ubicacion',ubicacion)
    localStorage.setItem('descripcion',descripcion)
    localStorage.setItem('imagen',imagen)
  }




  return (
    <div className="overflow-auto">
      <div className="mx-auto w-4/6 sm:w-2/5 text-center text-slate-50 rounded rounded-b-none text-3xl mt-5 py-2 bg-gray-600">
        Listado de restaurantes
      </div>
      <div className="md:grid md:grid-cols-6 md:gap-6">
        <div className="lg:col-span-1"></div>
        <table className="min-w-full border-collapse block md:table col-span-5">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Id
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Dirección
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Telefono
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {/* /////////////////////////// primer tabla ///////////////////// */}
            {restaurante.map((elemento) => (
              <tr key={elemento.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                  Id
                  </span>
                  {/* <img src={elemento.imagen} alt="imagen" /> */}
                  {elemento.id}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Nombre
                  </span>
                  {elemento.nombre_establecimiento}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Dirección
                  </span>
                  {elemento.direccion_establecimiento}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Telefono
                  </span>
                  {elemento.telefono_establecimiento}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Acciones
                  </span>
                  <Link to={`editar`} onClick={() => setData(elemento)} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 mx-0.5 border border-indigo-500 rounded" >
                    Editar
                  </Link>
                  <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 mx-0.5 border border-rose-500 rounded" onClick={() => handleClickDelete(elemento.id)}>
                    Borrar
                  </button>
                  {/* <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-1 px-2 mx-0.5 border border-amber-500 rounded">
                    Ver info
                  </button> */}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRestaurantes;
