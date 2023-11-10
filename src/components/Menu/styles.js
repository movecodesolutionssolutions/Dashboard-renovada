import styled from "styled-components";

export const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background: #fff;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const MenuItems = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  :hover {
    color: #046ee5;
  }
`;

export const MenuItem = styled.li`
  margin: 10px 0;
  font-size: 18px;
  display: flex;
  cursor: pointer;
  color: #000;
`;

export const Icon = styled.span`
  margin-right: 20px;
  font-size: 20px;
`;
