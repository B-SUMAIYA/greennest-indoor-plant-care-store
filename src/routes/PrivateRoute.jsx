// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    // যদি লগইন না করা থাকে → Login page এ পাঠানো হবে,
    // কিন্তু আগের path save হবে (যাতে login এর পর আবার ফিরে আসে)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // user থাকলে মূল children component render করবে
  return children;
};

export default PrivateRoute;

