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
import GroupsNavBar from '../ui/NavBars/GroupsNavBar';
import TitleBar from '../ui/NavBars/TitleBar';

const Router = () => {
  let { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={path}>
          <TitleBar>
            <Groups />
          </TitleBar>
        </Route>
        <Route path={`${path}/new`}>
          <GroupsNavBar>
            <NewGroup />
          </GroupsNavBar>
        </Route>
        <Route path={`${path}/:groupId`}>
          <GroupsNavBar>
            <Group />
          </GroupsNavBar>
        </Route>
      </Switch>
    </BrowserRouter>
  )
};

export default Router;
