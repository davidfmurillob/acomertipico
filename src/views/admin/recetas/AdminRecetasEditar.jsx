import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { uploadFile } from '../../../components/utils/firebaseUpload/config'

const AdminRecetasEditar = () => {

    const [receta, setReceta] = useState({
        name: "",
        link: "",
        description: ""
    })
    
    
    const [id, setId] = useState("")


    const [imageUrl, setImageUrl] = useState("")
    const [file, setFile] = useState(null);


    
  useEffect(() => {
    if (file === null) return
    handleClickFile()
  
    
  }, [file])
  


    const navigate = useNavigate()


    useEffect(() => {

        setId(localStorage.getItem('id_receta'))
        setImageUrl(localStorage.getItem('url_imagen_receta'))
        const nombreLocalStorage = localStorage.getItem('nombre_receta')
        const linkLocalStorage = localStorage.getItem('link_receta')
        const descripcionLocalStorage = localStorage.getItem('descripcion_receta')
        setReceta({
            ...receta,
            name: nombreLocalStorage,
            link: linkLocalStorage,
            description: descripcionLocalStorage
        })         
      // eslint-disable-next-line
    }, [])


    //El handleInput para almacenar los nuevos cambios en el form

  const handleInput = (e) => {
    setReceta({ ...receta, [e.target.name]: e.target.value });
  };

  const handleClickFile = async () => {
    try {
      const result = await uploadFile(file);
      console.log(result);
      setImageUrl(result);
      // alert('Imagen cargada al servidor')
      swal("Imagen cargada", "Imagen subida al servidor", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        name: receta.name,
        description: receta.description,
        link: receta.link,
        image: imageUrl        
    }
    
    axios.put(`/api/recipe/${id}`, data).then((res) => {
      console.log(res)
      if (res.data.status === 201) {

        swal("Receta registrada", res.data.message, "success");
        navigate('../recetas')
      }  
      
        else if (res.data.status === 422) {
        swal("Todos los campos son obligatorios", "", "error");
        
      }           
    });
  };





  return (
    <>
      <div className="mt-10 sm:mt-0 ">
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="md:col-span-1"></div>
          <div className="mt-20 md:mt-10 mx-10 md:col-span-5 bg-slate-300 p-4 rounded-lg">
            <div className="px-4 sm:px-0 py-4">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Editar receta
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Digita los campos correspondientes para editar la receta.
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
                        value={receta.name}
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
                        value={receta.description}
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
                        value={receta.link}
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Imagen del plato de la receta
                      </label>

                      {/* ///////////////input editar imagen//////////////////// */}
                      <div className="mt-4 flex justify-center rounded-md border-2 border-dashed border-zinc-800 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <div className="space-y-1 p-2 flex flex-col w-60 sm:w-auto">
                            <img
                              src={imageUrl}
                              alt="nada"
                              className="mx-auto rounded-lg w-52 sm:w-72"
                            />
                            <div className="flex flex-col text-sm text-gray-600">
                              <div className="flex flex-col w-full ">
                                <h3 className="p-1 mx-auto">
                                  La anterior imagen ya se encuentra cargada!{" "}
                                </h3>
                                <p className="p-1  mx-auto">
                                  {" "}
                                  pero si quieres cambiarla, vuelve a subirla
                                </p>
                              </div>
                              {/* <input type="file" src="" alt="" className="mx-auto" onChange={(e) => setFile(e.target.files[0])}/>  */}

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
                                Cambiar la imagen existente
                              </label>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            En formato PNG o JPG
                          </p>
                        </div>
                      </div>
                      {/* ///////////////input editar imagen//////////////////// */}
                      


                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 rounded-bl-lg rounded-br-lg px-4 py-3 text-right sm:px-6 flex justify-end gap-3">
                  <Link
                  to={'../recetas'}
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
  )
}

export default AdminRecetasEditar