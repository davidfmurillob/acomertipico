import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AdminCocina = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = () => {
    axios.get("api/events").then((response) => {
      console.log(response.data.event);
      setEvent(response.data.event);
    });
  };
  //reformar todo esto
  const handleClickDelete = (id) => {
    axios.delete(`api/delete-event/${id}`).then(() => {
      swal("success", "Evento eliminado", "success");
      getAllEvents();
    });
  };

  //Cambiar esta logica para eventos
  const setData = (data) => {
    console.log(data);
    let { id, nombre, hora, fecha, direccion, establishment_name } = data;
    localStorage.setItem("id_evento", id);
    localStorage.setItem("nombre_evento", nombre);
    localStorage.setItem("hora_evento", hora);
    localStorage.setItem("fecha_evento", fecha);
    localStorage.setItem("direccion_evento", direccion);
    localStorage.setItem("nombre_establecimiento", establishment_name);
  };

  return (
    <div className="overflow-auto">
      <div className="mx-auto w-2/5 text-center text-slate-50 rounded rounded-b-none text-3xl mt-5 py-2 bg-gray-600">
        Lista de eventos cocina con nosotros
      </div>
      <div className="md:grid md:grid-cols-6 md:gap-6">
        <div className="lg:col-span-1"></div>
        <table className="min-w-full border-collapse block md:table col-span-5">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                ID
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre del evento
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Restaurante
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Fecha
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Hora
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Dirección
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {/* /////////////////////////// primer tabla ///////////////////// */}

            {event.map((e) => (
              <tr
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                key={e.id}
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    ID
                  </span>
                  {e.id}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Nombre del evento
                  </span>
                  {e.nombre}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Restaurante
                  </span>
                  {e.establishment_name}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Fecha
                  </span>
                  {e.fecha}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Hora
                  </span>
                  {e.hora}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Direción
                  </span>
                  {e.direccion}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Acciones
                  </span>
                  <Link
                    to={"editar"}
                    onClick={() => setData(e)}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 mx-0.5 border border-blue-500 rounded"
                  >
                    Editar
                  </Link>
                  <button
                    className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 mx-0.5 border border-red-500 rounded"
                    onClick={() => handleClickDelete(e.id)}
                  >
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

export default AdminCocina;
