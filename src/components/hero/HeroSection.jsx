import React from "react";
import { Link } from "react-router-dom";
import phone from "../../assets/phone10.png";

const HeroSection = () => {
  return (
    <div className="w-full bg-foodBg-mobile sm:bg-foodBg bg-cover bg-center sm:bg-right bg-no-repeat bg-black opacity-95 bg-opacity-40">
      <div className="flex flex-col justify-around w-full px-12 mx-auto lg:pt-16 lg:flex-row lg:px-44 bg-black bg-opacity-40 ">
        <div className="pt-16 mb-16 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block mb-4 text-2xl font-semibold tracking-wider text-orange-500 uppercase">
                Bienvenido a
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
              AcomerTípico
              <br className="hidden md:block" />
              <span className="inline-block text-3xl font-extralight italic tracking-wide">
                Deleita tu paladar
              </span>
            </h2>
            <p className="text-base text-white md:text-lg">
              Aquí podrás encontrar diversas comidas típicas del Cauca, te
              invitamos a que revises los productos de nuestros restaurantes
              afiliados y recetas.
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <Link
              to="productos-cart"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 rounded border-slate-200 border shadow-md  hover:bg-slate-200 hover:text-black focus:shadow-outline focus:outline-none"
            >
              Ver productos
            </Link>
            <Link
              to="registro"
              
              className="inline-flex items-center font-semibold justify-center h-12 px-6 mr-6 transition-colors tracking-wide rounded duration-400 text-black bg-green-500 hover:bg-orange-400 hover:text-black"
            >
              Registrate!
            </Link>
          </div>
        </div>
        <div className="">
          <img
            src={phone}
            className="object-cover h-4/5 mx-auto lg:h-[70vh] hidden md:block"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
