import React from "react";
import { Outlet } from "react-router-dom";

import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <>
    <nav className="bg-zinc-900 text-white">
      <Navigation />
      <div className="w-full z-10">
        <MobileNavigation />
      </div>
    </nav>
    <Outlet />
    </>
  );
};

export default Navbar;
    