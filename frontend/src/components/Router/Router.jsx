import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from '../Login';
import GroupsRouter from '../Groups/GroupsRouter';
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';

const Router = () => (
  <Container maxWidth="md">
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/groups" component={GroupsRouter} />
        <UnprotectedRoute exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  </Container>
);

export default Router;
