import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import LOGO from '../../assets/logo2.png'

function Navigation() {

  return (
    <div className="hidden sm:flex pl-5 gap-2 sm:justify-around flex-wrap px-2 items-center">      
        <Link to="/" className="text-2xl text-orange-500">
          <img src={LOGO} alt="logo" className="w-40 py-1 self-center hover:scale-90 transition ease-in-out duration-300"/>
        </Link>
      <NavLinks />
    </div>
  );
}

export default Navigation;
