import React, { useState } from "react";
import { HiOutlineMenuAlt2, HiOutlineX, HiOutlineBell } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AdminPrincipal = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [dropDown1, setDropDown1] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const [dropDown3, setDropDown3] = useState(false);
  const [dropDown4, setDropDown4] = useState(false);
  const [dropDown5, setDropDown5] = useState(false);

  const navigate = useNavigate()

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const primerDropDown = () => {
    setDropDown1(!dropDown1);
  };

  const segundoDropDown = () => {
    setDropDown2(!dropDown2);
  };
  const tercerDropDown = () => {
    setDropDown3(!dropDown3);
  };

  const cuartoDropDown = () => {
    setDropDown4(!dropDown4);
  };
  const quintoDropDown = () => {
    setDropDown5(!dropDown5);
  };

  const logoutSubmit = (e) => {
    e.preventDefault();

    // axios.post(`api/auth/logout`).then((res) => {
    //   console.log(res)
    //   if (res.data.status === 200) {
    //     // localStorage.removeItem("auth_token");
    //     // localStorage.removeItem("auth_name");
    //     localStorage.clear()
    //     swal("Success", res.data.message, "success");
    //     navigate("/");
    //   }
    // });

    localStorage.clear()
        swal("Success", "Cerraste sesión", "success");
        navigate("/");
  };


  return (
    <div>
         <div className="fixed w-screen h-screen -z-50 bg-foodBg-mobile sm:bg-foodBg bg-cover bg-center sm:bg-right bg-no-repeat bg-black opacity-95 bg-opacity-40">
            {/* <div className="absolute mx-auto my-auto">
              PANEL DE ADMINISTRADOR ACOMERTÍPICO
            </div> */}
        </div>

      {showSidebar ? (
        <div className="bg-blue-600 absolute z-50">
          <div className="sidebar fixed top-0 bottom-0 lg:-left-1 p-2 w-[310px] overflow-y-auto text-center bg-gray-800">
            <div className="text-gray-100 text-xl">
              <div className="p-2.5 mt-1 flex items-center">
                <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                  Administrador
                </h1>

                <HiOutlineX
                  className="cursor-pointer ml-28 hover:bg-blue-600 rounded text-white"
                  onClick={toggleSidebar}
                  color="white"
                  
                />
              </div>
              {/* <div className="my-2 bg-gray-600 h-[1px]"></div> */}
            </div>
            {/* 
        //////////////////////    SEARCH    /////////////////////////////////
        
        
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-zinc-700 text-white">
          <i className="bi bi-search text-sm"></i>
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div> 
        //////////////////////////    SEARCH    ////////////////////////////////////
        */}

            

            {/* <div className="my-4 bg-gray-600 h-[1px]"></div> */}
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 text-white">
              <MdOutlineInventory2 />
              <div className="flex justify-between w-full items-center">
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  Manejo de recursos
                </span>
              </div>
            </div>
            <ul className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 ">
              {/* //////////////////////////////////primer dropdown////////////////////// */}

              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 "
                onClick={primerDropDown}
              >
                <p className=" cursor-pointer rounded-md mt-1 w-[100%]">
                  Restaurantes{" "}
                </p>
                <HiOutlineChevronDown />
              </div>
              {dropDown1 ? (
                <div className="flex flex-col py-2 font-extralight text-sm">
                  <Link
                    to="restaurantes/crear"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Crear
                  </Link>
                  <Link
                    to="restaurantes"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Ver restaurantes
                  </Link>
                </div>
              ) : null}

              {/* //////////////////////////////////segundo dropdown////////////////////// */}

              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 "
                onClick={segundoDropDown}
              >
                <p className=" cursor-pointer rounded-md mt-1 w-[100%]">
                  Productos{" "}
                </p>
                <HiOutlineChevronDown />
              </div>
              {dropDown2 ? (
                <div className="flex flex-col py-2 font-extralight text-sm">
                  <Link
                    to="productos/crear"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Crear
                  </Link>
                  <Link
                    to="productos"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Ver productos
                  </Link>
                </div>
              ) : null}

              {/* //////////////////////////////////tercer dropdown////////////////////// */}

              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 "
                onClick={tercerDropDown}
              >
                <p className=" cursor-pointer rounded-md mt-1 w-[100%]">
                  Recetas{" "}
                </p>
                <HiOutlineChevronDown />
              </div>
              {dropDown3 ? (
                <div className="flex flex-col py-2 font-extralight text-sm">
                  <Link
                    to="recetas/crear"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Crear
                  </Link>
                  <Link
                    to="recetas"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Ver recetas
                  </Link>
                </div>
              ) : null}
              {/* //////////////////////////////////cuarto dropdown////////////////////// */}

              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 "
                onClick={cuartoDropDown}
              >
                <p className=" cursor-pointer rounded-md mt-1 w-[100%]">
                  Categoria{" "}
                </p>
                <HiOutlineChevronDown />
              </div>
              {dropDown4 ? (
                <div className="flex flex-col py-2 font-extralight text-sm">
                  <Link
                    to="categoria/crear"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Crear
                  </Link>
                  <Link
                    to="categoria"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Ver categorias
                  </Link>
                </div>
              ) : null}

              
            </ul>

            <div className="my-4 bg-gray-600 h-[1px]"></div>

              {/* ////////////////////////////////// EVENTOS ////////////////////// */}

            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 text-white">
              <HiOutlineBell />
              <div className="flex justify-between w-full items-center">
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  Eventos
                </span>
              </div>
            </div>
            <ul className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 ">
              {/* //////////////////////////////////lquinto dropdown////////////////////// */}

              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 "
                onClick={quintoDropDown}
              >
                <p className=" cursor-pointer rounded-md mt-1 w-[100%]">
                  Cocina con nosotros{" "}
                </p>
                <HiOutlineChevronDown />
              </div>
              {dropDown5 ? (
                <div className="flex flex-col py-2 font-extralight text-sm">
                  <Link
                    to="cocina/crear"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Crear 
                  </Link>
                  <Link
                    to="cocina"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Ver 
                  </Link>
                  <Link
                    to="cocina/asistencia"
                    className="pl-6 cursor-pointer p-2 hover:bg-blue-800 rounded-md mt-1 w-[100%]"
                  >
                    Ver asistencia evento
                  </Link>
                </div>
              ) : null}
               </ul>

{/* 
            <div className="my-4 bg-gray-600 h-[1px]"></div>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <BiUserPin />
              <div className="flex justify-between w-full items-center">
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  Manejo de usuarios
                </span>
              </div>
            </div> */}
            <div className="my-4 bg-gray-600 h-[1px]"></div>

            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" onClick={logoutSubmit}>
              <BiLogOut />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Cerrar sesión
              </span>
            </div>
          </div>
        </div>
      ) : (
        <HiOutlineMenuAlt2
          className="absolute top-4 left-4 w-10 h-10 bg-zinc-800 hover:bg-blue-600 rounded cursor-pointer"
          onClick={toggleSidebar}
          color="white"
        />
      )}
      <Outlet />
    </div>
  );
};

export default AdminPrincipal;
