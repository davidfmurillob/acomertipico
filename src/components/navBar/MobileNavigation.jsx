import React from "react";
import NavLinks from "./NavLinks";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import LOGO from '../../assets/logo2.png'
import { Link } from "react-router-dom";


function MobileNavigation() {
  //cambiar por logo svg

  const [openMenu, setOpenMenu] = useState(false);

  const hamburgerOpen = (
    <AiOutlineMenu
      size="40px"
      className="text-slate-50 cursor-pointer absolute right-6 top-7"
      onClick={() => setOpenMenu(!openMenu)}
    />
  );
  const hamburgerClose = (
    <AiOutlineClose
      size="40px"
      className="text-slate-50 cursor-pointer absolute right-6 top-7"
      onClick={() => setOpenMenu(!openMenu)}
    />
  );

  const closeByLink = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="flex flex-col sm:hidden pl-5 gap-4 justify-around align-baseline py-2 bg-mygray-500 overflow-hidden">
      
        <Link to="/" className="text-2xl text-orange-500 pt-2">
         <img src={LOGO} alt="logo" className="w-40 h-16 "/>

        </Link>
      
      {openMenu ? hamburgerClose : hamburgerOpen}
      {openMenu && <NavLinks closeByLink={closeByLink} />}
    </div>
  );
}

export default MobileNavigation;
