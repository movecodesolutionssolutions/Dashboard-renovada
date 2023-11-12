import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Login from "../Pages/Login/index";
import Registre from "../Pages/Registre-se/index";
import Recovery from "../Pages/Recovery";
import User from "../Pages/Users";
import Header from "../components/Header";
import EventsList from "../Pages/Eventos/List";
import { PrivateRoute } from "./privateRoutes";

const HeaderWrapper = () => {
    const location = useLocation();

    const routesWithoutHeader = ["/", "/signup", "/recocery"];

    if (routesWithoutHeader.includes(location.pathname)) {
        return null;
    }

    return <Header />;
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <HeaderWrapper />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route exact path="/signup" element={<Registre />} />
                <Route exact path="/recocery" element={<Recovery />} />
                <Route path="/Users" element={<PrivateRoute />}>
                    <Route exact path="/Users" element={<User />} />
                </Route>

                <Route path="/eventos/listar" element={<PrivateRoute />}>
                    <Route exact path="/eventos/listar" element={<EventsList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;