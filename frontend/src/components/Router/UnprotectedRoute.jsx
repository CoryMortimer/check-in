import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useSWR from 'swr';

const UnprotectedRoute = ({ component: Component, ...props }) => {
  const { data, error } = useSWR('/groups');
  console.log('LOGIN ROUTE ERROR', !!error)

  if (!data && !error) {
    return (<h1>loading...</h1>);
  } else {
    return (
      <Route
        {...props}
        render={props => (
          error ?
            <Component {...props} /> :
            <Redirect to='/groups' />
        )}
      />
    );
  }
};

export default UnprotectedRoute;
