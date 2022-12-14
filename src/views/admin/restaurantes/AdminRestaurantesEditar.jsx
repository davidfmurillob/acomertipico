import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { uploadFile } from '../../../components/utils/firebaseUpload/config';

const AdminRestaurantesEditar = () => {

  // Creamos nuestra variable de estado, es la que va a recibir los datos del localStorage
  const [establishment, setEstablishment] = useState({
    name: "",
    direction: "",
    location: "",
    description: "",
    telephone: "",
  });

  //nuestra variable id recibida de localStorage
  const [id, setId] = useState("");

  // const [errorlist, setError] = useState([]);

 //variables para subir img
 const [file, setFile] = useState(null);

 useEffect(() => {
  if (file === null) return
  handleClickFile()

  
}, [file])

 const [imageUrl, setImageUrl] = useState("");

 //hook useNavigate para redireccionar luego del PUT
  const navigate = useNavigate();

// Obtenemos los datos almacenados en localStorage 
  
    useEffect(() => {
    setId(localStorage.getItem("id"));
    setImageUrl(localStorage.getItem('imagen'))
    const nombreLocalStorage = localStorage.getItem("nombre_establecimiento");
    const direccionLocalStorage = localStorage.getItem("direccion_establecimiento");
    const telefonoLocalStorage = localStorage.getItem("telefono_establecimiento");
    const ubicacionLocalStorage = localStorage.getItem("ubicacion");
    const descripcionLocalStorage = localStorage.getItem("descripcion");
    setEstablishment({ 
      ...establishment, 
      name: nombreLocalStorage, 
      direction: direccionLocalStorage,  
      location: ubicacionLocalStorage,
      description: descripcionLocalStorage,
      telephone: telefonoLocalStorage,
    });
    // eslint-disable-next-line
  }, []);


  //El handleInput para almacenar los nuevos cambios en el form

  const handleInput = (e) => {
    setEstablishment({ ...establishment, [e.target.name]: e.target.value });
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   setEstablishment({
  //     name: "",
  //     direction: "",
  //     location: "",
  //     description: "",
  //     telephone: "",
  //   });
  // };


  //Funcion para subir la imagen a firebase

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

  //Evento al enviar el formulario, realizamos la peticion PUT
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre_establecimiento: establishment.name,
      direccion_establecimiento: establishment.direction,
      ubicacion: establishment.location,
      descripcion: establishment.description,
      telefono_establecimiento: establishment.telephone,
      imagen: imageUrl
    }

    axios
      .put(`/api/establishment/${id}`, data)
      .then((res) => {
        console.log(res)
      if (res.data.status === 201) {
        swal("Restaurante creado", res.data.message, "success");
        navigate('../restaurantes')
        // setError([]);
      } else if (res.data.status === 422) {
        swal("Todos los campos son obligatorios", "", "error");
        // setError(res.data.errors);
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
                  Editar restaurante
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Digita los campos correspondientes para editar el restaurante.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="rounded-lg">
                <div className="overflow-hidden shadow sm:rounded-m ">
                  <div className="bg-slate-300 px-4 py-5 sm:p-6 rounded-tl-lg rounded-tr-lg mt-4">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 ">
                        <label
                          htmlFor="nombre-establecimiento"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nombre del establecimiento
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInput}
                          value={establishment.name}
                        />
                      </div>
  
                      <div className="col-span-6 lg:col-span-3">
                        <label
                          htmlFor="direccion_establecimiento"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Dirección del establecimiento
                        </label>
                        <input
                          type="text"
                          name="direction"
                          id="direction"
                          className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInput}
                          value={establishment.direction}
                        />
                      </div>
  
                      <div className="col-span-6 lg:col-span-3">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Barrio
                        </label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInput}
                          value={establishment.location}
                        />
                      </div>
  
                      <div className="col-span-6 ">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Descripción del establecimiento
                        </label>
                        <textarea
                          rows="4"
                          type="text"
                          name="description"
                          id="description"
                          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInput}
                          value={establishment.description}
                        />
                      </div>
  
                      <div className="col-span-6 ">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Telefono de establecimiento
                        </label>
                        <input
                          type="number"
                          name="telephone"
                          id="telephone"
                          className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInput}
                          value={establishment.telephone}
                        />
                      </div>
  
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Imagen del restaurante
                        </label>
                        {/* ///////////////input editar imagen//////////////////// */}
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
                      {/* ///////////////input editar imagen//////////////////// */}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-200 rounded-bl-lg rounded-br-lg px-4 py-3 text-right sm:px-6 flex justify-end gap-3">
                    <Link
                    to={'../restaurantes'}
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

export default AdminRestaurantesEditar