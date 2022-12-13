import React from "react";
import {ImSpoonKnife} from 'react-icons/im'
import {BsHouseDoor} from 'react-icons/bs'
import {MdOutlineCheck} from 'react-icons/md'
import {FcPhoneAndroid} from 'react-icons/fc'


const CocinaConNosotros = () => {
  return (
    <section className="relative bg-zinc-800">
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="absolute top-0 w-full h-full bg-foodBg bg-center bg-cover">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
              <div className="px-6">
                <h1 className="text-white font-normal text-3xl">
                  Cocina con nosotros.
                </h1>
                <p className="mt-4 text-lg text-gray-200">
                  El servicio móvil <FcPhoneAndroid className="inline-block" size={40}/> de "cocina con nosotros" te permitirá visitar los
                  establecimientos y los procesos de fabricación de los
                  alimentos, así mismo te permite aprender sus recetas.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <section className="pb-10 bg-zinc-700 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap max-w-5xl mx-auto">
            {/* card  */}
            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                  <BsHouseDoor size={50}/>
                  </div>
                  <h6 className="text-xl font-semibold">Visita los establecimientos</h6>
                  <p className="mt-2 mb-4 text-gray-500">
                  Podrás visitar personalmente los restaurantes que encuentres en AcomerTípico, conocer su ubicación y sus instalaciones. 

                  </p>
                </div>
              </div>
            </div>
            {/* card  */}
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <MdOutlineCheck size={50}/>
                  </div>
                  <h6 className="text-xl font-semibold">Conoce los procesos de fabricación</h6>
                  <p className="mt-2 mb-4 text-gray-500">
                  Podrás conocer los procesos de fabricación de una gran variedad de productos típicos de la región.
                  </p>
                </div>
              </div>
            </div>
            {/* card  */}
            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                  <ImSpoonKnife size={20}/>
                  </div>
                  <h6 className="text-xl font-semibold">Aprende las recetas</h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Tendrás conocimiento sobre las recetas de los productos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CocinaConNosotros;
