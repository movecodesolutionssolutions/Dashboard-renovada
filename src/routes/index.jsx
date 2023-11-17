import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

import Login from '../Pages/Login/index';
import Registre from '../Pages/Registre-se/index';
import Recovery from '../Pages/Recovery';
import User from '../Pages/Users';
import PrivateRoutes from './PriveteRoutes';
import Header from '../components/Header';
import EventsList from '../Pages/Eventos/List';

const HeaderWrapper = () => {
  const location = useLocation();
  const routesWithHeader = ['/users', '/events/list'];
  const shouldRenderHeader = routesWithHeader.includes(location.pathname);

  return shouldRenderHeader ? <Header /> : null;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Registre} />
        <Route path="/recovery" exact component={Recovery} />
        <PrivateRoutes path="/users" component={User} />
        <PrivateRoutes path="/events/list" component={EventsList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
