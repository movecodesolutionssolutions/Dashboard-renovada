import React, { useContext, useState, useEffect } from "react";
import { HeaderContainer, HamburgerButton } from "./styles";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import HamburgerMenu from "../Menu";
import { AuthContext } from "../../context/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuNode = document.getElementById("user-menu");

      if (menuNode && !menuNode.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </HamburgerButton>
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      {/* <h1 className="text-2xl font-bold">Nome da Rota</h1> */}

      <div className="relative">
        <FaUser
          id="user-menu"
          className="text-2xl cursor-pointer"
          onClick={toggleUserMenu}
        />

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 border rounded-md shadow-md text-white">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                Editar Perfil
              </li>
              <button
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={signOut}
              >
                Sair
              </button>
            </ul>
          </div>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
