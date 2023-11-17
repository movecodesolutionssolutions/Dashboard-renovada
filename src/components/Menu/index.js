import React, { useState } from "react";

import {
  MenuContainer,
  HamburgerButton,
  MenuItems,
  MenuItem,
  Icon,
} from "./styles";

import { FaTimes, FaUser, FaCalendar, FaTh } from "react-icons/fa";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  const closeMenu = () => {
    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <MenuContainer isOpen={isOpen}>
        <HamburgerButton onClick={closeMenu}>
          <FaTimes color="#000" /> {/* Ícone para fechar o menu */}
        </HamburgerButton>
        <MenuItems>
          <MenuItem>
            <Icon>
              <FaUser size={20} />
            </Icon>
            Usuários
          </MenuItem>
          <MenuItem>
            <Icon>
              <FaCalendar size={20} />
            </Icon>
            Eventos
          </MenuItem>
          <MenuItem>
            <Icon>
              <FaTh size={20} />
            </Icon>
            Celulas
          </MenuItem>
        </MenuItems>
      </MenuContainer>
    </>
  );
};

export default HamburgerMenu;
