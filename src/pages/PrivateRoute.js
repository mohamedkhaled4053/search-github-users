import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import loadingImage from '../images/preloader.gif';

const PrivateRoute = ({ children }) => {
  let { isLoading, isAuthenticated, error, user } = useAuth0();

  if (isLoading) {
    return <img src={loadingImage} alt="loading" className="loading-img" />;
  }

  if (!(isAuthenticated && user)) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default PrivateRoute;
