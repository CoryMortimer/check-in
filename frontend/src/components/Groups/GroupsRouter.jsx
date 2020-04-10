import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import Groups from './Groups';
import Group from './Group';
import NewGroup from './NewGroup';

const Router = () => {
  let { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={path}>
          <Groups />
        </Route>
        <Route path={`${path}/new`}>
          <NewGroup />
        </Route>
        <Route path={`${path}/:groupId`}>
          <Group />
        </Route>
      </Switch>
    </BrowserRouter>
  )
};

export default Router;
