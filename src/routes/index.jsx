import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

import Login from '../Pages/Login/index';
import Registre from '../Pages/Registre-se/index';
import Recovery from '../Pages/Recovery';
import User from '../Pages/Users';
import PrivateRoutes from './PriveteRoutes';
import Header from '../components/Header';
import EventsList from '../Pages/Eventos/List';
import SermonList from "../Pages/Sermoes";
import RecoveryLink from '../Pages/RecoveryLink';
import News from "../Pages/News";

const HeaderWrapper = () => {
  const location = useLocation();
  const routesWithHeader = ["/users", "/events/list", "/news", "/sermon/list"];
  const shouldRenderHeader = routesWithHeader.includes(location.pathname);

  return shouldRenderHeader ? <Header /> : null;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Switch>
        <Route path="/" exact component={Login} />
        {/* <Route path="/register" exact component={Registre} /> */}
        <Route path="/recovery" exact component={Recovery} />
        <Route path="/recover" exact component={RecoveryLink} />
        <PrivateRoutes path="/users" component={User} />
        <PrivateRoutes path="/events/list" component={EventsList} />
        <PrivateRoutes path="/sermon/list" component={SermonList} />
        <PrivateRoutes path="/news" component={News} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
