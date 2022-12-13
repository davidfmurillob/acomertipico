import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AdminCategoria = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = () => {
    axios.get("api/categories").then((response) => {
      console.log(response.data.category);
      setCategories(response.data.category);
    });
  }

  const handleClickDelete = (id) => {
    axios.delete(`api/delete-category/${id}`)
      .then(()=> {
        swal('success', 'Categoria eliminada', 'success')
        getCategories()
      })
      
  }


  const setData = (data) => {
    console.log(data)
    let {nombre_categoria, id} = data;
    localStorage.setItem('id',id)
    localStorage.setItem('nombre_categoria',nombre_categoria)
  }



  
  return (
    <div className="overflow-auto">
      <div className="mx-auto w-2/5 text-center text-slate-50 rounded rounded-b-none text-3xl mt-5 py-2 bg-gray-600">
        Listado de categorias
      </div>
      <div className="md:grid md:grid-cols-5 md:gap-6">
        <div className="lg:col-span-1"></div>
        <table className="min-w-full border-collapse block md:table col-span-3">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Id
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {/* /////////////////////////// primer tabla ///////////////////// */}

            {categories.map((category) => (
              <tr
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                key={category.id}
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Id
                  </span>
                  {category.id}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Nombre
                  </span>
                  {category.nombre_categoria}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Acciones
                  </span>
                  <Link to={`editar`} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 mx-0.5 border border-indigo-500 rounded" onClick={() => setData(category)}>
                    Editar
                  </Link>
                  <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 mx-0.5 border border-rose-500 rounded" onClick={() => handleClickDelete(category.id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoria;
