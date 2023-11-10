import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Pages/Login/index";
import Registre from "../Pages/Registre-se/index";
import User from "../Pages/Users";
import Header from "../components/Header";

const Private = ({ Item }) => {
  // Aqui você pode verificar a autenticação do usuário
  const isAuthenticated = true; // Defina sua lógica de autenticação

  return isAuthenticated ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Fragment>
        <Routes>
          <Route exact path="/Users" element={<Private Item={User} />} />
          <Route path="/" element={<Login />} />
          <Route exact path="/signup" element={<Registre />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
export default RoutesApp;
