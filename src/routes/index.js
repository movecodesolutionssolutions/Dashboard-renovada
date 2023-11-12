import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Login from "../Pages/Login/index";
import Registre from "../Pages/Registre-se/index";
import Recovery from "../Pages/Recovery";
import User from "../Pages/Users";
import Header from "../components/Header";
<<<<<<< HEAD
import EventsList from "../Pages/Eventos/List";

const Private = ({ Item }) => {
  const isAuthenticated = true;
=======
import { PrivateRoute } from "./privateRoutes";

const HeaderWrapper = () => {
  const location = useLocation();
>>>>>>> c0fd7a07a5cf184c3ac2832c002062603fdee2b0

  const routesWithoutHeader = ["/", "/signup", "/recocery"];

  if (routesWithoutHeader.includes(location.pathname)) {
    return null;
  }

  return <Header />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD
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
=======
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/signup" element={<Registre />} />
        <Route exact path="/recocery" element={<Recovery />} />
        <Route path="/Users" element={<PrivateRoute />}>
          <Route exact path="/Users" element={<User />} />
        </Route>
      </Routes>
>>>>>>> c0fd7a07a5cf184c3ac2832c002062603fdee2b0
    </BrowserRouter>
  );
};

export default RoutesApp;
