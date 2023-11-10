import React, { useState } from "react";
import { HeaderContainer, HamburgerButton } from "./styles";
import { FaBars, FaTimes } from "react-icons/fa";
import HamburgerMenu from "../Menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}{" "}
        {/* Altera o ícone com base no estado isOpen */}
      </HamburgerButton>
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      <h1>Usuario Logado</h1>
      <h1>Logo</h1>
    </HeaderContainer>
  );
};

export default Header;
