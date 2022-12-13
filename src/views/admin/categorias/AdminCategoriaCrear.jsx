import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AdminCategoriaCrear = () => {
  const [category, setCategory] = useState({
    name: "",
  });

  const navigate = useNavigate()

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nombre_categoria", category.name);

    axios.post("api/category", formData).then((response) => {
      console.log(response);
      if (response.data.status === 201) {
        swal("Categoria creada", response.data.message, "success");
        setCategory({
          ...category,
          name: "",
        });
        navigate("../categoria")

      } else if (response.data.status === 422) {
        swal("Todos los campos son obligatorios", "", "error");
      }
    });
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   setCategory({ name: "" });
  // };

  return (
    <>
      <div className="overflow-auto">
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="md:col-span-1"></div>
          <div className="mt-20 md:mt-10 mx-10 md:col-span-5 bg-slate-300 p-4 rounded-lg">
            <div className="px-4 sm:px-0 py-4">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Crear Categoria
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Digita los campos correspondientes para crear una categoria.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="rounded-lg">
              <div className="overflow-hidden shadow sm:rounded-m ">
                <div className="bg-slate-300 px-4 py-5 sm:p-6 rounded-tl-lg rounded-tr-lg mt-4">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 ">
                      <label
                        htmlFor="nombre-receta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre de la categoria
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={category.name}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 rounded-bl-lg rounded-br-lg px-4 py-3 text-right sm:px-6 flex justify-end gap-3">
                <Link
                    to={"../categoria"}
                    className="inline-flex justify-center rounded-md border border-transparent bg-rose-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700"
                  >
                    Cancelar
                  </Link>

                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 "
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategoriaCrear;
