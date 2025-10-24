import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if(loading){
    return <div className='text-center mt-10'>Loading...............</div>
  }
  if (!user) {
    return <Navigate to="/login" state={{from:location}}/>
  }
  return children
   
};

export default PrivateRoute;

