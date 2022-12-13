import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import { uploadFile } from "../../../components/utils/firebaseUpload/config";

const AdminCocinaCrear = () => {
  // const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [cocinaInput, setCocinaInput] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    direccion: "",
  });

  const [establishment, setEstablishment] = useState([]);
  const [idEstablishment, setIdEstablishment] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setCocinaInput({ ...cocinaInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/establishments`).then((res) => {
      console.log(res.data);
      if (isMounted)
        if (res.data.message === "success") {
          console.log(res.data.establishment);
          setEstablishment(res.data.establishment);
        }
    });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", cocinaInput.nombre);
    formData.append("fecha", cocinaInput.fecha);
    formData.append("hora", cocinaInput.hora);
    formData.append("direccion", cocinaInput.direccion);
    formData.append("establishment_id", idEstablishment.id);
    formData.append("establishment_name", idEstablishment.name);

    axios.post(`/api/event`, formData).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        swal("Evento registrado", res.data.message, "success");
        setCocinaInput({
          ...cocinaInput,
          nombre: "",
          fecha: "",
          hora: "",
          direccion: "",
        });
        navigate("../cocina");
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
                Crear evento de cocina con nosotros
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Digita los campos correspondientes para crear el evento.
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
                        Nombre del evento
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={cocinaInput.nombre}
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

                    <div className="col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fecha
                      </label>
                      <input
                        rows="4"
                        type="date"
                        name="fecha"
                        id="fecha"
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={cocinaInput.fecha}
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="link-receta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hora
                      </label>
                      <input
                        type="time"
                        name="hora"
                        id="hora"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={cocinaInput.hora}
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="link-receta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleInput}
                        value={cocinaInput.direccion}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 rounded-bl-lg rounded-br-lg px-4 py-3 text-right sm:px-6 flex justify-end gap-3">
                  <Link
                    to={"../cocina"}
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

export default AdminCocinaCrear;
