import React from 'react';
import {  Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element : React.ReactNode
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ element }) => {
  
    const user = localStorage.getItem('user')

//   checking if user logged in or not
  if (!user) {
    // if user not logged in redirecting to homepage
    return <Navigate to="/" />;
  }
//   if logged in redirecting to the required page
  return element;
};

export default ProtectedRoute;