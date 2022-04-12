import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn, ...props }) => {
  return (
    <Route {...props}>
      {loggedIn ? children : <Redirect to="/signin" />}
    </Route>
  );
};

export default ProtectedRoute;
