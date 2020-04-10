import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from '../Login';
import GroupsRouter from '../Groups/GroupsRouter';
import ProtectedRoute from './ProtectedRoute'
import UnprotectedRoute from './UnprotectedRoute'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/groups" component={GroupsRouter} />
      <UnprotectedRoute exact path="/" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;
