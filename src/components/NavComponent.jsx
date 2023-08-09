import React from "react";
import { motion } from "framer-motion";

const NavComponent = ({ button }) => {
  return (
    <div>
      <nav className="bg-white 900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 600 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              DSTN
            </span>
          </a>
          <div className="flex md:order-2">{button}</div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
