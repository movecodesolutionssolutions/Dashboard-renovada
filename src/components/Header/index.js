import React, { useContext, useState } from "react";
import { HeaderContainer, HamburgerButton } from "./styles";
import { FaBars, FaTimes } from "react-icons/fa";
import HamburgerMenu from "../Menu";
import { AuthContext } from "../../context/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}{" "}
      </HamburgerButton>
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <h1>Logo</h1>

    </HeaderContainer>
  );
};

export default Header;
