import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { uploadFile } from "../../../components/utils/firebaseUpload/config";

const AdminProductosEditar = () => {
  // Creamos nuestra variable de estado, es la que va a recibir los datos del localStorage

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    // establishment: "",
    // category: ""
  });

  //nuestra variable id recibida de localStorage

  const [idProducto, setIdProducto] = useState("");

  const [establishment, setEstablishment] = useState([]);
  const [idEstablishment, setIdEstablishment] = useState({
    id: "",
    name: "",
  });

  const [categories, setCategories] = useState([]);
  const [idCategory, setIdCategory] = useState({
    id: "",
    name: "",
  });

  //variables para subir img

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file === null) return;
    handleClickFile();
  }, [file]);

  const [imageUrl, setImageUrl] = useState("");

  // const [errorlist, setError] = useState([]);

  //hook useNavigate para redireccionar luego del PUT

  const navigate = useNavigate();

  // Obtenemos los datos de restaurantes y de categorias. También traemos los datos del localStorage

  useEffect(() => {
    let isMounted = true;

    //Obtener los datos de establishment para el menu radial
    axios.get(`/api/establishments`).then((res) => {
      if (isMounted)
        if (res.data.message === "success") {
          console.log(res.data.establishment);
          setEstablishment(res.data.establishment);
        }
    });

    axios.get(`/api/categories`).then((res) => {
      if (isMounted)
        if (res.data.message === "success") {
          console.log(res.data.category);
          setCategories(res.data.category);
        }
    });

    setIdProducto(localStorage.getItem("id_producto"));
    setImageUrl(localStorage.getItem("imagen_producto"));
    const nombreLocalStorage = localStorage.getItem("nombre_producto");
    const precioLocalStorage = localStorage.getItem("precio_producto");
    const descripcionLocalStorage = localStorage.getItem(
      "descripcion_producto"
    );
    setProduct({
      ...product,
      name: nombreLocalStorage,
      description: descripcionLocalStorage,
      price: precioLocalStorage,
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   setProduct({
  //     name: "",
  //     description: "",
  //     price: "",
  //   });
  // };

  const handleClickFile = async () => {
    try {
      const result = await uploadFile(file);
      // console.log(result)
      setImageUrl(result);
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
    // console.log(elementInnerHTML)
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
    // console.log(elementInnerHTML)
    setIdCategory({ ...idCategory, id: elementId, name: elementInnerHTML });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre_producto: product.name,
      precio_producto: product.price,
      descripcion_producto: product.description,
      establishment_id: idEstablishment.id,
      establishment_name: idEstablishment.name,
      category_id: idCategory.id,
      category_name: idCategory.name,
      imagen_producto: imageUrl,
    };

    axios.put(`/api/product/${idProducto}`, data).then((res) => {
      console.log(res);
      if (res.data.status === 201) {
        swal("Producto actualizado", res.data.message, "success");
        navigate("../productos");
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
                Editar producto
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Digita los campos correspondientes para editar el producto.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="rounded-lg">
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
                        value={product.name}
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
                        value={product.price}
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
                        value={product.description}
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

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Imagen del producto
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

export default AdminProductosEditar;
