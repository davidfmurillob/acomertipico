import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { uploadFile } from "../../../components/utils/firebaseUpload/config";

const AdminProductosCrear = () => {
  const [establishment, setEstablishment] = useState([]);
  const [idEstablishment, setIdEstablishment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idCategory, setIdCategory] = useState({
    id: "",
    name: "",
  });

  const [file, setFile] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (file === null) return;
    handleClickFile();
  }, [file]);

  const [imageUrl, setImageUrl] = useState("");

  // const [errorlist, setError] = useState([]);

  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    price: "",
    // establishment: "",
    // category: ""
  });

  useEffect(() => {
    let isMounted = true;

    //Obtener los datos de establishment para el menu radial
    axios.get(`/api/establishments`).then((res) => {
      console.log(res.data);
      if (isMounted)
        if (res.data.message === "success") {
          console.log(res.data.establishment);
          setEstablishment(res.data.establishment);
        }
    });

    axios.get(`/api/categories`).then((res) => {
      console.log(res.data);
      if (isMounted)
        if (res.data.message === "success") {
          console.log(res.data.category);
          setCategories(res.data.category);
        }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   setProductInput({
  //     name: "",
  //     description: "",
  //     price: "",
  //   });
  // };

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

  const onChangeHandlerEstablishment = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const elementId = el.getAttribute("id");
    const elementInnerHTML = el.innerHTML;
    console.log(elementInnerHTML);
    setIdEstablishment({
      ...idEstablishment,
      id: elementId,
      name: elementInnerHTML,
    });
  };

  const onChangeHandlerCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const elementId = el.getAttribute("id");
    const elementInnerHTML = el.innerHTML;
    console.log(elementInnerHTML);
    setIdCategory({ ...idCategory, id: elementId, name: elementInnerHTML });
  };

  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre_producto", productInput.name);
    formData.append("descripcion_producto", productInput.description);
    formData.append("precio_producto", productInput.price);
    formData.append("establishment_id", idEstablishment.id);
    formData.append("establishment_name", idEstablishment.name);

    formData.append("category_id", idCategory.id);
    formData.append("category_name", idCategory.name);
    formData.append("imagen_producto", imageUrl);

    axios.post(`/api/product`, formData).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        swal("Producto creado", res.data.message, "success");
        setProductInput({
          ...productInput,
          name: "",
          description: "",
          price: "",
          // establishment: '',
          // category: ""
        });
        navigate("../productos")
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
                Crear producto
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Digita los campos correspondientes para crear el producto.
              </p>
            </div>
            <form onSubmit={submitProduct} className="rounded-lg">
              <div className="overflow-hidden shadow sm:rounded-m ">
                <div className="bg-slate-300 px-4 py-5 sm:p-6 rounded-tl-lg rounded-tr-lg mt-4">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 ">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre del producto
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={productInput.name}
                      />
                    </div>

                    <div className="col-span-6 lg:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Precio del producto $
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={productInput.price}
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descripción del producto
                      </label>
                      <textarea
                        rows="4"
                        type="text"
                        name="description"
                        id="description"
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={productInput.description}
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="establishment_options"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Restaurante:
                      </label>

                      <select
                        id="establishment"
                        name="establishment"
                        autoComplete=""
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={onChangeHandlerEstablishment}
                      >
                        <option>Selecciona el restaurante</option>
                        {establishment.map((restaurante) => (
                          <option key={restaurante.id} id={restaurante.id}>
                            {restaurante.nombre_establecimiento}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="category_options"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Categoria:
                      </label>

                      <select
                        id="category"
                        name="category"
                        autoComplete=""
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={onChangeHandlerCategory}
                      >
                        <option>Selecciona la categoria</option>
                        {categories.map((category) => (
                          <option key={category.id} id={category.id}>
                            {category.nombre_categoria}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Imagen de producto</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-20 w-20 overflow-hidden rounded-sm bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div> */}

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Imagen del producto
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
                    to={"../productos"}
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

export default AdminProductosCrear;
