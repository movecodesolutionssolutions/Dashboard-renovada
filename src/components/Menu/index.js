import React, { useState } from "react";

import {
  MenuContainer,
  HamburgerButton,
  MenuItems,
  MenuItem,
  Icon,
} from "./styles";

import { FaTimes, FaUser, FaCalendar, FaTh } from "react-icons/fa";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  const closeMenu = () => {
    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-1/6 h-full bg-black transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-8 right-8 cursor-pointer">
          <FaTimes color="#fff" onClick={closeMenu} />
        </div>
        <ul className="list-none pt-12 m-0 flex flex-col items-start justify-start h-full">
          <li className="text-white text-lg mt-8 hover:bg-gray-800 cursor-pointer transition-all duration-300 pl-4">
            <div className="flex items-center">
              <FaUser className="mr-6" size={20} />
              <Link to="/users" onClick={toggleMenu}>
                Usuários
              </Link>
            </div>
          </li>
          <li className="text-white text-lg mt-8 hover:bg-gray-800 cursor-pointer transition-all duration-300 pl-4">
            <div className="flex items-center">
              <FaCalendar className="mr-6" size={20} />
              <Link to="/events/list" onClick={toggleMenu}>
                Eventos
              </Link>
            </div>
          </li>
          <li className="text-white text-lg mt-8 hover:bg-gray-800 cursor-pointer transition-all duration-300 pl-4">
            <div className="flex items-center">
              <FaTh className="mr-6" size={20} />
              <Link to="/users" onClick={toggleMenu}>
                Células
              </Link>
            </div>
          </li>
          <li className="text-white text-lg mt-8 hover:bg-gray-800 cursor-pointer transition-all duration-300 pl-4">
            <div className="flex items-center">
              <FaTh className="mr-6" size={20} />
              <Link to="/news" onClick={toggleMenu}>
                Noticias
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
