import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Login';
import GroupsRouter from '../Groups/GroupsRouter';
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';
import TermsOfService from '../TermsOfService';
import PrivacyPolicy from '../PrivacyPolicy';

const Router = () => (
  <Container maxWidth="md">
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/groups" component={GroupsRouter} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <UnprotectedRoute exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  </Container>
);

export default Router;
