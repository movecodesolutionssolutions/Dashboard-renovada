import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Pages/Login/index";
import Registre from "../Pages/Registre-se/index";
import User from "../Pages/Users";
import Header from "../components/Header";
import EventsList from "../Pages/Eventos/List";

const Private = ({ Item }) => {
  const isAuthenticated = true;

  return isAuthenticated ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Fragment>
        <Routes>
            EventsList
          <Route exact path="/Users" element={<Private Item={User} />} />
          <Route path="/" element={<Login />} />
          <Route exact path="/signup" element={<Registre />} />
          <Route path="*" element={<Login />} />

        {/*INICIO ROTAS EVENTOS*/}
            <Route exact path="/eventos/listar" element={<Private Item={EventsList} />} />
        {/*FIM ROTAS EVENTOS*/}
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
export default RoutesApp;
