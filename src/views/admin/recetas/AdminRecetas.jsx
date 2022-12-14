import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AdminRecetas = () => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getAllRecipes()
  }, []);


const getAllRecipes = () => {
  axios.get('api/recipes').then((response) => {
    console.log(response.data.data);
    setRecipe(response.data.data);
  });
}

const handleClickDelete = (id) => {
  axios.delete(`api/delete-recipe/${id}`)
    .then(()=> {
      swal('success', 'Receta eliminada', 'success')
      getAllRecipes()
    })
    
}

const setData = (data) => {
  console.log(data)
  let {id,name,link,image,description} = data
  localStorage.setItem('id_receta', id)
  localStorage.setItem('nombre_receta', name)
  localStorage.setItem('link_receta', link)
  localStorage.setItem('url_imagen_receta', image)
  localStorage.setItem('descripcion_receta', description)
}



  return (
    <div className="overflow-auto">
      <div className="mx-auto w-4/6 sm:w-2/5 text-center text-slate-50 rounded rounded-b-none text-3xl mt-5 py-2 bg-gray-600">
        Listado de recetas
      </div>
      <div className="md:grid md:grid-cols-6 md:gap-6">
        <div className="lg:col-span-1"></div>
        <table className="min-w-full border-collapse block md:table col-span-4">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Id
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Link
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Descripción
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {/* /////////////////////////// primer tabla ///////////////////// */}

            {recipe.map((recipe) => (
              <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row" key={recipe.id}>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Id
                  </span>
                  {recipe.id}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Nombre
                  </span>
                  {recipe.name}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                  Link
                  </span>
                  {recipe.link}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Descripción
                  </span>
                  {recipe.description}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Acciones
                  </span>
                  <Link 
                    to={'editar'} 
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 mx-0.5 border border-indigo-500 rounded" 
                    onClick={() => setData(recipe)}
                    >
                    Editar
                  </Link>
                  <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 mx-0.5 border border-rose-500 rounded" onClick={() => handleClickDelete(recipe.id)}>
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

export default AdminRecetas;
