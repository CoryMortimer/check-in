import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useSWR from 'swr';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { data, error } = useSWR('/groups');
  console.log('GROUPS ROUTE ERROR', !!error)

  if (!data && !error) {
    return (<h1>loading...</h1>);
  } else {
    return (
      <Route
        {...props}
        render={props => (
          !error ?
            <Component {...props} /> :
            <Redirect to='/' />
        )}
      />
    );
  }
};

export default ProtectedRoute;
