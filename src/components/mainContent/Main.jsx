import React from "react";
import Carousel from "../carousel/Carousel";
import DefaultButton from "../DefaultButton";

const Main = () => {
  return (
    <div className=" w-full h-full lg:h-[92vh] flex flex-col lg:flex-row bg-foodBg-mobile sm:bg-foodBg bg-cover bg-center sm:bg-right bg-no-repeat bg-black opacity-90 bg-opacity-40">
      <div className="w-full h-full flex flex-col lg:flex-row bg-black bg-opacity-40 px-8 lg:px-24 xl:px-40">
          <div className="w-full h-full lg:w-1/2 flex flex-col justify-center items-center gap-6 text-white text-center ">
                  <h1 className="font-semibold text-3xl mt-14 sm:mt-none sm:text-4xl ">
                    Bienvenido a Acomertípico
                  </h1>
                  <h2 className="font-extralight text-xl sm:text-2xl px-4 sm:px-20">
                    Aquí podrás encontrar diversas comidas típicas del Cauca, te invitamos
                    a que revises los productos de nuestros restaurantes afiliados y
                    recetas
                  </h2>
                  <DefaultButton text={'Ver productos'} ruta={'productos'}/>
                </div>

                <Carousel />
      </div>
      
    </div>
  );
};

export default Main;
