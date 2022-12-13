import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { uploadFile } from "../../../components/utils/firebaseUpload/config";

const AdminRecetasCrear = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    if (file === null) return
    handleClickFile()
  
    
  }, [file])
  





  const [imageUrl, setImageUrl] = useState("");

  // const [errorlist, setError] = useState([]);

  const [recipeInput, setRecipeInput] = useState({
    name: "",
    description: "",
    link: "",
  });

  const handleInput = (e) => {
    e.persist();
    setRecipeInput({ ...recipeInput, [e.target.name]: e.target.value });
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   setRecipeInput({
  //     name: "",
  //     description: "",
  //     link: "",
  //   });
  // };

  const handleClickFile = async () => {
    try {
      const result = await uploadFile(file);
      console.log(result);
      setImageUrl(result);
      swal("Imagen cargada", "Imagen subida al servidor", "success");

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", recipeInput.name);
    formData.append("description", recipeInput.description);
    formData.append("link", recipeInput.link);
    formData.append("image", imageUrl);

    axios.post(`/api/recipe`, formData).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        swal("Receta registrada", res.data.message, "success");
        setRecipeInput({
          ...recipeInput,
          name: "",
          description: "",
          link: "",
        });
        navigate("../recetas")
        // setError([]);
      } else if (res.data.status === 422) {
        swal("Todos los campos son obligatorios", "", "error");
        // setError(res.data.errors);
      }
    });
  };

  return (
    <>
      <div className="overflow-auto">
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="md:col-span-1"></div>
          <div className="mt-20 md:mt-10 mx-10 md:col-span-5 bg-slate-300 p-4 rounded-lg">
            <div className="px-4 sm:px-0 py-4">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Crear receta
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Digita los campos correspondientes para agregar una receta.
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
                        Nombre de la receta
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={recipeInput.name}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descripción de la receta
                      </label>
                      <textarea
                        rows="4"
                        type="text"
                        name="description"
                        id="description"
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={recipeInput.description}
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="link-receta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Link de la receta
                      </label>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={recipeInput.link}
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Imagen del plato de la receta
                      </label>
                     

                     {/* ///////////////input subir imagen//////////////////// */}
                     <div className="mt-4 flex justify-center rounded-md border-2 border-dashed border-zinc-800 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <div className="space-y-1 p-2 flex flex-col w-60 sm:w-auto">
                            <div className="flex flex-col text-sm text-gray-600">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="imagen de producto"
                                  className="mx-auto rounded-lg w-52 sm:w-72 my-2"
                                />
                              ) : (
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400 my-2"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}

                              <input
                                type="file"
                                src=""
                                id="imagen"
                                alt="La imagen ya esta cargada"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                              <label
                                htmlFor="imagen"
                                className="cursor-pointer border border-gray-800  hover:bg-slate-200 hover:scale-105 transition ease-in-out p-2 mx-auto rounded-md"
                              >
                                Subir imagen 
                              </label>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            En formato PNG o JPG
                          </p>
                        </div>
                      </div>
                      {/* ///////////////input subir imagen//////////////////// */}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 rounded-bl-lg rounded-br-lg px-4 py-3 text-right sm:px-6 flex justify-end gap-3">
                <Link
                    to={"../recetas"}
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

export default AdminRecetasCrear;
