import React, { useState } from "react";

import {
  MenuContainer,
  HamburgerButton,
  MenuItems,
  MenuItem,
  Icon,
} from "./styles";
import { useRoutes, Outlet } from "react-router-dom";
import { FaTimes, FaUser, FaCalendar, FaTh } from "react-icons/fa";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  const routes = useRoutes([
    {
      path: "/signup",
      element: null,
    },
  ]);

  const closeMenu = () => {
    if (isOpen) {
      toggleMenu(); // Fecha o menu quando o ícone é clicado
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
        {routes}
      </MenuContainer>
    </>
  );
};

export default HamburgerMenu;
