import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const AdminCocinaAsistencia = () => {

    const [asistencia, setAsistencia] = useState([])    

    useEffect(() => {
      getAsistencia()
    
    }, [])


    const getAsistencia = () => {
        axios.get('api/establishments').then(response=> {
            console.log(response.data.establishment)
            setAsistencia(response.data.establishment)     
        })
    }   


  return (
    <div className="overflow-auto">
      <div className="mx-auto w-2/5 text-center text-slate-50 rounded rounded-b-none text-3xl mt-5 py-2 bg-gray-600">
        Lista de asistencia cocina con nosotros
      </div>
      <div className="md:grid md:grid-cols-6 md:gap-6">
        <div className="lg:col-span-1"></div>
        <table className="min-w-full border-collapse block md:table col-span-5">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
             
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre de usuario
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Email usuario
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre del evento
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Fecha
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Hora
              </th>
              
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {/* /////////////////////////// primer tabla ///////////////////// */}

            {asistencia.map((e) => (
              <tr
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                key={e.id}
              >
                
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Nombre del usuario
                  </span>
                  {e.nombre_establecimiento}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Email usuario
                  </span>
                  email@gmail.com
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Nombre del evento
                  </span>
                  NOMBRE DEL EVENTO
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Fecha
                  </span>
                  FECHA
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Hora
                  </span>
                  HORA
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCocinaAsistencia   